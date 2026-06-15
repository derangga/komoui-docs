import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Tabs.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/tabs")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/tabs", "Components"),
});
