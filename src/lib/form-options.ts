// Opciones del formulario de captura (Documento 4) y sus etiquetas de segmentación.

export const ROLES = [
  { value: "CEO_Empresario", label: "CEO / Empresario / Dueño de Negocio" },
  { value: "Directivo_CSuite", label: "Directivo / Gerente / Ejecutivo C-Suite" },
  { value: "Emprendedor_Founder", label: "Emprendedor / Founder" },
  { value: "Consultor_Independiente", label: "Consultor / Experto Independiente" },
  { value: "Profesional_Especialista", label: "Profesional Especialista / Líder de Área" },
] as const;

export const SECTORES = [
  "Tecnología",
  "Servicios Profesionales / Consultoría",
  "Salud",
  "Finanzas",
  "Manufactura / Industria",
  "Educación",
  "Comercio / Retail",
  "Otro",
] as const;

export const TAMANOS = [
  "1 persona (Consultor / Independiente)",
  "2 a 10 colaboradores",
  "11 a 50 colaboradores",
  "51 a 200 colaboradores",
  "Más de 200 colaboradores",
] as const;

export const DESAFIOS = [
  {
    value: "Dolor_Reconocimiento",
    letter: "A",
    label:
      "Hacemos un trabajo excelente, pero siento que el mercado o la empresa no reconoce nuestro verdadero valor.",
    enfoque: "Fortalecimiento de Liderazgo y Presencia Ejecutiva",
  },
  {
    value: "Dolor_Atraccion",
    letter: "B",
    label:
      "Dependo de la búsqueda constante de clientes y me cuesta cerrar proyectos por reputación u oferta de valor.",
    enfoque: "Activación de Ecosistema Digital y Atracción Orgánica",
  },
  {
    value: "Dolor_Metodo",
    letter: "C",
    label:
      "Nos cuesta comunicar de forma consistente lo que hacemos por falta de tiempo o de un método estructurado.",
    enfoque: "Estrategia de Contenido y Método Propio",
  },
  {
    value: "Dolor_VisibilidadIA",
    letter: "D",
    label:
      "Queremos que los buscadores y la Inteligencia Artificial nos posicionen como la autoridad de referencia de nuestro sector.",
    enfoque: "Visibilidad Digital y GEO",
  },
] as const;

export type RolValue = (typeof ROLES)[number]["value"];
export type DesafioValue = (typeof DESAFIOS)[number]["value"];

export interface LeadInput {
  nombre: string;
  email: string;
  rol: RolValue;
  empresa: string;
  sector: string;
  tamano: string;
  desafio: DesafioValue;
  consentimiento: boolean;
}

export const rolLabel = (v: string) => ROLES.find((r) => r.value === v)?.label ?? v;
export const desafioOf = (v: string) => DESAFIOS.find((d) => d.value === v);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Valida y normaliza los datos del formulario. Devuelve el lead limpio o un mensaje de error. */
export function validateLead(raw: unknown): { ok: true; lead: LeadInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Datos inválidos." };
  const r = raw as Record<string, unknown>;
  const str = (k: string, max = 160) => (typeof r[k] === "string" ? (r[k] as string).trim().slice(0, max) : "");

  const lead: LeadInput = {
    nombre: str("nombre", 120),
    email: str("email", 160).toLowerCase(),
    rol: str("rol") as RolValue,
    empresa: str("empresa", 160),
    sector: str("sector"),
    tamano: str("tamano"),
    desafio: str("desafio") as DesafioValue,
    consentimiento: r.consentimiento === true,
  };

  if (lead.nombre.length < 2) return { ok: false, error: "Ingresa tu nombre completo." };
  if (!EMAIL_RE.test(lead.email)) return { ok: false, error: "Ingresa un correo electrónico válido." };
  if (!ROLES.some((x) => x.value === lead.rol)) return { ok: false, error: "Selecciona tu perfil o rol." };
  if (lead.empresa.length < 2) return { ok: false, error: "Ingresa el nombre de tu empresa o proyecto." };
  if (!(SECTORES as readonly string[]).includes(lead.sector)) return { ok: false, error: "Selecciona tu sector." };
  if (!(TAMANOS as readonly string[]).includes(lead.tamano)) return { ok: false, error: "Selecciona el tamaño de tu organización." };
  if (!DESAFIOS.some((x) => x.value === lead.desafio)) return { ok: false, error: "Selecciona tu desafío principal." };
  if (!lead.consentimiento) return { ok: false, error: "Debes aceptar la Política de Tratamiento de Datos." };

  return { ok: true, lead };
}
