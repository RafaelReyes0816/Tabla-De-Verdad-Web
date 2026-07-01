# Tablas de Verdad — Web

Versión web del juego de competencia de tablas de verdad.

## Variables de entorno

```bash
VITE_SUPABASE_URL=https://vexsfodfuqsjzorxmpwl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNmb2RmdXFzanpvcnhtcHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3OTA4OTUsImV4cCI6MjA5ODM2Njg5NX0.6iXTWGzu9-3COGuuQTRvYJUPWHK_8v4giJF3JUUZdKk
```

> ⚠️ Copiar en el dashboard de Vercel (Settings → Environment Variables) o en un archivo `.env` local.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build   # → dist/
```

## Stack

- Vite + React + TypeScript
- React Router DOM v7
- Supabase JS client
