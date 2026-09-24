import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { light as shikiLight, dark as shikiDark } from "./src/lib/shiki-theme";

export default defineConfig({
  plugins: [
    fumadocsMdx({
      globalOptions: {
        mdxOptions: {
          rehypeCodeOptions: {
            themes: { light: shikiLight, dark: shikiDark },
          },
        },
      },
    }),
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
      },
      // Not reachable by link crawling. The sitemap is our own route
      // (src/routes/sitemap[.]xml.ts); TanStack's generated one is disabled.
      pages: [
        { path: "/api/search.json" },
        { path: "/llms.txt" },
        { path: "/llms-full.txt" },
        { path: "/sitemap.xml" },
      ],
      sitemap: { enabled: false },
    }),
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
        // Found late otherwise; the re-optimize reload breaks the first SSR request.
        "fumadocs-mdx/runtime/macro",
      ],
    },
  },
});
