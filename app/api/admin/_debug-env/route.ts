import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  // НИКОГДА не выводим пароли/токены — только факт наличия и длину
  const u = process.env.ADMIN_USERNAME ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";

  return NextResponse.json({
    hasAdminUsername: Boolean(u),
    adminUsernameLen: u.length,
    hasAdminPassword: Boolean(p),
    adminPasswordLen: p.length,
    vercel: process.env.VERCEL ?? null,
    env: process.env.VERCEL_ENV ?? null, // "production" | "preview" | "development"
  });
}
