import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Calendar.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/calendar")({
  component: () => <Content />,
  head: () => docsMeta(frontmatter.title, frontmatter.description, "/docs/components/calendar", "Components"),
});
