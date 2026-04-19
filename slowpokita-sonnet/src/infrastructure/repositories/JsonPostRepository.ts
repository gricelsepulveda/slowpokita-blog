import { Post } from '@/domain/entities/Post'
import { PostRepository } from '@/domain/ports/PostRepository'
import { readPostsJson } from '@/infrastructure/utils/readJson'
import { validatePosts } from '@/infrastructure/validators/postValidator'

export class JsonPostRepository implements PostRepository {
  private cache: Post[] | null = null

  private async load(): Promise<Post[]> {
    if (this.cache) return this.cache
    const data = await readPostsJson()
    const posts = validatePosts(data)
    this.cache = posts
    return posts
  }

  async getAllPosts(): Promise<Post[]> {
    return this.load()
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await this.load()
    return posts.find((p) => p.slug === slug) ?? null
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    const posts = await this.load()
    return posts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  async getHighlightedPosts(): Promise<Post[]> {
    const posts = await this.load()
    return posts.filter((p) => p.highlighted)
  }

  async getAllCategories(): Promise<string[]> {
    const posts = await this.load()
    const seen = new Set<string>()
    return posts.map((p) => p.category).filter((c) => { if (seen.has(c)) return false; seen.add(c); return true })
  }

  async getPostsByYearMonth(year: number, month: number): Promise<Post[]> {
    const posts = await this.load()
    return posts.filter((p) => {
      const d = new Date(p.date)
      return d.getFullYear() === year && d.getMonth() + 1 === month
    })
  }

  async searchPosts(query: string): Promise<Post[]> {
    const posts = await this.load()
    const q = query.toLowerCase()
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.hashtags.some((h) => h.toLowerCase().includes(q))
    )
  }
}
