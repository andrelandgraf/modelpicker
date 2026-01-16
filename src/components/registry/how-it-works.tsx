import {
  getSupportedCategories,
  getSnapshotDates,
} from "@/lib/registry/registry";
import { CopyButton } from "./copy-button";

const categories = getSupportedCategories();
const snapshots = getSnapshotDates();

const codingCommand = "curl https://modelpicker.ai/api/v1/latest/coding";
const snapshotCommand = `curl https://modelpicker.ai/api/v1/${getSnapshotDates()[0]}/research`;

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/{date}/{category}",
    description: "Get model recommendations for a category",
    example: `/api/v1/latest/coding`,
  },
  {
    method: "GET",
    path: "/api/v1/categories",
    description: "List all supported categories",
    example: "/api/v1/categories",
  },
  {
    method: "GET",
    path: "/api/v1/snapshots",
    description: "List all available snapshots",
    example: "/api/v1/snapshots",
  },
];

export function HowItWorks() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
        <p className="mt-2 text-muted-foreground">
          Query the API to get curated model recommendations. Pin a snapshot
          date for reproducible builds, or use &quot;latest&quot; to always get
          the current picks.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground">
            API Endpoints
          </h3>
          <div className="space-y-3">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="rounded-lg border bg-muted/30 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded bg-foreground px-2 py-0.5 text-xs font-semibold text-background">
                    {endpoint.method}
                  </span>
                  <code className="text-sm">{endpoint.path}</code>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {endpoint.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground">
            Quick Start
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="mb-2 text-sm font-medium">
                Get coding recommendations
              </p>
              <div className="relative">
                <pre className="overflow-x-auto rounded bg-background p-3 pr-10 text-sm">
                  <code>{codingCommand}</code>
                </pre>
                <CopyButton text={codingCommand} />
              </div>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="mb-2 text-sm font-medium">
                Pin to a specific snapshot
              </p>
              <div className="relative">
                <pre className="overflow-x-auto rounded bg-background p-3 pr-10 text-sm">
                  <code>{snapshotCommand}</code>
                </pre>
                <CopyButton text={snapshotCommand} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border bg-muted/30 p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-background px-3 py-1 text-sm capitalize"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
            Snapshots
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-foreground px-3 py-1 text-sm text-background">
              latest
            </span>
            {snapshots.map((snapshot) => (
              <span
                key={snapshot}
                className="rounded-full bg-background px-3 py-1 text-sm"
              >
                {snapshot}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
