# Guía para agregar contenido a slowpokita

## Pasos para agregar un post

### 1. Crear carpeta de imágenes
```
content/posts/mi-nuevo-post/
  cover.jpg
  imagen1.jpg
  imagen2.png
```

### 2. Editar content/posts.json
Agregar objeto al array `posts`. Ver campos en POST_TEMPLATE.json.

### 3. Reglas de contenido

**Párrafos**: separar con línea en blanco.

**Imágenes dentro del texto**:
```
Texto del primer párrafo.

$image1

Continúa el texto aquí.

$image2

Más texto.
```
Mapeo en campo `images`:
```json
"images": {
  "image1": "nombre-archivo.jpg",
  "image2": "otra-foto.png"
}
```

### 4. Destacar un post
Poner `"highlighted": true`. Solo el primero aparece en el banner del home.

### 5. Categorías
Escribir nombre exacto en `category`. Se crean automáticamente.
Categorías actuales: `Personal`, `Viajes`, `Tecnología`.

### 6. Formato de fecha
Siempre `YYYY-MM-DD`. Ejemplo: `"2026-04-19"`.

### 7. IDs
Deben ser únicos. Usar números incrementales: "1", "2", "3"...

## Usando IA para crear posts

Usar el prompt en CLAUDE.md sección "Prompt reutilizable para agregar posts con IA".
