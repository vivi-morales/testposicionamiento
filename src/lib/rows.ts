import "server-only";
import type { LeadInput } from "./form-options";
import type { Answers, Scores } from "./scoring";
import { QUADRANTS } from "./content";

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function leadColumns(lead: LeadInput, req: Request, utm: unknown) {
  return {
    nombre: lead.nombre,
    email: lead.email,
    telefono: `${lead.indicativo} ${lead.telefono}`,
    rol: lead.rol,
    empresa: lead.empresa,
    sector: lead.sector,
    tamano: lead.tamano,
    desafio: lead.desafio,
    consentimiento: lead.consentimiento,
    consentimiento_at: new Date().toISOString(),
    tag_rol: lead.rol,
    tag_desafio: lead.desafio,
    user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
    referer: req.headers.get("referer")?.slice(0, 300) ?? null,
    utm: sanitizeUtm(utm),
  };
}

export function resultColumns(answers: Answers, s: Scores) {
  const q = QUADRANTS[s.quadrant];
  return {
    estado: "completado",
    completed_at: new Date().toISOString(),
    respuestas: answers,
    ser_puntos: s.serRaw,
    eco_puntos: s.ecoRaw,
    ser_100: s.ser,
    eco_100: s.eco,
    total_100: s.total,
    tag_cuadrante: s.quadrant,
    siguiente_paso: q.siguientePaso,
    secuencia_email: q.secuencia,
    propuesta: q.propuesta,
  };
}

function sanitizeUtm(raw: unknown) {
  if (!raw || typeof raw !== "object") return null;
  const out: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const v = (raw as Record<string, unknown>)[k];
    if (typeof v === "string" && v) out[k] = v.slice(0, 120);
  }
  return Object.keys(out).length ? out : null;
}
