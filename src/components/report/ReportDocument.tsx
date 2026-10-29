/* eslint-disable jsx-a11y/alt-text */
// Informe ejecutivo de 6 páginas (Documento 3), con el sistema visual del manual de marca.
import { Circle, Document, Image, Line, Link, Page, Polygon, Rect, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import type { LeadInput } from "@/lib/form-options";
import { desafioOf, rolLabel } from "@/lib/form-options";
import { DESAFIO_LECTURA, EVIDENCIA, QUADRANTS, SERVICIOS, brechaPrioritaria } from "@/lib/content";
import { rankItems, type Answers, type Scores } from "@/lib/scoring";
import { HERE_TEXT, MATRIX_QUADS, clampPoint, hereLabel } from "@/lib/matrix";
import { AXES, HANDLE, LINKS, SITE_LABEL, axisLabel } from "@/lib/config";
import { SCALE } from "@/lib/questions";

const C = {
  carbon: "#191919",
  carbon2: "#232323",
  carbon3: "#2e2e2e",
  menta: "#D4FFDE",
  verde: "#A4FFBB",
  salvia: "#758B7B",
  salviaOscuro: "#4D6253",
  gris: "#515151",
  hueso: "#F4F3EF",
  blanco: "#FFFFFF",
  suave: "#B9B9B9",
};

const s = StyleSheet.create({
  page: { fontFamily: "Poppins", fontSize: 10, lineHeight: 1.5, paddingTop: 54, paddingBottom: 78, paddingHorizontal: 50 },
  dark: { backgroundColor: C.carbon, color: C.blanco },
  mint: { backgroundColor: C.menta, color: C.carbon },
  light: { backgroundColor: C.hueso, color: C.carbon },
  header: { position: "absolute", top: 24, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between", fontSize: 7, letterSpacing: 1.4, fontWeight: 600 },
  footer: { position: "absolute", bottom: 22, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", borderTopWidth: 1, paddingTop: 9 },
  eyebrow: { fontSize: 8, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", marginBottom: 8 },
  h1: { fontSize: 30, fontWeight: 700, lineHeight: 1.12 },
  h2: { fontSize: 22, fontWeight: 700, lineHeight: 1.15, marginBottom: 10 },
  h3: { fontSize: 12.5, fontWeight: 700, lineHeight: 1.25, marginBottom: 5 },
  p: { marginBottom: 6 },
  hl: { backgroundColor: C.menta, color: C.carbon, paddingHorizontal: 6, borderRadius: 3 },
  row: { flexDirection: "row" },
  box: { borderRadius: 8, padding: 14 },
  numLight: { fontSize: 34, fontWeight: 300, color: C.salvia, lineHeight: 1 },
  bulletRow: { flexDirection: "row", marginBottom: 6 },
  bullet: { width: 6, height: 6, backgroundColor: C.salvia, borderRadius: 1, marginTop: 5, marginRight: 9 },
  btn: { backgroundColor: C.menta, color: C.carbon, borderRadius: 6, paddingVertical: 8, paddingHorizontal: 12, fontWeight: 600, fontSize: 9, textDecoration: "none", textAlign: "center" },
});

interface Props {
  lead: LeadInput;
  scores: Scores;
  answers: Answers;
  date: Date;
  origin: string;
}

function Header({ n, color }: { n: number; color: string }) {
  return (
    <View style={[s.header, { color }]} fixed>
      <Text>VIVI MORALES VILLA / MÉTODO REFERENTE®</Text>
      <Text>{String(n).padStart(2, "0")} / 06</Text>
    </View>
  );
}

function Footer({ color, accent, line }: { color: string; accent: string; line: string }) {
  return (
    <View style={[s.footer, { color, borderTopColor: line }]} fixed>
      <View>
        <Text style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: 0.4 }}>{HANDLE}</Text>
        <Text style={{ fontSize: 6.5, marginTop: 1 }}>Copyright © {new Date().getFullYear()} Vivi Morales Villa</Text>
      </View>
      <Link src={LINKS.sitio} style={{ fontSize: 12, fontWeight: 700, color: accent, textDecoration: "none" }}>
        {SITE_LABEL}
      </Link>
    </View>
  );
}

function Bullets({ items, color = C.salvia }: { items: string[]; color?: string }) {
  return (
    <View>
      {items.map((t) => (
        <View style={s.bulletRow} key={t} wrap={false}>
          <View style={[s.bullet, { backgroundColor: color }]} />
          <Text style={{ flex: 1 }}>{t}</Text>
        </View>
      ))}
    </View>
  );
}

function MatrixPdf({ scores }: { scores: Scores }) {
  const L = 34, T = 8, S = 300;
  const px = (x: number) => L + (x / 100) * S;
  const py = (y: number) => T + S - (y / 100) * S;
  const cx = px(clampPoint(scores.ser));
  const cy = py(clampPoint(scores.eco));
  const here = hereLabel(cx, cy, scores.ser, scores.eco, 76, 17, 11, 8, S / 100);
  return (
    <Svg width={346} height={346} viewBox="0 0 346 346">
      {MATRIX_QUADS.map((q) => {
        const active = q.id === scores.quadrant;
        const x = px(q.x0), y = py(q.y0 + 50);
        return (
          <Rect key={q.id} x={x + 3} y={y + 3} width={S / 2 - 6} height={S / 2 - 6} rx={8} fill={active ? C.menta : C.carbon3} />
        );
      })}
      <Line x1={cx} y1={cy} x2={cx} y2={py(0)} stroke={C.salvia} strokeWidth={1} strokeDasharray="3,3" />
      <Line x1={px(0)} y1={cy} x2={cx} y2={cy} stroke={C.salvia} strokeWidth={1} strokeDasharray="3,3" />
      {MATRIX_QUADS.map((q) =>
        q.label.map((t, i) => (
          // Fondo del color de la celda para que la guía punteada pase por detrás del texto
          <Rect
            key={q.id + t + "bg"}
            x={px(q.x0) + S / 4 - t.length * 3.2}
            y={py(q.y0 + 50) + 18 + i * 12}
            width={t.length * 6.4}
            height={12}
            fill={q.id === scores.quadrant ? C.menta : C.carbon3}
          />
        )),
      )}
      {MATRIX_QUADS.map((q) =>
        q.label.map((t, i) => (
          <Text
            key={q.id + t}
            x={px(q.x0) + S / 4}
            y={py(q.y0 + 50) + 26 + i * 12}
            textAnchor="middle"
            style={{ fontSize: 9, fontWeight: 700, fontFamily: "Poppins" }}
            fill={q.id === scores.quadrant ? C.carbon : "#777777"}
          >
            {t}
          </Text>
        )),
      )}
      <Line x1={px(0)} y1={py(0)} x2={px(100)} y2={py(0)} stroke={C.gris} strokeWidth={1} />
      <Line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(100)} stroke={C.gris} strokeWidth={1} />
      <Circle cx={cx} cy={cy} r={8} fill={C.carbon} stroke={C.blanco} strokeWidth={2.5} />
      <Circle cx={cx} cy={cy} r={3} fill={C.verde} />
      <Line x1={here.start[0]} y1={here.start[1]} x2={here.base[0]} y2={here.base[1]} stroke={C.carbon} strokeWidth={1.5} />
      <Polygon points={`${here.tip[0]},${here.tip[1]} ${here.head1[0]},${here.head1[1]} ${here.head2[0]},${here.head2[1]}`} fill={C.carbon} />
      <Rect x={here.x} y={here.y} width={here.w} height={here.h} rx={8} fill={C.carbon} />
      <Text x={here.cxText} y={here.y + 11.5} textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fontFamily: "Poppins" }} fill={C.menta}>
        {HERE_TEXT}
      </Text>
      <Text x={px(50)} y={336} textAnchor="middle" style={{ fontSize: 8, fontFamily: "Poppins" }} fill={C.suave}>
        {`${AXES.x.nombre} ${AXES.x.tag}`.toUpperCase()}
      </Text>
      <Text x={12} y={py(50)} textAnchor="middle" transform={`rotate(-90, 12, ${py(50)})`} style={{ fontSize: 8, fontFamily: "Poppins" }} fill={C.suave}>
        {`${AXES.y.nombre} ${AXES.y.tag}`.toUpperCase()}
      </Text>
    </Svg>
  );
}

