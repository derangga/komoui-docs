import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/AlertDialog.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/alert-dialog")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/alert-dialog", "Components"),
});
