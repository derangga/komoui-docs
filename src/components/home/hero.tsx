import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  onScrollTo: () => void;
}

export function Hero({ onScrollTo }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8">
          <span className="text-foreground">Build beautiful</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            components faster
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
          KomoUI brings a modern, beautifully designed component library to
          Jetpack Compose and Kotlin Multiplatform. Accessible, customizable,
          and open source.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg">
            <Link to="/docs/installation">Get Started</Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link to="/docs/components">View Components</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="animate-bounce"
          onClick={onScrollTo}
        >
          <ChevronDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </section>
  );
}
