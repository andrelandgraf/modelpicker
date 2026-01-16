import { RegistryTable } from "@/components/registry/registry-table";
import { HowItWorks } from "@/components/registry/how-it-works";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Curated AI Model Picker
        </p>
        <h1 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          The best models for coding, research, and more
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Hand-picked AI model recommendations with primary and fallback
          options. Query the API, pin a snapshot, and ship with confidence.
        </p>
      </header>

      <RegistryTable />

      <div className="border-t pt-16">
        <HowItWorks />
      </div>

      <footer className="border-t pt-8 text-center text-sm text-muted-foreground">
        <p>
          Built for developers who want reliable AI integrations without the
          guesswork.
        </p>
      </footer>
    </div>
  );
}
