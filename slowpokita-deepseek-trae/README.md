# slowpokita – A Personal Blog

A minimalist, dark-themed personal blog built with Next.js, TypeScript, and hexagonal architecture. All content is stored locally in JSON files, making it simple to edit and maintain.

## Features

- **Hexagonal Architecture**: Clean separation between domain, application, infrastructure, and presentation layers.
- **Local JSON Content**: No database or external CMS. All posts live in `/content/posts.json`.
- **Full SEO**: Open Graph, Twitter Cards, sitemap, robots.txt, and semantic HTML.
- **Responsive Design**: Mobile-first, dark aesthetic with a custom color palette.
- **Search**: Instant client-side filtering by title, hashtags, and category.
- **Sections**:
  - Posts (paginated)
  - Featured posts
  - Category pages
  - Year/month archive
- **Image Lightbox**: Clickable embedded images with a modal viewer.
- **Easy Content Editing**: Plain‑text content with simple image placeholders (`$image1`, `$image2`, …).

## Tech Stack

- **Next.js 14** (App Router, Server‑Side Rendering)
- **TypeScript** (strict mode)
- **Tailwind CSS** + CSS custom properties
- **Zod** for runtime validation
- **Montserrat** as the primary font

## Project Structure

```
slowpokita-deepseek-trae/
├── app/                    # Presentation layer (Next.js App Router)
│   ├── components/         # Reusable UI components
│   ├── lib/               # Repository injection & helper functions
│   ├── page.tsx           # Homepage
│   ├── posts/             # All posts listing (paginated)
│   ├── post/[slug]/       # Individual post page
│   ├── featured/          # Highlighted posts
│   ├── categories/        # Category listing
│   ├── category/[slug]/   # Posts by category
│   ├── archive/           # Year/month archive
│   └── layout.tsx         # Root layout
├── src/
│   ├── domain/            # Entities, value objects, ports (interfaces)
│   ├── application/       # Use cases (business logic)
│   └── infrastructure/    # JSON file reader, adapters
├── content/
│   └── posts.json         # All blog posts (single source of truth)
└── public/                # Static assets, robots.txt
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm/bun

### Installation

1. Clone the repository.
2. Navigate to the project folder:
   ```bash
   cd slowpokita-blog/slowpokita-deepseek-trae
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Content Management

### Adding a New Post

1. Edit `/content/posts.json`.
2. Append a new entry following the [Post Template](./POST_TEMPLATE.json).
3. For images, place them in `/content/posts/<slug>/` and reference them in the `images` map.
4. In the `content` field, use placeholders like `$image1`, `$image2`, etc. where you want images to appear.

Detailed instructions are available in [CONTENT_GUIDE.md](./CONTENT_GUIDE.md).

### Post Model

Each post must match the TypeScript interface `Post` (see `src/domain/models/post.ts`). Required fields:

- `id`: unique identifier (number)
- `slug`: URL‑friendly identifier
- `title`: post title
- `date`: publication date (YYYY‑MM‑DD)
- `category`: primary category
- `hashtags`: array of tags
- `highlighted`: boolean for featured section
- `readingTime`: estimated minutes
- `excerpt`: short summary
- `content`: main text with optional image placeholders

Optional fields: `subtitle`, `coverImage`, `seoTitle`, `seoDescription`, `ogImage`, `assetsPath`, `images`.

## Architecture Notes

- **Domain Layer**: Contains the `Post` entity and the `PostRepository` interface (port).
- **Application Layer**: Pure use‑case classes (e.g., `GetAllPostsUseCase`, `SearchPostsUseCase`).
- **Infrastructure Layer**: `JsonPostRepository` implements the repository port by reading and validating `/content/posts.json`.
- **Presentation Layer**: Next.js pages and components that depend on the repository through the injected use cases.

This separation ensures business logic remains independent of frameworks and data sources.

## Design System

The blog uses a custom dark palette:

- Background: `#1E1B4C`
- Primary: `#FF2E97` (accent pink)
- Secondary: `#FFD402` (yellow)
- Accent: `#0ABDC6` (cyan)

Font: Montserrat (loaded via `next/font`).

## SEO

Every page includes appropriate `<title>`, `<meta>` descriptions, Open Graph, and Twitter Card tags. A dynamic sitemap (`/sitemap.xml`) and `robots.txt` are automatically generated.

## License

MIT