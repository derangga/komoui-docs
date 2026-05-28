import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { EditThisPage } from "./edit-this-page";

interface DocsPageProps {
  title: string;
  description: string;
  path?: string;
  children: ReactNode;
}

export function DocsPage({
  title,
  description,
  path = "https://github.com/derangga/komoui-docs/",
  children,
}: DocsPageProps) {
  const source = `https://github.com/derangga/komoui-docs/tree/master/src/${path}`;

  return (
    <div className="mb-40">
      <div>
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground text-[1.05rem] sm:text-base">
          {description}
        </p>
        <Separator />
      </div>
      {children}
      <EditThisPage source={source} />
    </div>
  );
}
