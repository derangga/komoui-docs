# CLAUDE.md — komoui-docs

## What is this project?

Documentation website for [KomoUI](https://github.com/derangga/komoui) (Kotlin Modern UI), a Kotlin Multiplatform UI library for Jetpack Compose inspired by shadcn/ui. Live at `komoui.site`.

## Tech stack

- **React 19** + **TypeScript 5.8** + **Vite 8**
- **TanStack Start** (file-based routing, auto-generated route tree, build-time prerendering)
- **Fumadocs** (`fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx`) for docs layout, MDX pipeline, sidebar, TOC and search
- **Tailwind CSS 4** with CSS variables (oklch color space); Fumadocs reads them through its `shadcn.css` preset
- **shadcn/ui** (new-york style) with **Radix UI** headless primitives, used by the home page and custom MDX components
- **Bun** as package manager
- Deployed on **Cloudflare Workers** (wrangler). Every page is prerendered to static HTML; the Worker only answers server-function calls during client-side navigation.

## Commands

```bash
bun install        # install dependencies
bun run dev        # start dev server
bun run build      # production build (prerenders every page, search index, llms.txt, sitemap)
bun run preview    # preview the production build locally
bun run deploy     # build + deploy to Cloudflare
bunx tsc --noEmit  # typecheck
```

No linter, formatter, or test runner is configured. `bun run build` and `bunx tsc --noEmit` are the verification steps.

## Project structure

```
content/docs/                        # All docs content (URL = file path under /docs)
├── meta.json                        # Sidebar order: "Get Started" section, then components
├── introduction.mdx, installation.mdx, theming.mdx, tailwind-to-kotlin.mdx
├── components.mdx                   # /docs/components index (Cards grid)
└── components/
    ├── meta.json                    # Component order in the sidebar (alphabetical by title)
    └── <slug>.mdx                   # One page per component, kebab-case
src/
├── router.tsx                       # TanStack Router instance (404 page, preload on hover)
├── routeTree.gen.ts                 # Auto-generated route tree (do not edit)
├── styles/app.css                   # Tailwind, shadcn CSS variables, Fumadocs presets
├── routes/
│   ├── __root.tsx                   # Root layout, Fumadocs RootProvider (theme + search)
│   ├── index.tsx                    # Home page (Fumadocs HomeLayout)
│   ├── docs/$.tsx                   # Every docs page: DocsLayout + DocsPage + SEO head
│   ├── api/search[.]json.ts         # Static Orama search index, prerendered
│   ├── sitemap[.]xml.ts             # Sitemap from content, lastmod from git, prerendered
│   └── llms[.]txt.ts, llms-full[.]txt.ts  # Generated from content, prerendered
├── components/mdx/mdx-components.tsx  # MDX component map (Fumadocs defaults + Preview, CodeConverter)
├── components/mdx/preview.tsx       # Component preview image from img.komoui.site
├── components/search.tsx            # Search dialog backed by the static index
├── components/ui/                   # shadcn/ui React components (flat .tsx files)
├── components/docs/                 # Docs-specific components (CodeConverter)
├── components/icons/                # Custom SVG icon components
├── components/home/                 # Home page components (Hero, Examples)
├── lib/source.ts                    # Fumadocs content source + llms.txt renderer
├── lib/layout.shared.tsx            # Nav title and GitHub link shared by all layouts
├── lib/seo.ts                       # SEO meta + JSON-LD helpers
├── lib/shiki-theme.ts               # Code highlight themes (AA-contrast comments)
├── lib/tailwind-to-kotlin.ts        # CSS-to-Kotlin converter logic
└── lib/utils.ts                     # cn() helper (clsx + tailwind-merge)
```

## How things work

### Adding a new documentation page
1. Create a `.mdx` file under `content/docs/`. The file path is the URL: `content/docs/components/date-picker.mdx` is `/docs/components/date-picker`.
2. Add its slug to the folder's `meta.json`, or it won't show in the sidebar.
3. For a component page, also add a `<Card>` to `content/docs/components.mdx`.

No route file is needed. Frontmatter needs `title` and `description`; top-level pages can also set a lucide `icon`.

### Writing MDX
- No imports and no wrapper component. Title and description render from frontmatter.
- Tabs: `<Tabs items={["Preview","Code"]}>` with `<Tab value="Preview">` children.
- Steps: `<Steps>` with `<Step>` children, each starting with a `####` heading.
- File name on a code block: ```` ```kotlin title="Page.kt" ````.
- Available everywhere: Fumadocs defaults (`Cards`, `Card`, `Callout`, ...), `Tabs`, `Tab`, `Steps`, `Step`, `Preview`, `CodeConverter`.

### Adding a new MDX-embeddable component
1. Create the `.tsx` component in `src/components/mdx/`
2. Add it to the map in `src/components/mdx/mdx-components.tsx`

### UI components
- Follow shadcn/ui patterns: flat file under `src/components/ui/<name>.tsx`
- Use `cva` from `class-variance-authority` for variants
- Use `cn()` from `@/lib/utils` for class merging

### URLs and SEO
- URLs have no trailing slash. `public/_redirects` 301s `/docs` and `/docs/` to `/docs/introduction`, and `/docs/components/` to `/docs/components`.
- `docs/$.tsx` `head()` builds titles, canonical links and JSON-LD through `lib/seo.ts`.
- `routes/sitemap[.]xml.ts` replaces TanStack Start's sitemap generator (wrong namespace, build-date lastmod). Each page's `lastmod` is its last git commit, so deploy from a full clone.

## Conventions

- Path alias: `@` maps to `src/`
- Use `import type` for type-only imports
- React components use PascalCase; route paths and content files use kebab-case
- Tailwind classes directly in JSX; no external CSS unless necessary
