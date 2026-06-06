import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface PreviewProps {
  name: string;
  variant: string;
  assetExtension?: ".webp" | ".gif";
  align?: "center" | "start" | "end";
}

type Status = "Loading" | "Loaded" | "Error";
const SITE = "https://img.komoui.site";

export function Preview({
  name,
  variant,
  assetExtension = ".webp",
  align = "center",
}: PreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [loadStatus, setLoadStatus] = useState<Status>("Loading");

  const imagePath = `${SITE}/assets/components/${name}/${variant}${assetExtension}`;
  const imageAlt = `${name}-${variant}`;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative flex min-h-[350px] w-full justify-center p-10 border rounded-md my-[6.5px]",
        align === "center" && "items-center",
        align === "start" && "items-start",
        align === "end" && "items-end"
      )}
    >
      {loadStatus === "Loading" && (
        <Skeleton className="absolute size-72" />
      )}
      {isInView && (
        <img
          src={imagePath}
          alt={imageAlt}
          className="w-72"
          loading="lazy"
          onLoad={() => setLoadStatus("Loaded")}
          onError={() => setLoadStatus("Error")}
        />
      )}
    </div>
  );
}
