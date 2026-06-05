import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Android } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { TableOfContents } from "@/components/table-of-contents";
import { NavGetStarted } from "@/components/nav-get-started";
import { NavComponents } from "@/components/nav-components";
import { NavFooter } from "@/components/nav-footer";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

// Close the mobile sidebar drawer whenever the route changes. Must live inside
// SidebarProvider so it can access the sidebar context.
function CloseMobileSidebarOnNavigate({ pathname }: { pathname: string }) {
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  return null;
}

function DocsLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const hideTocPaths = ["/docs/components"];
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Reset scroll to the top whenever the page changes — the scroll container
  // persists across navigation, so otherwise it keeps the previous position.
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <SidebarProvider>
      <CloseMobileSidebarOnNavigate pathname={pathname} />
      <Sidebar>
        <SidebarHeader className="px-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg border text-sidebar-primary-foreground">
                    <Android className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Documentation
                    </span>
                    <span className="truncate text-xs">
                      Compose Components
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="px-4">
          <NavGetStarted activeRoute={pathname} />
          <NavComponents activeRoute={pathname} />
        </SidebarContent>

        <SidebarFooter>
          <NavFooter />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Documentation</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="relative px-6 lg:gap-10 lg:grid lg:grid-cols-[1fr_280px]">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide overflow-y-auto h-screen px-3 sm:px-0"
          >
            <div className="prose dark:prose-invert mx-auto">
              <Outlet />
            </div>
          </div>

          <TableOfContents
            title="On This Page"
            hideOnPaths={hideTocPaths}
            maxLevel={3}
            minLevel={2}
            contentSelector=".prose"
            headingSelector="h2, h3"
            scrollContainerSelector=".overflow-y-auto"
            multipleActive
            offsetTop={100}
            containerClass="w-64 pl-4"
            className="pr-6"
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
