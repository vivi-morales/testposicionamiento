"use client";

import { useState } from "react";
import Matrix from "./Matrix";
import type { SavedResult } from "./Funnel";
import type { LeadInput } from "@/lib/form-options";
import { QUADRANTS, brechaPrioritaria } from "@/lib/content";
import { rankItems } from "@/lib/scoring";
import { SCALE } from "@/lib/questions";

const scaleOf = (v: number) => SCALE.find((x) => x.value === v);
import { LINKS, TEST_URL_LABEL, axisLabel } from "@/lib/config";

interface Props {
  lead: LeadInput;
  result: SavedResult;
  onRestart: () => void;
}

const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export default function Result({ lead, result, onRestart }: Props) {
  const { scores } = result;
  const q = QUADRANTS[scores.quadrant];
  const brecha = brechaPrioritaria(scores.quadrant, scores.ser, scores.eco);
  const { strongest, weakest } = rankItems(result.answers);
  const first = lead.nombre.trim().split(/\s+/)[0];
  const [busy, setBusy] = useState<"" | "pdf" | "card">("");
  const [toast, setToast] = useState("");

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const getPdf = async () => {
    setBusy("pdf");
    try {
      const { buildReportPdf } = await import("@/lib/pdf");
      const blob = await buildReportPdf(lead, result);
      download(blob, `Diagnostico-Referente-${slug(lead.nombre)}.pdf`);
    } catch (e) {
      console.error(e);
      flash("No pudimos generar el PDF. Intenta de nuevo.");
    } finally {
      setBusy("");
    }
  };

  const getCard = async () => {
    setBusy("card");
    try {
      const { buildShareCard } = await import("@/lib/share-card");
      const blob = await buildShareCard(scores);
      const file = new File([blob], `mi-resultado-referente.png`, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare?.({ files: [file] }) && window.matchMedia("(pointer: coarse)").matches) {
        await navigator
          .share({ files: [file], title: "Mi resultado", text: `Mi perfil: ${q.name}. ¿Y el tuyo? https://${TEST_URL_LABEL}` })
          .catch(() => undefined);
      } else {
        download(blob, file.name);
        flash("Tarjeta descargada. ¡Compártela en LinkedIn o Instagram!");
      }
    } catch (e) {
      console.error(e);
      flash("No pudimos generar la tarjeta. Intenta de nuevo.");
    } finally {
      setBusy("");
    }
  };

  const nextLink = scores.quadrant === "Experto_Silencioso" || scores.quadrant === "Lider_Referente" ? LINKS.test3 : LINKS.test2;

  return (
    <section className="wrap fade-in">
      <div className="result-hero">
        <div>
          <p className="eyebrow">{first}, tu perfil de posicionamiento es</p>
          <h1>
            {q.name.split(" ").slice(0, -1).join(" ")} <span className="hl">{q.name.split(" ").slice(-1)}</span>
          </h1>
          <p className="lead">{q.headline}</p>

          <div className="scores">
            {[
              { label: axisLabel("x"), v: scores.ser },
              { label: axisLabel("y"), v: scores.eco },
            ].map((r) => (
              <div className="score-row" key={r.label}>
                <span>{r.label}</span>
                <b>
                  {r.v}
                  <small>/100</small>
                </b>
                <div className="bar">
                  <i style={{ width: `${Math.max(2, r.v)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button className="btn btn-primary" onClick={getPdf} disabled={busy !== ""}>
              {busy === "pdf" ? "Generando tu informe…" : "Descargar mi informe (PDF)"}
            </button>
            <button className="btn btn-ghost" onClick={getCard} disabled={busy !== ""}>
              {busy === "card" ? "Creando tarjeta…" : "Compartir mi resultado"}
            </button>
          </div>
          <p className="result-note">Tu informe ejecutivo de 6 páginas incluye la lectura completa de tu perfil y tu ruta de evolución.</p>
        </div>
        <div className="matrix-card">
          <Matrix ser={scores.ser} eco={scores.eco} quadrant={scores.quadrant} />
        </div>
      </div>

      <div className="result-grid">
        <div className="panel">
          <p className="eyebrow">Tu momento actual</p>
          <h3>{q.coords}</h3>
          <p className="muted">{q.estado}</p>
          <p className="eyebrow" style={{ marginTop: 24 }}>
            {brecha.titulo}
          </p>
          <p className="muted">{brecha.texto}</p>
        </div>
        <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
          <div className="panel mint">
            <p className="eyebrow salvia" style={{ color: "#4d6253" }}>
              Tu siguiente paso
            </p>
            <h3>{q.siguientePaso}</h3>
            <p>Profundiza en tu dimensión prioritaria con un diagnóstico detallado y un plan de acción paso a paso.</p>
            <a className="btn btn-dark" href={nextLink} target="_blank" rel="noopener">
              Conocer el test →
            </a>
          </div>
          <div className="panel">
            <p className="eyebrow">Tus puntos más altos</p>
            <ul>
              {strongest.map((i) => (
                <li key={i.id} className="sem">
                  <span className="sem-dot" style={{ background: scaleOf(i.value)?.color }} title={scaleOf(i.value)?.label} />
                  {i.title}
                </li>
              ))}
            </ul>
            <p className="eyebrow" style={{ marginTop: 20 }}>
              Tus mayores oportunidades
            </p>
            <ul>
              {weakest.map((i) => (
                <li key={i.id} className="sem">
                  <span className="sem-dot" style={{ background: scaleOf(i.value)?.color }} title={scaleOf(i.value)?.label} />
                  {i.title}
                </li>
              ))}
            </ul>
            <div className="sem-legend">
              {SCALE.map((x) => (
                <span key={x.value}>
                  <i style={{ background: x.color }} />
                  {x.label}
                </span>
              ))}
            </div>
          </div>
          <a className="btn btn-ghost" href={LINKS.agendar} target="_blank" rel="noopener">
            Agendar una sesión estratégica
          </a>
        </div>
      </div>

      <p style={{ marginTop: 48 }}>
        <button className="restart" onClick={onRestart}>
          Realizar el test nuevamente
        </button>
      </p>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </section>
  );
}
