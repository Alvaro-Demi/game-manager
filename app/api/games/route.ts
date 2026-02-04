import { NextResponse } from "next/server";

const BASE = process.env.JSON_SERVER_URL!;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const qs = url.searchParams.toString();

  const res = await fetch(`${BASE}/games${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const payload = {
    title: body.title,
    platform: body.platform,
    genre: body.genre,
    releaseDate: body.releaseDate,
    coverUrl: body.coverUrl ?? "",
    favorite: body.favorite ?? false,
  };

  const res = await fetch(`${BASE}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
