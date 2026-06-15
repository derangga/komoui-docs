import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Combobox.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/combobox")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/combobox", "Components"),
});
