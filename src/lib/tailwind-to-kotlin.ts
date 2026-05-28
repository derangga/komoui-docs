export function tailwindToKotlin(
  css: string,
  interfaceName = "ShadcnStyles",
  lightClassName = "LightStyles",
  darkClassName = "DarkStyles",
): string {
  const colorProps = [
    "background",
    "foreground",
    "card",
    "cardForeground",
    "popover",
    "popoverForeground",
    "primary",
    "primaryForeground",
    "secondary",
    "secondaryForeground",
    "muted",
    "mutedForeground",
    "accent",
    "accentForeground",
    "destructive",
    "destructiveForeground",
    "border",
    "input",
    "ring",
    "chart1",
    "chart2",
    "chart3",
    "chart4",
    "chart5",
    "sidebar",
    "sidebarForeground",
    "sidebarPrimary",
    "sidebarPrimaryForeground",
    "sidebarAccent",
    "sidebarAccentForeground",
    "sidebarBorder",
    "sidebarRing",
    "snackbar",
  ];

  const shadowProps = [
    "shadow2xs",
    "shadowXs",
    "shadowSm",
    "shadow",
    "shadowMd",
    "shadowLg",
    "shadowXl",
    "shadow2xl",
  ];

  function parseBlocks(input: string) {
    const blocks: Record<string, string> = {};
    const blockRe = /([^{]+)\{([^}]+)\}/gs;
    let m: RegExpExecArray | null;
    while ((m = blockRe.exec(input))) {
      blocks[m[1].trim()] = m[2];
    }
    return blocks;
  }

  function parseVars(body: string) {
    const map: Record<string, string> = {};
    const varRe = /--([a-z0-9\-_]+)\s*:\s*([^;]+);/gi;
    let m: RegExpExecArray | null;
    while ((m = varRe.exec(body))) {
      map[m[1].trim()] = m[2].trim();
    }
    return map;
  }

  function camelToKebab(c: string) {
    return c.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
  }

  function hslToColor(h: number, s: number, l: number, a: number = 1): string {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;
    if (h < 60) {
      r = c;
      g = x;
    } else if (h < 120) {
      r = x;
      g = c;
    } else if (h < 180) {
      g = c;
      b = x;
    } else if (h < 240) {
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }
    const ri = Math.round((r + m) * 255);
    const gi = Math.round((g + m) * 255);
    const bi = Math.round((b + m) * 255);
    const ai = Math.round(a * 255);
    const toHex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
    return `Color(0x${toHex(ai)}${toHex(ri)}${toHex(gi)}${toHex(bi)})`;
  }

  function colorToKotlin(value: string): string {
    value = value.trim().toLowerCase();
    if (value === "transparent") return "Color(0x00000000)";

    const hexRe = /^#([0-9a-f]{3,8})$/i;
    const mHex = value.match(hexRe);
    if (mHex) {
      let hex = mHex[1];
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((ch) => ch + ch)
          .join("");
        return `Color(0xFF${hex.toUpperCase()})`;
      }
      if (hex.length === 4) {
        const r = hex[0] + hex[0],
          g = hex[1] + hex[1],
          b = hex[2] + hex[2],
          a = hex[3] + hex[3];
        return `Color(0x${(a + r + g + b).toUpperCase()})`;
      }
      if (hex.length === 6) return `Color(0xFF${hex.toUpperCase()})`;
      if (hex.length === 8) {
        return `Color(0x${(hex.slice(6, 8) + hex.slice(0, 6)).toUpperCase()})`;
      }
    }

    const hslRe = /^hsla?\(\s*([^)]+)\s*\)$/i;
    const mHsl = value.match(hslRe);
    if (mHsl) {
      const parts = mHsl[1].split(/[\s,\/]+/).filter((p) => p.trim());
      if (parts.length >= 3) {
        const h = parseFloat(parts[0]);
        const s = parseFloat(parts[1]) / 100;
        const l = parseFloat(parts[2]) / 100;
        const a = parts.length >= 4 ? parseFloat(parts[3]) : 1;
        return hslToColor(h, s, l, a);
      }
    }

    const rgbRe = /^rgba?\(\s*([^)]+)\s*\)$/i;
    const mRgb = value.match(rgbRe);
    if (mRgb) {
      const parts = mRgb[1].split(",").map((s) => s.trim());
      if (parts.length >= 3) {
        function parseChannel(ch: string) {
          if (ch.endsWith("%"))
            return Math.max(
              0,
              Math.min(255, Math.round((parseFloat(ch) / 100) * 255)),
            );
          return Math.max(0, Math.min(255, Math.round(parseFloat(ch))));
        }
        const r = parseChannel(parts[0]),
          g = parseChannel(parts[1]),
          b = parseChannel(parts[2]);
        let a = 1;
        if (parts.length === 4) {
          const rawA = parts[3];
          a = rawA.endsWith("%")
            ? Math.max(0, Math.min(1, parseFloat(rawA) / 100))
            : Math.max(0, Math.min(1, parseFloat(rawA)));
        }
        const ai = Math.round(a * 255);
        const toHex = (n: number) =>
          n.toString(16).padStart(2, "0").toUpperCase();
        return `Color(0x${toHex(ai)}${toHex(r)}${toHex(g)}${toHex(b)})`;
      }
    }

    return "Color.Unspecified";
  }

  function parseShadow(shadowValue: string): string | null {
    const shadows = shadowValue.split(",").map((s) => s.trim());
    const toDp = (val: string) => {
      const num = parseFloat(val);
      if (val.includes("rem") || val.includes("em")) {
        return num < 0 ? `(${num * 16}).dp` : `${num * 16}.dp`;
      }
      return num < 0 ? `(${num}).dp` : `${num}.dp`;
    };
    const parsed: string[] = [];
    for (const shadow of shadows) {
      const parts = shadow.match(
        /^([\d.-]+(?:px|rem|em)?)\s+([\d.-]+(?:px|rem|em)?)\s+([\d.-]+(?:px|rem|em)?)(?:\s+([\d.-]+(?:px|rem|em)?))?\s+(.+)$/,
      );
      if (!parts) continue;
      parsed.push(`BoxShadow(
            offsetX = ${toDp(parts[1])},
            offsetY = ${toDp(parts[2])},
            blurRadius = ${toDp(parts[3])},
            spread = ${toDp(parts[4] || "0px")},
            color = MaterialTheme.styles.border
        )`);
    }
    if (parsed.length === 0) return null;
    return `listOf(\n        ${parsed.join(",\n        ")}\n    )`;
  }

  function buildClass(themeClassName: string, vars: Record<string, string>) {
    const propToColor: Record<string, string> = {};
    for (const p of colorProps) {
      const kebab = camelToKebab(p);
      if (vars.hasOwnProperty(kebab))
        propToColor[p] = colorToKotlin(vars[kebab]);
      else if (vars.hasOwnProperty(p)) propToColor[p] = colorToKotlin(vars[p]);
      else if (p === "snackbar")
        propToColor[p] = propToColor["background"] || "Color.Unspecified";
      else propToColor[p] = "Color.Unspecified";
    }

    const propToShadow: Record<string, string> = {};
    for (const p of shadowProps) {
      const kebab = camelToKebab(p);
      if (vars.hasOwnProperty(kebab)) {
        const s = parseShadow(vars[kebab]);
        if (s) propToShadow[p] = s;
      }
    }

    const lines = [`object ${themeClassName} : ${interfaceName} {`];
    for (const p of colorProps)
      lines.push(`    override val ${p}: Color = ${propToColor[p]}`);
    for (const p of shadowProps) {
      if (propToShadow[p]) {
        lines.push(`    @Composable`);
        lines.push(
          `    override fun ${p}(): List<BoxShadow> = ${propToShadow[p]}`,
        );
      }
    }
    lines.push("}");
    return lines.join("\n");
  }

  const blocks = parseBlocks(css);
  let lightVars: Record<string, string> = {};
  for (const sel of Object.keys(blocks)) {
    if (sel.includes(":root") || sel.trim() === "html") {
      lightVars = parseVars(blocks[sel]);
      break;
    }
  }
  if (Object.keys(lightVars).length === 0) {
    for (const sel of Object.keys(blocks)) {
      if (!sel.includes(".dark")) {
        lightVars = parseVars(blocks[sel]);
        break;
      }
    }
  }
  const darkSelectorKey = Object.keys(blocks).find((s) => s.includes(".dark"));
  const darkVars = darkSelectorKey ? parseVars(blocks[darkSelectorKey]) : {};

  const header = [
    "",
    "// Generated by tailwindToKotlin",
    "import androidx.compose.material3.MaterialTheme",
    "import androidx.compose.runtime.Composable",
    "import androidx.compose.ui.graphics.Color",
    "import androidx.compose.ui.unit.dp",
    "import com.komoui.themes.ShadcnStyles",
    "import com.komoui.themes.BoxShadow",
    "import com.komoui.themes.styles",
    "",
    "// NOTE: This file assumes the interface " +
      interfaceName +
      " and BoxShadow class are declared elsewhere.",
    "",
  ].join("\n");

  const classes: string[] = [];
  if (Object.keys(lightVars).length > 0)
    classes.push(buildClass(lightClassName, lightVars));
  if (Object.keys(darkVars).length > 0)
    classes.push(buildClass(darkClassName, darkVars));
  if (classes.length === 0)
    return (
      header + "// No :root or .dark variable blocks found in the input CSS.\n"
    );
  return header + classes.join("\n\n");
}
