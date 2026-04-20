import { promises as fs } from "node:fs";
import path from "node:path";
import type { Post } from "@/domain/post";
import type { PostRepository } from "@/domain/ports";

const CONTENT_DIR = path.join(process.cwd(), "content");
const POSTS_FILE = path.join(CONTENT_DIR, "posts.json");

function assertString(value: unknown, field: string, index: number): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid post at index ${index}: "${field}" must be a non-empty string.`);
  }
  return value;
}

function assertOptionalString(value: unknown, field: string, index: number): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid post at index ${index}: "${field}" must be a non-empty string when present.`);
  }
  return value;
}

function validate(raw: unknown): Post[] {
  if (!Array.isArray(raw)) {
    throw new Error(`Invalid content file "${POSTS_FILE}": root must be an array of posts.`);
  }

  const validated = raw.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Invalid post at index ${index}: each entry must be an object.`);
    }

    const post = item as Record<string, unknown>;

    const id = assertString(post.id, "id", index);
    const slug = assertString(post.slug, "slug", index);
    const title = assertString(post.title, "title", index);
    const subtitle = assertOptionalString(post.subtitle, "subtitle", index);
    const date = assertString(post.date, "date", index);
    const category = assertString(post.category, "category", index);
    const excerpt = assertString(post.excerpt, "excerpt", index);
    const content = assertString(post.content, "content", index);
    const assetsPath = assertString(post.assetsPath, "assetsPath", index);
    const coverImage = assertOptionalString(post.coverImage, "coverImage", index);
    const seoTitle = assertOptionalString(post.seoTitle, "seoTitle", index);
    const seoDescription = assertOptionalString(post.seoDescription, "seoDescription", index);
    const ogImage = assertOptionalString(post.ogImage, "ogImage", index);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`Invalid post "${slug}": "date" must use YYYY-MM-DD format.`);
    }
    if (typeof post.highlighted !== "boolean") {
      throw new Error(`Invalid post "${slug}": "highlighted" must be a boolean.`);
    }
    if (typeof post.readingTime !== "number" || !Number.isFinite(post.readingTime) || post.readingTime < 1) {
      throw new Error(`Invalid post "${slug}": "readingTime" must be a positive number.`);
    }
    if (!Array.isArray(post.hashtags) || !post.hashtags.every(tag => typeof tag === "string")) {
      throw new Error(`Invalid post "${slug}": "hashtags" must be an array of strings.`);
    }
    if (!assetsPath.startsWith("/content/posts/")) {
      throw new Error(`Invalid post "${slug}": "assetsPath" must start with "/content/posts/".`);
    }

    let images: Record<string, string> | undefined;
    if (post.images !== undefined) {
      if (!post.images || typeof post.images !== "object" || Array.isArray(post.images)) {
        throw new Error(`Invalid post "${slug}": "images" must be an object map when present.`);
      }
      images = {};
      for (const [key, value] of Object.entries(post.images as Record<string, unknown>)) {
        if (typeof value !== "string" || value.trim() === "") {
          throw new Error(`Invalid post "${slug}": images["${key}"] must be a non-empty string.`);
        }
        images[key] = value;
      }
    }

    return {
      id,
      slug,
      title,
      subtitle,
      date,
      category,
      hashtags: post.hashtags as string[],
      highlighted: post.highlighted as boolean,
      readingTime: post.readingTime as number,
      coverImage,
      excerpt,
      content,
      assetsPath,
      images,
      seoTitle,
      seoDescription,
      ogImage
    } satisfies Post;
  });

  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const post of validated) {
    if (ids.has(post.id)) throw new Error(`Duplicate post id "${post.id}" found in "${POSTS_FILE}".`);
    if (slugs.has(post.slug)) throw new Error(`Duplicate post slug "${post.slug}" found in "${POSTS_FILE}".`);
    ids.add(post.id);
    slugs.add(post.slug);
  }

  return validated;
}

let cache: Post[] | null = null;

export class JsonPostRepository implements PostRepository {
  async findAll(): Promise<Post[]> {
    if (cache) return cache;
    const raw = await fs.readFile(POSTS_FILE, "utf8");
    cache = validate(JSON.parse(raw));
    return cache;
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const all = await this.findAll();
    return all.find(p => p.slug === slug) ?? null;
  }
}

export const postRepository = new JsonPostRepository();
