"use client";

import { useEffect, useRef } from "react";
import { QUESTIONS, QUESTIONS_PER_SCREEN, SCALE } from "@/lib/questions";
import type { Answers } from "@/lib/scoring";

interface Props {
  answers: Answers;
  screen: number;
  onAnswer: (a: Answers) => void;
  onScreen: (n: number) => void;
  onBack: () => void;
  onFinish: (a: Answers) => void;
}

const TOTAL_SCREENS = Math.ceil(QUESTIONS.length / QUESTIONS_PER_SCREEN);
const AXIS_LABEL = { ser: "Liderazgo y Criterio", ecosistema: "Ecosistema Digital" } as const;

export default function TestScreens({ answers, screen, onAnswer, onScreen, onBack, onFinish }: Props) {
  const start = screen * QUESTIONS_PER_SCREEN;
  const items = QUESTIONS.slice(start, start + QUESTIONS_PER_SCREEN);
  const complete = items.every((q) => answers[q.id]);
  const answeredTotal = QUESTIONS.filter((q) => answers[q.id]).length;
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, items.length);
  }, [items.length]);

  const choose = (qid: string, value: number, idx: number) => {
    const wasAnswered = !!answers[qid];
    onAnswer({ ...answers, [qid]: value });
    // Lleva a la siguiente pregunta sin responder de esta pantalla.
    if (!wasAnswered) {
      const nextIdx = items.findIndex((q, i) => i > idx && !answers[q.id]);
      const el = nextIdx >= 0 ? refs.current[nextIdx] : document.getElementById("test-actions");
      setTimeout(() => el?.scrollIntoView({ behavior: "smooth", block: "center" }), 180);
    }
  };

  const next = () => {
    if (!complete) return;
    if (screen < TOTAL_SCREENS - 1) onScreen(screen + 1);
    else onFinish(answers);
  };

  return (
    <section className="wrap narrow fade-in" key={screen}>
      <div className="progress" aria-label={`Sección ${screen + 1} de ${TOTAL_SCREENS}`}>
        <span>
          Sección {screen + 1} de {TOTAL_SCREENS}
        </span>
        <div className="progress-bar">
          <i style={{ width: `${(answeredTotal / QUESTIONS.length) * 100}%` }} />
        </div>
        <span>
          {answeredTotal}/{QUESTIONS.length}
        </span>
      </div>

      {screen === 0 && (
        <div className="step-head">
          <h2>Responde según tu realidad de hoy</h2>
          <p className="muted">No hay respuestas correctas: elige la opción que mejor describe tu comportamiento profesional cotidiano.</p>
        </div>
      )}

      {items.map((q, i) => {
        const n = start + i + 1;
        return (
          <div className="q" key={q.id} ref={(el) => { refs.current[i] = el; }}>
            <div className="q-num">
              <b>{String(n).padStart(2, "0")}</b>
              <span>{AXIS_LABEL[q.axis]}</span>
            </div>
            <p className="q-title">{q.title}</p>
            <p className="q-text" id={`q-${q.id}`}>
              {q.text}
            </p>
            <div className="scale" role="radiogroup" aria-labelledby={`q-${q.id}`}>
              {SCALE.map((opt) => (
                <button
                  type="button"
                  role="radio"
                  key={opt.value}
                  aria-checked={answers[q.id] === opt.value}
                  onClick={() => choose(q.id, opt.value, i)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className="actions" id="test-actions">
        <button type="button" className="btn btn-ghost" onClick={() => (screen === 0 ? onBack() : onScreen(screen - 1))}>
          ← Atrás
        </button>
        <button type="button" className="btn btn-primary" disabled={!complete} onClick={next}>
          {screen < TOTAL_SCREENS - 1 ? "Siguiente →" : "Ver mi resultado →"}
        </button>
      </div>
    </section>
  );
}
