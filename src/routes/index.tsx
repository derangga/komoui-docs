import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Hero } from "@/components/home/hero";
import { Examples } from "@/components/home/examples";
import { homeMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => homeMeta(),
  component: HomePage,
});

function HomePage() {
  const examplesRef = useRef<HTMLElement>(null);

  function scrollToExamples() {
    examplesRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        { text: "Documentation", url: "/docs/installation" },
        { text: "Components", url: "/docs/components" },
      ]}
    >
      <main className="container mx-auto overflow-hidden">
        <Hero onScrollTo={scrollToExamples} />
        <Examples ref={examplesRef} />
      </main>
    </HomeLayout>
  );
}
