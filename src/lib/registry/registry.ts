const categories = ["coding", "summarization", "research"] as const;
export type Category = (typeof categories)[number];

export type SupportedCategoryMap<T> = Record<Category, T>;

export interface ModelCost {
  input: number;
  output: number;
}

export interface ModelLimit {
  context: number;
  output: number;
}

export interface ModelModalities {
  input: string[];
  output: string[];
}

export interface RegistryModel {
  id: string;
  modelId: string;
  provider: string;
  name: string;
  description?: string;
  fallbackProviders: string[];
  knowledge?: string;
  releaseDate?: string;
  lastUpdated?: string;
  modalities?: ModelModalities;
  attachment?: boolean;
  reasoning?: boolean;
  toolCall?: boolean;
  structuredOutput?: boolean;
  temperatureControl?: boolean;
  openWeights?: boolean;
  cost?: ModelCost;
  limit?: ModelLimit;
  notes?: string;
}

export interface CategorySelection {
  primary: RegistryModel;
  fallbacks: RegistryModel[];
}

export type SnapshotRegistry = Record<Category, CategorySelection>;
export type SnapshotRegistryMap = Record<string, SnapshotRegistry>;

class SnapshotNotFoundError extends Error {
  constructor(public snapshot: string) {
    super(`Snapshot '${snapshot}' was not found.`);
    this.name = "SnapshotNotFoundError";
  }
}

class CategoryNotFoundError extends Error {
  constructor(public category: string) {
    super(`Category '${category}' is not supported.`);
    this.name = "CategoryNotFoundError";
  }
}

const registrySnapshots: SnapshotRegistryMap = {
  "2026-01-15": {
    coding: {
      primary: {
        id: "anthropic/claude-opus-4-5",
        modelId: "claude-opus-4-5",
        provider: "anthropic",
        name: "Claude Opus 4.5",
        fallbackProviders: ["aws", "google"],
        knowledge: "2025-11",
        releaseDate: "2025-11-24",
        lastUpdated: "2026-01-10",
        reasoning: true,
        toolCall: true,
        structuredOutput: true,
        attachment: true,
        modalities: { input: ["text", "image"], output: ["text"] },
        cost: { input: 15.0, output: 75.0 },
        limit: { context: 200000, output: 32000 },
        notes:
          "Anthropic's most advanced model. Excels at complex coding, long-running agents, and deep reasoning tasks.",
      },
      fallbacks: [
        {
          id: "openai/gpt-5.2-codex",
          modelId: "gpt-5.2-codex",
          provider: "openai",
          name: "GPT-5.2 Codex",
          fallbackProviders: ["azure"],
          knowledge: "2025-12",
          releaseDate: "2025-12-18",
          reasoning: true,
          toolCall: true,
          structuredOutput: true,
          modalities: { input: ["text", "image"], output: ["text"] },
          cost: { input: 1.75, output: 14.0 },
          limit: { context: 256000, output: 16384 },
          notes:
            "Optimized for agentic coding. Best for large refactors, migrations, and security audits.",
        },
        {
          id: "minimax/m2.1",
          modelId: "m2.1",
          provider: "minimax",
          name: "MiniMax M2.1",
          fallbackProviders: [],
          knowledge: "2025-12",
          releaseDate: "2025-12-20",
          reasoning: true,
          toolCall: true,
          openWeights: true,
          modalities: { input: ["text"], output: ["text"] },
          cost: { input: 0.5, output: 2.0 },
          limit: { context: 128000, output: 8192 },
          notes:
            "Open-source coding model with strong performance. Great budget fallback option.",
        },
      ],
    },
    summarization: {
      primary: {
        id: "google/gemini-2.0-flash",
        modelId: "gemini-2.0-flash",
        provider: "google",
        name: "Gemini 2 Flash",
        fallbackProviders: [],
        knowledge: "2025-12",
        releaseDate: "2025-02-01",
        modalities: { input: ["text", "image", "audio"], output: ["text"] },
        structuredOutput: true,
        attachment: true,
        cost: { input: 0.4, output: 1.6 },
        limit: { context: 1200000, output: 3072 },
        notes:
          "Massive context window for summarizing entire codebases or legal docs.",
      },
      fallbacks: [
        {
          id: "anthropic/claude-haiku-4-5",
          modelId: "claude-haiku-4-5",
          provider: "anthropic",
          name: "Claude Haiku 4.5",
          fallbackProviders: ["aws", "google"],
          knowledge: "2025-11",
          releaseDate: "2025-11-24",
          limit: { context: 200000, output: 4096 },
          cost: { input: 0.8, output: 4.0 },
          structuredOutput: true,
          notes:
            "Fast and affordable summaries with excellent tone preservation.",
        },
        {
          id: "openai/gpt-4.1-mini",
          modelId: "gpt-4.1-mini",
          provider: "openai",
          name: "GPT-4.1 Mini",
          fallbackProviders: ["azure"],
          knowledge: "2024-06",
          releaseDate: "2024-10-15",
          modalities: { input: ["text"], output: ["text"] },
          structuredOutput: true,
          limit: { context: 128000, output: 4096 },
          cost: { input: 1.0, output: 5.0 },
          notes: "Reliable fallback for bullet-style executive briefs.",
        },
      ],
    },
    research: {
      primary: {
        id: "perplexity/sonar-reasoning-pro",
        modelId: "sonar-reasoning-pro",
        provider: "perplexity",
        name: "Perplexity Sonar Pro",
        fallbackProviders: [],
        knowledge: "live",
        releaseDate: "2025-01-30",
        reasoning: true,
        toolCall: true,
        structuredOutput: true,
        modalities: { input: ["text"], output: ["text"] },
        limit: { context: 64000, output: 4096 },
        notes:
          "Real-time web search with inline citations. Best for current research.",
      },
      fallbacks: [
        {
          id: "openai/gpt-5.2",
          modelId: "gpt-5.2",
          provider: "openai",
          name: "GPT-5.2",
          fallbackProviders: ["azure"],
          knowledge: "2025-12",
          releaseDate: "2025-12-01",
          reasoning: true,
          toolCall: true,
          structuredOutput: true,
          limit: { context: 256000, output: 16384 },
          cost: { input: 2.5, output: 10.0 },
          notes:
            "Strong reasoning for deep research requiring structured outputs.",
        },
        {
          id: "openai/o3-deep-research",
          modelId: "o3-deep-research",
          provider: "openai",
          name: "OpenAI o3 Deep Research",
          fallbackProviders: ["azure"],
          knowledge: "2025-06",
          releaseDate: "2025-06-15",
          reasoning: true,
          toolCall: true,
          structuredOutput: true,
          limit: { context: 200000, output: 8192 },
          notes: "High recall across academic and policy documents.",
        },
      ],
    },
  },
};

