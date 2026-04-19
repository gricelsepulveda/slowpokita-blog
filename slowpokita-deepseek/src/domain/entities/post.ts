export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // ISO format
  category: string;
  hashtags: string[];
  highlighted: boolean;
  readingTime: number; // minutes
  coverImage?: string;
  excerpt: string;
  content: string;
  assetsPath: string;
  images: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  hashtags: string[];
  highlighted: boolean;
  readingTime: number;
  coverImage?: string;
  excerpt: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface ArchiveMonth {
  year: number;
  month: number;
  monthName: string;
  count: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}