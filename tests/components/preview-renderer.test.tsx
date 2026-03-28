import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PreviewRenderer } from "@/components/app/preview-renderer";
import { createMockProject } from "@/lib/mock-project";

describe("PreviewRenderer", () => {
  it("renders generic fallback sections safely", () => {
    const project = createMockProject();
    project.sections = [
      {
        id: "generic-1",
        type: "generic",
        label: "Generic block",
        layout: "stack",
        content: {
          heading: "Safe fallback heading",
          subheading: "Subheading",
          body: "Body copy",
          items: [],
        },
      },
    ];

    render(<PreviewRenderer project={project} />);

    expect(screen.getByTestId("generic-preview-section")).toBeInTheDocument();
    expect(screen.getByText("Safe fallback heading")).toBeInTheDocument();
  });
});
