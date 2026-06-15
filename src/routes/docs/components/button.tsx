import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Button.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/button")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/button", "Components"),
});
