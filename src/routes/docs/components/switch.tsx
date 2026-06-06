import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Switch.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/switch")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/components/switch", "Components") }),
});
