import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Accordion.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/accordion")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/accordion", "Components"),
});
