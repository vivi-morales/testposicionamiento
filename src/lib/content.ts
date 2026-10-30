// Textos del diagnóstico (Documento 2, secciones 1, 4 y 5; Documento 4, sección 3).

import type { QuadrantId } from "./scoring";
import type { DesafioValue } from "./form-options";

export interface QuadrantContent {
  id: QuadrantId;
  number: number;
  name: string;
  short: string; // nombre sin artículo, para tarjetas
  coords: string;
  headline: string; // frase de impacto para la pantalla de resultado
  estado: string;
  sintomas: string[];
  costoTitulo: string;
  costo: string;
  diagnostico: string;
  siguientePaso: string;
  secuencia: string;
  propuesta: string;
}

export const QUADRANTS: Record<QuadrantId, QuadrantContent> = {
  Perfil_Desarrollo: {
    id: "Perfil_Desarrollo",
    number: 1,
    name: "El Perfil en Desarrollo",
    short: "Perfil en Desarrollo",
    coords: "Bajo Liderazgo · Bajo Posicionamiento",
    headline: "Estás construyendo las bases de tu camino. Lo que más necesitas ahora es dar con un enfoque claro.",
    estado:
      "Estás en la etapa en que le das forma a tu carrera, empresa o servicio. Sin embargo, sientes que cada pequeño avance te exige demasiado. Te la pasas apagando incendios y resolviendo la rutina diaria, lo que te deja muy poco tiempo para planear cómo crecer a futuro. Además, notas que tu propuesta se parece mucho a la de otros colegas y te cuesta transmitir lo que te hace diferente.",
    sintomas: [
      "Tu día a día se llena de urgencias, tareas operativas y pedidos de última hora.",
      "Te cuesta definir tus precios, cobrar lo justo o pedir mejores condiciones al negociar.",
      "Si alguien busca tu nombre en Google o LinkedIn, casi no encuentra información sobre tu especialidad o tu forma de trabajar.",
      "Para sumar clientes o proyectos, dependes de salir a buscar uno por uno o de recomendaciones esporádicas.",
    ],
    costoTitulo: "Competir solo por precio y esfuerzo",
    costo:
      "Si no cuentas con una propuesta clara ni con presencia visible, el mercado te verá como una opción fácil de reemplazar. Esto genera mucho desgaste y pone un freno al crecimiento de tus ingresos.",
    diagnostico:
      "Tu prioridad no es publicar seguido en redes sociales sin un rumbo fijo. Necesitas darte un espacio para ganar claridad. Enfócate en fortalecer tu Liderazgo: define a quién ayudas, qué te diferencia y organiza tu experiencia en un método de trabajo paso a paso.",
    siguientePaso: "Test 2 · Liderazgo Referente (Los 9 Estadios)",
    secuencia: "Bases del Líder Referente",
    propuesta: "Test 1 Ampliado + Contenidos Base",
  },
  Perfil_Vitrina: {
    id: "Perfil_Vitrina",
    number: 2,
    name: "El Perfil de Vitrina",
    short: "Perfil de Vitrina",
    coords: "Bajo Liderazgo · Alto Posicionamiento",
    headline: "Ya tienes la atención de la gente. Ahora el reto es convertir esa visibilidad en verdadera autoridad.",
    estado:
      "Tienes mucha energía y se te da muy fácil conectar en canales digitales. Sabes hacer ruido y hacerte notar en redes como LinkedIn o Instagram. Sin embargo, sientes una brecha incómoda entre esa exposición y los resultados de tu negocio: tantas miradas no se traducen en clientes de alto valor, en el respeto de referentes con más trayectoria o en una reputación sólida que perdure en el tiempo.",
    sintomas: [
      "Logras me gusta e interacciones, pero te cuesta cerrar contratos importantes o cobrar lo que vale tu trabajo.",
      "Lo que publicas suele ser variado o improvisado, sin respaldar una oferta clara o una metodología propia.",
      "Ante directivos o personas de mayor jerarquía, sientes que te falta firmeza y estructura para defender tus puntos de vista.",
      "El entorno te ve como alguien muy activo en redes, pero no necesariamente como un referente en tu tema.",
    ],
    costoTitulo: "El cansancio de crear contenido sin parar",
    costo:
      "Inviertes mucho tiempo creando publicaciones para no perder vigencia, pero no logras construir una reputación duradera ni un modelo de trabajo que transforme ese interés en ingresos sostenibles.",
    diagnostico:
      "Tu siguiente paso es pasar de la visibilidad superficial a una autoridad real. No se trata de juntar más seguidores ni de publicar seguido. Tu tarea es consolidar tu Liderazgo Referente: organizar lo que sabes en un método propio, mejorar tu forma de comunicar y empaquetar tu valor para ganar contratos, confianza y respeto.",
    siguientePaso: "Test 2 · Liderazgo Referente (Los 9 Estadios)",
    secuencia: "De la Visibilidad a la Autoridad",
    propuesta: "Test 3 (Referente Digital)",
  },
  Experto_Silencioso: {
    id: "Experto_Silencioso",
    number: 3,
    name: "El Experto Silencioso",
    short: "Experto Silencioso",
    coords: "Alto Liderazgo · Bajo Posicionamiento",
    headline: "Tienes todo el conocimiento y la experiencia. Te falta construir la vía para hacerte visible.",
    estado:
      "Tienes un enorme bagaje, ética y excelentes resultados demostrables. Quienes han trabajado contigo reconocen tu capacidad. Sin embargo, has creído que hacer un buen trabajo basta para destacar. Mientras das lo mejor de ti en silencio, ves cómo otros profesionales con menos trayectoria ganan las mejores oportunidades y clientes simplemente porque comunican mejor lo que hacen.",
    sintomas: [
      "Tu experiencia está guardada en tu cabeza o en tus archivos; aún no la ordenaste en un Método estructurado y público.",
      "Si un cliente o directivo busca tu nombre en internet, casi no encuentra rastros de tu experiencia en tu área.",
      "Al cambiar de trabajo o iniciar un proyecto, sientes que debes volver a explicar de cero todo lo que sabes hacer.",
      "Te molesta ver que otras personas lideran la conversación de tu sector con ideas sencillas pero bien comunicadas.",
    ],
    costoTitulo: "El riesgo de volverse invisible",
    costo:
      "Eres indispensable para resolver y ejecutar el trabajo del día a día, pero te quedas fuera de las decisiones estratégicas, los espacios de liderazgo y las mejores oportunidades del sector.",
    diagnostico:
      "Tienes todo el conocimiento y la experiencia; solo te falta darte a conocer. Lo que sabes no debe quedarse guardado. Al activar tu presencia digital y compartir lo que piensas, tu reputación comenzará a abrirte puertas de forma constante.",
    siguientePaso: "Test 3 · Referente Digital (Los 5 Ejes)",
    secuencia: "El Poder de Comunicar tu Valor",
    propuesta: "Test 2 (Liderazgo) + Taller ADN",
  },
  Lider_Referente: {
    id: "Lider_Referente",
    number: 4,
    name: "El Líder Referente",
    short: "Líder Referente",
    coords: "Alto Liderazgo · Alto Posicionamiento",
    headline: "Llegaste a un excelente equilibrio. Ahora tu meta es escalar tu impacto y trascender.",
    estado:
      "Lograste combinar tu enorme capacidad profesional con una presencia digital sólida. No necesitas salir a buscar proyectos de forma directa: las propuestas de clientes, alianzas e iniciativas llegan a ti atraídas por tu prestigio. Eres una voz respetada y escuchada dentro de tu industria.",
    sintomas: [
      "Colegas y clientes citan tu nombre, tus metodologías o tus ideas como referencia en tu sector.",
      "Tienes un Método claro que te permite delegar la rutina diaria y enfocar tu tiempo en la visión de futuro.",
      "Tu marca genera confianza directa, simplificando la toma de decisiones y acelerando los acuerdos comerciales.",
      "Tus ideas inspiran a otros profesionales y marcan pauta sobre el rumbo de tu especialidad.",
    ],
    costoTitulo: "Caer en la zona de confort",
    costo:
      "En un entorno dinámico, dejar de renovar tu mensaje o descuidar la escucha del mercado puede hacer que pierdas espacio frente a nuevas voces que van surgiendo.",
    diagnostico:
      "Tu enfoque central debe ser trascender y multiplicar tu impacto. Protege tu prestigio, diversifica tus canales de llegada, forma a nuevos líderes en tu organización y asegura que tu conocimiento quede registrado como un legado claro dentro de tu área.",
    siguientePaso: "Test 3 · Referente Digital + Sesión de Alineación Estratégica C-Level / Taller ADN",
    secuencia: "Estrategia C-Suite y Legado",
    propuesta: "Consultoría Directa / Conferencia",
  },
};

