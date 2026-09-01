import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function GET() {
  const profile = db.getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = db.updateProfile(body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
