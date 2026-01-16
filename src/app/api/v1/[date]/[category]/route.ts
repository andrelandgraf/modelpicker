import { NextRequest, NextResponse } from "next/server";

import {
  CategoryNotFoundError,
  SnapshotNotFoundError,
  getCategorySelection,
} from "@/lib/registry/registry";

const ONE_HOUR = 60 * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const runtime = "edge";

function buildCacheControl(date: string) {
  if (date === "latest") {
    return `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${ONE_DAY}`;
  }
  return `public, s-maxage=${ONE_YEAR}, immutable`;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ date: string; category: string }> },
) {
  const { date, category } = await params;
  try {
    const selection = getCategorySelection(date, category);
    const headers = new Headers();
    headers.set("cache-control", buildCacheControl(date));

    return NextResponse.json(selection, { headers });
  } catch (error) {
    if (error instanceof SnapshotNotFoundError) {
      return NextResponse.json(
        { error: { code: "SNAPSHOT_NOT_FOUND", message: error.message } },
        { status: 404 },
      );
    }

    if (error instanceof CategoryNotFoundError) {
      return NextResponse.json(
        { error: { code: "CATEGORY_NOT_SUPPORTED", message: error.message } },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: { code: "UNKNOWN_ERROR", message: "Unexpected error" } },
      { status: 500 },
    );
  }
}
