import { Post } from '../entities/Post'

export interface PostRepository {
  getAllPosts(): Promise<Post[]>
  getPostBySlug(slug: string): Promise<Post | null>
  getPostsByCategory(category: string): Promise<Post[]>
  getHighlightedPosts(): Promise<Post[]>
  getAllCategories(): Promise<string[]>
  getPostsByYearMonth(year: number, month: number): Promise<Post[]>
  searchPosts(query: string): Promise<Post[]>
}
