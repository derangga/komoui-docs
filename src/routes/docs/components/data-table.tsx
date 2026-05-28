import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/DataTable.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/data-table")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description) }),
});
