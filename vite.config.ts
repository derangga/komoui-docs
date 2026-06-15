import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        // Emit flat `<path>.html` files instead of `<path>/index.html`. On
        // Cloudflare's asset server this makes the non-trailing URL (the form
        // used in our sitemap and rel=canonical tags) the 200 canonical, instead
        // of 307-redirecting it to a trailing-slash variant.
        autoSubfolderIndex: false,
        // The /docs/components index route is crawlable as both /docs/components
        // and /docs/components/. Keep the trailing-slash variant out of the
        // sitemap so only the canonical (non-trailing) URL is submitted to Google.
        onSuccess: ({ page }) => {
          if (page.path !== "/" && page.path.endsWith("/")) {
            return { ...page, sitemap: { ...page.sitemap, exclude: true } };
          }
        },
      },
      sitemap: {
        enabled: true,
        host: "https://komoui.site",
      },
    }),
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark",
                light: "github-light",
              },
            },
          ],
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      }),
    },
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/server",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
  },
});
