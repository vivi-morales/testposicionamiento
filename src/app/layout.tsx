import type { Metadata, Viewport } from "next";
import "./globals.css";
import Tracking from "@/components/Tracking";

const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(host ? `https://${host}` : "http://localhost:3000"),
  title: "Descubre tu Nivel de Posicionamiento y Liderazgo Referente | Vivi Morales Villa",
  description:
    "Diagnóstico gratuito de 4 a 5 minutos: evalúa tu Liderazgo y Criterio (#LiderazgoReferente) y tu Posicionamiento en buscadores e IA (#ReferenteDigital) con el Método REFERENTE®.",
  openGraph: {
    title: "Descubre tu Nivel de Posicionamiento y Liderazgo Referente",
    description: "Diagnóstico gratuito con informe ejecutivo personalizado. Método REFERENTE® por Vivi Morales Villa.",
    images: ["/og.png"],
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#191919" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Tracking />
      </body>
    </html>
  );
}
