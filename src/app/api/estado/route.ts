// Diagnóstico de la conexión con Supabase. No muestra claves ni datos de la tabla.
import { NextResponse } from "next/server";
import { keyKind, ping } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL?.trim() ?? "";
  const estado: Record<string, string> = {
    SUPABASE_URL: url ? url.replace(/^(https:\/\/[a-z0-9]{6})[a-z0-9]+/, "$1…") : "falta",
    SUPABASE_SERVICE_ROLE_KEY: keyKind(),
  };
  try {
    await ping();
    estado.conexion = "OK: el sitio se conecta a la tabla diagnosticos";
  } catch (err) {
    estado.conexion = `ERROR: ${(err as Error).message.slice(0, 300)}`;
  }
  return NextResponse.json(estado, { headers: { "Cache-Control": "no-store" } });
}
