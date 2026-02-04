import { NextResponse } from "next/server";

const BASE = process.env.JSON_SERVER_URL!;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const res = await fetch(`${BASE}/games/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const currentRes = await fetch(`${BASE}/games/${id}`);
  const current = await currentRes.json();

  const updated = { ...current, ...body };

  const res = await fetch(`${BASE}/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await fetch(`${BASE}/games/${id}`, { method: "DELETE" });

  return NextResponse.json({ ok: true });
}
