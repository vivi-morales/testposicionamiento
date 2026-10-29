/* eslint-disable @next/next/no-img-element */
import Topbar from "./Topbar";
import { EVIDENCIA } from "@/lib/content";
import { HANDLE, LINKS, SITE_LABEL } from "@/lib/config";

const QUADS = [
  { n: "01", name: "El Perfil en Desarrollo", text: "Construyendo las bases, con una agenda dominada por lo urgente." },
  { n: "02", name: "El Perfil de Vitrina", text: "Mucha visibilidad, pero poca conversión en autoridad y contratos." },
  { n: "03", name: "El Experto Silencioso", text: "Gran criterio y resultados, pero invisible para el mercado." },
  { n: "04", name: "El Líder Referente", text: "Liderazgo real y presencia estratégica: el Efecto Imán activo." },
];

export default function Landing({ onStart }: { onStart: () => void }) {
  const cta = (
    <button className="btn btn-primary" onClick={onStart}>
      Comenzar mi diagnóstico <span aria-hidden>→</span>
    </button>
  );

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Topbar />
        </div>
        <div className="wrap hero-grid">
          <div className="hero-copy fade-in">
            <p className="eyebrow">Diagnóstico gratuito · Método REFERENTE®</p>
            <h1>
              Descubre tu nivel de Posicionamiento y Liderazgo <span className="hl">Referente</span>
            </h1>
            <p className="lead">
              Evaluación exprés de tu criterio ejecutivo, tu autoridad profesional y tu presencia en el ecosistema
              digital: buscadores e Inteligencia Artificial.
            </p>
            <div className="hero-meta">
              <span>20 preguntas</span>
              <span>4 a 5 minutos</span>
              <span>Informe ejecutivo en PDF</span>
            </div>
            {cta}
          </div>
          <div className="hero-photo">
            <img src="/photos/vivi-laptop.png" alt="Vivi Morales Villa" width={538} height={955} />
          </div>
        </div>
        <img className="watermark" src="/brand/logo-wordmark-blanco.png" alt="" aria-hidden />
      </section>

      <section className="section light">
        <div className="wrap">
          <p className="eyebrow salvia">01 / El mito del trabajo silencioso</p>
          <h2>
            El trabajo duro no garantiza <span className="hl">reconocimiento.</span>
          </h2>
          <p className="lead" style={{ marginTop: 20 }}>
            Lo que no se ve, no existe; y lo que no se comunica con estrategia, se pierde en el ruido. La autoridad
            sostenible nace de la integración de dos dimensiones.
          </p>
          <div className="equation">
            <div className="eq-box">
              <p className="eyebrow salvia">Eje X · #LiderazgoReferente</p>
              <h3>Liderazgo Real</h3>
              <p>Criterio, presencia ejecutiva, propuesta de valor y capacidad de guiar personas.</p>
            </div>
            <div className="eq-op">+</div>
            <div className="eq-box">
              <p className="eyebrow salvia">Eje Y · #ReferenteDigital</p>
              <h3>Visibilidad Estratégica</h3>
              <p>Perfiles, método propio, contenido y encontrabilidad en Google e IA.</p>
            </div>
            <div className="eq-op">=</div>
            <div className="eq-box dark">
              <p className="eyebrow">Resultado</p>
              <h3>Efecto Imán</h3>
              <p className="muted">Clientes, talento y oportunidades que llegan por el peso de tu reputación.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">02 / La evidencia</p>
          <h2>
            Tu talento necesita <span className="hl">ser visible.</span>
          </h2>
          <div className="stats">
            {EVIDENCIA.map((e) => (
              <div className="stat" key={e.cifra}>
                <strong>{e.cifra}</strong>
                <p>{e.texto}</p>
                <small>{e.fuente}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap">
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <p className="eyebrow salvia">03 / Lo que vas a descubrir</p>
              <h2>¿En cuál de los 4 perfiles te encuentras hoy?</h2>
              <p className="lead" style={{ marginTop: 20 }}>
                Al terminar recibirás tu ubicación en la Matriz de Posicionamiento Referente, la lectura de tu perfil, tu
                brecha prioritaria y una ruta de evolución personalizada.
              </p>
              <div style={{ marginTop: 32 }}>{cta}</div>
            </div>
            <div className="quads" style={{ marginTop: 0 }}>
              {QUADS.map((q) => (
                <div className="quad" key={q.n}>
                  <b>{q.n}</b>
                  <h3>{q.name}</h3>
                  <p>{q.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap about">
          <img src="/photos/vivi-silla.png" alt="Vivi Morales Villa" width={615} height={1092} />
          <div style={{ paddingBottom: 24 }}>
            <p className="eyebrow">04 / Quién está detrás</p>
            <h2>Vivi Morales Villa</h2>
            <p className="muted" style={{ margin: "8px 0 20px" }}>
              Conferencista y entrenadora de Referentes · Estratega de Liderazgo y Posicionamiento · Creadora del
              Método REFERENTE®
            </p>
            <p className="lead">
              Más de 18 años liderando operaciones, proyectos y equipos en multinacionales como Coca-Cola FEMSA,
              Colombina y SGS. Ha formado a líderes y empresarios en más de 14 países y es la estratega detrás de la
              reputación digital de reconocidos ejecutivos y LinkedIn Top Voices.
            </p>
            <img className="monogram" src="/brand/monograma-blanco.png" alt="vmv" width={423} height={121} />
          </div>
        </div>
      </section>

      <section className="section mint">
        <div className="wrap narrow cta-final">
          <h2>Tus resultados necesitan ser visibles. Empieza por saber dónde estás.</h2>
          <p className="lead" style={{ margin: "16px 0 32px" }}>
            Responde con honestidad: no hay respuestas correctas, solo tu momento actual.
          </p>
          <button className="btn btn-dark" onClick={onStart}>
            Comenzar mi diagnóstico <span aria-hidden>→</span>
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Vivi Morales Villa · Método REFERENTE®</span>
          <span>
            <a href={LINKS.sitio} target="_blank" rel="noopener">
              {SITE_LABEL}
            </a>{" "}
            · {HANDLE}
          </span>
        </div>
      </footer>
    </>
  );
}
