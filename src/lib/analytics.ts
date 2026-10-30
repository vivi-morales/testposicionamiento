// Google Analytics 4 y Meta Pixel de vivimoralesvilla.com. Se pueden reemplazar con las
// variables de entorno NEXT_PUBLIC_GA_ID y NEXT_PUBLIC_META_PIXEL_ID en Vercel.
// Nunca se envían datos personales (nombre, correo, teléfono).

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-WS2531HX9S";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "418270398829122";

type Params = Record<string, string | number>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Vista de una "pantalla" del embudo (la app no recarga la página entre pasos). */
export function trackPage(path: string, title: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: title,
  });
  window.fbq?.("track", "PageView");
}

/**
 * Evento de negocio. `meta` es el nombre del evento en Meta: los estándar (Lead,
 * CompleteRegistration) se envían con track; los demás, con trackCustom.
 */
export function trackEvent(ga: string, meta: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", ga, params);
  const standard = ["Lead", "CompleteRegistration", "ViewContent", "Contact", "Schedule"];
  window.fbq?.(standard.includes(meta) ? "track" : "trackCustom", meta, params);
}
