import { Link } from "@tanstack/react-router";

const links = [
  { slug: "installation", title: "Installation", text: "Add KomoUI to your Gradle project." },
  { slug: "theming", title: "Theming", text: "Colors, radius and dark mode for every component." },
  { slug: "components", title: "All components", text: "Buttons, inputs, dialogs, charts, data tables and more." },
  { slug: "tailwind-to-kotlin", title: "Tailwind to Kotlin", text: "Convert Tailwind classes into Compose modifiers." },
  { slug: "components/button", title: "Button", text: "Six variants, six sizes, loading and disabled states." },
  { slug: "components/data-table", title: "Data Table", text: "Sorting, row selection and pagination." },
  { slug: "components/calendar", title: "Calendar", text: "Single date and date range selection." },
  { slug: "components/chart", title: "Chart", text: "Bar, line and area charts on Compose Canvas." },
];

export function Explore() {
  return (
    <section id="explore" className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Jetpack Compose components for Android, iOS, Desktop and Web
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-center">
          KomoUI is an open-source Kotlin Multiplatform library inspired by
          shadcn/ui. Copy the components you need into your Compose app.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map(({ slug, title, text }) => (
            <li key={slug}>
              <Link
                to="/docs/$"
                params={{ _splat: slug }}
                className="block h-full rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <span className="font-semibold">{title}</span>
                <span className="block text-sm text-muted-foreground mt-1">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
