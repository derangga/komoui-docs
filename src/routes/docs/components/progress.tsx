import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Progress.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/progress")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/progress", "Components"),
});
