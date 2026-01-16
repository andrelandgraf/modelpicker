import { RegistryModel } from "@/lib/registry/registry";
import { ProviderLogo } from "@/components/registry/provider-logo";

interface ModelCellProps {
  model: RegistryModel;
}

export function ModelCell({ model }: ModelCellProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3">
      <div className="flex items-center gap-2">
        <ProviderLogo provider={model.provider} size={28} />
        <div>
          <p className="text-sm font-semibold">{model.name}</p>
          <p className="text-xs text-muted-foreground">{model.id}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-xs">
        {model.knowledge && (
          <div>
            <dt className="text-muted-foreground">Knowledge</dt>
            <dd>{model.knowledge}</dd>
          </div>
        )}
        {model.limit?.context && (
          <div>
            <dt className="text-muted-foreground">Context</dt>
            <dd>{model.limit.context.toLocaleString()}</dd>
          </div>
        )}
        {model.cost && (
          <div>
            <dt className="text-muted-foreground">Cost</dt>
            <dd>
              ${model.cost.input}/{model.cost.output}
            </dd>
          </div>
        )}
        {model.toolCall !== undefined && (
          <div>
            <dt className="text-muted-foreground">Tools</dt>
            <dd>{model.toolCall ? "Yes" : "No"}</dd>
          </div>
        )}
      </dl>
      {model.notes && (
        <p className="text-xs text-muted-foreground">{model.notes}</p>
      )}
    </div>
  );
}
