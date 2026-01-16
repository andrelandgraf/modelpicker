import { NextResponse } from "next/server";

import { getSupportedCategories } from "@/lib/registry/registry";

export const runtime = "edge";

export async function GET() {
  const categories = getSupportedCategories();
  return NextResponse.json(
    { categories },
    { headers: { "Cache-Control": "public, s-maxage=86400" } },
  );
}
