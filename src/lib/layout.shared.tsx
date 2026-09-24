import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Android } from "@/components/icons";

export const gitConfig = {
  user: "derangga",
  repo: "komoui-docs",
  branch: "master",
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Android className="size-6" />
          <span className="font-bold">KomoUI</span>
        </>
      ),
    },
    githubUrl: "https://github.com/derangga/komoui",
  };
}
