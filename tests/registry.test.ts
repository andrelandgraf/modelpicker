import { describe, expect, it } from "bun:test";
import fetch from "cross-fetch";

import {
  getSnapshotDates,
  getSupportedCategories,
  getSupportedVersions,
  getCategorySelection,
  getSnapshotMap,
} from "@/lib/registry/registry";
import { fetchModelsDev } from "@/lib/registry/models-dev";

if (!globalThis.fetch) {
  globalThis.fetch = fetch as typeof globalThis.fetch;
}

const providerAliases: Record<string, string> = {
  openai: "openai",
  anthropic: "anthropic",
  google: "google",
  mistral: "mistral",
  deepseek: "deepseek",
  perplexity: "perplexity",
};

const modelAliases: Record<string, string | undefined> = {
  "anthropic/claude-sonnet-3.5": "anthropic/claude-3-5-sonnet-20241022",
  "anthropic/claude-sonnet-4.5": "anthropic/claude-sonnet-4-5",
  "anthropic/claude-haiku-3.5": "anthropic/claude-3-5-haiku-latest",
  "anthropic/claude-haiku-4": "anthropic/claude-haiku-4-5",
  "mistral/mistral-large-2": "mistral/mistral-large-2512",
  "perplexity/sonar-reasoning": "perplexity/sonar-reasoning-pro",
  "deepseek/deepseek-v3": "deepseek/deepseek-reasoner",
  "openai/o-mini-high": "openai/o1-mini",
  "anthropic/claude-research": "openai/o3-deep-research",
};

describe("registry structure", () => {
  it("exposes supported metadata", () => {
    expect(getSupportedCategories()).toEqual([
      "coding",
      "summarization",
      "research",
    ]);
    expect(getSupportedVersions()).toEqual(["v1"]);
    expect(getSnapshotDates().length).toBeGreaterThan(0);
  });

  it("resolves latest snapshots deterministically", () => {
    const dates = getSnapshotDates();
    const latest = dates[0];
    const selection = getCategorySelection(latest, "coding");
    expect(selection.date).toEqual(latest);
    expect(selection.category).toEqual("coding");
  });
});

describe("models.dev parity", () => {
  it("ensures every registry model exists upstream", async () => {
    const modelsDev = await fetchModelsDev();
    const snapshotMap = getSnapshotMap();

    for (const snapshot of Object.values(snapshotMap)) {
      for (const entry of Object.values(snapshot)) {
        const models = [entry.primary, ...entry.fallbacks];
        for (const model of models) {
          const providerKey = providerAliases[model.provider] ?? model.provider;
          const providerEntry = modelsDev[providerKey];
          expect(providerEntry).toBeTruthy();
          const aliasKey = modelAliases[`${model.provider}/${model.modelId}`];
          const modelKey = aliasKey?.split("/")[1] ?? model.modelId;
          const upstreamModel = providerEntry?.models[modelKey];
          if (!upstreamModel) {
            throw new Error(
              `Missing ${model.provider}/${model.modelId} upstream`,
            );
          }
          if (model.knowledge && upstreamModel?.knowledge) {
            expect(upstreamModel?.knowledge).toBeTruthy();
          }
          if (model.limit?.context) {
            expect(upstreamModel?.limit?.context).toBeTruthy();
          }
        }
      }
    }
  });
});
