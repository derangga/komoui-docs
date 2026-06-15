import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Sonner.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/sonner")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/sonner", "Components"),
});
