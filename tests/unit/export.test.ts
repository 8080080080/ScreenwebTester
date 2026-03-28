import { describe, expect, it } from "vitest";

import { generateReactTailwind } from "@/lib/export/generate-react-tailwind";
import { createMockProject } from "@/lib/mock-project";

describe("generateReactTailwind", () => {
  it("renders starter code with project content", () => {
    const project = createMockProject();
    const code = generateReactTailwind(project);

    expect(code).toContain("GeneratedLayout");
    expect(code).toContain("Turn visual inspiration into an editable starting point.");
    expect(code).toContain("Start free, upgrade when the workflow sticks");
  });
});
