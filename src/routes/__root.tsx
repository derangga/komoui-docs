import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "KomoUI",
      },
      {
        name: "description",
        content:
          "KomoUI is a Kotlin Multiplatform UI library for Jetpack Compose, providing beautifully designed components that you can copy and paste into your apps.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "KomoUI",
      },
      {
        property: "og:description",
        content:
          "KomoUI is a Kotlin Multiplatform UI library for Jetpack Compose, providing beautifully designed components that you can copy and paste into your apps.",
      },
      {
        property: "og:image",
        content: "https://komoui.site/og-image.webp",
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:url",
        content: "https://komoui.site/",
      },
      {
        property: "og:site_name",
        content: "KomoUI",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "KomoUI",
      },
      {
        name: "twitter:description",
        content:
          "KomoUI is a Kotlin Multiplatform UI library for Jetpack Compose, providing beautifully designed components that you can copy and paste into your apps.",
      },
      {
        name: "twitter:image",
        content: "https://komoui.site/og-image.webp",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/android-fav.webp",
      },
    ],
  }),
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  );
}
