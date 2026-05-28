# MDX Template & Rules

## File structure

```mdx
---
title: ComponentName
description: One sentence describing what the component does and its main capabilities.
---

import { DocsPage } from "@/components/mdx/docs-page"
import { TabPreview } from "@/components/mdx/tab-preview"
import { Preview } from "@/components/mdx/preview"
import { Steps } from "@/components/mdx/steps"
import { CodeWithFilename } from "@/components/mdx/code-with-filename"
import { CodeConverter } from "@/components/docs/code-converter"

<DocsPage title={frontmatter.title} description={frontmatter.description} path="content/components/ComponentName.mdx">

[sections...]

</DocsPage>
```

## Section order

1. **Overview paragraph** — 2–3 sentences. What the component is, what variants exist, anything non-obvious.
2. **Basic Usage** — simplest working example.
3. **Feature sections** — one `## Section` per distinct feature/variant. Use `### Sub-section` when grouping related variants (e.g. "Date Restriction Modes" with "### Past or Today" and "### Future or Today").
4. **API Reference** — always last. One `### ComponentName` subsection per composable/class/enum.

## TabPreview pattern (use for every code example)

```mdx
<TabPreview>

<TabPreview.Panel name="Preview">
<Preview name="component-name" variant="variant-name" />
</TabPreview.Panel>

<TabPreview.Panel name="Code">

```kotlin
// code here
```

</TabPreview.Panel>

</TabPreview>
```

`variant` matches the preview registration key. If no dedicated variant exists for a new section, reuse `"default"`.

## Code example rules

- Include all necessary imports at the top of every block.
- Wrap in `@Composable fun Example() { ... }`.
- Use `var x by remember { mutableStateOf<Type?>(null) }` for state.
- **Never** use `LocalDate.now()` — use `null` initial state or `Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date`.
- Keep `Column` wrapper with `fillMaxSize()` + padding so examples look realistic.
- For theming, always use `Defaults.colors { copy(...) }` — not the data class constructor.

## API reference tables

### Composable parameters table

```md
| Parameter | Type | Default | Description |
|---|---|---|---|
| `paramName` | `Type` | `defaultValue` | What it does. |
```

### Enum table

```md
| Value | Description |
|---|---|
| `EnumValue` | What it means / when to use it. |
```

### Data class fields table

```md
| Field | Type | Description |
|---|---|---|
| `fieldName` | `Type` | What it controls. |
```

### Object/Defaults table

```md
| Member | Description |
|---|---|
| `method()` | What it returns / does. |
```

## Callouts

Use blockquotes for caveats or important notes:

```md
> `initialMonth` is only used on first composition. To navigate programmatically after render, hoist the state externally.
```

## Describing sealed interfaces

Show the sealed interface itself in one line, then give each subclass its own `#### ClassName` heading with a parameter table.

## Style conventions

- Section headings: sentence case (`## Basic usage`, not `## Basic Usage`) — match existing docs in the repo.
- Keep descriptions in tables short (one clause). Full explanation goes in the section prose above the example.
- No trailing punctuation in table cells unless the cell contains a full sentence.
- Data class definitions can be shown as a code snippet instead of a table when all fields are simple and self-explanatory.
