# komoui-docs

Docs site for [KomoUI](https://github.com/derangga/komoui), a Kotlin Multiplatform UI library for Jetpack Compose inspired by shadcn/ui. Live at komoui.site. Most work here is writing or updating component docs.

## Stack

TanStack Start, Fumadocs, Tailwind 4, Bun. Deployed to Cloudflare Workers; every page is prerendered at build time.

## Where things live

- `content/docs/`: all docs content. The file path is the URL, so `content/docs/components/date-picker.mdx` serves `/docs/components/date-picker`.
- `content/docs/**/meta.json`: sidebar order. A page not listed there is missing from the sidebar.
- `content/docs/components.mdx`: the grid of cards on `/docs/components`.
- `src/components/mdx/mdx-components.tsx`: components available in MDX without imports.
- `src/routes/docs/$.tsx`: renders every docs page and its SEO tags (via `src/lib/seo.ts`).

## Writing docs

Use the `write-compose-docs` skill for component pages. It has the MDX template, the Kotlin example rules, and the steps for adding a new component. `content/docs/components/button.mdx` is a good reference page.

## Verify

```bash
bun run build      # must pass; also builds the search index, sitemap and llms.txt
bunx tsc --noEmit
```

There are no tests or linter.

## Rules

- URLs are indexed by Google. Don't rename or move content files without adding a 301 in `public/_redirects`.
- Don't edit `src/routeTree.gen.ts`; it is generated.
- Deploy (`bun run deploy`) from a full git clone: sitemap `lastmod` dates come from git history.
