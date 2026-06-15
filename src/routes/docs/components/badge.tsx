import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Badge.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/badge")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/badge", "Components"),
});
