import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "@tanstack/react-router";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface UseTableOfContentsOptions {
  contentSelector?: string;
  headingSelector?: string;
  scrollContainerSelector?: string;
  offsetTop?: number;
  visibilityBuffer?: number;
}

function generateIdFromText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function useTableOfContents(options: UseTableOfContentsOptions = {}) {
  const {
    contentSelector = ".prose",
    headingSelector = "h2, h3",
    scrollContainerSelector = ".overflow-y-auto",
    offsetTop = 100,
    visibilityBuffer = 0,
  } = options;

  const location = useLocation();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState("");
  const [visibleHeadings, setVisibleHeadings] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const headingElementsRef = useRef<Map<string, HTMLElement> | null>(null);
  if (headingElementsRef.current === null) {
    headingElementsRef.current = new Map();
  }

  const extractHeadings = useCallback(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    const headingElements = contentElement.querySelectorAll(
      headingSelector
    ) as NodeListOf<HTMLElement>;

    const elementMap = new Map<string, HTMLElement>();
    const extracted = Array.from(headingElements).map((element) => {
      if (!element.id) {
        element.id = generateIdFromText(element.textContent || "");
      }
      elementMap.set(element.id, element);
      return {
        id: element.id,
        text: element.textContent?.trim() || "",
        level: parseInt(element.tagName.substring(1)),
      };
    });

    headingElementsRef.current = elementMap;
    setHeadings(extracted);
  }, [contentSelector, headingSelector]);

  const updateActiveHeading = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    const headingElements = headingElementsRef.current;
    if (!scrollContainer || !headingElements || headingElements.size === 0)
      return;

    const scrollTop = scrollContainer.scrollTop;
    const containerHeight = scrollContainer.clientHeight;
    const viewportTop = scrollTop - visibilityBuffer;
    const viewportBottom = scrollTop + containerHeight + visibilityBuffer;

    const currentVisible: string[] = [];
    let primaryActive = "";

    headingElements.forEach((element, id) => {
      const elementTop = element.offsetTop;
      const elementHeight = Math.max(element.offsetHeight || 32, 32);
      const elementBottom = elementTop + elementHeight;

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        currentVisible.push(id);
      }
    });

    if (currentVisible.length > 0) {
      primaryActive = currentVisible[0];
    } else {
      const entries = Array.from(headingElements.entries());
      for (let i = entries.length - 1; i >= 0; i--) {
        const [id, element] = entries[i];
        if (element.offsetTop <= scrollTop + offsetTop) {
          primaryActive = id;
          break;
        }
      }
    }

    if (scrollTop <= offsetTop && headingElements.size > 0) {
      const firstId = headingElements.keys().next().value;
      if (firstId && !currentVisible.includes(firstId)) {
        currentVisible.unshift(firstId);
      }
      if (firstId) primaryActive = firstId;
    }

    setVisibleHeadings(currentVisible);
    setActiveHeading(primaryActive);
  }, [offsetTop, visibilityBuffer]);

  const scrollToHeading = useCallback(
    (headingId: string, event?: React.MouseEvent) => {
      if (event) event.preventDefault();

      const element = document.getElementById(headingId);
      const container =
        scrollContainerRef.current || document.documentElement;

      if (element && container) {
        const elementTop = element.offsetTop - offsetTop;
        container.scrollTo({ top: elementTop, behavior: "smooth" });
        history.pushState(null, "", `#${headingId}`);
      }
    },
    [offsetTop]
  );

  useEffect(() => {
    // Reset immediately so the previous page's headings never linger.
    setHeadings([]);
    setActiveHeading("");
    setVisibleHeadings([]);
    headingElementsRef.current = new Map();

    scrollContainerRef.current = document.querySelector(scrollContainerSelector);
    const container = scrollContainerRef.current;

    let lastExecTime = 0;
    let timeoutId: number | null = null;
    let observer: MutationObserver | null = null;

    const throttledUpdate = () => {
      const now = Date.now();
      if (now - lastExecTime > 100) {
        updateActiveHeading();
        lastExecTime = now;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          updateActiveHeading();
          lastExecTime = Date.now();
        }, 100 - (now - lastExecTime));
      }
    };

    if (container) {
      container.addEventListener("scroll", throttledUpdate, { passive: true });
    }

    // Use a MutationObserver so extraction fires on actual DOM changes rather
    // than a fixed timer guess. This handles slow renders and code-split MDX.
    const contentElement = document.querySelector(contentSelector);
    const observeTarget = contentElement ?? document.body;

    observer = new MutationObserver(() => {
      extractHeadings();
      updateActiveHeading();
    });

    observer.observe(observeTarget, { childList: true, subtree: true });

    // Also run immediately in case the content is already in the DOM.
    extractHeadings();
    updateActiveHeading();

    return () => {
      observer?.disconnect();
      if (container) {
        container.removeEventListener("scroll", throttledUpdate);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [
    location.pathname,
    contentSelector,
    extractHeadings,
    updateActiveHeading,
    scrollContainerSelector,
  ]);

  return { headings, activeHeading, visibleHeadings, scrollToHeading };
}
