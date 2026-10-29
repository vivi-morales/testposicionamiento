// Algoritmo de cálculo (Documento 2, sección 3).
// Cada eje suma 10 respuestas de 1 a 4 (10–40 pts). Punto de corte: 25 pts (≥25 = Alto).
// Al usuario se le muestra el equivalente 0–100: (pts − 10) / 30 × 100, con el corte en 50.

import { QUESTIONS } from "./questions";

export type QuadrantId = "Perfil_Desarrollo" | "Perfil_Vitrina" | "Experto_Silencioso" | "Lider_Referente";

export const CUTOFF = 25;

export interface Scores {
  serRaw: number;
  ecoRaw: number;
  ser: number; // 0–100
  eco: number; // 0–100
  total: number; // 0–100
  quadrant: QuadrantId;
}

export type Answers = Record<string, number>;

export function validateAnswers(raw: unknown): Answers | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const out: Answers = {};
  for (const q of QUESTIONS) {
    const v = r[q.id];
    if (typeof v !== "number" || !Number.isInteger(v) || v < 1 || v > 4) return null;
    out[q.id] = v;
  }
  return out;
}

export const toHundred = (raw: number, items = 10) => Math.round(((raw - items) / (items * 3)) * 100);

export function quadrantFor(serRaw: number, ecoRaw: number): QuadrantId {
  const highSer = serRaw >= CUTOFF;
  const highEco = ecoRaw >= CUTOFF;
  if (highSer && highEco) return "Lider_Referente";
  if (highSer) return "Experto_Silencioso";
  if (highEco) return "Perfil_Vitrina";
  return "Perfil_Desarrollo";
}

export function computeScores(answers: Answers): Scores {
  let serRaw = 0;
  let ecoRaw = 0;
  for (const q of QUESTIONS) {
    if (q.axis === "ser") serRaw += answers[q.id];
    else ecoRaw += answers[q.id];
  }
  return {
    serRaw,
    ecoRaw,
    ser: toHundred(serRaw),
    eco: toHundred(ecoRaw),
    total: toHundred(serRaw + ecoRaw, 20),
    quadrant: quadrantFor(serRaw, ecoRaw),
  };
}

/** Preguntas con mayor y menor puntaje, para personalizar fortalezas y focos de mejora. */
export function rankItems(answers: Answers) {
  const items = QUESTIONS.map((q, i) => ({ ...q, value: answers[q.id], order: i }));
  const strongest = [...items].sort((a, b) => b.value - a.value || a.order - b.order).slice(0, 3);
  const taken = new Set(strongest.map((i) => i.id));
  const weakest = items
    .filter((i) => !taken.has(i.id))
    .sort((a, b) => a.value - b.value || a.order - b.order)
    .slice(0, 3);
  return { weakest, strongest };
}