const snapshotDates = Object.keys(registrySnapshots).sort((a, b) =>
  a.localeCompare(b),
);

const supportedVersions = ["v1"] as const;

export function getSnapshotDates(): string[] {
  return [...snapshotDates].sort((a, b) => b.localeCompare(a));
}

export function getSupportedCategories(): Category[] {
  return [...categories];
}

export function getSupportedVersions(): string[] {
  return [...supportedVersions];
}

export function getLatestSnapshotDate(): string {
  return snapshotDates[snapshotDates.length - 1];
}

function assertCategory(value: string): asserts value is Category {
  if (!categories.includes(value as Category)) {
    throw new CategoryNotFoundError(value);
  }
}

export function resolveSnapshot(date: string): {
  date: string;
  data: SnapshotRegistry;
} {
  if (date === "latest") {
    const latestDate = getLatestSnapshotDate();
    return { date: latestDate, data: registrySnapshots[latestDate] };
  }

  const snapshot = registrySnapshots[date];
  if (!snapshot) {
    throw new SnapshotNotFoundError(date);
  }

  return { date, data: snapshot };
}

export function getCategorySelection(date: string, category: string) {
  assertCategory(category);
  const { data, date: resolvedDate } = resolveSnapshot(date);
  const entry = data[category];

  if (!entry) {
    throw new CategoryNotFoundError(category);
  }

  return { date: resolvedDate, category: category as Category, ...entry };
}

export function getSnapshotMap(): SnapshotRegistryMap {
  return registrySnapshots;
}

export { SnapshotNotFoundError, CategoryNotFoundError };
