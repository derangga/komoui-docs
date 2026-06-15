import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/docs/Introduction.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/introduction")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/introduction", "Getting Started"),
});
