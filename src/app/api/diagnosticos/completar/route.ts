// Al terminar el test: calcula el resultado en el servidor y lo guarda.
// Si el registro previo no existe (falló al iniciar) o ya estaba completado (repite el test),
// se crea un registro nuevo completo para no perder el diagnóstico.
import { NextResponse } from "next/server";
import { validateLead } from "@/lib/form-options";
import { computeScores, validateAnswers } from "@/lib/scoring";
import { completeRow, insertRow } from "@/lib/supabase";
import { UUID_RE, leadColumns, resultColumns } from "@/lib/rows";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (body?.website) return NextResponse.json({ ok: true });

  const answers = validateAnswers(body?.answers);
  if (!answers) return NextResponse.json({ error: "Respuestas incompletas." }, { status: 400 });
  const parsed = validateLead(body?.lead);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const scores = computeScores(answers);
  const result = resultColumns(answers, scores);

  try {
    let row = typeof body.id === "string" && UUID_RE.test(body.id) ? await completeRow(body.id, result) : null;
    if (!row) row = await insertRow({ ...leadColumns(parsed.lead, req, body?.utm), ...result });
    return NextResponse.json({ id: row.id, scores });
  } catch (err) {
    console.error("[diagnosticos] completar", err);
    return NextResponse.json({ error: "No pudimos guardar el resultado.", scores }, { status: 502 });
  }
}
