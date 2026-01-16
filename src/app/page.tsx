import { codeToHtml } from "shiki";
import { RegistryTable } from "@/components/registry/registry-table";
import { HowItWorks } from "@/components/registry/how-it-works";
import { HeroCode } from "@/components/registry/hero-code";

const codeSnippet = `import { generateText } from "ai";

const response = await fetch(
  "https://modelpicker.ai/api/v1/latest/coding"
);
const { primary } = await response.json();

const { text } = await generateText({
  model: primary.id,
  prompt: "What is love?",
});`;

export default async function Home() {
  const html = await codeToHtml(codeSnippet, {
    lang: "typescript",
    theme: "github-dark-default",
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Curated AI Model Picker
        </p>
        <h1 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Use the best model for your task
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Hand-picked AI model recommendations for your AI agents because using
          outdated models isn't the vibe.
        </p>
        <HeroCode html={html} code={codeSnippet} />
      </header>

      <RegistryTable />

      <div className="border-t pt-16">
        <HowItWorks />
      </div>

      <footer className="border-t pt-8 text-center text-sm text-muted-foreground">
        <p>
          built with love by{" "}
          <a
            href="https://x.com/andrelandgraf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            @andrelandgraf
          </a>
        </p>
      </footer>
    </div>
  );
}
