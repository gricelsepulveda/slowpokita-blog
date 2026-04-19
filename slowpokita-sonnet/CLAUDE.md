# slowpokita blog — instrucciones para Claude

## Stack
- Next.js 14 App Router + TypeScript + SSR
- Sin base de datos — todo contenido en `content/posts.json`
- Arquitectura hexagonal: domain → application → infrastructure → presentation
- Estilo inline con variables CSS (no Tailwind, no CSS modules)

## Arquitectura de capas

```
src/
  domain/entities/Post.ts          ← tipos TypeScript del post
  domain/ports/PostRepository.ts   ← interfaz del repositorio
  application/usecases/GetAllPosts.ts ← lógica paginación/filtros
  infrastructure/
    repositories/JsonPostRepository.ts ← lee posts.json
    utils/readJson.ts                  ← fs.readFile del JSON
    utils/resolveAsset.ts              ← resuelve rutas de imágenes
    validators/postValidator.ts        ← valida estructura del JSON
    config/siteConfig.ts               ← título, subtítulo, redes sociales
  presentation/
    components/layout/   ← SiteHeader, SiteNav
    components/post/     ← PostCard, PostContent, HighlightedBanner
    components/ui/       ← CategoryBadge, Pagination
    components/search/   ← SearchBar
    components/lightbox/ ← ImageLightbox
  app/                   ← rutas Next.js App Router
```

## Paleta de colores (variables CSS)
```
--bg-primary:  #1E1B4C
--bg-card:     #252060
--pink:        #FF2E97
--yellow:      #FFD402
--cyan:        #0ABDC6
--text-primary: #f0eeff
```

## Cómo agregar un post nuevo

1. Abrir `content/posts.json`
2. Agregar objeto al array `posts` con todos los campos requeridos
3. Crear carpeta `content/posts/[slug]/` con imágenes
4. Copiar imágenes y referenciarlas en campo `images`

### Campos requeridos
```jsonc
{
  "id": "string único",
  "slug": "url-amigable-seo",
  "title": "Título del post",
  "subtitle": "Subtítulo opcional",
  "date": "YYYY-MM-DD",
  "category": "Nombre de categoría",
  "hashtags": ["tag1", "tag2"],
  "highlighted": false,        // true = aparece en Destacados y banner home
  "readingTime": 5,            // minutos estimados
  "coverImage": "cover.jpg",   // opcional
  "excerpt": "Resumen breve (~200 chars)",
  "content": "Texto completo. Insertar $image1 donde va imagen.",
  "assetsPath": "mi-post-slug",
  "images": { "image1": "foto.jpg" },
  "seo": {
    "seoTitle": "Título SEO — slowpokita",
    "seoDescription": "Descripción 150 chars",
    "ogImage": "cover.jpg"
  }
}
```

### Imágenes en el contenido
Insertar `$imageN` en el texto donde debe aparecer la imagen:
```
Texto del párrafo.

$image1

Continúa el texto aquí.
```
El mapping va en campo `images`: `{ "image1": "archivo.jpg" }`

## Destacar un post
Poner `"highlighted": true`. El primer post destacado aparece como banner en home y en sección `/featured`.

## Categorías
Se generan automáticamente del JSON. No hay config extra.
Colores pre-asignados: Personal → pink, Viajes → yellow, Tecnología → cyan.
Para nueva categoría con color: editar `CategoryBadge.tsx` y agregar entrada en `COLORS`.

## Configuración del sitio
Editar `src/infrastructure/config/siteConfig.ts`:
- `title`, `subtitle`, `description`
- `url` (dominio de producción)
- `social.linkedin`, `social.instagram`
- `headerImage` (ruta en `/public/`)

## Rutas disponibles
```
/                         → home, últimos posts + banner destacado
/posts/[page]             → paginación
/post/[slug]              → post individual
/featured                 → posts highlighted
/featured/[page]
/categories               → lista categorías
/category/[slug]          → posts por categoría
/category/[slug]/[page]
/archive                  → índice año/mes
/archive/[year]/[month]   → posts de ese mes
/search?q=término         → búsqueda client-side
```

## Prompt reutilizable para agregar posts con IA

```
Eres un asistente que convierte texto en posts para el blog slowpokita.
El blog usa JSON local. Necesito que generes el objeto JSON del post.

Datos del post:
- Título: [título]
- Subtítulo: [subtítulo opcional]
- Categoría: [Personal | Viajes | Tecnología | otra]
- Hashtags: [lista separada por comas]
- Highlighted: [sí/no]
- Tiempo de lectura estimado: [N minutos]
- Texto: [texto completo]
- Imágenes: [lista de nombres de archivo, ej: foto1.jpg, foto2.jpg]

Reglas:
1. Genera slug en kebab-case desde el título en español.
2. Inserta $image1, $image2... en el content donde sea natural.
3. El campo "images" mapea image1→foto1.jpg, etc.
4. assetsPath = slug del post.
5. excerpt = primeros ~200 chars del texto.
6. date = hoy en YYYY-MM-DD.
7. id = timestamp unix o número incremental.
8. Responde SOLO con el JSON del objeto post, sin explicación extra.
```

## Restricciones del proyecto
- Sin base de datos ni CMS externo
- Sin sistema de comentarios
- Sin CSS modules ni Tailwind — usar variables CSS inline
- Validación del JSON en `postValidator.ts` (revisar si se agregan campos)
- SSR en todas las páginas de posts (sin `'use client'` salvo lightbox y searchbar)
