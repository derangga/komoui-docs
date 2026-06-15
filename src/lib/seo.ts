export function docsMeta(
  title: string,
  description: string,
  url?: string,
  section?: string
) {
  const canonicalUrl = url ? `https://komoui.site${url}` : "https://komoui.site";
  const isComponentPage = url?.includes("/docs/components/");
  const ogType = isComponentPage ? "article" : "website";
  const pageTitle = isComponentPage
    ? `KomoUI Component: ${title}`
    : `${title} - KomoUI`;

  const segments = url ? url.split("/").filter(Boolean) : [];

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: canonicalUrl,
    image: "https://komoui.site/og-image.webp",
    articleSection: section || (isComponentPage ? "Components" : "Documentation"),
    about: isComponentPage
      ? {
          "@type": "SoftwareApplication",
          name: `KomoUI ${title}`,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Android, iOS, Desktop, Web",
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "KomoUI",
      url: "https://komoui.site",
      logo: {
        "@type": "ImageObject",
        url: "https://komoui.site/android-fav.webp",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://komoui.site/" },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: formatSegment(segment),
        item: `https://komoui.site/${segments.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  return {
    meta: [
      { title: `${title} - KomoUI` },
      { name: "description", content: description },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://komoui.site/og-image.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: ogType },
      { property: "og:url", content: canonicalUrl },
      { property: "og:site_name", content: "KomoUI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://komoui.site/og-image.webp" },
      { "script:ld+json": techArticleSchema },
      { "script:ld+json": breadcrumbSchema },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}

function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function homeMeta() {
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KomoUI",
    url: "https://komoui.site",
    description:
      "KomoUI is a Kotlin Multiplatform UI library for Jetpack Compose, providing beautifully designed components that you can copy and paste into your apps.",
    publisher: {
      "@type": "Organization",
      name: "KomoUI",
      url: "https://komoui.site",
    },
  };

  return {
    meta: [
      { title: "KomoUI - Kotlin Multiplatform UI Library for Jetpack Compose" },
      {
        name: "description",
        content:
          "KomoUI is a Kotlin Multiplatform UI library for Jetpack Compose, providing beautifully designed components that you can copy and paste into your apps.",
      },
      { property: "og:title", content: "KomoUI" },
      {
        property: "og:description",
        content:
          "KomoUI is a Kotlin Multiplatform UI library for Jetpack Compose, providing beautifully designed components that you can copy and paste into your apps.",
      },
      { property: "og:image", content: "https://komoui.site/og-image.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://komoui.site/" },
      { property: "og:site_name", content: "KomoUI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KomoUI" },
      {
        name: "twitter:description",
        content:
          "KomoUI is a Kotlin Multiplatform UI library for Jetpack Compose, providing beautifully designed components that you can copy and paste into your apps.",
      },
      { name: "twitter:image", content: "https://komoui.site/og-image.webp" },
      { "script:ld+json": webSiteSchema },
    ],
    links: [{ rel: "canonical", href: "https://komoui.site/" }],
  };
}

export function componentsIndexMeta() {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Components - KomoUI",
    description:
      "Browse all KomoUI components for Jetpack Compose. Buttons, inputs, dialogs, navigation, and more.",
    url: "https://komoui.site/docs/components",
    hasPart: [
      { "@type": "WebPage", name: "Button", url: "https://komoui.site/docs/components/button" },
      { "@type": "WebPage", name: "Input", url: "https://komoui.site/docs/components/input" },
      { "@type": "WebPage", name: "Select", url: "https://komoui.site/docs/components/select" },
      { "@type": "WebPage", name: "Dialog", url: "https://komoui.site/docs/components/dialog" },
      { "@type": "WebPage", name: "Card", url: "https://komoui.site/docs/components/card" },
      { "@type": "WebPage", name: "Tabs", url: "https://komoui.site/docs/components/tabs" },
      { "@type": "WebPage", name: "Avatar", url: "https://komoui.site/docs/components/avatar" },
      { "@type": "WebPage", name: "Badge", url: "https://komoui.site/docs/components/badge" },
      { "@type": "WebPage", name: "Alert", url: "https://komoui.site/docs/components/alert" },
      { "@type": "WebPage", name: "Checkbox", url: "https://komoui.site/docs/components/checkbox" },
      { "@type": "WebPage", name: "Radio Group", url: "https://komoui.site/docs/components/radio-group" },
      { "@type": "WebPage", name: "Switch", url: "https://komoui.site/docs/components/switch" },
      { "@type": "WebPage", name: "Slider", url: "https://komoui.site/docs/components/slider" },
      { "@type": "WebPage", name: "Progress", url: "https://komoui.site/docs/components/progress" },
      { "@type": "WebPage", name: "Skeleton", url: "https://komoui.site/docs/components/skeleton" },
      { "@type": "WebPage", name: "Spinner", url: "https://komoui.site/docs/components/spinner" },
      { "@type": "WebPage", name: "Tooltip", url: "https://komoui.site/docs/components/tooltip" },
      { "@type": "WebPage", name: "Popover", url: "https://komoui.site/docs/components/popover" },
      { "@type": "WebPage", name: "Dropdown Menu", url: "https://komoui.site/docs/components/dropdown-menu" },
      { "@type": "WebPage", name: "Combobox", url: "https://komoui.site/docs/components/combobox" },
      { "@type": "WebPage", name: "Date Picker", url: "https://komoui.site/docs/components/date-picker" },
      { "@type": "WebPage", name: "Calendar", url: "https://komoui.site/docs/components/calendar" },
      { "@type": "WebPage", name: "Input OTP", url: "https://komoui.site/docs/components/input-otp" },
      { "@type": "WebPage", name: "Drawer", url: "https://komoui.site/docs/components/drawer" },
      { "@type": "WebPage", name: "Sidebar", url: "https://komoui.site/docs/components/sidebar" },
      { "@type": "WebPage", name: "Accordion", url: "https://komoui.site/docs/components/accordion" },
      { "@type": "WebPage", name: "Collapsible", url: "https://komoui.site/docs/components/collapsible" },
      { "@type": "WebPage", name: "Carousel", url: "https://komoui.site/docs/components/carousel" },
      { "@type": "WebPage", name: "Chart", url: "https://komoui.site/docs/components/chart" },
      { "@type": "WebPage", name: "Data Table", url: "https://komoui.site/docs/components/data-table" },
      { "@type": "WebPage", name: "Sonner", url: "https://komoui.site/docs/components/sonner" },
      { "@type": "WebPage", name: "Alert Dialog", url: "https://komoui.site/docs/components/alert-dialog" },
    ],
    publisher: {
      "@type": "Organization",
      name: "KomoUI",
      url: "https://komoui.site",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://komoui.site/" },
      { "@type": "ListItem", position: 2, name: "Documentation", item: "https://komoui.site/docs" },
      { "@type": "ListItem", position: 3, name: "Components", item: "https://komoui.site/docs/components" },
    ],
  };

  return {
    meta: [
      { title: "Components - KomoUI" },
      {
        name: "description",
        content:
          "Browse all KomoUI components for Jetpack Compose. Buttons, inputs, dialogs, navigation, and more.",
      },
      { property: "og:title", content: "Components - KomoUI" },
      {
        property: "og:description",
        content:
          "Browse all KomoUI components for Jetpack Compose. Buttons, inputs, dialogs, navigation, and more.",
      },
      { property: "og:image", content: "https://komoui.site/og-image.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://komoui.site/docs/components" },
      { property: "og:site_name", content: "KomoUI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Components - KomoUI" },
      {
        name: "twitter:description",
        content:
          "Browse all KomoUI components for Jetpack Compose. Buttons, inputs, dialogs, navigation, and more.",
      },
      { name: "twitter:image", content: "https://komoui.site/og-image.webp" },
      { "script:ld+json": collectionPageSchema },
      { "script:ld+json": breadcrumbSchema },
    ],
    links: [{ rel: "canonical", href: "https://komoui.site/docs/components" }],
  };
}