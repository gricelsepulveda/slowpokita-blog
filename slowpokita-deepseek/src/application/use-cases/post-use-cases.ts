import { Post, PostSummary, Category, ArchiveMonth, PaginatedResult } from '@domain/entities/post';

export interface PostRepository {
  getAllPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  getPostsByCategory(category: string): Promise<Post[]>;
  getHighlightedPosts(): Promise<Post[]>;
  getPostsByYearMonth(year: number, month: number): Promise<Post[]>;
  getAllCategories(): Promise<Category[]>;
  getArchiveMonths(): Promise<ArchiveMonth[]>;
  searchPosts(query: string): Promise<Post[]>;
}

export class GetPostsUseCase {
  constructor(private repository: PostRepository) {}

  async execute(page: number = 1, pageSize: number = 10): Promise<PaginatedResult<PostSummary>> {
    const allPosts = await this.repository.getAllPosts();
    const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
    
    const summaries: PostSummary[] = paginatedPosts.map(post => ({
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
      excerpt: post.excerpt,
    }));

    return {
      items: summaries,
      total: allPosts.length,
      page,
      totalPages: Math.ceil(allPosts.length / pageSize),
      hasNext: endIndex < allPosts.length,
      hasPrev: page > 1,
    };
  }
}

export class GetPostBySlugUseCase {
  constructor(private repository: PostRepository) {}

  async execute(slug: string): Promise<Post | null> {
    return this.repository.getPostBySlug(slug);
  }
}

export class GetFeaturedPostsUseCase {
  constructor(private repository: PostRepository) {}

  async execute(page: number = 1, pageSize: number = 10): Promise<PaginatedResult<PostSummary>> {
    const allFeatured = await this.repository.getHighlightedPosts();
    const sortedPosts = allFeatured.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
    
    const summaries: PostSummary[] = paginatedPosts.map(post => ({
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
      excerpt: post.excerpt,
    }));

    return {
      items: summaries,
      total: allFeatured.length,
      page,
      totalPages: Math.ceil(allFeatured.length / pageSize),
      hasNext: endIndex < allFeatured.length,
      hasPrev: page > 1,
    };
  }
}

export class GetCategoryPostsUseCase {
  constructor(private repository: PostRepository) {}

  async execute(categorySlug: string, page: number = 1, pageSize: number = 10): Promise<PaginatedResult<PostSummary>> {
    const categoryPosts = await this.repository.getPostsByCategory(categorySlug);
    const sortedPosts = categoryPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
    
    const summaries: PostSummary[] = paginatedPosts.map(post => ({
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
      excerpt: post.excerpt,
    }));

    return {
      items: summaries,
      total: categoryPosts.length,
      page,
      totalPages: Math.ceil(categoryPosts.length / pageSize),
      hasNext: endIndex < categoryPosts.length,
      hasPrev: page > 1,
    };
  }
}

export class GetArchivePostsUseCase {
  constructor(private repository: PostRepository) {}

  async execute(year: number, month: number, page: number = 1, pageSize: number = 10): Promise<PaginatedResult<PostSummary>> {
    const archivePosts = await this.repository.getPostsByYearMonth(year, month);
    const sortedPosts = archivePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
    
    const summaries: PostSummary[] = paginatedPosts.map(post => ({
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
      excerpt: post.excerpt,
    }));

    return {
      items: summaries,
      total: archivePosts.length,
      page,
      totalPages: Math.ceil(archivePosts.length / pageSize),
      hasNext: endIndex < archivePosts.length,
      hasPrev: page > 1,
    };
  }
}

export class SearchPostsUseCase {
  constructor(private repository: PostRepository) {}

  async execute(query: string): Promise<PostSummary[]> {
    const results = await this.repository.searchPosts(query);
    return results.map(post => ({
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
      excerpt: post.excerpt,
    }));
  }
}

export class GetCategoriesUseCase {
  constructor(private repository: PostRepository) {}

  async execute(): Promise<Category[]> {
    return this.repository.getAllCategories();
  }
}

export class GetArchiveMonthsUseCase {
  constructor(private repository: PostRepository) {}

  async execute(): Promise<ArchiveMonth[]> {
    return this.repository.getArchiveMonths();
  }
}