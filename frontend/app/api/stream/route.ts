import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const target = request.nextUrl.searchParams.get("url");

    if (!target) {
      return Response.json(
        { error: "Missing url parameter" },
        { status: 400 }
      );
    }

    console.log("TARGET:", target);

    const response = await fetch(target, {
      redirect: "follow",
      headers: {
        "User-Agent": "VLC/3.0.20",
      },
    });

    console.log("STATUS:", response.status);
    console.log("FINAL URL:", response.url);

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ??
          "application/octet-stream",
        "Accept-Ranges":
          response.headers.get("accept-ranges") ?? "bytes",
      },
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: String(err),
      },
      {
        status: 500,
      }
    );
  }
}