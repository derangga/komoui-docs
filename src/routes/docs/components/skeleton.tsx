import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Skeleton.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/skeleton")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/skeleton", "Components"),
});
