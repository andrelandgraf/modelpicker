"use client";

import { useMemo, useState } from "react";

import {
  Category,
  getSnapshotDates,
  getSupportedCategories,
  getLatestSnapshotDate,
  resolveSnapshot,
  CategorySelection,
} from "@/lib/registry/registry";

export function useRegistryState() {
  const categories = useMemo(() => getSupportedCategories(), []);
  const snapshots = useMemo(() => getSnapshotDates(), []);
  const latest = useMemo(() => getLatestSnapshotDate(), []);

  const [selectedDate, setSelectedDate] = useState<string>("latest");
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0],
  );

  const { data: resolvedSnapshot, date: resolvedDate } = useMemo(() => {
    return resolveSnapshot(selectedDate);
  }, [selectedDate]);

  const selection = useMemo((): CategorySelection => {
    return resolvedSnapshot[selectedCategory];
  }, [resolvedSnapshot, selectedCategory]);

  return {
    categories,
    snapshots,
    latest,
    resolvedDate,
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
    selection,
    resolvedSnapshot,
  };
}

export type RegistryState = ReturnType<typeof useRegistryState>;
