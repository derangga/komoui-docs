import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Android, Github } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ButtonTheme } from "@/components/button-theme";
import { useTheme } from "@/hooks/use-theme";

const routes = [
  { path: "/docs/installation", label: "Documentation" },
  { path: "/docs/components", label: "Components" },
];

export function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center font-bold text-foreground gap-2"
          >
            <Android className="size-8" />
            KomoUI
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {routes.map((route) => (
                  <NavigationMenuItem key={route.label}>
                    <NavigationMenuLink asChild>
                      <Link to={route.path}>{route.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex md:hidden items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4">
                {routes.map((route) => (
                  <Link key={route.label} to={route.path}>
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="w-fit flex flex-row h-5 items-center justify-between space-x-2 md:justify-end">
          <a
            href="https://github.com/derangga/komoui"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground w-8 h-8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4" />
          </a>
          <Separator orientation="vertical" className="my-4" />
          <ButtonTheme isDark={isDark} onClick={toggleTheme} />
        </div>
      </div>
    </header>
  );
}
