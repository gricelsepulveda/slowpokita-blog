export type PostImages = Record<string, string>;

export interface PostSEO {
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface Post {
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
  content: string;
  assetsPath: string;
  images?: PostImages;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface Category {
  slug: string;
  name: string;
  count: number;
}

export interface ArchiveEntry {
  year: number;
  month: number;
  count: number;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
}
