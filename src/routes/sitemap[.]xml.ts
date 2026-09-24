import { createFileRoute } from "@tanstack/react-router";
import { source } from "@/lib/source";

const site = "https://komoui.site";

// Replaces TanStack Start's generated sitemap, which uses the wrong namespace
// (https://www.sitemaps.org/...) and stamps every URL with the build date.
// lastmod comes from each page's last git commit.
function url(loc: string, lastModified?: Date) {
  const lastmod = lastModified
    ? `\n    <lastmod>${lastModified.toISOString().split("T")[0]}</lastmod>`
    : "";
  return `  <url>\n    <loc>${site}${loc}</loc>${lastmod}\n  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            url("/"),
            ...(await Promise.all(
              source
                .getPages()
                .map(async (page) => url(page.url, (await page.data.load()).lastModified))
            )),
            "</urlset>",
          ].join("\n") + "\n",
          { headers: { "Content-Type": "application/xml" } }
        ),
    },
  },
});
