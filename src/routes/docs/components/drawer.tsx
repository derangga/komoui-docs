import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Drawer.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/drawer")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/components/drawer", "Components") }),
});
