"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Procesando tus 20 respuestas",
  "Analizando tu Eje X: Liderazgo y Criterio",
  "Evaluando tu Eje Y: Posicionamiento y visibilidad en Google e IA",
  "Ubicándote en la Matriz de Posicionamiento Referente",
  "Preparando tu informe ejecutivo personalizado",
];

export default function Processing({ nombre }: { nombre: string }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - t0), 120);
    return () => clearInterval(id);
  }, []);

  const active = Math.min(STEPS.length - 1, Math.floor(elapsed / 2100));
  const progress = Math.min(96, (1 - Math.exp(-elapsed / 4200)) * 100);
  const first = nombre.trim().split(/\s+/)[0];

  return (
    <section className="wrap processing fade-in" aria-live="polite">
      <div>
        <div className="radar" aria-hidden>
          <svg viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="86" fill="none" stroke="#2c2c2c" />
            <circle cx="90" cy="90" r="58" fill="none" stroke="#2c2c2c" />
            <circle cx="90" cy="90" r="30" fill="none" stroke="#2c2c2c" />
            <line x1="90" y1="4" x2="90" y2="176" stroke="#2c2c2c" />
            <line x1="4" y1="90" x2="176" y2="90" stroke="#2c2c2c" />
            <g className="sweep">
              <path d="M90 90 L90 4 A86 86 0 0 1 164 47 Z" fill="url(#g)" />
            </g>
            <circle className="blip" cx="128" cy="56" r="5" fill="#d4ffde" />
            <circle className="blip" cx="62" cy="118" r="3" fill="#758b7b" style={{ animationDelay: "0.6s" }} />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#d4ffde" stopOpacity="0.45" />
                <stop offset="1" stopColor="#d4ffde" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2>{first ? `${first}, estamos analizando tu diagnóstico` : "Estamos analizando tu diagnóstico"}</h2>
        <p className="msg">{STEPS[active]}…</p>
        <div className="proc-bar">
          <i style={{ width: `${progress}%` }} />
        </div>
        <ul className="proc-steps">
          {STEPS.map((s, i) => (
            <li key={s} className={i < active ? "done" : i === active ? "active" : ""}>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
