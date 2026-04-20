import { Post, PostSummary } from '../entities/post';
import { PaginationResult, PaginationParams } from '../value-objects/pagination';
import { SearchParams, SearchResult } from '../value-objects/search';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
  findBySlug(slug: string): Promise<Post | null>;
  findFeatured(): Promise<Post[]>;
  findByCategory(category: string): Promise<Post[]>;
  findByHashtags(hashtags: string[]): Promise<Post[]>;
  search(params: SearchParams): Promise<SearchResult>;
  getPaginatedPosts(params: PaginationParams): Promise<PaginationResult<PostSummary>>;
  getPaginatedFeaturedPosts(params: PaginationParams): Promise<PaginationResult<PostSummary>>;
  getPaginatedCategoryPosts(category: string, params: PaginationParams): Promise<PaginationResult<PostSummary>>;
  getCategories(): Promise<string[]>;
  getArchive(): Promise<Record<string, Record<string, PostSummary[]>>>;
}