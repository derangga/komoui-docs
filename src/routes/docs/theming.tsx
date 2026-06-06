import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/docs/Theming.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/theming")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/theming", "Getting Started") }),
});
