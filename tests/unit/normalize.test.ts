import { describe, expect, it } from "vitest";

import { normalizeAnalysisInput } from "@/lib/normalize";

describe("normalizeAnalysisInput", () => {
  it("downgrades unknown section types to generic", () => {
    const result = normalizeAnalysisInput({
      pageType: "marketing",
      style: { tone: "warm", radius: "rounded", spacing: "comfortable" },
      sections: [
        {
          id: "mystery-1",
          type: "mystery-widget",
          label: "Mystery",
          content: { heading: "Recovered heading" },
        },
      ],
    });

    expect(result.sections[0]?.type).toBe("generic");
    expect(result.sections[0]?.content.heading).toBe("Recovered heading");
  });
});
