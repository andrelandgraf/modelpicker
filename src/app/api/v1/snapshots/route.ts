import { NextResponse } from "next/server";

import { getSnapshotDates } from "@/lib/registry/registry";

export const runtime = "edge";

export async function GET() {
  const snapshots = getSnapshotDates();
  return NextResponse.json(
    { snapshots },
    { headers: { "Cache-Control": "public, s-maxage=86400" } },
  );
}
