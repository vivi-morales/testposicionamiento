// Cuestionario oficial (Documento 2: Base de Conocimiento y Matriz del Test).

export type Axis = "ser" | "ecosistema";

export interface Question {
  id: string;
  axis: Axis;
  title: string;
  text: string;
}

export const SCALE = [
  { value: 1, label: "Casi nunca", color: "#E5484D" },
  { value: 2, label: "A veces", color: "#F5A524" },
  { value: 3, label: "Frecuentemente", color: "#B5E853" },
  { value: 4, label: "Siempre", color: "#2FBF71" },
] as const;

export const QUESTIONS: Question[] = [
  // Eje X: Liderazgo y Criterio #LiderazgoReferente
  {
    id: "1.1",
    axis: "ser",
    title: "Comunicación del valor",
    text: "¿Logras que tus clientes, superiores o aliados entiendan de inmediato el valor real y el impacto de lo que haces, sin tener que hacer explicaciones largas o complejas?",
  },
  {
    id: "1.2",
    axis: "ser",
    title: "Presencia y aplomo al hablar",
    text: "Al presentar una idea en una reunión, comité o escenario, ¿sientes que proyectas seguridad, aplomo y logras que la gente te escuche con atención genuina?",
  },
  {
    id: "1.3",
    axis: "ser",
    title: "Delegación y espacio estratégico",
    text: "¿Logras soltar las tareas operativas del día a día para concentrarte en la estrategia, la toma de decisiones y el crecimiento de tu proyecto o área?",
  },
  {
    id: "1.4",
    axis: "ser",
    title: "Propuesta de valor diferenciada",
    text: "¿Tienes definida con total claridad una propuesta de valor única que te diferencia claramente de otros profesionales o empresas de tu mismo sector?",
  },
  {
    id: "1.5",
    axis: "ser",
    title: "Seguridad en la propia autoridad",
    text: "¿Te sientes cómodo/a compartiendo tus logros, análisis y puntos de vista profesionales sin sentir que estás \"presumiendo\" o incomodando a otros?",
  },
  {
    id: "1.6",
    axis: "ser",
    title: "Coherencia entre proyección y ejecución",
    text: "¿Lo que proyectas profesionalmente en conversaciones de alto nivel coincide al 100% con la calidad real de tu entrega y forma de trabajar?",
  },
  {
    id: "1.7",
    axis: "ser",
    title: "Red de apoyo y recomendación orgánica",
    text: "¿Cuentas con una red activa de colegas, aliados o exclientes que recomiendan tu trabajo de forma espontánea cuando surgen oportunidades clave?",
  },
  {
    id: "1.8",
    axis: "ser",
    title: "Influencia sin jerarquía formal",
    text: "Cuando propones un cambio, proyecto o iniciativa, ¿logras movilizar e inspirar a otros a la acción sin necesidad de recurrir a una autoridad jerárquica?",
  },
  {
    id: "1.9",
    axis: "ser",
    title: "Visión prospectiva del sector",
    text: "¿Dedicas tiempo semanal a estudiar tendencias, analizar el futuro de tu industria y estructurar opiniones propias sobre hacia dónde va tu área?",
  },
  {
    id: "1.10",
    axis: "ser",
    title: "Conexión humana y empatía comercial",
    text: "En tus conversaciones de negocio o trabajo, ¿logras conectar de manera auténtica con las necesidades e intereses reales de la otra persona desde el primer momento?",
  },
  // Eje Y: Posicionamiento #ReferenteDigital
  {
    id: "2.1",
    axis: "ecosistema",
    title: "Perfil digital estratégico",
    text: "Si un potencial cliente o directivo revisa hoy tu perfil de LinkedIn o redes profesionales, ¿entiende en menos de 10 segundos cuál es tu especialidad y cómo puedes ayudarle?",
  },
  {
    id: "2.2",
    axis: "ecosistema",
    title: "Constancia en la comunicación de criterio",
    text: "¿Compartes análisis, aprendizajes o experiencias profesionales en tus canales digitales de forma metódica y constante?",
  },
  {
    id: "2.3",
    axis: "ecosistema",
    title: "Método propio estructurado",
    text: "¿Tienes ordenado tu conocimiento en un Método propio (pasos, pilares o marco de trabajo definido) que tus clientes o equipo identifiquen contigo?",
  },
  {
    id: "2.4",
    axis: "ecosistema",
    title: "Atracción orgánica de oportunidades",
    text: "¿Te llegan mensajes de clientes interesados, invitaciones a proyectos o propuestas de trabajo sin necesidad de salir a buscar constantemente a puerta fría?",
  },
  {
    id: "2.5",
    axis: "ecosistema",
    title: "Visibilidad en Google e IA",
    text: "Si alguien busca tu nombre o tu especialidad profesional en Google o en herramientas de Inteligencia Artificial (como ChatGPT o Gemini), ¿apareces como una referencia destacada en tu área?",
  },
  {
    id: "2.6",
    axis: "ecosistema",
    title: "Calidad de la red conectada",
    text: "En tus redes profesionales, ¿estás conectado/a de forma directa con tomadores de decisión, directivos, inversionistas o clientes ideales de tu sector?",
  },
  {
    id: "2.7",
    axis: "ecosistema",
    title: "Capacidad de generar conversación",
    text: "Cuando compartes un punto de vista o análisis sobre tu sector, ¿logras que otros profesionales o líderes comenten, debatan o compartan tu contenido?",
  },
  {
    id: "2.8",
    axis: "ecosistema",
    title: "Planificación y estrategia de contenidos",
    text: "¿Cuentas con un plan definido de los temas y pilares de conocimiento que vas a comunicar cada mes, en lugar de publicar de forma improvisada cuando tienes tiempo?",
  },
  {
    id: "2.9",
    axis: "ecosistema",
    title: "Coherencia entre reputación digital y realidad",
    text: "¿Tu huella en internet refleja con total fidelidad el nivel de experiencia, los logros y el rigor profesional que has construido en el mundo real?",
  },
  {
    id: "2.10",
    axis: "ecosistema",
    title: "Retorno tangible del posicionamiento",
    text: "¿Tu presencia y visibilidad digital te han permitido cerrar negocios, cobrar tarifas más altas o acceder a mejores oportunidades profesionales en el último año?",
  },
];

export const QUESTIONS_PER_SCREEN = 4;
