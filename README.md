# Test de Posicionamiento y Liderazgo Referente

Landing + test gratuito (lead magnet) de **Vivi Morales Villa · Método REFERENTE®**.

Flujo: landing → formulario de 3 pasos → 20 preguntas en 5 pantallas → "procesamiento" (8–12 s) →
resultado en pantalla + informe PDF de 6 páginas + tarjeta compartible 1080×1350.
Cada diagnóstico se guarda en Supabase (tabla `diagnosticos`).

## Puesta en marcha

### 1. Supabase (una sola vez)
1. Abre el proyecto → **SQL Editor** → **New query**.
2. Pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) y pulsa **Run**.
3. Copia la clave **service_role** desde **Project Settings → API** (no la compartas ni la subas al repositorio).

### 2. Vercel
1. **Add New → Project** → importa el repositorio `vivi-morales/testposicionamiento`.
2. En **Environment Variables** agrega:
   - `SUPABASE_URL` = `https://jscplsxfwvzsbysgvhjo.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = la clave service_role
3. **Deploy**.

### 3. Consultar los datos
Supabase → **Table Editor** → `diagnosticos` (o la vista `diagnosticos_resumen`). Botón **Export → CSV**.

| Estado | Significado |
|---|---|
| `iniciado` | Llenó el formulario pero no terminó el test (lead parcial). |
| `completado` | Terminó el test; tiene respuestas, puntajes y etiquetas. |

Columnas de segmentación: `tag_rol`, `tag_cuadrante`, `tag_desafio`, más `siguiente_paso`,
`secuencia_email` y `propuesta` según la matriz de enrutamiento del Documento 4. También guarda UTM.

## Personalización rápida
- **Enlaces de los botones** (Test 2, Test 3, agendar, política de datos…): `src/lib/config.ts`.
- **Duración del procesamiento**: `PROCESSING_MS` en `src/lib/config.ts`.
- **Preguntas**: `src/lib/questions.ts` · **Textos de cuadrantes**: `src/lib/content.ts`.
- **Logos y fotos**: `public/brand/` y `public/photos/` (reemplazar conservando el nombre).

## Lógica de cálculo
Cada eje suma 10 respuestas de 1 a 4 (10–40 pts). Alto desde 25 pts. Al usuario se muestra en 0–100:
`(pts − 10) / 30 × 100`, con el corte en 50. El cálculo se repite en el servidor antes de guardar.

## Desarrollo local
```bash
npm install
cp .env.example .env.local   # completar la clave
npm run dev
```
