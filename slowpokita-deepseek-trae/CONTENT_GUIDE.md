# Content Guide

This guide explains how to create and edit blog posts for the **slowpokita** blog. All content is stored in local JSON files, making it easy to version, edit, and deploy.

## Overview

- The single source of truth is `/content/posts.json`.
- Each post is a JSON object that matches the `Post` interface (see `src/domain/models/post.ts`).
- Images are placed in per‑post folders under `/content/posts/<slug>/` and referenced via a map.
- The post’s `content` field is plain text; image placeholders (`$image1`, `$image2`, …) are replaced at runtime.

## Adding a New Post

1. **Open `/content/posts.json`** in your editor.
2. **Add a new entry** at the end of the array (or anywhere inside the array). Use the [POST_TEMPLATE.json](./POST_TEMPLATE.json) as a starting point.
3. **Fill in the required fields** (see [Post Model](#post-model) below).
4. **Save the file**. The blog will automatically include the new post after a rebuild (development server will hot‑reload).

## Post Model

Every post must contain the following **required** fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` or `number` | Unique identifier. Use a sequential number or a UUID. |
| `slug` | `string` | URL‑friendly identifier (e.g., `"my-awesome-post"`). Must be unique across all posts. |
| `title` | `string` | The post’s title. |
| `date` | `string` (YYYY‑MM‑DD) | Publication date. |
| `category` | `string` | Primary category (e.g., `"Software Architecture"`, `"Design"`). |
| `hashtags` | `string[]` | Array of tags (e.g., `["nextjs", "blog", "seo"]`). |
| `highlighted` | `boolean` | `true` to appear in the Featured section. |
| `readingTime` | `number` | Estimated reading time in minutes. |
| `excerpt` | `string` | Short summary displayed in post cards and meta descriptions. |
| `content` | `string` | The main text of the post. Use `\n` for line breaks. You can insert image placeholders like `$image1`, `$image2`, etc. |

**Optional** fields (can be omitted):

| Field | Type | Description |
|-------|------|-------------|
| `subtitle` | `string` | A secondary title or tagline. |
| `coverImage` | `string` | Path to a cover image (displayed on post cards). Example: `"/images/my-cover.jpg"`. |
| `assetsPath` | `string` | Base path for this post’s assets (defaults to `/content/posts/<slug>/`). |
| `images` | `object` | Map of image placeholders to image metadata (see [Adding Images](#adding-images)). |
| `seoTitle` | `string` | Custom `<title>` for SEO; defaults to `title`. |
| `seoDescription` | `string` | Custom `<meta name="description">`; defaults to `excerpt`. |
| `ogImage` | `string` | Custom Open Graph image; defaults to `coverImage`. |

## Adding Images

1. **Create a folder** for the post’s assets:
   ```
   /content/posts/<slug>/
   ```
   (Replace `<slug>` with the post’s slug.)

2. **Place your image files** inside that folder (e.g., `diagram.png`, `screenshot.jpg`).

3. **Add an `images` map** to the post JSON:

   ```json
   "images": {
     "$image1": {
       "src": "/content/posts/<slug>/diagram.png",
       "alt": "Description of the image",
       "caption": "Optional caption displayed below the image"
     },
     "$image2": {
       "src": "/content/posts/<slug>/screenshot.jpg",
       "alt": "Another description",
       "caption": ""
     }
   }
   ```

4. **Insert placeholders** in the `content` string where you want the images to appear:

   ```
   This is the first paragraph.

   $image1

   This is the second paragraph.

   $image2
   ```

   The placeholder names (`$image1`, `$image2`) must match the keys in the `images` map.

## Editing an Existing Post

1. Locate the post object in `/content/posts.json`.
2. Modify any field (e.g., update the `title`, change `hashtags`, correct a typo in `content`).
3. Save the file. The change will be reflected immediately in development.

## Deleting a Post

1. Remove the entire post object from the `/content/posts.json` array.
2. Optionally delete the corresponding asset folder (`/content/posts/<slug>/`) if you no longer need the images.

## Validation

The blog uses **Zod** to validate the post schema at runtime. If you make a mistake (e.g., missing a required field, wrong data type), you will see a clear error message in the console and the affected page will display a user‑friendly error.

## Example

See the existing posts in `/content/posts.json` for real‑world examples. The first post (`"getting-started-with-hexagonal-architecture"`) demonstrates all optional fields and the image mapping.

## AI‑Assisted Workflow

Because the content is plain JSON, you can use AI tools (like ChatGPT, Claude, etc.) to generate or edit posts. Provide the AI with:

- The [POST_TEMPLATE.json](./POST_TEMPLATE.json) file as a reference.
- The desired topic, tone, and length.
- Instructions to output a valid JSON object that can be pasted directly into `/content/posts.json`.

A reusable prompt for AI‑generated posts is available in [AI_POST_PROMPT.md](./AI_POST_PROMPT.md).

## Troubleshooting

- **Post not appearing?** Check that the `slug` is unique and the JSON syntax is valid (no trailing commas, all strings quoted).
- **Images not showing?** Verify that the placeholder keys in `content` match the keys in the `images` map, and that the `src` paths are correct.
- **Validation errors?** Look at the console output for detailed error messages; they will point you to the exact field that fails.