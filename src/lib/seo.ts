export function docsMeta(title: string, description: string, url?: string) {
  return [
    { title: `${title} - KomoUI` },
    { name: "description", content: description },
    { property: "og:title", content: `KomoUI Component: ${title}` },
    { property: "og:description", content: description },
    { property: "og:image", content: "https://komoui.site/og-image.webp" },
    { property: "og:type", content: "website" },
    ...(url ? [{ property: "og:url", content: `https://komoui.site${url}` }] : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `KomoUI Component: ${title}` },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "https://komoui.site/og-image.webp" },
  ];
}
