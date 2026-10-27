import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import StaticSearchDialog from "@/components/search";
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
        content: "https://komoui.site/og-image.png",
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
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
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
        content: "https://komoui.site/og-image.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
});

function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ SearchDialog: StaticSearchDialog }}>
          <Outlet />
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
