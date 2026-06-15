import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/home/header";
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
    <>
      <Header />
      <div className="container mx-auto overflow-hidden">
        <Hero onScrollTo={scrollToExamples} />
        <Examples ref={examplesRef} />
      </div>
    </>
  );
}
