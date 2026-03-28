import type { LayoutProject } from "@/lib/schemas/layout";

import { PreviewRenderer } from "@/components/app/preview-renderer";

export function PreviewCanvas({ project }: { project: LayoutProject | null }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Editable preview</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">The preview renderer maps each section type to a reusable layout component.</p>
      </div>
      {project ? (
        <PreviewRenderer project={project} />
      ) : (
        <div className="surface flex min-h-[28rem] items-center justify-center rounded-[2rem] border border-[var(--line)] p-10 text-center shadow-sm">
          <div className="max-w-sm space-y-3">
            <p className="text-lg font-semibold">Preview ready when your analysis is.</p>
            <p className="text-sm leading-7 text-[var(--muted)]">Upload a screenshot to generate an editable structure and a live layout preview.</p>
          </div>
        </div>
      )}
    </section>
  );
}
