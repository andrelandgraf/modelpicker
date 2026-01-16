import { test, expect, type Page } from "@playwright/test";

const categories = ["coding", "summarization", "research"] as const;
const snapshots = ["2024-12-15", "2025-02-10", "2026-01-15"];

async function fetchJson(page: Page, path: string) {
  const response = await page.request.get(path);
  expect(response.ok()).toBeTruthy();
  return response.json();
}

test.describe("landing page", () => {
  test("renders header with GitHub link and theme toggle", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Curated AI Model Picker")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "GitHub repository" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Toggle theme" }),
    ).toBeVisible();
  });

  test("filters categories with pill buttons", async ({ page }) => {
    await page.goto("/");

    // All button should be visible and active by default
    await expect(page.getByRole("button", { name: "All" })).toBeVisible();

    // Click each category filter and verify the heading appears
    for (const category of categories) {
      await page.getByRole("button", { name: category }).click();
      await expect(
        page.getByRole("heading", { name: category, level: 3 }),
      ).toBeVisible();
    }

    // Click All to show all categories
    await page.getByRole("button", { name: "All" }).click();
    for (const category of categories) {
      await expect(
        page.getByRole("heading", { name: category, level: 3 }),
      ).toBeVisible();
    }
  });

  test("switches snapshots via dropdown", async ({ page }) => {
    await page.goto("/");

    // Default shows latest
    await expect(page.getByText("latest (2026-01-15)")).toBeVisible();

    // Open dropdown and select older snapshot
    await page.getByRole("combobox").first().click();
    await expect(page.getByRole("option", { name: "latest" })).toBeVisible();
    await page.getByRole("option", { name: "2024-12-15" }).click();

    // Verify older models appear
    await expect(page.getByText("Claude 3.5 Sonnet")).toBeVisible();
  });

  test("displays How it works section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "How it works" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "API Endpoints" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Quick Start" }),
    ).toBeVisible();
    await expect(page.getByText("/api/v1/{date}/{category}")).toBeVisible();
  });

  test("displays model cards with primary and fallbacks", async ({ page }) => {
    await page.goto("/");

    // Check primary badge exists
    await expect(page.getByText("Primary").first()).toBeVisible();

    // Check fallback badges exist
    await expect(page.getByText("Fallback 1").first()).toBeVisible();
    await expect(page.getByText("Fallback 2").first()).toBeVisible();
  });

  test("footer contains author link", async ({ page }) => {
    await page.goto("/");
    const authorLink = page.getByRole("link", { name: "@andrelandgraf" });
    await expect(authorLink).toBeVisible();
    await expect(authorLink).toHaveAttribute(
      "href",
      "https://x.com/andrelandgraf",
    );
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

  test("categories", async ({ page }) => {
    const json = await fetchJson(page, "/api/v1/categories");
    expect(json.categories).toEqual(["coding", "summarization", "research"]);
  });

  for (const category of categories) {
    test(`latest ${category}`, async ({ page }) => {
      const json = await fetchJson(page, `/api/v1/latest/${category}`);
      expect(json.category).toBe(category);
      expect(json.primary).toBeTruthy();
      expect(Array.isArray(json.fallbacks)).toBe(true);
    });
  }
});
