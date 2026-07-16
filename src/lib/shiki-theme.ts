import githubLight from "shiki/themes/github-light.mjs";
import githubDark from "shiki/themes/github-dark.mjs";
import type { ThemeRegistration } from "shiki";

// Bundled github-light/github-dark render code comments in #6a737d, which fails
// WCAG AA contrast (~4.2:1 on the light bg, ~3.0:1 on the dark bg — Lighthouse
// color-contrast audit). rehype-pretty-code bakes the color into an inline
// --shiki-* custom property per span, so CSS can't override it; we patch the
// theme at the source instead. Shared by both highlighters (build-time
// rehype-pretty-code and the runtime Shiki in code-highlight.tsx) so they stay
// in sync.
function withAccessibleComments(
  theme: ThemeRegistration,
  foreground: string
): ThemeRegistration {
  const clone = structuredClone(theme);
  for (const token of clone.tokenColors ?? []) {
    const scope = token.scope;
    const scopes = Array.isArray(scope) ? scope : scope ? [scope] : [];
    if (scopes.some((s) => s.includes("comment")) && token.settings) {
      (token.settings as { foreground?: string }).foreground = foreground;
    }
  }
  return clone;
}

export const light = withAccessibleComments(githubLight, "#57606a");
export const dark = withAccessibleComments(githubDark, "#8b949e");
