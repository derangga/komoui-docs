import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/Carousel.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/carousel")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/components/carousel", "Components") }),
});
