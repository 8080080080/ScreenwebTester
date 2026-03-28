import OpenAI from "openai";

import { getServerEnv } from "@/lib/env";

let cachedClient: OpenAI | null = null;

export function getOpenAIClient() {
  const env = getServerEnv();

  if (!env.OPENAI_API_KEY) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  return cachedClient;
}

export function extractResponseText(response: unknown) {
  if (!response || typeof response !== "object") {
    return "";
  }

  const maybeOutputText = (response as { output_text?: unknown }).output_text;

  if (typeof maybeOutputText === "string" && maybeOutputText.trim()) {
    return maybeOutputText.trim();
  }

  const output = (response as { output?: unknown }).output;

  if (!Array.isArray(output)) {
    return "";
  }

  const chunks = output.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const content = (item as { content?: unknown }).content;

    if (!Array.isArray(content)) {
      return [];
    }

    return content
      .map((entry) => {
        if (!entry || typeof entry !== "object") {
          return "";
        }

        const text = (entry as { text?: unknown }).text;
        return typeof text === "string" ? text : "";
      })
      .filter(Boolean);
  });

  return chunks.join("\n").trim();
}
