// Acceso a Supabase desde el servidor vía PostgREST (sin exponer claves al navegador).
import "server-only";

const TABLE = "diagnosticos";

function env() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  return { url: url.replace(/\/$/, ""), key };
}

async function request(path: string, init: RequestInit) {
  const { url, key } = env();
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return (await res.json()) as Record<string, unknown>[];
}

export async function insertRow(row: Record<string, unknown>) {
  const rows = await request(TABLE, { method: "POST", body: JSON.stringify(row) });
  return rows[0];
}

/** Actualiza solo si el registro sigue en estado "iniciado"; devuelve null si no existe o ya se completó. */
export async function completeRow(id: string, patch: Record<string, unknown>) {
  const rows = await request(`${TABLE}?id=eq.${encodeURIComponent(id)}&estado=eq.iniciado`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
  return rows[0] ?? null;
}
