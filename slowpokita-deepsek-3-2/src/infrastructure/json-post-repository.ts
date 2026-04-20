import { PostRepository } from '@/domain/repositories/post-repository';
import { Post, PostSummary } from '@/domain/entities/post';
import { PaginationResult, PaginationParams } from '@/domain/value-objects/pagination';
import { SearchParams, SearchResult } from '@/domain/value-objects/search';

interface JsonPost {
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

export class JsonPostRepository implements PostRepository {
  private posts: Post[] = [];

  constructor(private dataPath: string) {}

  async loadData(): Promise<void> {
    try {
      const response = await fetch(this.dataPath);
      const jsonData: JsonPost[] = await response.json();
      this.posts = jsonData.map(this.transformJsonToPost);
    } catch (error) {
      throw new Error(`Failed to load posts data: ${error}`);
    }
  }

  private transformJsonToPost(json: JsonPost): Post {
    return {
      ...json,
      images: json.images ? Object.fromEntries(
        Object.entries(json.images).map(([key, image]) => [
          key,
          { id: key, ...image }
        ])
      ) : undefined
    };
  }

  async findAll(): Promise<Post[]> {
    await this.ensureDataLoaded();
    return this.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async findById(id: string): Promise<Post | null> {
    await this.ensureDataLoaded();
    return this.posts.find(post => post.id === id) || null;
  }

  async findBySlug(slug: string): Promise<Post | null> {
    await this.ensureDataLoaded();
    return this.posts.find(post => post.slug === slug) || null;
  }

  async findFeatured(): Promise<Post[]> {
    await this.ensureDataLoaded();
    return this.posts.filter(post => post.highlighted)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async findByCategory(category: string): Promise<Post[]> {
    await this.ensureDataLoaded();
    return this.posts.filter(post => post.category === category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async findByHashtags(hashtags: string[]): Promise<Post[]> {
    await this.ensureDataLoaded();
    return this.posts.filter(post => 
      hashtags.some(tag => post.hashtags.includes(tag))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async search(params: SearchParams): Promise<SearchResult> {
    await this.ensureDataLoaded();
    
    let filteredPosts = this.posts;
    
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.hashtags.some(tag => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query)
      );
    }

    if (params.category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === params.category?.toLowerCase()
      );
    }

    if (params.hashtags && params.hashtags.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        params.hashtags?.some(tag => post.hashtags.includes(tag))
      );
    }

    const postsSummary: PostSummary[] = filteredPosts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      category: post.category,
      hashtags: post.hashtags,
      highlighted: post.highlighted,
      readingTime: post.readingTime,
      coverImage: post.coverImage,
      excerpt: post.excerpt
    }));

    return {
      posts: postsSummary,
      total: postsSummary.length
    };
  }

  async getPaginatedPosts(params: PaginationParams): Promise<PaginationResult<PostSummary>> {
    await this.ensureDataLoaded();
    const allPosts = await this.findAll();
    const postsSummary: PostSummary[] = allPosts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      category: post.category,
      hashtags: post.hashtags,
      highlighted: post.highlighted,
      readingTime: post.readingTime,
      coverImage: post.coverImage,
      excerpt: post.excerpt
    }));

    return this.paginate(postsSummary, params);
  }

  async getPaginatedFeaturedPosts(params: PaginationParams): Promise<PaginationResult<PostSummary>> {
    await this.ensureDataLoaded();
    const featuredPosts = await this.findFeatured();
    const postsSummary: PostSummary[] = featuredPosts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      category: post.category,
      hashtags: post.hashtags,
      highlighted: post.highlighted,
      readingTime: post.readingTime,
      coverImage: post.coverImage,
      excerpt: post.excerpt
    }));

    return this.paginate(postsSummary, params);
  }

  async getPaginatedCategoryPosts(category: string, params: PaginationParams): Promise<PaginationResult<PostSummary>> {
    await this.ensureDataLoaded();
    const categoryPosts = await this.findByCategory(category);
    const postsSummary: PostSummary[] = categoryPosts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      category: post.category,
      hashtags: post.hashtags,
      highlighted: post.highlighted,
      readingTime: post.readingTime,
      coverImage: post.coverImage,
      excerpt: post.excerpt
    }));

    return this.paginate(postsSummary, params);
  }

  async getCategories(): Promise<string[]> {
    await this.ensureDataLoaded();
    const categories = new Set(this.posts.map(post => post.category));
    return Array.from(categories).sort();
  }

  async getArchive(): Promise<Record<string, Record<string, PostSummary[]>>> {
    await this.ensureDataLoaded();
    const archive: Record<string, Record<string, PostSummary[]>> = {};

    this.posts.forEach(post => {
      const date = new Date(post.date);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');

      if (!archive[year]) {
        archive[year] = {};
      }
      if (!archive[year][month]) {
        archive[year][month] = [];
      }

      archive[year][month].push({
        id: post.id,
        slug: post.slug,
        title: post.title,
        subtitle: post.subtitle,
        date: post.date,
        category: post.category,
        hashtags: post.hashtags,
        highlighted: post.highlighted,
        readingTime: post.readingTime,
        coverImage: post.coverImage,
        excerpt: post.excerpt
      });
    });

    // Sort months and posts within each month
    Object.keys(archive).forEach(year => {
      Object.keys(archive[year]).forEach(month => {
        archive[year][month].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
    });

    return archive;
  }

  private paginate<T>(data: T[], params: PaginationParams): PaginationResult<T> {
    const { page, limit } = params;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: data.slice(startIndex, endIndex),
      currentPage: page,
      totalPages,
      totalItems,
      hasNext: endIndex < totalItems,
      hasPrev: startIndex > 0
    };
  }

  private async ensureDataLoaded(): Promise<void> {
    if (this.posts.length === 0) {
      await this.loadData();
    }
  }
}