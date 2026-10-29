// Geometría compartida de la Matriz Dual (web, PDF y tarjeta compartible).
import type { QuadrantId } from "./scoring";

/** Cuadrantes en coordenadas de la matriz (x = SER, y = ECOSISTEMA; 0–100, y hacia arriba). */
export const MATRIX_QUADS: { id: QuadrantId; label: [string, string]; x0: number; y0: number }[] = [
  { id: "Perfil_Vitrina", label: ["PERFIL DE", "VITRINA"], x0: 0, y0: 50 },
  { id: "Lider_Referente", label: ["LÍDER", "REFERENTE"], x0: 50, y0: 50 },
  { id: "Perfil_Desarrollo", label: ["PERFIL EN", "DESARROLLO"], x0: 0, y0: 0 },
  { id: "Experto_Silencioso", label: ["EXPERTO", "SILENCIOSO"], x0: 50, y0: 0 },
];

/** Evita que el punto quede pegado al borde del gráfico. */
export const clampPoint = (v: number) => Math.min(95, Math.max(5, v));
