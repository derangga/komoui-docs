import { Github } from "@/components/icons";
import { ButtonTheme } from "@/components/button-theme";
import { useTheme } from "@/hooks/use-theme";

export function NavFooter() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex text-fd-muted-foreground items-center justify-between border-t px-4 py-3">
      <a
        href="https://github.com/derangga/komoui"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground w-8 h-8"
      >
        <Github className="w-6 h-6" />
      </a>
      <ButtonTheme isDark={isDark} onClick={toggleTheme} />
    </div>
  );
}
