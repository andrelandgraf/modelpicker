"use client";

import { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModelCell } from "@/components/registry/model-cell";
import {
  Category,
  getSnapshotDates,
  getSupportedCategories,
  resolveSnapshot,
} from "@/lib/registry/registry";

export function RegistryTable() {
  const categories = useMemo(() => getSupportedCategories(), []);
  const snapshots = useMemo(() => getSnapshotDates(), []);

  const [selectedSnapshot, setSelectedSnapshot] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );

  const { data: registry, date: resolvedDate } = useMemo(() => {
    return resolveSnapshot(selectedSnapshot);
  }, [selectedSnapshot]);

  const filteredCategories = useMemo(() => {
    if (selectedCategory === "all") {
      return categories;
    }
    return categories.filter((cat) => cat === selectedCategory);
  }, [categories, selectedCategory]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              selectedCategory === category
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Showing picks from</span>
        <Select value={selectedSnapshot} onValueChange={setSelectedSnapshot}>
          <SelectTrigger className="h-8 w-auto gap-1 border-none bg-transparent p-0 font-medium text-foreground shadow-none hover:bg-muted/50">
            <SelectValue>
              {selectedSnapshot === "latest"
                ? `latest (${resolvedDate})`
                : selectedSnapshot}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">latest</SelectItem>
            {snapshots.map((snapshot) => (
              <SelectItem key={snapshot} value={snapshot}>
                {snapshot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        {filteredCategories.map((category) => {
          const selection = registry[category];
          const allModels = [
            { model: selection.primary, role: "primary" as const, index: 0 },
            ...selection.fallbacks.map((model, i) => ({
              model,
              role: "fallback" as const,
              index: i + 1,
            })),
          ];

          return (
            <div key={category}>
              <h3 className="mb-4 text-lg font-semibold capitalize">
                {category}
              </h3>
              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {allModels.map(({ model, role, index }) => (
                  <div key={model.id} className="relative flex flex-col">
                    {role === "primary" && (
                      <span className="absolute -top-2 left-3 z-10 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase text-background">
                        Primary
                      </span>
                    )}
                    {role === "fallback" && (
                      <span className="absolute -top-2 left-3 z-10 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                        Fallback {index}
                      </span>
                    )}
                    <ModelCell model={model} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
