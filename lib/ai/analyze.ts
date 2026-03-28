import { generateReactTailwind } from "@/lib/export/generate-react-tailwind";
import { normalizeAnalysisInput } from "@/lib/normalize";
import type { LayoutProject } from "@/lib/schemas/layout";
import { stripCodeFences } from "@/lib/sanitize";

import { getOpenAIClient, extractResponseText } from "@/lib/ai/client";
import { buildAnalysisPrompt, buildCodeGenerationPrompt } from "@/lib/ai/prompts";
import { getServerEnv } from "@/lib/env";
import { AppError } from "@/lib/errors";

function extractJsonCandidate(value: string) {
  const trimmed = stripCodeFences(value);
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");

  if (start < 0 || end < 0 || end <= start) {
    return trimmed;
  }

  return trimmed.slice(start, end + 1);
}

export async function analyzeScreenshot({
  imageDataUrl,
  sourceImageName,
  signal,
}: {
  imageDataUrl: string;
  sourceImageName: string;
  signal: AbortSignal;
}) {
  const client = getOpenAIClient();
  const env = getServerEnv();

  if (!client) {
    throw new AppError("AI_UNAVAILABLE", "OpenAI is not configured.", 503);
  }

  let rawText = "";

  try {
    const analysisResponse = await client.responses.create(
      {
        model: env.OPENAI_ANALYSIS_MODEL,
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: buildAnalysisPrompt() },
              { type: "input_image", image_url: imageDataUrl },
            ],
          },
        ],
      } as never,
      { signal },
    );

    rawText = extractResponseText(analysisResponse);
  } catch (error) {
    if ((error as { name?: string }).name === "AbortError") {
      throw new AppError("AI_TIMEOUT", "Analysis timed out. Try a smaller screenshot or retry.", 504);
    }

    throw new AppError("AI_UNAVAILABLE", "AI analysis is currently unavailable. Please retry.", 503);
  }

  let normalized;

  try {
    normalized = normalizeAnalysisInput(JSON.parse(extractJsonCandidate(rawText)));
  } catch {
    throw new AppError("MALFORMED_ANALYSIS", "The model response could not be normalized into a usable layout.", 502);
  }

  const project: LayoutProject = {
    ...normalized,
    id: crypto.randomUUID(),
    name: "Analyzed screenshot",
    sourceImageName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  let generatedCode = generateReactTailwind(project);

  try {
    const codeResponse = await client.responses.create(
      {
        model: env.OPENAI_CODEGEN_MODEL,
        input: buildCodeGenerationPrompt(normalized),
      } as never,
      { signal },
    );
    const codeText = stripCodeFences(extractResponseText(codeResponse));

    if (codeText) {
      generatedCode = codeText;
    }
  } catch {
    // Local exporter remains the reliable fallback.
  }

  return {
    project,
    generatedCode,
    warnings: [] as string[],
  };
}
