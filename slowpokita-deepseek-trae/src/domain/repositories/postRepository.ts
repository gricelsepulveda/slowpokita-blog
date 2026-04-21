import { Post } from '../models/post';

export interface PostRepository {
  getAllPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  getFeaturedPosts(): Promise<Post[]>;
  getPostsByCategory(category: string): Promise<Post[]>;
  getPostsByYearMonth(year: number, month: number): Promise<Post[]>;
  getAllCategories(): Promise<string[]>;
  getAllYearsMonths(): Promise<Array<{ year: number; month: number; count: number }>>;
  searchPosts(query: string): Promise<Post[]>;
}