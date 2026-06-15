import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/DatePicker.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/date-picker")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/date-picker", "Components"),
});
