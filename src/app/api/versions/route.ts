import { NextResponse } from "next/server";

import { getSupportedVersions } from "@/lib/registry/registry";

export const runtime = "edge";

export async function GET() {
  const versions = getSupportedVersions();
  return NextResponse.json(
    { versions },
    { headers: { "Cache-Control": "public, s-maxage=86400" } },
  );
}
