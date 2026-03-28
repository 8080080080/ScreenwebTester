import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";

import type { LayoutProject } from "@/lib/schemas/layout";
import { cn, formatSectionType } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type StructurePanelProps = {
  project: LayoutProject | null;
  selectedSectionId: string | null;
  onMoveSection: (sectionId: string, direction: "up" | "down") => void;
  onSelectSection: (sectionId: string) => void;
};

export function StructurePanel({
  project,
  selectedSectionId,
  onMoveSection,
  onSelectSection,
}: StructurePanelProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Structure panel</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Review detected sections and pick one to edit.</p>
      </div>
      <div className="surface rounded-[2rem] border border-[var(--line)] p-4 shadow-sm">
        {project ? (
          <ul className="space-y-3">
            {project.sections.map((section, index) => (
              <li key={section.id}>
                <div
                  className={cn(
                    "rounded-[1.5rem] border p-4 transition",
                    selectedSectionId === section.id
                      ? "border-amber-500/40 bg-amber-50/60"
                      : "border-[var(--line)] bg-white/80",
                  )}
                >
                  <button
                    className="flex w-full items-start gap-3 text-left"
                    onClick={() => onSelectSection(section.id)}
                    type="button"
                  >
                    <span className="mt-1 text-[var(--muted)]">
                      <GripVertical className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{section.label}</span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                        {formatSectionType(section.type)}
                      </span>
                    </span>
                  </button>
                  <div className="mt-4 flex gap-2">
                    <Button
                      className="flex-1"
                      disabled={index === 0}
                      onClick={() => onMoveSection(section.id, "up")}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      <ChevronUp className="size-4" />
                      Move up
                    </Button>
                    <Button
                      className="flex-1"
                      disabled={index === project.sections.length - 1}
                      onClick={() => onMoveSection(section.id, "down")}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      <ChevronDown className="size-4" />
                      Move down
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-5 text-sm leading-7 text-[var(--muted)]">
            Detected sections appear here after analysis. Unknown section types fall back to a safe generic block instead of breaking the workspace.
          </div>
        )}
      </div>
    </section>
  );
}
