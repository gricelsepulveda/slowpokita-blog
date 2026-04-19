# slowpokita blog

Blog personal minimalista — Next.js 14 + TypeScript + SSR + JSON local.

## Instalación

```bash
cd slowpokita-blog
npm install
npm run dev
# → http://localhost:3000
```

## Build producción

```bash
npm run build
npm start
```

## Agregar posts

Ver [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) y [POST_TEMPLATE.json](./POST_TEMPLATE.json).

## Configuración del sitio

Editar `src/infrastructure/config/siteConfig.ts`:
- título, subtítulo, URL
- links de LinkedIn e Instagram
- imagen del header (colocar en `/public/`)
