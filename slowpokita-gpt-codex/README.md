# slowpokita

Blog personal minimalista. Next.js 15 + TypeScript + arquitectura hexagonal. Contenido desde JSON local, sin base de datos.

## Requisitos
- Node.js 20+
- npm

## Instalacion
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```
Abrir http://localhost:3000

## Build de produccion
```bash
npm run build
npm start
```

## Typecheck
```bash
npm run typecheck
```

## Agregar posts
Ver [CONTENT_GUIDE.md](CONTENT_GUIDE.md), [POST_TEMPLATE.json](content/POST_TEMPLATE.json) y [AI_POST_PROMPT.md](AI_POST_PROMPT.md).

## Estructura
- `content/posts.json` — fuente de verdad
- `content/posts/<slug>/` — assets por post para edicion local
- `public/content/posts/<slug>/` — imagenes del post
- `src/config/site.ts` — nombre, subtitulo, socials
- `src/domain`, `src/application`, `src/infrastructure`, `src/presentation` — capas hexagonales
