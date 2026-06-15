import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Avatar.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/avatar")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/avatar", "Components"),
});
