import type { Post } from "./post";

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findBySlug(slug: string): Promise<Post | null>;
}
