# CLAUDE.md - slowpokita

Guia unica para que una IA (o humanx) entienda este proyecto y sepa como agregar posts en prompts futuros.

## 1. Que es este proyecto
Blog personal minimalista llamado **slowpokita**, escrito en **espanol latinoamericano**. Sin base de datos, sin CMS, sin comentarios. Todo el contenido vive en archivos locales JSON + carpetas de imagenes.

Vibra: Tumblr oscuro, pero ordenado y moderno. Slow living.

## 2. Stack
- Next.js 15 (App Router), React 19, TypeScript strict
- SSR habilitado por defecto en todas las paginas
- Mobile-first, CSS plano en [src/presentation/styles/globals.css](src/presentation/styles/globals.css)
- Fuente: Montserrat (Google Fonts)
- Sin base de datos, sin backend externo

## 3. Arquitectura hexagonal
Capas bajo [src/](src/):

- **domain/** — entidades (`Post`, `Category`...), tipos puros, reglas de paginacion, puertos (`PostRepository`).
- **application/** — casos de uso (`PostUseCases`): listar posts, destacados, categorias, archivo, busqueda.
- **infrastructure/** — adaptadores: `JsonPostRepository` lee `content/posts.json`. Container compone las dependencias.
- **presentation/** — componentes React, estilos, layouts. Solo UI. No logica de negocio.

La UI nunca lee JSON directo. Siempre pasa por `postUseCases` desde [src/infrastructure/container.ts](src/infrastructure/container.ts).

## 4. Estructura de carpetas relevante

```
slowpokita-bl/
  content/
    posts.json           <- fuente unica de posts
    POST_TEMPLATE.json   <- plantilla de referencia
  public/
    hero.jpg             <- imagen del header
    content/posts/<slug>/<imagenes>   <- assets servidos al cliente
  src/
    app/                 <- rutas Next.js App Router
    config/site.ts       <- nombre, subtitulo, socials, URL
    domain/
    application/
    infrastructure/
    presentation/
  CLAUDE.md
  README.md
  CONTENT_GUIDE.md
```

**Importante:** los archivos de imagen de cada post viven en dos lugares logicos:
- Referencia de autor: `content/posts/<slug>/` (opcional, para backup / edicion local)
- Servido publico real: `public/content/posts/<slug>/` (lo que el navegador pide)

Por simplicidad, en este proyecto usamos solo `public/content/posts/<slug>/`. `assetsPath` en el JSON apunta a esa ruta publica.

## 5. Rutas
- `/` redirige a `/posts`
- `/posts` y `/posts/[page]` — ultimos posts, paginados de 10
- `/featured` y `/featured/[page]` — destacados (`highlighted: true`)
- `/categories` — lista de categorias con conteo
- `/category/[slug]` y `/category/[slug]/[page]` — posts por categoria
- `/archive` — indice por anio y mes
- `/archive/[year]/[month]` — posts de ese mes
- `/post/[slug]` — detalle de post (con JSON-LD, OG, canonical)
- `/api/search-index` — JSON para la busqueda cliente
- `/sitemap.xml`, `/robots.txt` — SEO

## 6. Schema de Post
Definido en [src/domain/post.ts](src/domain/post.ts):

```ts
interface Post {
  id: string;
  slug: string;              // seo friendly, sin espacios ni acentos
  title: string;
  subtitle?: string;
  date: string;              // ISO YYYY-MM-DD
  category: string;          // texto visible, ej "Cronica"
  hashtags: string[];
  highlighted: boolean;
  readingTime: number;       // minutos
  coverImage?: string;       // archivo dentro de assetsPath
  excerpt: string;
  content: string;           // texto largo con marcadores $imageN
  assetsPath: string;        // "/content/posts/<slug>"
  images?: Record<string, string>;   // { image1: "image1.jpg" }
  seo?: { seoTitle?: string; seoDescription?: string; ogImage?: string };
}
```

## 7. Formato del campo `content`
Texto plano separado por doble salto de linea (parrafo). Imagenes embebidas con placeholders `$imageN` mapeados al objeto `images`.

Ejemplo:
```
Hola, esto es un post.

$image1

En la imagen anterior se ve...

$image2

Y el post continua.
```

Reglas de render (implementadas en [src/presentation/components/PostContent.tsx](src/presentation/components/PostContent.tsx)):
- Parrafos separados por linea en blanco
- `$imageN` se reemplaza por `<img>` centrada, tamano medio, con espaciado
- Click abre lightbox (cierra con ESC, boton X o click afuera)

## 8. Como agregar un nuevo post (flujo manual)

1. Elegir un `slug` corto en kebab-case, sin acentos. Ej: `mi-post-nuevo`.
2. Crear carpeta `public/content/posts/<slug>/` y meter las imagenes (cover.jpg, image1.jpg, ...).
3. Abrir [content/posts.json](content/posts.json) y agregar un objeto al array siguiendo [content/POST_TEMPLATE.json](content/POST_TEMPLATE.json).
4. Asegurarse de:
   - `id` unico
   - `slug` unico y coincide con el nombre de carpeta
   - `date` en formato `YYYY-MM-DD`
   - `category` en espanol, reutilizando si ya existe (se agrupan automaticamente)
   - `hashtags` en minusculas, sin `#`
   - `highlighted: true` solo si quieres que aparezca en `/featured`
   - Cada `$imageN` usado en `content` existe como clave en `images`
5. `npm run dev` y verificar.

## 9. Prompt reutilizable para futuros posts (pegar esto con los datos)

> Eres un asistente que convierte texto en un post JSON para el blog **slowpokita** (espanol latinoamericano, vibe lento y calido).
>
> Usa exactamente el schema del archivo [content/POST_TEMPLATE.json](content/POST_TEMPLATE.json). Devuelve SOLO el objeto JSON, sin markdown ni explicaciones, listo para pegar al final del array en `content/posts.json`.
>
> Reglas:
> - `slug` en kebab-case sin acentos ni caracteres especiales.
> - `date` en formato `YYYY-MM-DD` (usa la fecha que te pase, o hoy si no hay).
> - `category` en espanol, titulo capitalizado (ej: "Cronica", "Fotografia", "Reflexiones", "Viajes", "Recetas").
> - `hashtags` array de 3-5 strings en minusculas, sin `#`.
> - `highlighted` false por defecto salvo que el usuario diga lo contrario.
> - `readingTime` estimado dividiendo palabras/200, minimo 1.
> - `excerpt` de 1-2 frases, maximo ~180 caracteres.
> - `content`: parrafos separados por doble salto de linea. Inserta marcadores `$image1`, `$image2`, ... entre parrafos cuando el usuario entregue imagenes, en el orden que las describa.
> - `images`: objeto con claves `image1`, `image2`, ... apuntando al nombre de archivo (ej `"image1.jpg"`).
> - `assetsPath` = `"/content/posts/<slug>"`.
> - `coverImage` = `"cover.jpg"` si hay portada, si no, omitelo.
> - `seo`: completa `seoTitle` (`<titulo> - slowpokita`), `seoDescription` (reformulacion del excerpt) y `ogImage` apuntando al cover.
> - Escribe en espanol latinoamericano, tono lento, cercano, sin signos de apertura de exclamacion/interrogacion si complica el JSON.
>
> Datos del post:
> - titulo: ...
> - subtitulo (opcional): ...
> - categoria: ...
> - hashtags: ...
> - texto: ...
> - lista de imagenes (nombre de archivo y descripcion en orden): ...
> - fecha (opcional): ...
> - destacado (true/false, opcional): ...

## 10. Como agregar categorias
No hay lista cerrada. Basta con escribir la categoria en el campo `category` de un post. El blog la detecta y la agrega a `/categories` automaticamente.

Para mantener coherencia, prefiere estas primero:
- Cronica
- Fotografia
- Reflexiones
- Viajes
- Recetas

## 11. Destacar un post
Poner `highlighted: true`. Aparecera en `/featured` y mostrara un badge "Destacado" en la tarjeta.

## 12. Diseno
Paleta (ver [src/presentation/styles/globals.css](src/presentation/styles/globals.css)):
- Fondo: `#1E1B4C` (con variantes `--bg-soft` y `--bg-strong`)
- Acento rosa: `#FF2E97`
- Acento amarillo: `#FFD402`
- Acento cyan: `#0ABDC6`

No agregues frameworks de CSS (Tailwind, etc) sin justificarlo. Mantener estilos en el CSS global o extender variables.

## 13. SEO ya cubierto
- `metadataBase`, `openGraph`, `twitter`, `canonical` en [src/app/layout.tsx](src/app/layout.tsx)
- `generateMetadata` por post en [src/app/post/[slug]/page.tsx](src/app/post/[slug]/page.tsx)
- `sitemap.xml` dinamico en [src/app/sitemap.ts](src/app/sitemap.ts)
- `robots.txt` en [src/app/robots.ts](src/app/robots.ts)
- JSON-LD tipo `BlogPosting` embebido por post
- HTML semantico (`<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`)

Al agregar un post, el sitemap y el indice de categorias se actualizan solos.

## 14. Restricciones firmes
- No agregar base de datos
- No agregar comentarios
- No agregar dependencias pesadas sin justificar
- Mantener el contenido editable solo con JSON + imagenes
- Preservar separacion de capas (no leer `fs` desde componentes)

## 15. Tests rapidos antes de publicar
- `npm run typecheck` pasa
- `npm run build` pasa
- El post nuevo aparece en `/posts`, se abre en `/post/<slug>`, las imagenes `$imageN` se renderizan y el lightbox funciona
