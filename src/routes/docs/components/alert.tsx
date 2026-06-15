import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Alert.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/alert")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/alert", "Components"),
});
