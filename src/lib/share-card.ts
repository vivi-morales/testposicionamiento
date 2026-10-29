// Tarjeta compartible 1080 × 1350 (formato recomendado por el manual para Instagram/LinkedIn).
import { QUADRANTS } from "./content";
import { MATRIX_QUADS, clampPoint } from "./matrix";
import type { Scores } from "./scoring";

const W = 1080, H = 1350, M = 88;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export async function buildShareCard(scores: Scores, siteUrl: string): Promise<Blob> {
  await Promise.all([document.fonts.load("700 80px Poppins"), document.fonts.load("400 30px Poppins"), document.fonts.load("600 24px Poppins")]);
  const [logo, mono] = await Promise.all([loadImage("/brand/logo-wordmark-blanco.png"), loadImage("/brand/monograma-blanco.png")]);
  const q = QUADRANTS[scores.quadrant];

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#191919";
  ctx.fillRect(0, 0, W, H);

  // Encabezado
  const logoW = 300;
  ctx.drawImage(logo, M, M, logoW, (logo.height / logo.width) * logoW);
  ctx.fillStyle = "#D4FFDE";
  ctx.font = "600 24px Poppins";
  ctx.textAlign = "left";
  ctx.fillText("MI RESULTADO · TEST DE POSICIONAMIENTO", M, 230);

  // Nombre del cuadrante con franja de énfasis en la última palabra
  const words = q.name.split(" ");
  const last = words.pop()!;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 84px Poppins";
  ctx.fillText(words.join(" "), M, 330);
  const lw = ctx.measureText(last).width;
  ctx.fillStyle = "#D4FFDE";
  roundRect(ctx, M - 6, 352, lw + 36, 104, 8);
  ctx.fill();
  ctx.fillStyle = "#191919";
  ctx.fillText(last, M + 12, 432);

  // Matriz
  const mx = M, my = 520, ms = 520;
  const px = (x: number) => mx + (x / 100) * ms;
  const py = (y: number) => my + ms - (y / 100) * ms;
  for (const quad of MATRIX_QUADS) {
    const active = quad.id === scores.quadrant;
    ctx.fillStyle = active ? "#D4FFDE" : "#2A2A2A";
    roundRect(ctx, px(quad.x0) + 5, py(quad.y0 + 50) + 5, ms / 2 - 10, ms / 2 - 10, 14);
    ctx.fill();
    ctx.fillStyle = active ? "#191919" : "#6B6B6B";
    ctx.font = "700 20px Poppins";
    ctx.textAlign = "center";
    quad.label.forEach((t, i) => ctx.fillText(t, px(quad.x0) + ms / 4, py(quad.y0 + 50) + 60 + i * 26));
  }
  const cx = px(clampPoint(scores.ser)), cy = py(clampPoint(scores.eco));
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.fillStyle = "#191919";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#FFFFFF";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#A4FFBB";
  ctx.fill();

  // Puntajes
  ctx.textAlign = "left";
  const sx = mx + ms + 70;
  [
    { l: "LIDERAZGO", s: "El SER", v: scores.ser, y: 600 },
    { l: "ECOSISTEMA", s: "Google / IA", v: scores.eco, y: 820 },
  ].forEach((r) => {
    ctx.fillStyle = "#758B7B";
    ctx.font = "600 22px Poppins";
    ctx.fillText(r.l, sx, r.y);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 96px Poppins";
    ctx.fillText(String(r.v), sx, r.y + 100);
    ctx.fillStyle = "#9A9A9A";
    ctx.font = "400 24px Poppins";
    ctx.fillText(`/100 · ${r.s}`, sx, r.y + 140);
  });

  // Pie
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "600 34px Poppins";
  ctx.fillText("¿Y tú? Descubre tu nivel.", M, 1170);
  ctx.fillStyle = "#D4FFDE";
  ctx.font = "400 26px Poppins";
  ctx.fillText(siteUrl.replace(/^https?:\/\//, ""), M, 1215);
  const monoW = 130;
  ctx.drawImage(mono, W - M - monoW, 1150, monoW, (mono.height / mono.width) * monoW);
  ctx.fillStyle = "#758B7B";
  ctx.font = "400 20px Poppins";
  ctx.textAlign = "right";
  ctx.fillText("Método REFERENTE® · Vivi Morales Villa", W - M, 1262);

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas"))), "image/png"));
}
