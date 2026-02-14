import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// In-memory token store (survives as long as the server process runs)
const validTokens = new Set<string>();

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD nicht konfiguriert" },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  const token = generateToken();
  validTokens.add(token);

  return NextResponse.json({ token });
}

// Verify token
export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");

  if (!token || !validTokens.has(token)) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  return NextResponse.json({ valid: true });
}
