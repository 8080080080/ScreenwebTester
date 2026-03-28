import { z } from "zod";

import {
  DEFAULT_ANALYSIS_TIMEOUT_MS,
  DEFAULT_RATE_LIMIT_MAX_REQUESTS,
  DEFAULT_RATE_LIMIT_WINDOW_MS,
  MAX_UPLOAD_SIZE_BYTES,
} from "@/lib/constants";

const serverEnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_ANALYSIS_MODEL: z.string().min(1).default("gpt-4.1-mini"),
  OPENAI_CODEGEN_MODEL: z.string().min(1).default("gpt-4.1-mini"),
  ANALYSIS_TIMEOUT_MS: z.coerce.number().int().positive().default(DEFAULT_ANALYSIS_TIMEOUT_MS),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(DEFAULT_RATE_LIMIT_WINDOW_MS),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(DEFAULT_RATE_LIMIT_MAX_REQUESTS),
  NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB: z.coerce.number().positive().default(MAX_UPLOAD_SIZE_BYTES / (1024 * 1024)),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const result = serverEnvSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error(
      `Environment validation failed: ${result.error.issues
        .map((issue) => `${issue.path.join(".")} ${issue.message}`)
        .join(", ")}`,
    );
  }

  cachedEnv = result.data;
  return cachedEnv;
}

export function isDemoModeEnabled() {
  return !getServerEnv().OPENAI_API_KEY;
}
