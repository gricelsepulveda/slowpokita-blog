import { Post } from "@/domain/entities/Post";

export interface PostDTO {
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

export function toPostDTO(post: Post): PostDTO {
  return { ...post };
}

export function toPostDTOList(posts: Post[]): PostDTO[] {
  return posts.map(toPostDTO);
}