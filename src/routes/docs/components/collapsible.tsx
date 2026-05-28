import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Collapsible.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/collapsible")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description) }),
});
