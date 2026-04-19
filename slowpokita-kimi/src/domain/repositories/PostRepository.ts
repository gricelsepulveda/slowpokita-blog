import { Post, ArchiveYear } from "../entities/Post";

export interface PostRepository {
  getAll(): Promise<Post[]>;
  getBySlug(slug: string): Promise<Post | null>;
  getFeatured(): Promise<Post[]>;
  getByCategory(category: string): Promise<Post[]>;
  getCategories(): Promise<string[]>;
  search(query: string): Promise<Post[]>;
  getArchive(): Promise<ArchiveYear[]>;
  getByYearMonth(year: number, month: number): Promise<Post[]>;
}