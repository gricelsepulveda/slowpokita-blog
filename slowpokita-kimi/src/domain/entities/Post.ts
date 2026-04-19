export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  hashtags: string[];
  highlighted: boolean;
  readingTime: string;
  coverImage?: string;
  excerpt: string;
  content: string;
  assetsPath: string;
  images: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface ArchiveMonth {
  month: number;
  monthName: string;
  posts: Post[];
}

export interface ArchiveYear {
  year: number;
  months: ArchiveMonth[];
}