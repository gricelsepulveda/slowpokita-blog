export interface PostImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
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
  images?: Record<string, PostImage>;
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