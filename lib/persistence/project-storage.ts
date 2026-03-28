import { projectSchema, type LayoutProject } from "@/lib/schemas/layout";

export type StoredWorkspace = {
  project: LayoutProject | null;
  selectedSectionId: string | null;
  generatedCode: string | null;
};

export interface ProjectStorageAdapter {
  load(): StoredWorkspace | null;
  save(value: StoredWorkspace): void;
  clear(): void;
}

export function createLocalProjectStorage(storageKey: string): ProjectStorageAdapter {
  return {
    load() {
      if (typeof window === "undefined") {
        return null;
      }

      const raw = window.localStorage.getItem(storageKey);

      if (!raw) {
        return null;
      }

      try {
        const parsed = JSON.parse(raw) as StoredWorkspace;
        const project = parsed.project ? projectSchema.parse(parsed.project) : null;

        return {
          project,
          selectedSectionId: parsed.selectedSectionId ?? null,
          generatedCode: typeof parsed.generatedCode === "string" ? parsed.generatedCode : null,
        };
      } catch {
        window.localStorage.removeItem(storageKey);
        return null;
      }
    },
    save(value) {
      if (typeof window === "undefined") {
        return;
      }

      window.localStorage.setItem(storageKey, JSON.stringify(value));
    },
    clear() {
      if (typeof window === "undefined") {
        return;
      }

      window.localStorage.removeItem(storageKey);
    },
  };
}
