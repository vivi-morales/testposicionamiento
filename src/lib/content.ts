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
    coords: "Bajo Liderazgo · Baja Visibilidad Digital",
    headline: "Estás construyendo las bases. Tu prioridad es la claridad de enfoque.",
    estado:
      "Te encuentras en una etapa donde estás construyendo las bases de tu carrera, empresa o servicio profesional. Sin embargo, experimentas la sensación de que cada avance requiere un esfuerzo desmedido. Tu día a día transcurre enfocado en responder a lo urgente y resolver la operativa inmediata, lo que te deja muy poco tiempo disponible para diseñar una estrategia de crecimiento a mediano plazo. Sientes que tu oferta aún se parece bastante a la de otros colegas de tu área y que no has logrado comunicar tu valor diferenciador con la contundencia que te gustaría.",
    sintomas: [
      "La agenda diaria está dominada por las urgencias, las entregas operativas y las solicitudes de terceros.",
      "Sientes inseguridad o dificultad al momento de fijar precios, negociar honorarios o solicitar mejores condiciones comerciales.",
      "Si un potencial cliente o aliado busca tu nombre en Google, LinkedIn o redes profesionales, encuentra poca o ninguna información sobre tu especialidad o visión.",
      "Para conseguir clientes o proyectos, dependes de la prospección individual, la búsqueda a puerta fría o recomendaciones aisladas.",
    ],
    costoTitulo: "La competencia por precio y esfuerzo",
    costo:
      "Sin una propuesta de valor bien delimitada y sin una presencia visible en el mercado, la percepción externa tiende a tratarte como una opción intercambiable, lo que genera cansancio, desgaste y techos en tus ingresos.",
    diagnostico:
      "Tu prioridad no es salir a publicar contenidos masivos en redes sociales sin una dirección definida. Lo que necesitas es claridad de enfoque. Debes concentrarte primero en fortalecer tu Liderazgo (El SER): definir exactamente a quién ayudas, cuál es tu propuesta de valor diferenciada y empezar a estructurar tus experiencias en un Método de trabajo ordenado.",
    siguientePaso: "Test 2 · Liderazgo Referente (Los 9 Estadios)",
    secuencia: "Bases del Líder Referente",
    propuesta: "Test 1 Ampliado + Contenidos Base",
  },
  Perfil_Vitrina: {
    id: "Perfil_Vitrina",
    number: 2,
    name: "El Perfil de Vitrina",
    short: "Perfil de Vitrina",
    coords: "Bajo Liderazgo · Alta Visibilidad Digital",
    headline: "Tienes atención. Ahora necesitas convertirla en autoridad real.",
    estado:
      "Posees un dinamismo sobresaliente y una enorme facilidad para conectar y estar presente en canales digitales. Tu nombre suena, generas alcance, la gente ve lo que haces y sabes cómo llamar la atención en plataformas como LinkedIn o Instagram. Sin embargo, internamente sientes una brecha incómoda entre esa exposición y los resultados reales de tu carrera o negocio: el volumen de miradas y clics no se está convirtiendo en contratos de alto valor, en el respeto de los líderes más experimentados de tu industria o en una reputación sólida a largo plazo.",
    sintomas: [
      "Generas interacciones y visualizaciones en redes, pero te cuesta cerrar negocios importantes o cobrar tarifas acordes al esfuerzo invertido.",
      "Tu comunicación digital suele ser variada o reactiva, sin estar conectada directamente con una oferta clara o un método estructurado.",
      "En reuniones estratégicas o negociaciones con directivos de alto nivel, sientes que te falta estructura, aplomo o jerarquía para sostener tus posturas.",
      "El mercado te percibe como una persona \"muy activa en redes\", pero no necesariamente como una autoridad técnica o estratégica en tu materia.",
    ],
    costoTitulo: "La fatiga de la creación de contenido constante",
    costo:
      "Gastas una cantidad considerable de energía produciendo publicaciones para mantenerte vigente, sin construir un activo de reputación duradero ni un modelo de negocio que convierta esa atención en ingresos sostenibles.",
    diagnostico:
      "Tu siguiente paso es evolucionar de la visibilidad superficial a la autoridad real. No necesitas buscar más seguidores ni publicar con mayor frecuencia. Tu verdadero trabajo consiste en consolidar tu Liderazgo (El SER): empaquetar tu conocimiento real en un Método sólido, perfeccionar tu presencia al hablar y estructurar tu propuesta para que esa atención se traduzca en contratos, confianza y respeto en tu sector.",
    siguientePaso: "Test 2 · Liderazgo Referente (Los 9 Estadios)",
    secuencia: "De la Visibilidad a la Autoridad",
    propuesta: "Test 3 (Referente Digital)",
  },
  Experto_Silencioso: {
    id: "Experto_Silencioso",
    number: 3,
    name: "El Experto Silencioso",
    short: "Experto Silencioso",
    coords: "Alto Liderazgo · Baja Visibilidad Digital",
    headline: "Tienes el fondo y la sustancia. Te falta la arquitectura de visibilidad.",
    estado:
      "Eres una verdadera potencia de conocimiento, ética y resultados comprobados. Llevas años entregando un trabajo impecable y quienes han tenido la oportunidad de colaborar directamente contigo reconocen tu enorme capacidad y criterio. Sin embargo, has asumido sin darte cuenta el mito del trabajo silencioso, creyendo que \"entregar buenos resultados es suficiente para destacar\". Mientras trabajas duro en silencio, ves con frustración cómo otros profesionales con la mitad de tu trayectoria o talento se quedan con las mejores oportunidades, clientes y escenarios simplemente porque sí comunican su valor.",
    sintomas: [
      "Tu conocimiento y experiencia viven únicamente en tu cabeza, en archivos internos o en reuniones a puerta cerrada; no están ordenados en un Método público.",
      "Si un cliente, directivo o inversionista busca tu nombre en internet o consulta a motores de Inteligencia Artificial, prácticamente no apareces como una referencia en tu especialidad.",
      "Si decides cambiar de empresa, explorar una nueva industria o lanzar un nuevo proyecto, te toca empezar a explicar quién eres casi desde cero.",
      "Te genera incomodidad ver a figuras del mercado liderando la conversación de tu sector con propuestas superficiales pero muy bien comunicadas.",
    ],
    costoTitulo: "El Síndrome del Experto Invisible",
    costo:
      "Resultas indispensable para la ejecución operativa de los proyectos, pero permaneces ausente en las decisiones estratégicas de la industria, las juntas directivas, los medios de comunicación y las oportunidades comerciales de alto nivel.",
    diagnostico:
      "Tienes todo el fondo, la experiencia y la sustancia; lo único que te falta es la arquitectura de visibilidad. Tu conocimiento no puede seguir siendo un secreto bien guardado. Al activar tu Ecosistema Digital y comunicar tu criterio con estrategia, tu reputación comenzará a trabajar para ti de forma permanente, atrayendo oportunidades de manera orgánica.",
    siguientePaso: "Test 3 · Referente Digital (Los 5 Ejes)",
    secuencia: "El Poder de Comunicar tu Valor",
    propuesta: "Test 2 (Liderazgo) + Taller ADN",
  },
  Lider_Referente: {
    id: "Lider_Referente",
    number: 4,
    name: "El Líder Referente",
    short: "Líder Referente",
    coords: "Alto Liderazgo · Alta Visibilidad Digital",
    headline: "Has alcanzado el equilibrio. Tu enfoque ahora es la trascendencia y la escala.",
    estado:
      "Has alcanzado el equilibrio óptimo del Método REFERENTE®: tu profunda capacidad como profesional, directivo o empresario está respaldada por una presencia digital estratégica e impecable. No necesitas salir a buscar oportunidades a puerta fría; las mejores propuestas de clientes, alianzas comerciales, talento de alto nivel y proyectos de proyección llegan a ti atraídas por el peso de tu reputación. Eres una voz escuchada, respetada y valorada en tu industria.",
    sintomas: [
      "Tu nombre, tu marca o tu metodología son citados de forma natural por colegas, clientes y herramientas de Inteligencia Artificial como referentes.",
      "Cuentas con un Método propio consolidado que te permite delegar la operación diaria y concentrarte en la visión, la estrategia y el crecimiento.",
      "La conversación alrededor de tu marca genera confianza inmediata, lo que facilita negociaciones de alto nivel y ciclos de venta más cortos.",
      "Tu comunicación inspira a otros profesionales y marca la pauta sobre las tendencias y el futuro de tu área de especialidad.",
    ],
    costoTitulo: "La zona de confort y la complacencia",
    costo:
      "En un entorno dinámico y acelerado por la tecnología, perder la disciplina de renovar el mensaje o dejar de escuchar al mercado puede hacer que una autoridad consolidada pierda terreno frente a nuevos actores emergentes.",
    diagnostico:
      "Tu enfoque principal ahora es la trascendencia y la escala. Debes proteger tu activo reputacional, diversificar tus canales de impacto, formar a nuevos líderes dentro de tu organización o entorno y asegurar que tu pensamiento quede sistematizado para dejar un legado duradero en tu sector.",
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
        titulo: "Prioridad: Liderazgo y Criterio (El SER)",
        texto: `Ambos ejes están por debajo del punto de consolidación (SER ${ser}/100 · ECOSISTEMA ${eco}/100). Antes de ganar visibilidad, necesitas una propuesta de valor clara y un método ordenado: sin esa base, cualquier exposición se diluye.`,
      };
    case "Perfil_Vitrina":
      return {
        titulo: "Prioridad: Liderazgo y Criterio (El SER)",
        texto: `Tu Ecosistema Digital (${eco}/100) supera a tu eje de Liderazgo (${ser}/100) por ${diff} puntos. La atención ya existe; el trabajo está en darle sustancia, estructura y aplomo para que se convierta en autoridad y contratos.`,
      };
    case "Experto_Silencioso":
      return {
        titulo: "Prioridad: Posicionamiento y Ecosistema Digital",
        texto: `Tu Liderazgo (${ser}/100) supera a tu Ecosistema Digital (${eco}/100) por ${diff} puntos. El criterio ya está construido; ahora necesita una arquitectura que lo haga visible, encontrable en Google e IA y atractivo para las oportunidades correctas.`,
      };
    case "Lider_Referente":
      return {
        titulo: "Prioridad: Escala y legado",
        texto: `Ambos ejes están consolidados (SER ${ser}/100 · ECOSISTEMA ${eco}/100). Tu brecha ya no es de base, sino de escala: sistematizar tu pensamiento, multiplicar canales de impacto y formar a otros líderes.`,
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
      "Programa para equipos directivos y fundadores (Founder-Led Marketing) que unifica la narrativa de la empresa con la presencia de sus líderes visibles.",
  },
  {
    titulo: "Conferencias de impacto",
    texto: "\"Ser Referente\", \"Algoritmo\" y \"La IA: El Nuevo Buscador\", para convenciones, eventos del sector y programas ejecutivos.",
  },
];
