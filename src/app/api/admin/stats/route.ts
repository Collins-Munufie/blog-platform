import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function GET() {
  const stats = db.getAdminStats();
  return NextResponse.json(stats);
}
