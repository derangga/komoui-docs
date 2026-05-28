import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Chart.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/chart")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description) }),
});