function ScoreBar({ label, value, dark = true }: { label: string; value: number; dark?: boolean }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <View style={[s.row, { justifyContent: "space-between", alignItems: "flex-end", marginBottom: 5 }]}>
        <Text style={{ fontSize: 9, color: dark ? C.suave : C.gris }}>{label}</Text>
        <Text style={{ fontSize: 18, fontWeight: 700 }}>
          {value}
          <Text style={{ fontSize: 9, fontWeight: 400, color: dark ? C.suave : C.gris }}>/100</Text>
        </Text>
      </View>
      <View style={{ height: 6, backgroundColor: dark ? C.carbon3 : "#dddddd", borderRadius: 3 }}>
        <View style={{ width: `${Math.max(2, value)}%`, height: 6, backgroundColor: dark ? C.menta : C.salvia, borderRadius: 3 }} />
      </View>
    </View>
  );
}

export default function ReportDocument({ lead, scores, answers, date, origin }: Props) {
  const q = QUADRANTS[scores.quadrant];
  const brecha = brechaPrioritaria(scores.quadrant, scores.ser, scores.eco);
  const desafio = desafioOf(lead.desafio);
  const { strongest, weakest } = rankItems(answers);
  const img = (p: string) => `${origin}${p}`;
  const fecha = date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  const scaleColor = (v: number) => SCALE.find((x) => x.value === v)?.color ?? C.gris;

  const datos: [string, string][] = [
    ["Evaluado/a", lead.nombre],
    ["Perfil profesional", rolLabel(lead.rol)],
    ["Empresa / Proyecto", lead.empresa],
    ["Sector", lead.sector],
    ["Correo electrónico", lead.email],
    ["Fecha de emisión", fecha],
  ];

  return (
    <Document title={`Diagnóstico de Posicionamiento y Liderazgo Referente — ${lead.nombre}`} author="Vivi Morales Villa" subject="Método REFERENTE®" language="es">
      {/* Página 1 · Portada */}
      <Page size="A4" style={[s.page, s.dark, { paddingTop: 40 }]}>
        <View style={[s.row, { justifyContent: "space-between", alignItems: "center" }]}>
          <Image src={img("/brand/logo-wordmark-blanco.png")} style={{ width: 150 }} />
          <Link src={LINKS.sitio} style={{ fontSize: 13, fontWeight: 700, color: C.blanco, textDecoration: "none" }}>{SITE_LABEL}</Link>
        </View>

        <View style={{ marginTop: 110 }}>
          <Text style={[s.eyebrow, { color: C.menta }]}>Informe ejecutivo de diagnóstico</Text>
          <Text style={[s.h1, { fontSize: 32 }]}>Descubre tu Nivel de</Text>
          <Text style={[s.h1, { fontSize: 32 }]}>Posicionamiento y Liderazgo</Text>
          <View style={[s.row, { marginTop: 8 }]}>
            <View style={{ backgroundColor: C.menta, borderRadius: 4, paddingHorizontal: 14, paddingTop: 1, paddingBottom: 8 }}>
              <Text style={[s.h1, { fontSize: 32, color: C.carbon, lineHeight: 1.1 }]}>Referente</Text>
            </View>
          </View>
          <Text style={{ fontSize: 11, marginTop: 16, color: C.suave, width: 380 }}>
            Evaluación de Madurez Profesional: integración de Liderazgo y Criterio #LiderazgoReferente y Posicionamiento #ReferenteDigital.
          </Text>
        </View>

        <View style={{ marginTop: 56, borderTopWidth: 1, borderTopColor: C.carbon3 }}>
          {datos.map(([k, v]) => (
            <View key={k} style={[s.row, { borderBottomWidth: 1, borderBottomColor: C.carbon3, paddingVertical: 7 }]}>
              <Text style={{ width: 140, fontSize: 8, color: C.salvia, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{k}</Text>
              <Text style={{ flex: 1, fontSize: 10.5 }}>{v}</Text>
            </View>
          ))}
        </View>

        <View style={[s.row, { position: "absolute", left: 50, right: 50, bottom: 56, justifyContent: "space-between", alignItems: "flex-end" }]}>
          <View>
            <Image src={img("/brand/monograma-blanco.png")} style={{ width: 70, marginBottom: 8 }} />
            <Text style={{ fontSize: 8, color: C.suave }}>Método REFERENTE® por Vivi Morales Villa</Text>
          </View>
          <Text style={{ fontSize: 15, fontWeight: 700, color: C.menta }}>{HANDLE}</Text>
        </View>
        <Image src={img("/brand/logo-wordmark-blanco.png")} style={{ position: "absolute", left: -10, right: -10, bottom: -14, opacity: 0.05 }} />
      </Page>

      {/* Página 2 · Marco metodológico */}
      <Page size="A4" style={[s.page, s.mint]}>
        <Header n={2} color={C.salviaOscuro} />
        <Text style={[s.eyebrow, { color: C.salviaOscuro }]}>Marco metodológico</Text>
        <Text style={s.h2}>Las 2 dimensiones de la autoridad profesional</Text>
        <Text style={[s.p, { width: 440 }]}>
          Trabajar duro en silencio ya no garantiza el reconocimiento. La autoridad sostenible no es producto de la suerte ni
          de la exposición aleatoria: proviene del equilibrio entre el Liderazgo Real y la Visibilidad Estratégica.
        </Text>

        <View style={[s.row, { marginTop: 14, alignItems: "stretch" }]}>
          <View style={[s.box, { backgroundColor: C.blanco, flex: 1 }]}>
            <Text style={{ fontSize: 7.5, fontWeight: 600, color: C.salviaOscuro, letterSpacing: 1 }}>{AXES.x.eje.toUpperCase()}</Text>
            <Text style={{ fontWeight: 700, fontSize: 10.5 }}>{AXES.x.nombre}</Text>
            <Text style={{ fontSize: 9, color: C.gris }}>{AXES.x.tag}</Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 300, color: C.salviaOscuro, alignSelf: "center", marginHorizontal: 10 }}>+</Text>
          <View style={[s.box, { backgroundColor: C.blanco, flex: 1 }]}>
            <Text style={{ fontSize: 7.5, fontWeight: 600, color: C.salviaOscuro, letterSpacing: 1 }}>{AXES.y.eje.toUpperCase()}</Text>
            <Text style={{ fontWeight: 700, fontSize: 10.5 }}>{AXES.y.nombre}</Text>
            <Text style={{ fontSize: 9, color: C.gris }}>{AXES.y.tag}</Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 300, color: C.salviaOscuro, alignSelf: "center", marginHorizontal: 10 }}>=</Text>
          <View style={[s.box, { backgroundColor: C.carbon, flex: 1 }]}>
            <Text style={{ fontWeight: 700, fontSize: 10.5, color: C.menta }}>Efecto Imán</Text>
            <Text style={{ fontSize: 9, color: C.suave }}>Impacto de mercado</Text>
          </View>
        </View>

        {[
          {
            n: "01",
            t: axisLabel("x"),
            d: "Evalúa la profundidad de tu visión, tu capacidad de comunicación, tu autoridad personal y tu habilidad para delegar y tomar decisiones estratégicas, con base en los 9 Estadios del Liderazgo Referente.",
          },
          {
            n: "02",
            t: axisLabel("y"),
            d: "Mide la estructura de tu huella digital, la claridad de tu Método propio, la optimización de tus perfiles profesionales y tu nivel de visibilidad en buscadores e Inteligencia Artificial, con base en los 5 Ejes del Posicionamiento Referente.",
          },
        ].map((x) => (
          <View key={x.n} style={[s.row, { marginTop: 22 }]} wrap={false}>
            <Text style={[s.numLight, { width: 62, color: C.salviaOscuro }]}>{x.n}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.h3}>{x.t}</Text>
              <Text>{x.d}</Text>
            </View>
          </View>
        ))}

        <View style={[s.box, { backgroundColor: C.blanco, marginTop: 22 }]}>
          <Text style={[s.eyebrow, { color: C.salviaOscuro, marginBottom: 4 }]}>Escala de medición</Text>
          <Text>
            Cada eje se evalúa con 10 preguntas y se expresa de 0 a 100 puntos. El punto de corte estratégico (50/100) separa
            el nivel inicial e intermedio del nivel consolidado y te ubica en uno de los cuatro cuadrantes de la Matriz de Posicionamiento Referente.
          </Text>
        </View>

        <View style={[s.row, { marginTop: 22 }]}>
          {EVIDENCIA.map((e, i) => (
            <View key={e.cifra} style={[s.box, { backgroundColor: C.carbon, color: C.blanco, flex: 1, marginLeft: i ? 10 : 0 }]}>
              <Text style={{ fontSize: 24, fontWeight: 700, color: C.menta, lineHeight: 1 }}>{e.cifra}</Text>
              <Text style={{ fontSize: 8, marginTop: 6, lineHeight: 1.4 }}>{e.texto}</Text>
              <Text style={{ fontSize: 6.5, marginTop: 6, color: C.salvia }}>{e.fuente}</Text>
            </View>
          ))}
        </View>
        <Footer color={C.salviaOscuro} accent={C.carbon} line="#B7E3C2" />
      </Page>

      {/* Página 3 · Matriz de Posicionamiento Referente */}
      <Page size="A4" style={[s.page, s.dark]}>
        <Header n={3} color={C.salvia} />
        <Text style={[s.eyebrow, { color: C.menta }]}>Visualización del diagnóstico</Text>
        <Text style={s.h2}>Tu ubicación en la Matriz de Posicionamiento Referente</Text>
        <View style={{ alignItems: "center", marginTop: 10, marginBottom: 18 }}>
          <MatrixPdf scores={scores} />
        </View>
        <View style={[s.row, { alignItems: "stretch" }]}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <ScoreBar label={axisLabel("x")} value={scores.ser} />
            <ScoreBar label={axisLabel("y")} value={scores.eco} />
            <ScoreBar label="Índice global de posicionamiento Referente" value={scores.total} />
          </View>
          <View style={[s.box, { backgroundColor: C.menta, color: C.carbon, width: 200, justifyContent: "center" }]}>
            <Text style={[s.eyebrow, { color: C.salviaOscuro }]}>Cuadrante {q.number} de 4</Text>
            <Text style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.15 }}>{q.name}</Text>
            <Text style={{ fontSize: 8.5, marginTop: 8 }}>{q.coords}</Text>
          </View>
        </View>
        <Footer color={C.suave} accent={C.menta} line={C.carbon3} />
      </Page>

      {/* Página 4 · Diagnóstico profundo */}
      <Page size="A4" style={[s.page, s.light]}>
        <Header n={4} color={C.salvia} />
        <Text style={[s.eyebrow, { color: C.salvia }]}>
          Diagnóstico profundo · Cuadrante {q.number} · {q.coords}
        </Text>
        <Text style={[s.h2, { fontSize: 26 }]}>{q.name}</Text>
        <Text style={{ fontSize: 11, fontWeight: 500, marginBottom: 14 }}>{q.headline}</Text>

        <Text style={[s.h3]}>Estado actual</Text>
        <Text style={[s.p, { fontSize: 9.5 }]}>{q.estado}</Text>

        <Text style={[s.h3, { marginTop: 8 }]}>Síntomas clave</Text>
        <View style={{ fontSize: 9.5 }}>
          <Bullets items={q.sintomas} />
        </View>

        <View style={[s.row, { marginTop: 10, alignItems: "stretch" }]} wrap={false}>
          <View style={[s.box, { backgroundColor: C.menta, flex: 1, marginRight: 10 }]}>
            <Text style={[s.eyebrow, { color: C.salviaOscuro }]}>El costo oculto</Text>
            <Text style={[s.h3, { fontSize: 11 }]}>{q.costoTitulo}</Text>
            <Text style={{ fontSize: 9 }}>{q.costo}</Text>
          </View>
          <View style={[s.box, { backgroundColor: C.carbon, color: C.blanco, flex: 1.25 }]}>
            <Text style={[s.eyebrow, { color: C.menta }]}>Diagnóstico estratégico y ruta de acción</Text>
            <Text style={{ fontSize: 9 }}>{q.diagnostico}</Text>
          </View>
        </View>
        <Footer color={C.gris} accent={C.carbon} line="#DCDCD6" />
      </Page>

      {/* Página 5 · Recomendaciones y ruta */}
      <Page size="A4" style={[s.page, s.dark]}>
        <Header n={5} color={C.salvia} />
        <Text style={[s.eyebrow, { color: C.menta }]}>Recomendaciones personalizadas</Text>
        <Text style={s.h2}>Tu ruta de evolución</Text>

        <View style={[s.box, { backgroundColor: C.carbon2, borderLeftWidth: 3, borderLeftColor: C.menta, marginTop: 4 }]}>
          <Text style={[s.h3, { color: C.menta }]}>{brecha.titulo}</Text>
          <Text style={{ fontSize: 9.5 }}>{brecha.texto}</Text>
        </View>

        {desafio && (
          <View style={{ marginTop: 14 }}>
            <Text style={[s.eyebrow, { color: C.salvia }]}>Tu desafío declarado</Text>
            <Text style={{ fontSize: 9.5, fontStyle: "normal", color: C.suave }}>“{desafio.label}”</Text>
            <Text style={{ fontSize: 9.5, marginTop: 6 }}>{DESAFIO_LECTURA[lead.desafio]}</Text>
          </View>
        )}

        <View style={[s.row, { marginTop: 16 }]}>
          {[
            { t: "Tus puntos más altos", items: strongest },
            { t: "Tus mayores oportunidades", items: weakest },
          ].map((col, i) => (
            <View key={col.t} style={{ flex: 1, marginLeft: i ? 16 : 0 }}>
              <Text style={[s.eyebrow, { color: C.menta }]}>{col.t}</Text>
              {col.items.map((it) => (
                <View key={it.id} style={[s.row, { justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: C.carbon3, paddingVertical: 5 }]}>
                  <Text style={{ fontSize: 9, flex: 1 }}>{it.title}</Text>
                  <View style={{ width: 9, height: 9, borderRadius: 4.5, backgroundColor: scaleColor(it.value), marginLeft: 8 }} />
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={[s.row, { marginTop: 10, alignItems: "center" }]}>
          {SCALE.map((x) => (
            <View key={x.value} style={[s.row, { alignItems: "center", marginRight: 14 }]}>
              <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: x.color, marginRight: 4 }} />
              <Text style={{ fontSize: 7.5, color: C.suave }}>{x.label}</Text>
            </View>
          ))}
        </View>

        <View style={[s.box, { borderWidth: 1, borderColor: C.carbon3, marginTop: 22 }]}>
          <Text style={[s.h3, { fontSize: 10.5 }]}>¿Quieres llevar esta evaluación a un nivel más profundo con tu equipo de trabajo u organización?</Text>
          <Text style={{ fontSize: 8.5, color: C.suave }}>
            Evaluación del índice de visibilidad para comités directivos y equipos de trabajo.{" "}
            <Link src={LINKS.equipos} style={{ color: C.menta }}>
              Solicitar información
            </Link>
          </Text>
        </View>
        <Footer color={C.suave} accent={C.menta} line={C.carbon3} />
      </Page>

      {/* Página 6 · Plan de acción y CTA */}
      <Page size="A4" style={[s.page, s.light]}>
        <Header n={6} color={C.salvia} />
        <Text style={[s.eyebrow, { color: C.salvia }]}>Plan de acción</Text>
        <Text style={s.h2}>Tus próximos 3 pasos</Text>

        {[
          { n: "01", t: "Guarda y comparte tu resultado", d: "Comparte tu tarjeta de resultado con colegas y tu equipo: el posicionamiento empieza por reconocer e identificar tu momento actual." },
          { n: "02", t: "Profundiza en tu dimensión prioritaria", d: `Concentra tu energía en ${brecha.titulo.replace("Prioridad: ", "")}: con un acompañamiento personalizado, este diagnóstico se convierte en un plan de acción concreto para tu siguiente nivel.` },
          { n: "03", t: "Agenda una sesión estratégica", d: "Conversa con Vivi Morales Villa sobre tu resultado, o conoce los programas y conferencias del Método REFERENTE®." },
        ].map((x) => (
          <View key={x.n} style={[s.row, { marginTop: 12, alignItems: "flex-start" }]} wrap={false}>
            <Text style={[s.numLight, { width: 62 }]}>{x.n}</Text>
            <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: "#dcdcd6", paddingBottom: 10 }}>
              <Text style={s.h3}>{x.t}</Text>
              <Text style={{ fontSize: 9.5 }}>{x.d}</Text>
            </View>
          </View>
        ))}

        <View style={[s.row, { marginTop: 18 }]}>
          <Link src={LINKS.agendar} style={[s.btn, { backgroundColor: C.carbon, color: C.blanco, flex: 1, marginRight: 8 }]}>
            Agendar sesión estratégica
          </Link>
          <Link src={LINKS.programas} style={[s.btn, { backgroundColor: C.blanco, flex: 1, borderWidth: 1, borderColor: "#dcdcd6" }]}>
            Programas y conferencias
          </Link>
        </View>

        <View style={[s.row, { marginTop: 20, backgroundColor: C.carbon, borderRadius: 10, color: C.blanco, overflow: "hidden" }]} wrap={false}>
          <View style={{ flex: 1, padding: 18 }}>
            <Text style={[s.eyebrow, { color: C.menta }]}>Acompañamiento directo</Text>
            {SERVICIOS.map((sv) => (
              <View key={sv.titulo} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: 700, fontSize: 9.5 }}>{sv.titulo}</Text>
                <Text style={{ fontSize: 8, color: C.suave }}>{sv.texto}</Text>
              </View>
            ))}
            <Text style={{ fontWeight: 700, color: C.menta, fontSize: 10.5, marginTop: 4 }}>Vivi Morales Villa</Text>
            <Text style={{ fontSize: 7.5, color: C.suave }}>
              Conferencista y entrenadora de Referentes · Estratega de Liderazgo y Posicionamiento · Creadora del Método REFERENTE®
            </Text>
            <Text style={{ fontSize: 8, color: C.menta, marginTop: 6, letterSpacing: 1.5 }}>{HANDLE.toUpperCase()}</Text>
          </View>
          <Image src={img("/photos/vivi-editorial.png")} style={{ width: 150, objectFit: "cover", objectPosition: "top" }} />
        </View>
        <Footer color={C.gris} accent={C.carbon} line="#DCDCD6" />
      </Page>
    </Document>
  );
}