/** Lectura de la brecha prioritaria según los dos ejes (escala 0–100). */
export function brechaPrioritaria(q: QuadrantId, ser: number, eco: number): { titulo: string; texto: string } {
  const diff = Math.abs(ser - eco);
  switch (q) {
    case "Perfil_Desarrollo":
      return {
        titulo: "Prioridad: Liderazgo y Criterio #LiderazgoReferente",
        texto: `Ambos ejes están por debajo del punto de consolidación (Liderazgo y Criterio ${ser}/100 · Posicionamiento ${eco}/100). Antes de ganar visibilidad, necesitas una propuesta de valor clara y un método ordenado: sin esa base, cualquier exposición se diluye.`,
      };
    case "Perfil_Vitrina":
      return {
        titulo: "Prioridad: Liderazgo y Criterio #LiderazgoReferente",
        texto: `Tu Posicionamiento (${eco}/100) supera a tu Liderazgo y Criterio (${ser}/100) por ${diff} puntos. La atención ya existe; el trabajo está en darle sustancia, estructura y aplomo para que se convierta en autoridad y contratos.`,
      };
    case "Experto_Silencioso":
      return {
        titulo: "Prioridad: Posicionamiento #ReferenteDigital",
        texto: `Tu Liderazgo y Criterio (${ser}/100) supera a tu Posicionamiento (${eco}/100) por ${diff} puntos. El criterio ya está construido; ahora necesita una arquitectura que lo haga visible, encontrable en Google e IA y atractivo para las oportunidades correctas.`,
      };
    case "Lider_Referente":
      return {
        titulo: "Prioridad: Escala y legado",
        texto: `Ambos ejes están consolidados (Liderazgo y Criterio ${ser}/100 · Posicionamiento ${eco}/100). Tu brecha ya no es de base, sino de escala: sistematizar tu pensamiento, multiplicar canales de impacto y formar a otros líderes.`,
      };
  }
}

