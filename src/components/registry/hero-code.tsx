"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

function HeroCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

export function HeroCode({ html, code }: { html: string; code: string }) {
  return (
    <div className="group relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-violet-600/20 via-fuchsia-500/20 to-cyan-500/20 opacity-75 blur-lg transition-opacity group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 font-mono text-xs text-white/40">
              index.ts
            </span>
          </div>
          <HeroCopyButton text={code} />
        </div>
        <div
          className="overflow-x-auto p-4 text-left text-sm [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
