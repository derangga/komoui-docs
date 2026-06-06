import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Slider.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/slider")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/components/slider", "Components") }),
});