/** Párrafo de conexión entre el desafío declarado en el formulario y el resultado. */
export const DESAFIO_LECTURA: Record<DesafioValue, string> = {
  Dolor_Reconocimiento:
    "Nos contaste que tu principal desafío es que el mercado no reconoce el verdadero valor de tu trabajo. Este es el síntoma más frecuente de la brecha entre el valor real y el valor percibido: la solución pasa por fortalecer tu Presencia Ejecutiva y comunicar tu criterio con intención.",
  Dolor_Atraccion:
    "Nos contaste que dependes de la búsqueda constante de clientes. Cuando la reputación no trabaja por ti, todo el crecimiento depende de tu esfuerzo personal. Activar tu Ecosistema Digital es lo que convierte tu trayectoria en un Efecto Imán.",
  Dolor_Metodo:
    "Nos contaste que te cuesta comunicar de forma consistente por falta de tiempo o de método. La constancia no nace de la fuerza de voluntad, sino de un sistema: un Método propio y una estrategia de contenidos que hagan sostenible tu comunicación.",
  Dolor_VisibilidadIA:
    "Nos contaste que quieres que los buscadores y la Inteligencia Artificial te reconozcan como autoridad de tu sector. Los motores de IA citan a quien tiene un criterio estructurado, coherente y publicado: esa es la arquitectura que construye el posicionamiento GEO.",
};

export const EVIDENCIA = [
  {
    cifra: "85%",
    texto:
      "del éxito financiero y profesional proviene de habilidades humanas, comunicación y posicionamiento; solo el 15% depende del conocimiento técnico.",
    fuente: "Harvard University, Stanford Research Institute y Carnegie Foundation",
  },
  {
    cifra: "26%",
    texto: "de las decisiones de promoción ejecutiva y elección de proveedores responden a la Presencia Ejecutiva.",
    fuente: "Center for Talent Innovation / Harvard Business Review",
  },
  {
    cifra: "88%",
    texto: "de los compradores B2B necesita confiar en las personas detrás de una marca antes de cerrar un contrato importante.",
    fuente: "Edelman Trust Barometer",
  },
];

export const SERVICIOS = [
  {
    titulo: "Test profundos de diagnóstico",
    texto:
      "Evaluaciones detalladas con plan de acción paso a paso para dominar los 9 Estadios del Liderazgo o los 5 Ejes de la Visibilidad Digital.",
  },
  {
    titulo: "Taller ADN Corporativo y Consultoría",
    texto:
      "Programa para equipos directivos y fundadores que unifica la narrativa de la empresa con la presencia de sus líderes visibles.",
  },
  {
    titulo: "Conferencias de impacto",
    texto: "\"Ser Referente\", \"Algoritmo\" y \"Referentes Digitales\", para convenciones, eventos del sector y programas ejecutivos.",
  },
];
