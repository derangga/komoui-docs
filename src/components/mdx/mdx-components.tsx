import defaultMdxComponents from "fumadocs-ui/mdx";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";
import type { MDXComponents } from "mdx/types";
import { Preview } from "./preview";
import { CodeConverter } from "@/components/docs/code-converter";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    Step,
    Steps,
    Preview,
    CodeConverter,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;
