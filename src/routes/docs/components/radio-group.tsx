import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/RadioGroup.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/radio-group")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/components/radio-group", "Components") }),
});
