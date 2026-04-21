import { z, ZodError } from 'zod';

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
  images?: Record<string, { src: string; alt: string; caption?: string }>;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export const postSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.string(),
  category: z.string(),
  hashtags: z.array(z.string()),
  highlighted: z.boolean(),
  readingTime: z.number(),
  coverImage: z.string().optional(),
  excerpt: z.string(),
  content: z.string(),
  assetsPath: z.string(),
  images: z.record(z.string(), z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

export type PostInput = z.infer<typeof postSchema>;

export function validatePost(data: unknown): Post {
  const result = postSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ');
    throw new Error(`Invalid post data: ${errors}`);
  }
  return result.data;
}

export function validatePosts(data: unknown): Post[] {
  if (!Array.isArray(data)) {
    throw new Error('Posts data must be an array');
  }
  return data.map(validatePost);
}