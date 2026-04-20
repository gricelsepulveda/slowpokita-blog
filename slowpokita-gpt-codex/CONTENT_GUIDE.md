# Guia de contenido

Paso a paso para publicar un post nuevo en slowpokita.

## 1. Elegir slug
Slug corto, kebab-case, sin acentos. Ejemplo: `cafe-de-olla-y-memorias-de-abuela`.

## 2. Preparar imagenes
Crear carpeta:
```
public/content/posts/<slug>/
```
Meter los archivos:
- `cover.jpg` (portada, opcional pero recomendado)
- `image1.jpg`, `image2.jpg`, ... (las que referencies en el texto)

## 3. Copiar plantilla
Partir desde [content/POST_TEMPLATE.json](content/POST_TEMPLATE.json). Pegar el objeto al final del array en [content/posts.json](content/posts.json).

## 4. Llenar campos

| Campo | Ejemplo | Notas |
|---|---|---|
| id | `"04"` | Unico |
| slug | `"mi-post"` | Igual al nombre de carpeta |
| title | `"Mi post"` | Visible |
| subtitle | `"Algo breve"` | Opcional |
| date | `"2026-04-18"` | ISO |
| category | `"Cronica"` | Reutilizar categorias existentes si aplica |
| hashtags | `["slow", "cafe"]` | Minusculas, sin `#` |
| highlighted | `false` | `true` lo pone en `/featured` |
| readingTime | `4` | Minutos |
| coverImage | `"cover.jpg"` | Dentro de assetsPath |
| excerpt | texto corto | 1-2 frases |
| content | texto largo | Ver abajo |
| assetsPath | `"/content/posts/mi-post"` | Obligatorio |
| images | `{ "image1": "image1.jpg" }` | Cada `$imageN` usado debe estar mapeado |
| seoTitle | `"Titulo SEO"` | Opcional |
| seoDescription | `"Descripcion SEO"` | Opcional |
| ogImage | `"/content/posts/mi-post/cover.jpg"` | Opcional |

## 5. Escribir el contenido

Parrafos separados por **linea en blanco**. Imagenes entre parrafos con `$image1`, `$image2`, ...

```
Primer parrafo.

Segundo parrafo.

$image1

Parrafo que habla de lo que se ve en la imagen.

$image2

Cierre.
```

Regla: cada `$imageN` debe existir en `images`. Si no, no se renderiza.

## 6. Verificar
```
npm run dev
```
- El post aparece en `/posts`
- `/post/<slug>` abre correctamente
- Las imagenes se ven centradas
- Click en imagen abre lightbox, ESC cierra
- Si es `highlighted`, aparece en `/featured`
- Si la categoria es nueva, aparece en `/categories`

## 7. SEO check
- `seoTitle` y `seoDescription` definidos
- `ogImage` apunta a un archivo real
- Al compartir el link en redes, la vista previa se ve bien
