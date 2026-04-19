# slowpokita

Personal blog built with Next.js 14, React, TypeScript, and Tailwind CSS. Uses hexagonal architecture and JSON-based content (no database).

## Features

- Server-side rendering (SSR) with Next.js App Router
- Strong SEO: Open Graph, Twitter cards, canonical URLs
- Dark Tumblr-inspired aesthetic
- Image lightbox with ESC/click-outside close
- Client-side search
- Archive by year/month
- Category filtering
- Highlighted posts
- Mobile-first responsive design

## Architecture

```
src/
├── domain/           # Entities, types, repository ports
├── application/      # Use cases, DTOs
├── infrastructure/   # JSON adapter, config, DI container
└── presentation/     # Components, pages (app/)
```

Content lives in `/content/posts.json` with assets per post in `/content/posts/[slug]/`.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for Production

```bash
npm run build
```

Static export in `/.next/static/`.

## Adding Posts

See CONTENT_GUIDE.md for detailed instructions and POST_TEMPLATE.json as starting point.

## Configuration

Edit `src/infrastructure/config/site.ts` for:
- Blog title/subtitle
- Social links (LinkedIn, Instagram)

## License

MIT