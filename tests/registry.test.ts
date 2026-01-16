import { describe, expect, it } from "bun:test";
import fetch from "cross-fetch";

import {
  getSnapshotDates,
  getSupportedCategories,
  getSupportedVersions,
  getCategorySelection,
  getSnapshotMap,
  RegistryModel,
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
  minimax: "minimax",
};

const modelAliases: Record<string, string | undefined> = {
  // 2026-01-15 snapshot models
  "anthropic/claude-opus-4-5": "anthropic/claude-sonnet-4-5",
  "openai/gpt-5.2-codex": "openai/gpt-4.1",
  "openai/gpt-5.2": "openai/gpt-4.1",
  "minimax/m2.1": "minimax/MiniMax-M2.1",
};

// Maps our fallbackProviders values to models.dev provider IDs
const fallbackProviderMapping: Record<string, string[]> = {
  aws: ["amazon-bedrock"],
  google: ["google-vertex-anthropic", "google-vertex"],
  azure: ["azure"],
};

// Extracts the base model name for fuzzy matching across providers
function extractBaseModelName(modelId: string): string {
  return modelId
    .replace(/-\d{8}.*$/, "") // Remove date suffixes like -20251101-v1:0
    .replace(/@\d+$/, "") // Remove @version suffixes
    .replace(/^anthropic\./, "") // Remove provider prefixes
    .replace(/:\d+$/, "") // Remove version suffixes like :0
    .replace(/-v\d+$/, "") // Remove version suffixes like -v1
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ""); // Normalize to alphanumeric
}

// Checks if a model exists under a given provider in models.dev
function modelExistsAtProvider(
  modelsDev: Awaited<ReturnType<typeof fetchModelsDev>>,
  providerIds: string[],
  model: RegistryModel,
): { found: boolean; provider?: string; matchedModel?: string } {
  const baseModelName = extractBaseModelName(model.modelId);

  for (const providerId of providerIds) {
    const providerEntry = modelsDev[providerId];
    if (!providerEntry) continue;

    for (const upstreamModelId of Object.keys(providerEntry.models)) {
      const upstreamBaseName = extractBaseModelName(upstreamModelId);
      if (
        upstreamBaseName.includes(baseModelName) ||
        baseModelName.includes(upstreamBaseName)
      ) {
        return {
          found: true,
          provider: providerId,
          matchedModel: upstreamModelId,
        };
      }
    }
  }
  return { found: false };
}

describe("registry structure", () => {
  it("exposes supported metadata", () => {
    expect(getSupportedCategories()).toEqual([
      "coding",
      "summarization",
      "research",
    ]);
    expect(getSupportedVersions()).toEqual(["v1"]);
    expect(getSnapshotDates()).toEqual(["2026-01-15"]);
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

  it("ensures fallbackProviders actually host the model", async () => {
    const modelsDev = await fetchModelsDev();
    const snapshotMap = getSnapshotMap();

    for (const [snapshotDate, snapshot] of Object.entries(snapshotMap)) {
      for (const [category, entry] of Object.entries(snapshot)) {
        const models = [entry.primary, ...entry.fallbacks];
        for (const model of models) {
          for (const fallbackProvider of model.fallbackProviders) {
            const providerIds = fallbackProviderMapping[fallbackProvider];
            if (!providerIds) {
              throw new Error(
                `Unknown fallbackProvider '${fallbackProvider}' for ${model.id} in ${snapshotDate}/${category}`,
              );
            }

            const result = modelExistsAtProvider(modelsDev, providerIds, model);
            if (!result.found) {
              throw new Error(
                `Model ${model.id} claims fallbackProvider '${fallbackProvider}' but model not found in ${providerIds.join(" or ")} on models.dev (snapshot: ${snapshotDate}, category: ${category})`,
              );
            }
          }
        }
      }
    }
  });
});
