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
    const kind = estado.SUPABASE_SERVICE_ROLE_KEY;
    estado.conexion = kind.startsWith("secret") || kind.startsWith("service_role")
      ? "OK: el sitio se conecta y puede guardar en la tabla diagnosticos"
      : "ATENCIÓN: hay conexión, pero con esta clave NO se pueden guardar registros. Usa la clave secreta (sb_secret_…) o service_role.";
  } catch (err) {
    estado.conexion = `ERROR: ${(err as Error).message.slice(0, 300)}`;
  }
  return NextResponse.json(estado, { headers: { "Cache-Control": "no-store" } });
}
