// Tarjeta compartible 1080 × 1350 (formato recomendado por el manual para Instagram/LinkedIn).
import { QUADRANTS } from "./content";
import { HERE_TEXT, MATRIX_QUADS, clampPoint, hereLabel } from "./matrix";
import type { Scores } from "./scoring";
import { AXES, TEST_URL_LABEL } from "./config";

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

export async function buildShareCard(scores: Scores): Promise<Blob> {
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
  const mx = M + 48, my = 512, ms = 500;
  const px = (x: number) => mx + (x / 100) * ms;
  const py = (y: number) => my + ms - (y / 100) * ms;
  for (const quad of MATRIX_QUADS) {
    const active = quad.id === scores.quadrant;
    ctx.fillStyle = active ? "#D4FFDE" : "#2A2A2A";
    roundRect(ctx, px(quad.x0) + 5, py(quad.y0 + 50) + 5, ms / 2 - 10, ms / 2 - 10, 14);
    ctx.fill();
  }
  const cx = px(clampPoint(scores.ser)), cy = py(clampPoint(scores.eco));

  // Ejes con flecha, guías punteadas y rótulos (igual que la gráfica del PDF)
  const ox = px(0), oy = py(0), axisEnd = 18;
  ctx.strokeStyle = "#9A9A9A";
  ctx.fillStyle = "#9A9A9A";
  ctx.lineWidth = 3;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(ox, oy);
  ctx.lineTo(px(100) + axisEnd, oy);
  ctx.moveTo(ox, oy);
  ctx.lineTo(ox, py(100) - axisEnd);
  ctx.stroke();
  const arrow = (x: number, y: number, dx: number, dy: number) => {
    ctx.beginPath();
    ctx.moveTo(x + dx * 14, y + dy * 14);
    ctx.lineTo(x - dy * 9, y + dx * 9);
    ctx.lineTo(x + dy * 9, y - dx * 9);
    ctx.closePath();
    ctx.fill();
  };
  arrow(px(100) + axisEnd, oy, 1, 0);
  arrow(ox, py(100) - axisEnd, 0, -1);

  ctx.strokeStyle = "#758B7B";
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, oy);
  ctx.moveTo(ox, cy);
  ctx.lineTo(cx, cy);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = "700 20px Poppins";
  ctx.textAlign = "center";
  for (const quad of MATRIX_QUADS) {
    const active = quad.id === scores.quadrant;
    const lx = px(quad.x0) + ms / 4, ly = py(quad.y0 + 50) + 60;
    quad.label.forEach((t, i) => {
      // Fondo del color de la celda para que la guía punteada pase por detrás del texto
      const w = ctx.measureText(t).width;
      ctx.fillStyle = active ? "#D4FFDE" : "#2A2A2A";
      ctx.fillRect(lx - w / 2 - 6, ly + i * 26 - 20, w + 12, 26);
      ctx.fillStyle = active ? "#191919" : "#6B6B6B";
      ctx.fillText(t, lx, ly + i * 26);
    });
  }

  ctx.fillStyle = "#B9B9B9";
  ctx.font = "600 19px Poppins";
  ctx.textAlign = "center";
  ctx.fillText(`${AXES.x.nombre} ${AXES.x.tag}`, px(50), oy + 42);
  ctx.save();
  ctx.translate(ox - 26, py(50));
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(`${AXES.y.nombre} ${AXES.y.tag}`, 0, 0);
  ctx.restore();

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

  const here = hereLabel(cx, cy, scores.ser, scores.eco, 196, 44, 30, 18, ms / 100);
  ctx.strokeStyle = "#191919";
  ctx.fillStyle = "#191919";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(here.start[0], here.start[1]);
  ctx.lineTo(here.base[0], here.base[1]);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(here.tip[0], here.tip[1]);
  ctx.lineTo(here.head1[0], here.head1[1]);
  ctx.lineTo(here.head2[0], here.head2[1]);
  ctx.closePath();
  ctx.fill();
  roundRect(ctx, here.x, here.y, here.w, here.h, 22);
  ctx.fill();
  ctx.fillStyle = "#D4FFDE";
  ctx.font = "700 22px Poppins";
  ctx.textAlign = "center";
  ctx.fillText(HERE_TEXT, here.cxText, here.y + 30);

  // Puntajes
  ctx.textAlign = "left";
  const sx = mx + ms + 70;
  [
    { l: "LIDERAZGO Y CRITERIO", tag: AXES.x.tag, v: scores.ser, y: 590 },
    { l: "POSICIONAMIENTO", tag: AXES.y.tag, v: scores.eco, y: 820 },
  ].forEach((r) => {
    ctx.fillStyle = "#758B7B";
    ctx.font = "600 21px Poppins";
    ctx.fillText(r.l, sx, r.y);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 96px Poppins";
    ctx.fillText(String(r.v), sx, r.y + 100);
    const nw = ctx.measureText(String(r.v)).width;
    ctx.fillStyle = "#9A9A9A";
    ctx.font = "400 26px Poppins";
    ctx.fillText("/100", sx + nw + 8, r.y + 100);
    ctx.fillStyle = "#D4FFDE";
    ctx.font = "600 22px Poppins";
    ctx.fillText(r.tag, sx, r.y + 140);
  });

  // Pie
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "600 34px Poppins";
  ctx.fillText("¿Y tú? Descubre tu nivel.", M, 1170);
  ctx.fillStyle = "#D4FFDE";
  ctx.font = "400 26px Poppins";
  ctx.fillText(TEST_URL_LABEL, M, 1215);
  const monoW = 130;
  ctx.drawImage(mono, W - M - monoW, 1150, monoW, (mono.height / mono.width) * monoW);
  ctx.fillStyle = "#758B7B";
  ctx.font = "400 20px Poppins";
  ctx.textAlign = "right";
  ctx.fillText("Método REFERENTE® · Vivi Morales Villa", W - M, 1262);

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas"))), "image/png"));
}
