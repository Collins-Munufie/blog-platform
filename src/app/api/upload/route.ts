import { NextResponse } from "next/server";

declare global {
  var __MEDIA_STORAGE__: Record<string, { dataUrl: string; contentType: string; name: string }> | undefined;
}

if (!globalThis.__MEDIA_STORAGE__) {
  globalThis.__MEDIA_STORAGE__ = {};
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dataUrl, name, contentType } = body;

    if (!dataUrl) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 });
    }

    const cleanName = (name || "image").replace(/[^a-zA-Z0-9.-]/g, "_");
    const mediaId = `med_${Date.now()}_${cleanName}`;

    globalThis.__MEDIA_STORAGE__![mediaId] = {
      dataUrl,
      contentType: contentType || "image/png",
      name: cleanName,
    };

    const shortUrl = `/api/media/${mediaId}`;

    return NextResponse.json({
      url: shortUrl,
      mediaId,
      name: cleanName,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
