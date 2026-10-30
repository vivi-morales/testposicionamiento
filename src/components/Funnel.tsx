"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Landing from "./Landing";
import LeadForm from "./LeadForm";
import TestScreens from "./TestScreens";
import Processing from "./Processing";
import Result from "./Result";
import Topbar from "./Topbar";
import type { LeadInput } from "@/lib/form-options";
import { computeScores, type Answers, type Scores } from "@/lib/scoring";
import { PROCESSING_MS } from "@/lib/config";

type Stage = "landing" | "form" | "test" | "processing" | "result";

export interface SavedResult {
  scores: Scores;
  answers: Answers;
  date: string;
}

interface State {
  stage: Stage;
  formStep: number;
  lead: Partial<LeadInput>;
  leadId: string | null;
  answers: Answers;
  screen: number;
  result: SavedResult | null;
}

const KEY = "vmv-test-posicionamiento-v1";
const INITIAL: State = { stage: "landing", formStep: 0, lead: {}, leadId: null, answers: {}, screen: 0, result: null };

function load(): State | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as State;
    // Si se recargó durante el procesamiento, se retoma desde la última pantalla del test.
    if (s.stage === "processing") s.stage = s.result ? "result" : "test";
    return s;
  } catch {
    return null;
  }
}

function readUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    p.forEach((v, k) => {
      if (k.startsWith("utm_")) utm[k] = v;
    });
    return utm;
  } catch {
    return {};
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Funnel() {
  const [s, setS] = useState<State>(INITIAL);
  const [hydrated, setHydrated] = useState(false);
  const utm = useRef<Record<string, string>>({});

  useEffect(() => {
    utm.current = readUtm();
    const saved = load();
    if (saved && saved.stage !== "landing") setS(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [s, hydrated]);

  const patch = useCallback((p: Partial<State>) => setS((prev) => ({ ...prev, ...p })), []);

  const go = useCallback(
    (p: Partial<State>) => {
      patch(p);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [patch],
  );

  const submitLead = async (lead: LeadInput, website: string) => {
    let leadId: string | null = null;
    try {
      const res = await fetch("/api/diagnosticos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, utm: utm.current, website }),
      });
      if (res.ok) leadId = (await res.json()).id ?? null;
    } catch {
      /* si falla, el registro se crea completo al terminar el test */
    }
    go({ lead, leadId, stage: "test", screen: 0 });
  };

  const finishTest = async (answers: Answers) => {
    go({ answers, stage: "processing" });
    const duration = PROCESSING_MS.min + Math.random() * (PROCESSING_MS.max - PROCESSING_MS.min);

    const save = async (): Promise<Scores | null> => {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const res = await fetch("/api/diagnosticos/completar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: s.leadId, lead: s.lead, answers, utm: utm.current }),
          });
          const data = await res.json();
          if (res.ok) return data.scores as Scores;
        } catch {
          /* reintento */
        }
        await wait(1200);
      }
      return null;
    };

    const [scores] = await Promise.all([save(), wait(duration)]);
    go({
      stage: "result",
      result: { scores: scores ?? computeScores(answers), answers, date: new Date().toISOString() },
    });
  };

  const restart = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* noop */
    }
    go({ ...INITIAL, stage: "landing" });
  };

  if (s.stage === "landing") return <Landing onStart={() => go({ stage: "form" })} />;

  return (
    <div className="funnel">
      <div className="wrap">
        <Topbar />
      </div>
      <main className="funnel-main">
        {s.stage === "form" && (
          <LeadForm
            initial={s.lead}
            step={s.formStep}
            onStep={(formStep, lead) => go({ formStep, lead })}
            onSubmit={submitLead}
          />
        )}
        {s.stage === "test" && (
          <TestScreens
            answers={s.answers}
            screen={s.screen}
            onAnswer={(answers) => patch({ answers })}
            onScreen={(screen) => go({ screen })}
            onBack={() => go({ stage: "form", formStep: 2 })}
            onFinish={finishTest}
          />
        )}
        {s.stage === "processing" && <Processing nombre={s.lead.nombre ?? ""} />}
        {s.stage === "result" && s.result && (
          <Result lead={s.lead as LeadInput} result={s.result} onRestart={restart} />
        )}
      </main>
    </div>
  );
}
