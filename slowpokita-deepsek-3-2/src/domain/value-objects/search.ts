import { PostSummary } from '../entities/post';

export interface SearchParams {
  query: string;
  category?: string;
  hashtags?: string[];
}

export interface SearchResult {
  posts: PostSummary[];
  total: number;
}