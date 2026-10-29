// Generación del informe PDF en el navegador (se carga solo al pulsar "Descargar").
import { Font, pdf } from "@react-pdf/renderer";
import ReportDocument from "@/components/report/ReportDocument";
import type { LeadInput } from "./form-options";
import type { Answers, Scores } from "./scoring";

let fontsReady = false;

function registerFonts(origin: string) {
  if (fontsReady) return;
  Font.register({
    family: "Poppins",
    fonts: [
      { src: `${origin}/fonts/Poppins-Light.ttf`, fontWeight: 300 },
      { src: `${origin}/fonts/Poppins-Regular.ttf`, fontWeight: 400 },
      { src: `${origin}/fonts/Poppins-Medium.ttf`, fontWeight: 500 },
      { src: `${origin}/fonts/Poppins-SemiBold.ttf`, fontWeight: 600 },
      { src: `${origin}/fonts/Poppins-Bold.ttf`, fontWeight: 700 },
    ],
  });
  // Sin división silábica automática (evita cortes en inglés sobre texto en español).
  Font.registerHyphenationCallback((word) => [word]);
  fontsReady = true;
}

export async function buildReportPdf(
  lead: LeadInput,
  result: { scores: Scores; answers: Answers; date: string },
  origin = window.location.origin,
) {
  registerFonts(origin);
  const doc = (
    <ReportDocument lead={lead} scores={result.scores} answers={result.answers} date={new Date(result.date)} origin={origin} />
  );
  return pdf(doc).toBlob();
}
