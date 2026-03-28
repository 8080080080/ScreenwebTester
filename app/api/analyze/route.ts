import { NextResponse } from "next/server";

import { analyzeScreenshot } from "@/lib/ai/analyze";
import { getServerEnv, isDemoModeEnabled } from "@/lib/env";
import { AppError } from "@/lib/errors";
import { validateUpload } from "@/lib/files";
import { generateReactTailwind } from "@/lib/export/generate-react-tailwind";
import { createMockProject } from "@/lib/mock-project";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getRequestKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "anonymous";
  }

  return real ?? "anonymous";
}

function buildDemoResponse(sourceImageName: string, warning?: string) {
  const project = createMockProject(sourceImageName);

  return NextResponse.json({
    mode: "demo" as const,
    project,
    generatedCode: generateReactTailwind(project),
    warnings: warning ? [warning] : [],
  });
}

export async function POST(request: Request) {
  try {
    const env = getServerEnv();
    enforceRateLimit(getRequestKey(request));

    const formData = await request.formData();
    const file = formData.get("file");
    const upload = file instanceof File ? file : null;

    validateUpload(upload);

    if (!upload) {
      throw new AppError("NO_FILE", "Select a screenshot before starting analysis.", 400);
    }

    if (isDemoModeEnabled()) {
      return buildDemoResponse(upload.name);
    }

    const base64 = Buffer.from(await upload.arrayBuffer()).toString("base64");
    const imageDataUrl = `data:${upload.type};base64,${base64}`;
    const signal = AbortSignal.timeout(env.ANALYSIS_TIMEOUT_MS);

    try {
      const result = await analyzeScreenshot({
        imageDataUrl,
        sourceImageName: upload.name,
        signal,
      });

      return NextResponse.json({
        mode: "live" as const,
        project: result.project,
        generatedCode: result.generatedCode,
        warnings: result.warnings,
      });
    } catch (error) {
      if (
        error instanceof AppError &&
        ["AI_TIMEOUT", "AI_UNAVAILABLE", "MALFORMED_ANALYSIS", "GENERATION_FAILED", "CONFIG_ERROR"].includes(error.code)
      ) {
        return buildDemoResponse(upload.name, "Live analysis was unavailable, so SnapLayout returned demo output instead.");
      }

      throw error;
    }
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          error: {
            code: error.code,
            message: error.message,
          },
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        error: {
          code: "UNKNOWN_ERROR",
          message: "Something went wrong while analyzing the screenshot.",
        },
      },
      { status: 500 },
    );
  }
}
