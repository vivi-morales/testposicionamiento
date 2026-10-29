import { MATRIX_QUADS, clampPoint } from "@/lib/matrix";
import type { QuadrantId } from "@/lib/scoring";

// Área del gráfico dentro del viewBox 420 × 420.
const L = 44, T = 16, S = 360;
const px = (x: number) => L + (x / 100) * S;
const py = (y: number) => T + S - (y / 100) * S;

export default function Matrix({ ser, eco, quadrant }: { ser: number; eco: number; quadrant: QuadrantId }) {
  const cx = px(clampPoint(ser));
  const cy = py(clampPoint(eco));
  return (
    <svg viewBox="0 0 420 420" role="img" aria-label={`Matriz Dual: Liderazgo ${ser} de 100, Ecosistema ${eco} de 100`}>
      {MATRIX_QUADS.map((q) => {
        const active = q.id === quadrant;
        const x = px(q.x0), y = py(q.y0 + 50);
        return (
          <g key={q.id}>
            <rect x={x + 3} y={y + 3} width={S / 2 - 6} height={S / 2 - 6} rx={10} fill={active ? "#d4ffde" : "#2a2a2a"} />
            {q.label.map((t, i) => (
              <text key={t} x={x + S / 4} y={y + 34 + i * 16} textAnchor="middle" fontSize="12" fontWeight={active ? 700 : 600} letterSpacing="1.2" fill={active ? "#191919" : "#6b6b6b"}>
                {t}
              </text>
            ))}
          </g>
        );
      })}
      <line x1={px(0)} y1={py(0)} x2={px(100)} y2={py(0)} stroke="#515151" />
      <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(100)} stroke="#515151" />
      <text x={px(50)} y={410} textAnchor="middle" fontSize="11" fill="#9a9a9a" letterSpacing="1">
        LIDERAZGO Y CRITERIO (EL SER) →
      </text>
      <text x={16} y={py(50)} textAnchor="middle" fontSize="11" fill="#9a9a9a" letterSpacing="1" transform={`rotate(-90 16 ${py(50)})`}>
        ECOSISTEMA DIGITAL →
      </text>
      <line x1={cx} y1={cy} x2={cx} y2={py(0)} stroke="#758b7b" strokeDasharray="3 4" />
      <line x1={px(0)} y1={cy} x2={cx} y2={cy} stroke="#758b7b" strokeDasharray="3 4" />
      <circle cx={cx} cy={cy} r={16} fill="#191919" opacity={0.25} />
      <circle cx={cx} cy={cy} r={9} fill="#191919" stroke="#ffffff" strokeWidth={3} />
      <circle cx={cx} cy={cy} r={3.5} fill="#a4ffbb" />
    </svg>
  );
}
