export interface ModelsDevResponse {
  [provider: string]: {
    id: string;
    env?: string[];
    api?: string;
    name?: string;
    doc?: string;
    models: {
      [modelId: string]: ModelsDevModel;
    };
  };
}

export interface ModelsDevModel {
  id: string;
  name?: string;
  family?: string;
  attachment?: boolean;
  reasoning?: boolean;
  tool_call?: boolean;
  structured_output?: boolean;
  temperature?: boolean;
  knowledge?: string;
  release_date?: string;
  last_updated?: string;
  modalities?: {
    input?: string[];
    output?: string[];
  };
  open_weights?: boolean;
  cost?: {
    input?: number;
    output?: number;
  };
  limit?: {
    context?: number;
    output?: number;
  };
}

export async function fetchModelsDev(): Promise<ModelsDevResponse> {
  const response = await fetch("https://models.dev/api.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch models.dev registry: ${response.status}`);
  }
  return response.json();
}
