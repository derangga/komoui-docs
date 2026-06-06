import { createFileRoute, Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import componentMenus from "@/lib/component-menu";
import { componentsIndexMeta } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/")({
  component: ComponentsView,
  head: () => ({ meta: componentsIndexMeta() }),
});

function ComponentsView() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Components</h1>
        <p className="text-lg text-muted-foreground">
          Here you can find all the components available in the library. We are
          working on adding more components.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="not-prose container px-4 md:px-6 space-y-8 grid grid-cols-3 mx-auto">
        {componentMenus.map((menu) => (
          <Link
            key={menu.url}
            to={menu.url}
            className="text-lg font-medium underline-offset-4 hover:underline md:text-base"
          >
            {menu.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
