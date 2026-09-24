---
name: write-compose-docs
description: Write comprehensive MDX documentation for KomoUI (Kotlin Modern UI) components. Use when the user asks to write, update, or improve docs for a component in this project — especially when given a GitHub source file URL or asked to make docs "comprehensive". Handles fetching Kotlin source via gh CLI, reading existing MDX patterns, and producing complete docs with usage sections, API reference tables, and correct KMP code examples.
---

# Write Compose Docs

## Quick start

```
User: "write comprehensive docs for Button based on https://github.com/derangga/komoui/blob/master/..."
```

1. Fetch the Kotlin source with `gh api`
2. Read the existing MDX file and one reference doc
3. Write the updated MDX

## Workflow

### 1. Fetch source + read existing docs (parallel)

```bash
# Fetch Kotlin source (convert GitHub blob URL → API path)
gh api repos/derangga/komoui/contents/<path-to-file>.kt --jq '.content' | base64 -d
```

Read the existing component MDX at `content/docs/components/<component-slug>.mdx` (kebab-case, e.g. `date-picker.mdx`). The filename is the URL slug.

Read one comprehensive reference doc for section/table patterns — `content/docs/components/data-table.mdx` or `content/docs/components/sidebar.mdx`.

### 2. Analyse the source

Extract from the Kotlin file:
- All `@Composable` function signatures and their KDoc
- All `data class` / `sealed interface` / `enum class` definitions used as parameters
- The `Defaults` object (e.g. `CalendarDefaults`) and its `@Composable` factory methods
- Every parameter: name, type, default value, KDoc description

### 3. Write the MDX

See [REFERENCE.md](REFERENCE.md) for the full MDX template and rules.

For a **new** component, also add its slug to `content/docs/components/meta.json` (alphabetical by title) and a `<Card>` to `content/docs/components.mdx`. Nothing else: the `/docs/$` route, sidebar, search index and llms.txt all come from the content folder.

### 4. Verify

```bash
bun run build
```

Fix any MDX parse errors before reporting done.

## Key rules (must follow)

- **Never use `LocalDate.now()`** — it's Java API. In KMP/kotlinx-datetime use `null` as initial state in examples, or `Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date` when a live value is required.
- **Always show explicit imports** in every code block.
- **`@Composable` annotation** on every example function.
- For theming overrides use `ComponentDefaults.colors { copy(...) }` lambda pattern — never construct `ComponentStyle(...)` directly in examples.
- MDX code fence language is always `kotlin`.
