import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/docs/Installation.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/installation")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/installation", "Getting Started") }),
});
