import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Spinner.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/spinner")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description) }),
});
