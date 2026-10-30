import { LINKS, SITE_LABEL } from "@/lib/config";

export default function Topbar() {
  return (
    <header className="topbar">
      <a className="logo-link" href={LINKS.sitio} target="_blank" rel="noopener" aria-label="Ir a vivimoralesvilla.com (se abre en otra pestaña)">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="/brand/logo-wordmark-blanco.png" alt="Vivi Morales Villa" width={446} height={47} />
      </a>
      <a className="site" href={LINKS.sitio} target="_blank" rel="noopener">
        <span className="www">www.</span>
        {SITE_LABEL.replace(/^www\./, "")}
      </a>
    </header>
  );
}
