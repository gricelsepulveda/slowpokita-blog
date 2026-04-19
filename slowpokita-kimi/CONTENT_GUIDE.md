# Content Guide

How to add posts to slowpokita blog.

## File Structure

```
content/
├── posts.json                 # All posts array
└── posts/
    └── your-post-slug/
        ├── cover.jpg
        ├── image1.jpg
        └── image2.png
```

## Post Schema

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "title": "Post Title",
  "subtitle": "Optional subtitle",
  "date": "2024-01-15",
  "category": "Category Name",
  "hashtags": ["tag1", "tag2"],
  "highlighted": false,
  "readingTime": "5 min",
  "coverImage": "cover.jpg",
  "excerpt": "Brief description for listings",
  "content": "Post text with $image1 placeholders",
  "assetsPath": "content/posts/your-post-slug",
  "images": {
    "image1": "image1.jpg",
    "image2": "image2.png"
  },
  "seoTitle": "Optional custom title",
  "seoDescription": "Optional custom description",
  "ogImage": "cover.jpg"
}
```

## Image Placeholders

In `content` field, use `$image1`, `$image2`, etc. These map to the `images` object.

Example content:
```
First paragraph text.

$image1

More text after image.

$image2

Final paragraph.
```

## Steps to Add Post

1. Create folder: `content/posts/your-slug/`
2. Add images to that folder
3. Copy POST_TEMPLATE.json, fill your data
4. Add post object to `content/posts.json` posts array
5. Rebuild: `npm run build`

## AI Prompt Template

Give this to AI for automatic post generation:

```
Generate a blog post JSON for slowpokita with:
- Title: [title]
- Subtitle: [subtitle]
- Category: [category]
- Hashtags: [list]
- Content: [full text]
- Images: [list of filenames]

Use POST_TEMPLATE.json format. Generate excerpt from first paragraph. Calculate reading time (average 200 words/min). Create URL-friendly slug from title (lowercase, hyphen-spaces).
```

## Rules

- Use unique IDs (timestamp or UUID)
- Dates in YYYY-MM-DD format
- Slugs must be unique, URL-safe (no spaces, special chars)
- Cover image recommended 1200x630 for OG
- Highlight max 3 posts recommended