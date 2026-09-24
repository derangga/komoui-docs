import { SquarePen } from "lucide-react";

interface EditThisPageProps {
  source: string;
}

export function EditThisPage({ source }: EditThisPageProps) {
  return (
    <a
      href={source}
      target="_blank"
      rel="noopener noreferrer"
      className="self-start inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 underline mt-8"
    >
      <SquarePen className="size-4" />
      Edit this page on GitHub
    </a>
  );
}
