import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/DropdownMenu.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/dropdown-menu")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/dropdown-menu", "Components"),
});
