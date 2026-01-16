import { test, expect, type Page } from "@playwright/test";

const categories = ["coding", "summarization", "research"] as const;

async function fetchJson(page: Page, path: string) {
  const response = await page.request.get(path);
  expect(response.ok()).toBeTruthy();
  return response.json();
}

const snapshots = ["2024-12-15", "2025-02-10"];

test.describe("landing page", () => {
  test("renders and toggles", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Opinionated AI Model Picker")).toBeVisible();

    // Snapshot dropdown includes latest + static entries
    await page.getByLabel(/Snapshot/i).click();
    await expect(page.getByRole("option", { name: "latest" })).toBeVisible();
    await page.keyboard.press("Escape");

    // Category selection rounds through categories
    for (const category of categories) {
      await page.getByLabel(/Category/i).click();
      await page.getByRole("option", { name: category }).click();
      await expect(
        page.getByRole("combobox", { name: /Category/i }),
      ).toHaveText(category);
    }

    await page.getByRole("button", { name: /Expand/ }).click();
    await expect(
      page.getByText("Full registry", { exact: false }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
  });
});

test.describe("API heartbeats", () => {
  test("versions", async ({ page }) => {
    const json = await fetchJson(page, "/api/versions");
    expect(json.versions).toContain("v1");
  });

  test("snapshots", async ({ page }) => {
    const json = await fetchJson(page, "/api/v1/snapshots");
    for (const snapshot of snapshots) {
      expect(json.snapshots).toContain(snapshot);
    }
  });

  for (const category of categories) {
    test(`latest ${category}`, async ({ page }) => {
      const json = await fetchJson(page, `/api/v1/latest/${category}`);
      expect(json.category).toBe(category);
    });
  }
});
