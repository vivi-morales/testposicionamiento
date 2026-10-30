/* eslint-disable @next/next/no-img-element */
// Firma de Vivi Morales Villa con redes sociales (misma composición que el informe PDF).
import { HANDLE, SOCIAL } from "@/lib/config";

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3.5" y="9" width="3.6" height="11" fill="currentColor" />
      <circle cx="5.3" cy="5.3" r="2.1" fill="currentColor" />
      <path d="M10 9h3.4v1.6c.6-1 1.8-1.9 3.6-1.9 3 0 3.5 2 3.5 4.6V20h-3.6v-5.8c0-1.4 0-3-1.9-3s-2.1 1.4-2.1 2.9V20H10z" fill="currentColor" />
    </svg>
  );
}

export default function Signature() {
  return (
    <div className="signature">
      <img className="signature-logo" src="/brand/monograma-blanco.png" alt="vmv · Vivi Morales Villa" width={423} height={121} />
      <div>
        <p className="signature-name">Vivi Morales Villa</p>
        <p className="signature-roles">
          Conferencista y entrenadora de Referentes · Estratega de Liderazgo y Posicionamiento · Creadora del Método REFERENTE®
        </p>
        <div className="signature-social">
          <a href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Instagram de Vivi Morales Villa">
            <Instagram />
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn de Vivi Morales Villa">
            <LinkedIn />
          </a>
          <span>{HANDLE.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
