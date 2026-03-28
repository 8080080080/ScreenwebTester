"use client";

import { startTransition, useEffect, useState } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";

import { ExportPanel } from "@/components/app/export-panel";
import { PreviewCanvas } from "@/components/app/preview-canvas";
import { SectionEditor } from "@/components/app/section-editor";
import { StructurePanel } from "@/components/app/structure-panel";
import { UploadDropzone } from "@/components/app/upload-dropzone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE_BYTES, STORAGE_KEY } from "@/lib/constants";
import { generateReactTailwind } from "@/lib/export/generate-react-tailwind";
import { createLocalProjectStorage } from "@/lib/persistence/project-storage";
import type { LayoutProject, LayoutSection, LayoutStyle } from "@/lib/schemas/layout";

type AnalyzeResponse = {
  mode: "live" | "demo";
  project: LayoutProject;
  generatedCode: string;
  warnings?: string[];
};

const storage = createLocalProjectStorage(STORAGE_KEY);

function validateClientFile(file: File | null) {
  if (!file) {
    return "Select a screenshot before starting analysis.";
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return "Upload a PNG, JPEG, or WebP screenshot.";
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return "Screenshot exceeds the 8 MB upload limit.";
  }

  return null;
}

export function Workspace({ demoMode }: { demoMode: boolean }) {
  const [project, setProject] = useState<LayoutProject | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [analysisMode, setAnalysisMode] = useState<"live" | "demo">(demoMode ? "demo" : "live");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [hasLocalEdits, setHasLocalEdits] = useState(false);

  useEffect(() => {
    const stored = storage.load();

    if (stored?.project) {
      setProject(stored.project);
      setSelectedSectionId(stored.selectedSectionId ?? stored.project.sections[0]?.id ?? null);
      setGeneratedCode(stored.generatedCode);
    }

    setHasLoadedStorage(true);
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    storage.save({
      project,
      selectedSectionId,
      generatedCode,
    });
  }, [generatedCode, hasLoadedStorage, project, selectedSectionId]);

  const displayedCode = project
    ? hasLocalEdits
      ? generateReactTailwind(project)
      : (generatedCode ?? generateReactTailwind(project))
    : "";

  function updateProject(nextProject: LayoutProject) {
    setProject({
      ...nextProject,
      updatedAt: new Date().toISOString(),
    });
    setHasLocalEdits(true);
  }

  function updateSection(nextSection: LayoutSection) {
    if (!project) {
      return;
    }

    updateProject({
      ...project,
      sections: project.sections.map((section) => (section.id === nextSection.id ? nextSection : section)),
    });
  }

  function updateStyle<K extends keyof LayoutStyle>(field: K, value: LayoutStyle[K]) {
    if (!project) {
      return;
    }

    updateProject({
      ...project,
      style: {
        ...project.style,
        [field]: value,
      },
    });
  }

  function moveSection(sectionId: string, direction: "up" | "down") {
    if (!project) {
      return;
    }

    const currentIndex = project.sections.findIndex((section) => section.id === sectionId);
    const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= project.sections.length) {
      return;
    }

    const nextSections = [...project.sections];
    const [moved] = nextSections.splice(currentIndex, 1);
    nextSections.splice(nextIndex, 0, moved);

    updateProject({
      ...project,
      sections: nextSections,
    });
  }

  async function runAnalysis() {
    const validationError = validateClientFile(selectedFile);

    if (validationError) {
      setUploadError(validationError);
      return;
    }

    if (!selectedFile) {
      return;
    }

    setWorkspaceError(null);
    setUploadError(null);
    setIsAnalyzing(true);
    setWarnings([]);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as AnalyzeResponse | { error?: { message?: string } };
      const errorMessage = "error" in payload ? payload.error?.message : undefined;

      if (!response.ok || !("project" in payload)) {
        throw new Error(errorMessage ?? "Analysis failed. Please retry.");
      }

      startTransition(() => {
        setProject(payload.project);
        setGeneratedCode(payload.generatedCode);
        setSelectedSectionId(payload.project.sections[0]?.id ?? null);
        setWarnings(payload.warnings ?? []);
        setAnalysisMode(payload.mode);
        setHasLocalEdits(false);
      });
    } catch (error) {
      setWorkspaceError(error instanceof Error ? error.message : "Analysis failed. Please retry.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-10 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge>{analysisMode === "demo" ? "Demo mode" : "Live analysis"}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Screenshot-to-layout workspace</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
            Upload a screenshot, analyze the layout, edit the structured result, and export starter code from the current state.
          </p>
        </div>
        <Button disabled={isAnalyzing} onClick={() => void runAnalysis()} size="lg" type="button">
          {isAnalyzing ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {isAnalyzing ? "Analyzing…" : "Analyze screenshot"}
        </Button>
      </div>

      {analysisMode === "demo" ? (
        <div className="mt-6 rounded-[1.5rem] border border-amber-500/30 bg-amber-50/70 px-5 py-4 text-sm leading-7 text-amber-900">
          Demo mode is active. The full workflow still works using realistic mock analysis output until you add <code>OPENAI_API_KEY</code>.
        </div>
      ) : null}

      {workspaceError ? (
        <div className="mt-6 flex items-start gap-3 rounded-[1.5rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800" role="alert">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{workspaceError}</span>
        </div>
      ) : null}

      {warnings.length > 0 ? (
        <div className="mt-6 rounded-[1.5rem] border border-[var(--line)] bg-white/70 px-5 py-4 text-sm leading-7 text-[var(--muted)]">
          {warnings.join(" ")}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6">
        <UploadDropzone
          disabled={isAnalyzing}
          error={uploadError}
          fileName={selectedFile?.name ?? null}
          onFileSelected={(file) => {
            setSelectedFile(file);
            setUploadError(validateClientFile(file));
          }}
          previewUrl={previewUrl}
        />

        <div className="grid gap-6 xl:grid-cols-[20rem_24rem_minmax(0,1fr)]">
          <StructurePanel onMoveSection={moveSection} onSelectSection={setSelectedSectionId} project={project} selectedSectionId={selectedSectionId} />
          <SectionEditor onSectionChange={updateSection} onStyleChange={updateStyle} project={project} selectedSectionId={selectedSectionId} />
          <div className="grid gap-6">
            <PreviewCanvas project={project} />
            <ExportPanel code={displayedCode} disabled={!project} />
          </div>
        </div>
      </div>
    </main>
  );
}
