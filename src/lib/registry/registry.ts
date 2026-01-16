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
        fallbackProviders: ["openai", "minimax"],
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
          fallbackProviders: ["anthropic"],
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
        fallbackProviders: ["anthropic", "openai"],
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
          fallbackProviders: ["openai"],
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
          fallbackProviders: [],
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
        fallbackProviders: ["openai", "anthropic"],
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
          fallbackProviders: ["anthropic"],
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
          fallbackProviders: [],
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
  "2024-12-15": {
    coding: {
      primary: {
        id: "anthropic/claude-3-5-sonnet-20241022",
        modelId: "claude-3-5-sonnet-20241022",
        provider: "anthropic",
        name: "Claude 3.5 Sonnet (2024-10)",
        fallbackProviders: ["openai", "mistral"],
        knowledge: "2024-10",
        releaseDate: "2024-12-01",
        lastUpdated: "2024-12-10",
        modalities: { input: ["text", "image"], output: ["text"] },
        reasoning: true,
        toolCall: true,
        structuredOutput: true,
        temperatureControl: true,
        attachment: true,
        cost: { input: 3.0, output: 15.0 },
        limit: { context: 200000, output: 4096 },
        notes:
          "Best balance of latency + reasoning for repo-sized coding tasks.",
      },
      fallbacks: [
        {
          id: "openai/gpt-4.1-mini",
          modelId: "gpt-4.1-mini",
          provider: "openai",
          name: "GPT-4.1 Mini",
          fallbackProviders: ["google"],
          knowledge: "2024-06",
          releaseDate: "2024-10-15",
          modalities: { input: ["text", "image"], output: ["text"] },
          structuredOutput: true,
          toolCall: true,
          cost: { input: 1.0, output: 5.0 },
          limit: { context: 128000, output: 4096 },
          notes: "Keeps latency low for iterative coding reviews.",
        },
        {
          id: "mistral/mistral-large-2512",
          modelId: "mistral-large-2512",
          provider: "mistral",
          name: "Mistral Large 2512",
          fallbackProviders: [],
          knowledge: "2024-12",
          releaseDate: "2024-12-12",
          modalities: { input: ["text"], output: ["text"] },
          reasoning: true,
          toolCall: false,
          openWeights: false,
          cost: { input: 0.8, output: 3.2 },
          limit: { context: 64000, output: 2048 },
          notes: "Solid deterministic backup when US-based APIs degrade.",
        },
      ],
    },
    summarization: {
      primary: {
        id: "google/gemini-1.5-pro",
        modelId: "gemini-1.5-pro",
        provider: "google",
        name: "Gemini 1.5 Pro",
        fallbackProviders: ["anthropic", "openai"],
        knowledge: "2024-08",
        releaseDate: "2024-09-12",
        modalities: { input: ["text", "audio"], output: ["text"] },
        structuredOutput: true,
        attachment: true,
        cost: { input: 0.7, output: 2.8 },
        limit: { context: 1000000, output: 2048 },
        notes: "Handles very long docs without devolving into bullet spam.",
      },
      fallbacks: [
        {
          id: "anthropic/claude-3-5-haiku-latest",
          modelId: "claude-3-5-haiku-latest",
          provider: "anthropic",
          name: "Claude 3.5 Haiku",
          fallbackProviders: ["openai"],
          knowledge: "2024-10",
          releaseDate: "2024-11-05",
          modalities: { input: ["text"], output: ["text"] },
          cost: { input: 0.2, output: 1.0 },
          limit: { context: 120000, output: 2048 },
          notes: "Great abstractive summaries under 1 second.",
        },
        {
          id: "openai/o-mini-high",
          modelId: "o-mini-high",
          provider: "openai",
          name: "o1-mini high context",
          fallbackProviders: [],
          knowledge: "2024-06",
          releaseDate: "2024-08-01",
          modalities: { input: ["text"], output: ["text"] },
          limit: { context: 60000, output: 2048 },
          cost: { input: 0.6, output: 2.4 },
          notes: "Use when Anthropic quota is capped.",
        },
      ],
    },
    research: {
      primary: {
        id: "openai/gpt-4.1",
        modelId: "gpt-4.1",
        provider: "openai",
        name: "GPT-4.1",
        fallbackProviders: ["anthropic", "perplexity"],
        knowledge: "2024-12",
        releaseDate: "2024-11-20",
        reasoning: true,
        toolCall: true,
        structuredOutput: true,
        cost: { input: 5.0, output: 15.0 },
        limit: { context: 128000, output: 8192 },
        notes: "Best mix of browse + structured citations.",
      },
      fallbacks: [
        {
          id: "openai/o3-deep-research",
          modelId: "o3-deep-research",
          provider: "openai",
          name: "OpenAI o3 Deep Research",
          fallbackProviders: ["perplexity"],
          knowledge: "2024-12",
          releaseDate: "2024-12-05",
          reasoning: true,
          toolCall: true,
          structuredOutput: true,
          modalities: { input: ["text"], output: ["text"] },
          limit: { context: 200000, output: 8192 },
          notes: "Adds inline references, slower than GPT-4.1.",
        },
        {
          id: "perplexity/sonar-reasoning",
          modelId: "sonar-reasoning",
          provider: "perplexity",
          name: "Perplexity Sonar",
          fallbackProviders: [],
          knowledge: "live",
          releaseDate: "2024-07-15",
          reasoning: true,
          toolCall: false,
          structuredOutput: false,
          modalities: { input: ["text"], output: ["text"] },
          limit: { context: 32000, output: 2048 },
          notes: "Great for quick read-mes and trending topics.",
        },
      ],
    },
  },
  "2025-02-10": {
    coding: {
      primary: {
        id: "anthropic/claude-sonnet-4-5",
        modelId: "claude-sonnet-4-5",
        provider: "anthropic",
        name: "Claude 4.5 Sonnet",
        fallbackProviders: ["deepseek", "openai"],
        knowledge: "2025-01",
        releaseDate: "2025-02-10",
        lastUpdated: "2025-02-12",
        reasoning: true,
        toolCall: true,
        structuredOutput: true,
        attachment: true,
        modalities: { input: ["text", "image"], output: ["text"] },
        cost: { input: 2.8, output: 14.0 },
        limit: { context: 220000, output: 4096 },
        notes:
          "Handles repo rewrites + sandbox planning w/ minimal hallucinations.",
      },
      fallbacks: [
        {
          id: "deepseek/deepseek-reasoner",
          modelId: "deepseek-reasoner",
          provider: "deepseek",
          name: "DeepSeek Reasoner",
          fallbackProviders: ["openai"],
          knowledge: "2025-01",
          releaseDate: "2025-01-25",
          reasoning: true,
          toolCall: true,
          openWeights: false,
          modalities: { input: ["text"], output: ["text"] },
          cost: { input: 0.4, output: 1.6 },
          limit: { context: 130000, output: 4096 },
          notes: "Best budget pick for traceable coding plans.",
        },
        {
          id: "openai/o1",
          modelId: "o1",
          provider: "openai",
          name: "OpenAI o1",
          fallbackProviders: [],
          knowledge: "2024-12",
          releaseDate: "2025-01-05",
          reasoning: true,
          toolCall: true,
          structuredOutput: true,
          modalities: { input: ["text"], output: ["text"] },
          cost: { input: 4.5, output: 18.0 },
          limit: { context: 100000, output: 4096 },
          notes: "Use when you need chain-of-thought debugging transcripts.",
        },
      ],
    },
    summarization: {
      primary: {
        id: "google/gemini-2.0-flash",
        modelId: "gemini-2.0-flash",
        provider: "google",
        name: "Gemini 2 Flash",
        fallbackProviders: ["anthropic", "openai"],
        knowledge: "2025-01",
        releaseDate: "2025-02-01",
        modalities: { input: ["text", "image", "audio"], output: ["text"] },
        structuredOutput: true,
        attachment: true,
        cost: { input: 0.4, output: 1.6 },
        limit: { context: 1200000, output: 3072 },
        notes: "New memory window keeps legal docs intact in single pass.",
      },
      fallbacks: [
        {
          id: "anthropic/claude-haiku-4-5",
          modelId: "claude-haiku-4-5",
          provider: "anthropic",
          name: "Claude Haiku 4",
          fallbackProviders: ["openai"],
          knowledge: "2025-01",
          releaseDate: "2025-02-07",
          limit: { context: 180000, output: 3072 },
          cost: { input: 0.25, output: 1.0 },
          structuredOutput: true,
          notes: "Keeps tone + POV when summarizing long-form interviews.",
        },
        {
          id: "openai/gpt-4.1-mini",
          modelId: "gpt-4.1-mini",
          provider: "openai",
          name: "GPT-4.1 Mini",
          fallbackProviders: [],
          knowledge: "2024-06",
          releaseDate: "2024-10-15",
          modalities: { input: ["text"], output: ["text"] },
          structuredOutput: true,
          limit: { context: 128000, output: 4096 },
          cost: { input: 1.0, output: 5.0 },
          notes: "Still best-in-class for bullet-style executive briefs.",
        },
      ],
    },
    research: {
      primary: {
        id: "perplexity/sonar-reasoning-pro",
        modelId: "sonar-reasoning-pro",
        provider: "perplexity",
        name: "Perplexity Sonar Pro",
        fallbackProviders: ["openai", "anthropic"],
        knowledge: "live",
        releaseDate: "2025-01-30",
        reasoning: true,
        toolCall: true,
        structuredOutput: true,
        modalities: { input: ["text"], output: ["text"] },
        limit: { context: 64000, output: 4096 },
        notes: "Fastest browse stack with inline sources + quotes.",
      },
      fallbacks: [
        {
          id: "openai/gpt-4.1",
          modelId: "gpt-4.1",
          provider: "openai",
          name: "GPT-4.1",
          fallbackProviders: ["anthropic"],
          knowledge: "2024-12",
          releaseDate: "2024-11-20",
          reasoning: true,
          toolCall: true,
          limit: { context: 128000, output: 8192 },
          cost: { input: 5.0, output: 15.0 },
          notes: "Use when research needs structured JSON outputs.",
        },
        {
          id: "openai/o3-deep-research",
          modelId: "o3-deep-research",
          provider: "openai",
          name: "OpenAI o3 Deep Research",
          fallbackProviders: [],
          knowledge: "2024-12",
          releaseDate: "2024-12-05",
          reasoning: true,
          toolCall: true,
          structuredOutput: true,
          limit: { context: 200000, output: 8192 },
          notes: "High recall across policy + academic PDFs.",
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
