import { Post } from '@/domain/entities/Post'
import { PostRepository } from '@/domain/ports/PostRepository'

export interface PaginatedPosts {
  posts: Post[]
  total: number
  page: number
  totalPages: number
}

const PAGE_SIZE = 10

export async function getAllPostsPaginated(
  repo: PostRepository,
  page: number = 1
): Promise<PaginatedPosts> {
  const all = await repo.getAllPosts()
  const sorted = [...all].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const total = sorted.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const posts = sorted.slice(start, start + PAGE_SIZE)
  return { posts, total, page, totalPages }
}

export async function getHighlightedPostsPaginated(
  repo: PostRepository,
  page: number = 1
): Promise<PaginatedPosts> {
  const all = await repo.getHighlightedPosts()
  const sorted = [...all].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const total = sorted.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const posts = sorted.slice(start, start + PAGE_SIZE)
  return { posts, total, page, totalPages }
}

export async function getPostsByCategoryPaginated(
  repo: PostRepository,
  category: string,
  page: number = 1
): Promise<PaginatedPosts> {
  const all = await repo.getPostsByCategory(category)
  const sorted = [...all].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const total = sorted.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const posts = sorted.slice(start, start + PAGE_SIZE)
  return { posts, total, page, totalPages }
}

export async function getArchiveMap(repo: PostRepository): Promise<Record<string, Record<string, Post[]>>> {
  const all = await repo.getAllPosts()
  const map: Record<string, Record<string, Post[]>> = {}
  for (const post of all) {
    const d = new Date(post.date)
    const year = d.getFullYear().toString()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    if (!map[year]) map[year] = {}
    if (!map[year][month]) map[year][month] = []
    map[year][month].push(post)
  }
  return map
}
