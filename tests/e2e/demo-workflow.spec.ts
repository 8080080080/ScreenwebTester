import { expect, test } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function createTempFile(name: string, content: Buffer) {
  const path = join(tmpdir(), name);
  writeFileSync(path, content);
  return path;
}

test("demo workflow analyzes, edits, reorders, and copies code", async ({ page }) => {
  const imagePath = createTempFile(
    "snaplayout-demo.png",
    Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wn2ra8AAAAASUVORK5CYII=",
      "base64",
    ),
  );

  await page.context().grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: "http://127.0.0.1:3100",
  });
  await page.goto("/app");
  await expect(page.getByText("Demo mode is active")).toBeVisible();

  await page.locator('input[type="file"]').setInputFiles(imagePath);
  await page.getByRole("button", { name: "Analyze screenshot" }).click();

  await expect(page.getByRole("heading", { name: "A faster way to prototype from screenshots" })).toBeVisible();

  await page.getByRole("button", { name: /Hero/i }).click();
  const headingField = page.getByLabel("Heading").first();
  await headingField.fill("Edited workspace heading");
  await expect(page.getByRole("heading", { name: "Edited workspace heading" })).toBeVisible();

  await page.getByRole("button", { name: "Move down" }).first().click();
  await page.getByRole("button", { name: "Copy code" }).click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
});

test("upload validation surfaces invalid file errors", async ({ page }) => {
  const invalidPath = createTempFile("snaplayout-invalid.txt", Buffer.from("not-an-image", "utf8"));

  await page.goto("/app");
  await page.locator('input[type="file"]').setInputFiles(invalidPath);
  await page.getByRole("button", { name: "Analyze screenshot" }).click();

  await expect(page.getByText("Upload a PNG, JPEG, or WebP screenshot.")).toBeVisible();
});
