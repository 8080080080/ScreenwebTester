"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type ExportPanelProps = {
  code: string;
  disabled?: boolean;
};

export function ExportPanel({ code, disabled = false }: ExportPanelProps) {
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Code export panel</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Readable starter code regenerates from the current structured state.</p>
        </div>
        <Button
          disabled={disabled || !code}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopyState("success");
            } catch {
              setCopyState("error");
            } finally {
              window.setTimeout(() => setCopyState("idle"), 1800);
            }
          }}
          type="button"
          variant="outline"
        >
          {copyState === "success" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy code"}
        </Button>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[#19130f] shadow-sm">
        {code ? (
          <pre className="max-h-[34rem] overflow-auto p-5 text-sm leading-7 text-stone-200">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="flex min-h-[20rem] items-center justify-center p-8 text-center text-sm leading-7 text-stone-300">
            Generated starter code will appear here after the first analysis.
          </div>
        )}
      </div>
    </section>
  );
}
