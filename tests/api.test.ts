import { describe, expect, it } from "bun:test";

import { GET as versionsGET } from "@/app/api/versions/route";
import { GET as snapshotsGET } from "@/app/api/v1/snapshots/route";
import { GET as categoriesGET } from "@/app/api/v1/categories/route";
import { GET as selectionGET } from "@/app/api/v1/[date]/[category]/route";

import { NextRequest } from "next/server";

type RouteHandler = (
  request: NextRequest,
  context: { params: Promise<{ date: string; category: string }> },
) => Response | Promise<Response>;

const defaultContext = {
  params: Promise.resolve({ date: "latest", category: "coding" }),
};

async function callRoute(
  handler: RouteHandler,
  url: string,
  context?: { params: Promise<{ date: string; category: string }> },
) {
  const request = new NextRequest(url);
  const res = await handler(request, context ?? defaultContext);
  return res.json();
}

describe("API routes", () => {
  it("returns versions", async () => {
    const json = await callRoute(versionsGET, "http://localhost/api/versions", {
      params: Promise.resolve({ date: "latest", category: "coding" }),
    });
    expect(json.versions).toContain("v1");
  });

  it("returns snapshots", async () => {
    const json = await callRoute(
      snapshotsGET,
      "http://localhost/api/v1/snapshots",
      { params: Promise.resolve({ date: "latest", category: "coding" }) },
    );
    expect(Array.isArray(json.snapshots)).toBe(true);
    expect(json.snapshots.length).toBeGreaterThan(0);
  });

  it("returns categories", async () => {
    const json = await callRoute(
      categoriesGET,
      "http://localhost/api/v1/categories",
      { params: Promise.resolve({ date: "latest", category: "coding" }) },
    );
    expect(json.categories).toEqual(["coding", "summarization", "research"]);
  });

  it("resolves snapshot + category", async () => {
    const json = await callRoute(
      selectionGET,
      "http://localhost/api/v1/latest/coding",
      {
        params: Promise.resolve({ date: "latest", category: "coding" }),
      },
    );
    expect(json.category).toBe("coding");
    expect(json.primary).toBeTruthy();
    expect(Array.isArray(json.fallbacks)).toBe(true);
  });
});
