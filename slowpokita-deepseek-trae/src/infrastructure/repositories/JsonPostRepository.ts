import { promises as fs } from 'fs';
import path from 'path';
import { PostRepository } from '../../domain/repositories/postRepository';
import { Post, validatePosts } from '../../domain/models/post';

export class JsonPostRepository implements PostRepository {
  private posts: Post[] = [];
  private initialized = false;

  constructor(private dataPath: string) {}

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) return;

    try {
      const fileContent = await fs.readFile(this.dataPath, 'utf-8');
      const rawData = JSON.parse(fileContent);
      this.posts = validatePosts(rawData);
      this.initialized = true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to load posts from ${this.dataPath}: ${error.message}`);
      }
      throw error;
    }
  }

  async getAllPosts(): Promise<Post[]> {
    await this.ensureInitialized();
    return [...this.posts];
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    await this.ensureInitialized();
    return this.posts.find(post => post.slug === slug) || null;
  }

  async getFeaturedPosts(): Promise<Post[]> {
    await this.ensureInitialized();
    return this.posts.filter(post => post.highlighted);
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    await this.ensureInitialized();
    return this.posts.filter(post => post.category === category);
  }

  async getPostsByYearMonth(year: number, month: number): Promise<Post[]> {
    await this.ensureInitialized();
    return this.posts.filter(post => {
      const postDate = new Date(post.date);
      return postDate.getFullYear() === year && postDate.getMonth() + 1 === month;
    });
  }

  async getAllCategories(): Promise<string[]> {
    await this.ensureInitialized();
    const categories = new Set<string>();
    this.posts.forEach(post => categories.add(post.category));
    return Array.from(categories);
  }

  async getAllYearsMonths(): Promise<Array<{ year: number; month: number; count: number }>> {
    await this.ensureInitialized();
    const map = new Map<string, number>();
    this.posts.forEach(post => {
      const date = new Date(post.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([key, count]) => {
      const [year, month] = key.split('-').map(Number);
      return { year, month, count };
    });
  }

  async searchPosts(query: string): Promise<Post[]> {
    await this.ensureInitialized();
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];
    return this.posts.filter(post =>
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
      post.category.toLowerCase().includes(normalizedQuery)
    );
  }
}