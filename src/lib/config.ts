// Enlaces de los llamados a la acción. Reemplazar los marcadores por las URL definitivas.

export const LINKS = {
  sitio: "https://www.vivimoralesvilla.com",
  test2: "https://www.vivimoralesvilla.com/#test-liderazgo", // TODO: URL del Test 2 (Liderazgo Referente)
  test3: "https://www.vivimoralesvilla.com/#test-referente-digital", // TODO: URL del Test 3 (Referente Digital)
  agendar: "https://vivimoralesvilla.com/#hablemos",
  programas: "https://www.vivimoralesvilla.com/#conferencias", // TODO: URL de programas y conferencias
  equipos: "https://vivimoralesvilla.com/#hablemos",
  privacidad: "https://www.vivimoralesvilla.com/#politica-de-datos", // TODO: URL de la Política de Tratamiento de Datos
};

/** Redes sociales de Vivi Morales Villa. */
export const SOCIAL = {
  instagram: "https://www.instagram.com/vivimoralesvilla/",
  linkedin: "https://www.linkedin.com/in/vivimoralesvilla/", // TODO: confirmar URL del perfil de LinkedIn
};

export const SITE_LABEL = "www.vivimoralesvilla.com";
export const HANDLE = "@vivimoralesvilla";
/** Nombres oficiales de los ejes de la matriz. */
export const AXES = {
  x: { eje: "Eje X", nombre: "Liderazgo y Criterio", tag: "#LiderazgoReferente" },
  y: { eje: "Eje Y", nombre: "Posicionamiento", tag: "#ReferenteDigital" },
} as const;
export const axisLabel = (a: "x" | "y") => `${AXES[a].eje}: ${AXES[a].nombre} ${AXES[a].tag}`;

/** URL pública del test que se muestra en la tarjeta compartible. */
export const TEST_URL_LABEL = "www.vivimoralesvilla.com/testposicionamiento";

/** Duración de la pantalla de procesamiento (ms), aleatoria dentro del rango. */
export const PROCESSING_MS = { min: 8000, max: 12000 };
