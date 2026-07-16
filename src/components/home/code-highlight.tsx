import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import type { BundledLanguage } from "shiki";
import { light as shikiLight, dark as shikiDark } from "@/lib/shiki-theme";

interface CodeHighlightProps {
  code: string;
  lang: BundledLanguage;
  className?: string;
}

/**
 * Runtime syntax highlighting for code shown outside the MDX pipeline.
 * MDX docs are highlighted at build time by rehype-pretty-code; standalone
 * components like the home page examples need Shiki applied on the client.
 * Uses the same github-light/github-dark dual theme as the MDX config.
 */
export function CodeHighlight({ code, lang, className }: CodeHighlightProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    codeToHtml(code, {
      lang,
      themes: { light: shikiLight, dark: shikiDark },
      defaultColor: false,
    }).then((out) => {
      if (active) setHtml(out);
    });
    return () => {
      active = false;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <pre className={className}>
        <code className="text-sm font-mono">{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={`home-code ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
