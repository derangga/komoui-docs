import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Dialog.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/dialog")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/components/dialog", "Components") }),
});
