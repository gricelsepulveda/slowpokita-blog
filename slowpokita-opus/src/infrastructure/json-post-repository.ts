import { promises as fs } from "node:fs";
import path from "node:path";
import type { Post } from "@/domain/post";
import type { PostRepository } from "@/domain/ports";

const CONTENT_DIR = path.join(process.cwd(), "content");
const POSTS_FILE = path.join(CONTENT_DIR, "posts.json");

function validate(raw: unknown): Post[] {
  if (!Array.isArray(raw)) throw new Error("posts.json must be an array");
  for (const p of raw as Post[]) {
    if (!p.id || !p.slug || !p.title || !p.date || !p.category) {
      throw new Error(`Invalid post: ${JSON.stringify(p).slice(0, 120)}`);
    }
  }
  return raw as Post[];
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
