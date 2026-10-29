"use client";

import { useState } from "react";
import { DESAFIOS, ROLES, SECTORES, TAMANOS, validateLead, type LeadInput } from "@/lib/form-options";
import { LINKS } from "@/lib/config";

interface Props {
  initial: Partial<LeadInput>;
  step: number;
  onStep: (step: number, lead: Partial<LeadInput>) => void;
  onSubmit: (lead: LeadInput, website: string) => Promise<void>;
}

const STEPS = [
  { title: "Empecemos por conocerte", sub: "Con estos datos personalizamos tu informe ejecutivo." },
  { title: "Tu perfil profesional", sub: "Así contextualizamos tu diagnóstico según tu rol y entorno." },
  { title: "Tu desafío principal", sub: "¿Cuál es tu principal desafío hoy para hacer crecer tu impacto y posicionamiento en el mercado?" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function LeadForm({ initial, step, onStep, onSubmit }: Props) {
  const [lead, setLead] = useState<Partial<LeadInput>>(initial);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [website, setWebsite] = useState("");

  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => {
    setLead((l) => ({ ...l, [k]: v }));
    setError("");
  };

  const stepError = (): string => {
    if (step === 0) {
      if ((lead.nombre ?? "").trim().length < 2) return "Ingresa tu nombre completo.";
      if (!EMAIL_RE.test((lead.email ?? "").trim())) return "Ingresa un correo electrónico válido.";
    }
    if (step === 1) {
      if (!lead.rol) return "Selecciona tu perfil o rol.";
      if ((lead.empresa ?? "").trim().length < 2) return "Ingresa el nombre de tu empresa o proyecto.";
      if (!lead.sector) return "Selecciona tu sector.";
      if (!lead.tamano) return "Selecciona el tamaño de tu organización.";
    }
    if (step === 2) {
      if (!lead.desafio) return "Selecciona tu desafío principal.";
      if (!lead.consentimiento) return "Para continuar, acepta la Política de Tratamiento de Datos.";
    }
    return "";
  };

  const next = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = stepError();
    if (err) return setError(err);
    if (step < 2) return onStep(step + 1, lead);

    const parsed = validateLead(lead);
    if (!parsed.ok) return setError(parsed.error);
    setSending(true);
    await onSubmit(parsed.lead, website);
    setSending(false);
  };

  return (
    <form className="wrap narrow fade-in" onSubmit={next} noValidate key={step}>
      <div className="progress" aria-label={`Paso ${step + 1} de 3`}>
        <span>Paso {step + 1} de 3</span>
        <div className="progress-bar">
          <i style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
        <span>Tus datos</span>
      </div>

      <div className="step-head">
        <h2>{STEPS[step].title}</h2>
        <p className="muted">{STEPS[step].sub}</p>
      </div>

      {step === 0 && (
        <>
          <div className="field">
            <label htmlFor="nombre">Nombre completo</label>
            <input id="nombre" className="input" autoComplete="name" value={lead.nombre ?? ""} onChange={(e) => set("nombre", e.target.value)} autoFocus />
          </div>
          <div className="field">
            <label htmlFor="email">Correo electrónico profesional</label>
            <p className="hint">Te recomendamos ingresar tu correo profesional o corporativo.</p>
            <input id="email" className="input" type="email" inputMode="email" autoComplete="email" value={lead.email ?? ""} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div className="hp" aria-hidden>
            <label htmlFor="website">Sitio web</label>
            <input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="field" role="radiogroup" aria-labelledby="rol-label">
            <span className="label" id="rol-label">Perfil o rol actual</span>
            <div className="choices">
              {ROLES.map((r) => (
                <button type="button" role="radio" aria-checked={lead.rol === r.value} className="choice" key={r.value} onClick={() => set("rol", r.value)}>
                  <span className="dot" />
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="empresa">Nombre de la empresa o proyecto</label>
            <input id="empresa" className="input" autoComplete="organization" value={lead.empresa ?? ""} onChange={(e) => set("empresa", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="sector">Sector industrial o área de especialidad</label>
            <select id="sector" className="select" value={lead.sector ?? ""} onChange={(e) => set("sector", e.target.value)}>
              <option value="" disabled>
                Selecciona una opción
              </option>
              {SECTORES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="tamano">Tamaño de la organización o equipo</label>
            <select id="tamano" className="select" value={lead.tamano ?? ""} onChange={(e) => set("tamano", e.target.value)}>
              <option value="" disabled>
                Selecciona una opción
              </option>
              {TAMANOS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="field" role="radiogroup" aria-label="Desafío principal">
            <div className="choices">
              {DESAFIOS.map((d) => (
                <button type="button" role="radio" aria-checked={lead.desafio === d.value} className="choice" key={d.value} onClick={() => set("desafio", d.value)}>
                  <span className="letter">{d.letter}</span>
                  <span>{d.label}</span>
                </button>
              ))}
            </div>
          </div>
          <label className="check">
            <input type="checkbox" checked={!!lead.consentimiento} onChange={(e) => set("consentimiento", e.target.checked)} />
            <span>
              Acepto la{" "}
              <a href={LINKS.privacidad} target="_blank" rel="noopener">
                Política de Tratamiento de Datos Personales
              </a>{" "}
              y autorizo el envío de mi informe de diagnóstico y comunicaciones ejecutivas de Vivi Morales Villa.
            </span>
          </label>
          <p className="privacy-note">
            Tus datos están 100% protegidos. No compartimos tu información con terceros y puedes cancelar tu suscripción en cualquier momento.
          </p>
        </>
      )}

      <div className="actions">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={() => onStep(step - 1, lead)}>
            ← Atrás
          </button>
        ) : (
          <span />
        )}
        <div style={{ display: "grid", gap: 8 }}>
          {error && (
            <p className="error" role="alert" style={{ margin: 0 }}>
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {step < 2 ? "Continuar →" : sending ? "Preparando tu test…" : "Comenzar el test →"}
          </button>
        </div>
      </div>
    </form>
  );
}
