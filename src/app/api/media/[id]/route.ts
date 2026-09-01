import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const mediaId = params.id;
  const storage = globalThis.__MEDIA_STORAGE__ || {};
  const item = storage[mediaId];

  if (!item || !item.dataUrl) {
    return new NextResponse("Image not found", { status: 404 });
  }

  // Parse Base64 Data URL to raw binary Buffer
  const matches = item.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Fallback redirect if it was a plain URL
  if (item.dataUrl.startsWith("http")) {
    return NextResponse.redirect(item.dataUrl);
  }

  return new NextResponse("Invalid image format", { status: 500 });
}
