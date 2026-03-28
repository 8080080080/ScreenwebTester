import type { LayoutAnalysisResult } from "@/lib/schemas/layout";

export function buildAnalysisPrompt() {
  return `
You are analyzing a website screenshot and converting it into structured layout data.

Return valid JSON only.
Do not wrap the JSON in markdown fences.
Do not describe exact brands or copyrighted details beyond the visible layout/content summary.
Do not attempt to clone the website. Summarize structure and starter copy in an original way.

Schema:
{
  "pageType": "landing" | "pricing" | "marketing" | "product" | "dashboard" | "unknown",
  "style": {
    "tone": "warm" | "graphite" | "linen",
    "radius": "soft" | "rounded" | "square",
    "spacing": "compact" | "comfortable" | "airy"
  },
  "sections": [
    {
      "id": "string",
      "type": "navbar" | "hero" | "features" | "testimonials" | "pricing" | "cta" | "footer" | "generic",
      "label": "string",
      "layout": "string",
      "content": {}
    }
  ]
}

Rules:
- Detect the likely section order.
- Prefer concise, reusable starter copy.
- Include only sections you can infer with confidence.
- If uncertain, use "generic".
- Keep URLs simple using "#" for unknown links.
- Use 2 to 6 items for features/testimonials/plans when present.
`.trim();
}

export function buildCodeGenerationPrompt(project: LayoutAnalysisResult) {
  return `
Generate clean React + Tailwind starter code from this normalized layout JSON.

Requirements:
- Output code only, no markdown fences.
- Use one default exported component named GeneratedLayout.
- Use semantic HTML and readable class names.
- Keep the layout structured and editable, not over-engineered.
- Preserve the intent of the JSON but do not add extra dependencies.

JSON:
${JSON.stringify(project, null, 2)}
`.trim();
}
