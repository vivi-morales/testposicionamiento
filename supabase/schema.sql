-- Test "Descubre tu Nivel de Posicionamiento y Liderazgo Referente"
-- Ejecutar una sola vez en Supabase → SQL Editor → New query → Run.

create table if not exists public.diagnosticos (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  completed_at      timestamptz,
  estado            text not null default 'iniciado' check (estado in ('iniciado', 'completado')),

  -- Paso 1: contacto
  nombre            text not null,
  email             text not null,
  -- Paso 2: perfil profesional
  rol               text not null,
  empresa           text not null,
  sector            text not null,
  tamano            text not null,
  -- Paso 3: pregolpe comercial
  desafio           text not null,
  consentimiento    boolean not null default false,
  consentimiento_at timestamptz,

  -- Respuestas (clave = id de pregunta "1.1" … "2.10", valor 1–4)
  respuestas        jsonb,

  -- Puntajes: brutos (10–40) y normalizados (0–100)
  ser_puntos        smallint,
  eco_puntos        smallint,
  ser_100           smallint,
  eco_100           smallint,
  total_100         smallint,

  -- Etiquetas de segmentación (Documento 4)
  tag_rol           text,
  tag_cuadrante     text,
  tag_desafio       text,
  siguiente_paso    text,
  secuencia_email   text,
  propuesta         text,

  -- Contexto técnico
  user_agent        text,
  referer           text,
  utm               jsonb
);

create index if not exists diagnosticos_created_at_idx on public.diagnosticos (created_at desc);
create index if not exists diagnosticos_email_idx      on public.diagnosticos (email);
create index if not exists diagnosticos_cuadrante_idx  on public.diagnosticos (tag_cuadrante);

-- Seguridad: RLS activo y sin políticas → nadie puede leer ni escribir desde el navegador.
-- El sitio escribe desde el servidor con la clave service_role, que ignora RLS.
alter table public.diagnosticos enable row level security;

-- Vista práctica para consultar y exportar desde el panel de Supabase.
create or replace view public.diagnosticos_resumen
with (security_invoker = true) as
select
  created_at, estado, nombre, email, empresa, sector, tamano,
  tag_rol, tag_desafio, tag_cuadrante, ser_100, eco_100, total_100,
  siguiente_paso, secuencia_email, propuesta, id
from public.diagnosticos
order by created_at desc;
