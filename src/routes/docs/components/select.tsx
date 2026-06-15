import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Select.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/select")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/select", "Components"),
});
