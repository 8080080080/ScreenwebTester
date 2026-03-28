import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { Workspace } from "@/components/app/workspace";
import { STORAGE_KEY } from "@/lib/constants";
import { createMockProject } from "@/lib/mock-project";

describe("Workspace", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("hydrates stored state and regenerates export code when content changes", async () => {
    const project = createMockProject();

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        project,
        selectedSectionId: "hero-1",
        generatedCode: null,
      }),
    );

    render(<Workspace demoMode />);

    const headingField = await screen.findByDisplayValue("Turn visual inspiration into an editable starting point.");

    fireEvent.change(headingField, {
      target: { value: "A new hero heading" },
    });

    await waitFor(() => {
      expect(screen.getAllByText("A new hero heading").length).toBeGreaterThan(0);
      expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === "code" && content.includes("A new hero heading"))).toBeInTheDocument();
    });
  });
});
