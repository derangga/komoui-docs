# CLAUDE.md — komoui-docs

## What is this project?

Documentation website for [KomoUI](https://github.com/derangga/komoui) (Kotlin Modern UI), a Kotlin Multiplatform UI library for Jetpack Compose inspired by shadcn/ui. Live at `komoui.site`.

## Tech stack

- **React 19** + **TypeScript 5.8** + **Vite 7**
- **TanStack Router** (file-based routing with auto-generated route tree)
- **Tailwind CSS 4** with CSS variables (oklch color space)
- **shadcn/ui** (new-york style) with **Radix UI** headless primitives
- **Bun** as package manager
- **MDX** via `@mdx-js/rollup` with `rehype-pretty-code` (Shiki) syntax highlighting
- Deployed on **Cloudflare Workers** (wrangler, static SPA)

## Commands

```bash
bun install        # install dependencies
bun run dev        # start dev server
bun run build      # production build
bun run preview    # preview via wrangler dev
bun run deploy     # build + deploy to Cloudflare
```

No linter, formatter, or test runner is configured. `bun run build` is the only verification step.

## Project structure

```
src/
├── main.tsx                         # React entry point
├── router.tsx                       # TanStack Router instance
├── routeTree.gen.ts                 # Auto-generated route tree (do not edit)
├── styles/app.css                   # Tailwind config, CSS variables, rehype-pretty-code styles
├── routes/                          # TanStack Router file-based routes
│   ├── __root.tsx                   # Root layout (TooltipProvider)
│   ├── index.tsx                    # Home page
│   └── docs/                        # Docs layout + pages
│       ├── route.tsx                # Docs sidebar layout
│       ├── introduction.tsx         # Getting-started route files
│       └── components/              # Component route files
├── content/                         # MDX content files
│   ├── docs/                        # Getting-started .mdx pages
│   └── components/                  # Per-component .mdx documentation
├── components/ui/                   # shadcn/ui React components (flat .tsx files)
├── components/mdx/                  # MDX-embeddable components (DocsPage, TabPreview, etc.)
├── components/docs/                 # Docs-specific components (CodeConverter)
├── components/icons/                # Custom SVG icon components
├── components/home/                 # Home page components (Header, Hero, Examples)
├── hooks/                           # React hooks (useTheme, useTableOfContents, useMobile)
├── lib/utils.ts                     # cn() helper (clsx + tailwind-merge)
├── lib/component-menu.ts            # Sidebar menu data for components
├── lib/seo.ts                       # SEO meta helper
├── lib/tailwind-to-kotlin.ts        # CSS-to-Kotlin converter logic
└── types/                           # Shared TypeScript types
```

## How things work

### Adding a new documentation page
1. Create a `.mdx` file in `src/content/docs/` or `src/content/components/`
2. Create a route file in `src/routes/docs/` importing the MDX content
3. If it's a component page, also add it to `src/lib/component-menu.ts` and the `Component` union type in `src/types/content.ts`

### Adding a new MDX-embeddable component
1. Create the `.tsx` component in `src/components/mdx/`
2. Add it to the component map in `src/components/mdx/mdx-components.tsx`

### UI components
- Follow shadcn/ui patterns: flat file under `src/components/ui/<name>.tsx`
- Use `cva` from `class-variance-authority` for variants
- Use `cn()` from `@/lib/utils` for class merging

## Conventions

- Path alias: `@` maps to `src/`
- Use `import type` for type-only imports
- React components use PascalCase; route paths use kebab-case
- Tailwind classes directly in JSX; no external CSS unless necessary
