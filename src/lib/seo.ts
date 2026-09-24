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
        // /docs itself 301s to /docs/introduction
        item: index === 0 && segment === "docs"
          ? "https://komoui.site/docs/introduction"
          : `https://komoui.site/${segments.slice(0, index + 1).join("/")}`,
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

export function componentsIndexMeta(
  components: { name: string; url: string }[]
) {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Components - KomoUI",
    description:
      "Browse all KomoUI components for Jetpack Compose. Buttons, inputs, dialogs, navigation, and more.",
    url: "https://komoui.site/docs/components",
    hasPart: components.map(({ name, url }) => ({
      "@type": "WebPage",
      name,
      url: `https://komoui.site${url}`,
    })),
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
      { "@type": "ListItem", position: 2, name: "Documentation", item: "https://komoui.site/docs/introduction" },
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