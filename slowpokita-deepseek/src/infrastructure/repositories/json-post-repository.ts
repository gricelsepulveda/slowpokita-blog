import { PostRepository } from '@application/use-cases/post-use-cases';
import { Post, Category, ArchiveMonth } from '@domain/entities/post';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface RawPost {
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
  images: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export class JsonPostRepository implements PostRepository {
  private posts: Post[] = [];
  private dataPath: string;

  constructor(dataPath: string = join(process.cwd(), 'content', 'posts.json')) {
    this.dataPath = dataPath;
    this.loadPosts();
  }

  private loadPosts(): void {
    if (!existsSync(this.dataPath)) {
      console.warn(`Posts file not found at ${this.dataPath}`);
      this.posts = [];
      return;
    }

    try {
      const fileContent = readFileSync(this.dataPath, 'utf-8');
      const rawPosts: RawPost[] = JSON.parse(fileContent);
      this.posts = rawPosts.map(rawPost => ({
        ...rawPost,
        date: rawPost.date,
      }));
    } catch (error) {
      console.error('Error loading posts:', error);
      this.posts = [];
    }
  }

  async getAllPosts(): Promise<Post[]> {
    return [...this.posts];
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    return this.posts.find(post => post.slug === slug) || null;
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    return this.posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase() ||
      post.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
    );
  }

  async getHighlightedPosts(): Promise<Post[]> {
    return this.posts.filter(post => post.highlighted);
  }

  async getPostsByYearMonth(year: number, month: number): Promise<Post[]> {
    return this.posts.filter(post => {
      const postDate = new Date(post.date);
      return postDate.getFullYear() === year && postDate.getMonth() + 1 === month;
    });
  }

  async getAllCategories(): Promise<Category[]> {
    const categoryMap = new Map<string, number>();
    
    this.posts.forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }));
  }

  async getArchiveMonths(): Promise<ArchiveMonth[]> {
    const monthMap = new Map<string, { year: number; month: number; count: number }>();
    
    this.posts.forEach(post => {
      const postDate = new Date(post.date);
      const year = postDate.getFullYear();
      const month = postDate.getMonth() + 1;
      const key = `${year}-${month}`;
      
      const current = monthMap.get(key) || { year, month, count: 0 };
      monthMap.set(key, { ...current, count: current.count + 1 });
    });

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return Array.from(monthMap.values()).map(({ year, month, count }) => ({
      year,
      month,
      monthName: monthNames[month - 1],
      count,
    })).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  }

  async searchPosts(query: string): Promise<Post[]> {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return this.posts.filter(post => {
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.subtitle?.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm) ||
        post.hashtags.some((tag: string) => tag.toLowerCase().includes(searchTerm)) ||
        post.excerpt.toLowerCase().includes(searchTerm)
      );
    });
  }
}