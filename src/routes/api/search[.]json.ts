import { createFileRoute } from "@tanstack/react-router";
import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

// Results are ranked by relevance, so the sort index is dead weight in the
// downloaded file (~540 KB of the raw JSON).
const server = createFromSource(source, { sort: { enabled: false } });

// Prerendered at build time; the client downloads the whole index once.
export const Route = createFileRoute("/api/search.json")({
  server: {
    handlers: {
      GET: async () => server.staticGET(),
    },
  },
});
