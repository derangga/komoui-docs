import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Card.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/card")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/components/card", "Components") }),
});
