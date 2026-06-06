import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/docs/TailwindToKotlin.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/tailwind-to-kotlin")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description, "/docs/tailwind-to-kotlin", "Getting Started") }),
});
