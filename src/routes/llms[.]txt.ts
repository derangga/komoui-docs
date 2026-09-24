import { createFileRoute } from "@tanstack/react-router";
import type { Node } from "fumadocs-core/page-tree";
import { source } from "@/lib/source";

const site = "https://komoui.site";

// llmstxt.org format: H1, summary blockquote, then one H2 per sidebar section.
function render(nodes: Node[]): string[] {
  return nodes.flatMap((node) => {
    if (node.type === "separator") return [`\n## ${node.name}\n`];
    if (node.type === "folder") return render(node.children);
    const desc = node.description ? `: ${node.description}` : "";
    return [`- [${node.name}](${site}${node.url})${desc}`];
  });
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          [
            "# KomoUI\n",
            "> KomoUI (Kotlin Modern UI) is a Kotlin Multiplatform UI library for Jetpack",
            "> Compose, inspired by shadcn/ui. Beautifully designed components you copy and",
            "> paste into your apps, targeting Android, iOS, Desktop, and Web.",
            ...render(source.getPageTree().children),
            `\n## Optional\n\n- [Full documentation](${site}/llms-full.txt): Every page as Markdown in one file`,
          ].join("\n") + "\n"
        ),
    },
  },
});
