# AI Prompt for Generating Blog Posts

Use this prompt with AI assistants (ChatGPT, Claude, etc.) to generate new blog posts that are compatible with the **slowpokita** blog.

## Instructions for the AI

You are helping to create a new post for a personal blog called “slowpokita.” The blog uses a strict JSON schema for posts. Your task is to output a **single JSON object** that matches the schema below.

**Important:**
- Output **only** the JSON object. Do not include any explanatory text, markdown code fences, or extra commentary.
- The JSON must be valid and ready to be pasted directly into the `/content/posts.json` array.
- Use the exact field names and types shown in the schema.
- For the `content` field, use `\n` for line breaks (not actual newlines in the JSON string).

## Post Schema

```json
{
  "id": "<unique-id>",
  "slug": "url-friendly-slug-based-on-title",
  "title": "Post Title",
  "subtitle": "Optional subtitle (can be omitted)",
  "date": "YYYY-MM-DD",
  "category": "Category Name",
  "hashtags": ["tag1", "tag2", "tag3"],
  "highlighted": false,
  "readingTime": <estimated-minutes>,
  "coverImage": "/images/cover.jpg",
  "excerpt": "A concise, engaging summary of the post (1‑2 sentences).",
  "content": "Full post text with \\n for line breaks. You may include image placeholders like $image1, $image2, etc. where images should appear.",
  "assetsPath": "/content/posts/<slug>",
  "images": {
    "$image1": {
      "src": "/content/posts/<slug>/image1.png",
      "alt": "Accessible description of the image",
      "caption": "Optional caption"
    },
    "$image2": {
      "src": "/content/posts/<slug>/image2.jpg",
      "alt": "Accessible description",
      "caption": ""
    }
  },
  "seoTitle": "Optional custom SEO title",
  "seoDescription": "Optional custom SEO description",
  "ogImage": "/images/og-image.jpg"
}
```

## Guidelines for Each Field

1. **id**: Provide a unique identifier (number or string). For new posts, use the next sequential number after the last post in the existing array.
2. **slug**: Convert the title to lowercase, replace spaces with hyphens, remove punctuation. Example: `"Getting Started with Next.js"` → `"getting-started-with-nextjs"`.
3. **title**: Catchy, clear, and SEO‑friendly.
4. **subtitle** (optional): A secondary line that adds context or intrigue.
5. **date**: Today’s date in `YYYY-MM-DD` format.
6. **category**: Choose from existing categories (e.g., `"Software Architecture"`, `"Design"`, `"Web Development"`) or create a new one.
7. **hashtags**: 3‑5 relevant tags, lowercase, no spaces.
8. **highlighted**: `true` if the post should appear in the Featured section; otherwise `false`.
9. **readingTime**: Estimate reading time in minutes (based on ~200 words per minute).
10. **coverImage**: Path to a cover image (use a placeholder like `/images/cover.jpg` if none exists).
11. **excerpt**: 1‑2 sentences summarizing the post; used in meta descriptions and post cards.
12. **content**: The full article. Write in a conversational, informative tone. Use `\n` for paragraph breaks. You may include image placeholders (`$image1`, `$image2`, …) where images will later be inserted.
13. **assetsPath**: Set to `/content/posts/<slug>` (replace `<slug>` with the actual slug).
14. **images**: Provide an object mapping each placeholder used in `content` to an image metadata object. Include `src`, `alt`, and optionally `caption`. The `src` should point to the expected image location.
15. **seoTitle** (optional): If omitted, the `title` will be used.
16. **seoDescription** (optional): If omitted, the `excerpt` will be used.
17. **ogImage** (optional): Open Graph image; defaults to `coverImage`.

## Example Output

```json
{
  "id": "4",
  "slug": "introduction-to-react-server-components",
  "title": "Introduction to React Server Components",
  "subtitle": "How they work and why they matter",
  "date": "2024-04-20",
  "category": "Web Development",
  "hashtags": ["react", "nextjs", "server-components", "performance"],
  "highlighted": true,
  "readingTime": 7,
  "coverImage": "/images/react-server-components-cover.jpg",
  "excerpt": "React Server Components allow you to render components on the server, reducing bundle size and improving performance. Learn how to use them in Next.js.",
  "content": "React Server Components (RSC) are one of the most significant changes to React in recent years.\\n\\nThey enable server‑side rendering of components without sending the component code to the client.\\n\\n$image1\\n\\nThis reduces the JavaScript bundle size and can lead to faster page loads.\\n\\nIn this article we'll walk through a practical example using Next.js 14.\\n\\n$image2\\n\\nYou'll see how to structure your components and what trade‑offs to consider.",
  "assetsPath": "/content/posts/introduction-to-react-server-components",
  "images": {
    "$image1": {
      "src": "/content/posts/introduction-to-react-server-components/architecture.png",
      "alt": "Diagram showing server vs client component boundaries",
      "caption": "Server components run only on the server"
    },
    "$image2": {
      "src": "/content/posts/introduction-to-react-server-components/code-example.png",
      "alt": "Code snippet of a React server component",
      "caption": "A simple server component in Next.js"
    }
  },
  "seoTitle": "React Server Components Explained | Slowpokita",
  "seoDescription": "A beginner‑friendly guide to React Server Components and how to use them in Next.js for better performance.",
  "ogImage": "/images/react-server-components-og.jpg"
}
```

## Final Note

After generating the JSON, you can paste it directly into the `/content/posts.json` array (remember to add a comma if inserting between existing posts).