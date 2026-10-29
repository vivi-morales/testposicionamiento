// Paso previo al test: registra el lead en estado "iniciado".
import { NextResponse } from "next/server";
import { validateLead } from "@/lib/form-options";
import { insertRow } from "@/lib/supabase";
import { leadColumns } from "@/lib/rows";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (body?.website) return NextResponse.json({ id: null }); // honeypot anti-bots

  const parsed = validateLead(body?.lead);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    const row = await insertRow(leadColumns(parsed.lead, req, body?.utm));
    return NextResponse.json({ id: row.id });
  } catch (err) {
    console.error("[diagnosticos] insert", err);
    return NextResponse.json({ error: "No pudimos guardar tus datos." }, { status: 502 });
  }
}
