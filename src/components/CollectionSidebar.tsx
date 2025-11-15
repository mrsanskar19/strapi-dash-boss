import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Folder, Loader2, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { DataNotFound } from "@/components/DataNotFound";

interface CollectionItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export function CollectionSidebar({
  collections,
  className,
  onCollectionSelect,
}: {
  collections: CollectionItem[] | null | undefined;
  className?: string;
  onCollectionSelect?: (collectionSlug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [docsLoading, setDocsLoading] = useState(false);

  // Strapi-like: fixed width
  const SIDEBAR_WIDTH = 280;

  useEffect(() => {
    // If collections contains current selection slug, keep selection; otherwise clear
    if (!collections) {
      setSelected(null);
    } else if (selected && !collections.find((c) => c.slug === selected)) {
      setSelected(null);
    }
  }, [collections, selected]);

  const filtered = (collections ?? []).filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  function selectCollection(slug: string) {
    setSelected(slug);
    setDocsLoading(true);
    // call parent handler (parent will be responsible for loading docs into the table)
    try {
      onCollectionSelect?.(slug);
    } finally {
      // small UX: show loader for at least 200ms so click feedback is visible
      setTimeout(() => setDocsLoading(false), 200);
    }
  }

  // Layout: a fixed left column like Strapi
  return (
    <aside
      className={cn(
        "bg-white border-r border-slate-200 flex flex-col",
        className
      )}
      style={{ width: SIDEBAR_WIDTH }}
      aria-label="Collections sidebar"
    >
      {/* Header (sticky) */}
      <div className="px-4 py-3 border-b flex items-center gap-3 h-14 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-700 font-semibold">
            DB
          </div>
          <div className="flex flex-col leading-4">
            <span className="text-sm font-semibold">Database</span>
            <span className="text-xs text-muted-foreground">Collections</span>
          </div>
        </div>
      </div>

      {/* Search + actions (sticky below header) */}
      <div className="px-4 py-3 border-b flex items-center gap-2 flex-shrink-0">
        <Input
          placeholder="Filter collections..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setQuery("");
          }}
          title="Clear"
        >
          Clear
        </Button>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 min-h-0">
        {collections ? (
          <ScrollArea className="h-full">
            <div className="py-2">
              {collections.length === 0 && (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No collections
                </div>
              )}

              {filtered.map((collection) => {
                const active = selected === collection.slug;
                return (
                  <button
                    key={collection.slug}
                    onClick={() => selectCollection(collection.slug)}
                    className={cn(
                      "w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-slate-50",
                      active ? "bg-slate-100" : "bg-transparent"
                    )}
                    aria-current={active ? "true" : undefined}
                  >
                    <div className="w-7 h-7 flex items-center justify-center rounded bg-slate-100 text-slate-700">
                      <Folder className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {collection.name}
                      </div>
                      {collection.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {collection.description}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground ml-2">
                      {/* optional: show small badge or count if you have it */}
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <DataNotFound />
          </div>
        )}
      </div>

      {/* Footer (sticky) */}
      <div className="px-4 py-3 border-t flex items-center justify-between flex-shrink-0 h-14">
        <div className="text-sm text-muted-foreground">
          {selected ? (
            <div>
              <div className="text-xs">Selected</div>
              <div className="text-sm truncate">{selected}</div>
            </div>
          ) : (
            <div className="text-sm">No collection selected</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              // quick create collection UX (parent can override)
              const name = prompt("New collection slug (unique)");
              if (!name) return;
              onCollectionSelect?.(name);
              setSelected(name);
            }}
            title="Create collection"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
