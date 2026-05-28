import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "@/content/components/InputOTP.mdx";
import { docsMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/input-otp")({
  component: () => <Content />,
  head: () => ({ meta: docsMeta(frontmatter.title, frontmatter.description) }),
});
