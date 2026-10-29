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

// Franjas verticales (en % del eje Y) ocupadas por los nombres de los cuadrantes.
const TITLE_ZONES = [
  [79, 98],
  [29, 48],
] as const;

/**
 * Posición de la etiqueta "Tú estás aquí" y de su flecha, en píxeles del gráfico.
 * `unit` = píxeles por cada 1% del eje. La etiqueta va al lado derecho del punto (izquierdo cerca
 * del borde) y a la altura más cercana que no tape los nombres de los cuadrantes.
 */
export function hereLabel(cx: number, cy: number, ser: number, eco: number, w: number, h: number, gap: number, dotR: number, unit: number) {
  const X = clampPoint(ser), Y = clampPoint(eco);
  const dx = X + (gap + w) / unit <= 99 ? 1 : -1; // a la derecha si cabe; si no, a la izquierda
  const hh = h / 2 / unit; // media altura de la etiqueta en %
  const d = (gap + h / 2) / unit; // separación mínima desde el punto en %
  const candidates = [Y + d, Y - d, ...TITLE_ZONES.flatMap(([lo, hi]) => [lo - 1 - hh, hi + 1 + hh])];
  const fits = (c: number) =>
    c - hh >= 1 && c + hh <= 99 && Math.abs(c - Y) >= d - 0.01 && TITLE_ZONES.every(([lo, hi]) => c + hh < lo || c - hh > hi);
  const ok = candidates.filter(fits).sort((a, b) => Math.abs(a - Y) - Math.abs(b - Y));
  const yc = ok[0] ?? Y + d;

  const lx = cx + dx * (w / 2 + gap);
  const ly = cy - (yc - Y) * unit;
  // La flecha sale del borde de la etiqueta que mira al punto y termina junto al punto.
  const sx = lx - dx * (w / 2 - h * 0.6);
  const sy = ly + (ly < cy ? h / 2 : -h / 2);
  const len = Math.hypot(sx - cx, sy - cy) || 1;
  const ux = (sx - cx) / len, uy = (sy - cy) / len;
  const tx = cx + ux * (dotR + 3), ty = cy + uy * (dotR + 3);
  const head = h * 0.32;
  const bx = tx + ux * head, by = ty + uy * head;
  const head1 = [bx - uy * head * 0.6, by + ux * head * 0.6] as const;
  const head2 = [bx + uy * head * 0.6, by - ux * head * 0.6] as const;
  return { x: lx - w / 2, y: ly - h / 2, w, h, cxText: lx, start: [sx, sy] as const, tip: [tx, ty] as const, base: [bx, by] as const, head1, head2 };
}

export const HERE_TEXT = "Tú estás aquí";
