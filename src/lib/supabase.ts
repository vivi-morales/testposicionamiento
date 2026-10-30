// Acceso a Supabase desde el servidor vía PostgREST (sin exponer claves al navegador).
import "server-only";

const TABLE = "diagnosticos";

function env() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) throw new Error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  // Acepta la URL con o sin "/rest/v1" o barra final.
  return { url: url.replace(/\/+$/, "").replace(/\/rest\/v1$/, ""), key };
}

/** Tipo de clave configurada (sin revelarla). */
export function keyKind(key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "") {
  if (!key) return "falta";
  if (key.startsWith("sb_secret_")) return "secret (nueva)";
  if (key.startsWith("sb_publishable_")) return "publishable (incorrecta: es la pública)";
  if (key.startsWith("eyJ")) {
    try {
      const role = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role;
      return role === "service_role" ? "service_role (legacy)" : `${role} (incorrecta: no es service_role)`;
    } catch {
      return "JWT ilegible";
    }
  }
  return "formato desconocido";
}

async function request(path: string, init: RequestInit) {
  const { url, key } = env();
  // Las claves nuevas (sb_secret_…) no son JWT: van solo en "apikey". Las legacy (eyJ…) también en Authorization.
  const auth: Record<string, string> = key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {};
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      ...auth,
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

/** Comprueba que la tabla responde (lectura de 1 id), sin devolver datos. */
export async function ping() {
  const rows = await request(`${TABLE}?select=id&limit=1`, { method: "GET" });
  return rows.length;
}
