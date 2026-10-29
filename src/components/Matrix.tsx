import { HERE_TEXT, MATRIX_QUADS, clampPoint, hereLabel } from "@/lib/matrix";
import { AXES } from "@/lib/config";
import type { QuadrantId } from "@/lib/scoring";

// Área del gráfico dentro del viewBox 420 × 420.
const L = 44, T = 16, S = 360;
const px = (x: number) => L + (x / 100) * S;
const py = (y: number) => T + S - (y / 100) * S;

export default function Matrix({ ser, eco, quadrant }: { ser: number; eco: number; quadrant: QuadrantId }) {
  const cx = px(clampPoint(ser));
  const cy = py(clampPoint(eco));
  const here = hereLabel(cx, cy, ser, eco, 104, 24, 16, 10, S / 100);
  return (
    <svg viewBox="0 0 420 420" role="img" aria-label={`Matriz de Posicionamiento Referente: Liderazgo y Criterio ${ser} de 100, Posicionamiento ${eco} de 100`}>
      {MATRIX_QUADS.map((q) => (
        <rect key={q.id} x={px(q.x0) + 3} y={py(q.y0 + 50) + 3} width={S / 2 - 6} height={S / 2 - 6} rx={10} fill={q.id === quadrant ? "#d4ffde" : "#2a2a2a"} />
      ))}
      <line x1={cx} y1={cy} x2={cx} y2={py(0)} stroke="#758b7b" strokeDasharray="3 4" />
      <line x1={px(0)} y1={cy} x2={cx} y2={cy} stroke="#758b7b" strokeDasharray="3 4" />
      {MATRIX_QUADS.map((q) => {
        const active = q.id === quadrant;
        const cell = active ? "#d4ffde" : "#2a2a2a";
        return q.label.map((t, i) => (
          // El trazo del color de la celda hace que la guía punteada pase por detrás del texto
          <text key={q.id + t} x={px(q.x0) + S / 4} y={py(q.y0 + 50) + 34 + i * 16} textAnchor="middle" fontSize="12" fontWeight={active ? 700 : 600} letterSpacing="1.2" fill={active ? "#191919" : "#6b6b6b"} stroke={cell} strokeWidth={6} paintOrder="stroke">
            {t}
          </text>
        ));
      })}
      <line x1={px(0)} y1={py(0)} x2={px(100)} y2={py(0)} stroke="#515151" />
      <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(100)} stroke="#515151" />
      <text x={px(50)} y={410} textAnchor="middle" fontSize="11" fill="#9a9a9a" letterSpacing="1">
        {`${AXES.x.nombre} ${AXES.x.tag}`} →
      </text>
      <text x={16} y={py(50)} textAnchor="middle" fontSize="11" fill="#9a9a9a" letterSpacing="1" transform={`rotate(-90 16 ${py(50)})`}>
        {`${AXES.y.nombre} ${AXES.y.tag}`} →
      </text>
      <circle cx={cx} cy={cy} r={16} fill="#191919" opacity={0.25} />
      <circle cx={cx} cy={cy} r={9} fill="#191919" stroke="#ffffff" strokeWidth={3} />
      <circle cx={cx} cy={cy} r={3.5} fill="#a4ffbb" />
      <line x1={here.start[0]} y1={here.start[1]} x2={here.base[0]} y2={here.base[1]} stroke="#191919" strokeWidth={2} />
      <polygon points={`${here.tip[0]},${here.tip[1]} ${here.head1[0]},${here.head1[1]} ${here.head2[0]},${here.head2[1]}`} fill="#191919" />
      <rect x={here.x} y={here.y} width={here.w} height={here.h} rx={12} fill="#191919" />
      <text x={here.cxText} y={here.y + 16} textAnchor="middle" fontSize="12" fontWeight={700} fill="#d4ffde">
        {HERE_TEXT}
      </text>
    </svg>
  );
}
