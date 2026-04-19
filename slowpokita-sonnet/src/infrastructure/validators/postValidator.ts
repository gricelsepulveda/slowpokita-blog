import { Post } from '@/domain/entities/Post'

function isPost(obj: unknown): obj is Post {
  if (typeof obj !== 'object' || obj === null) return false
  const p = obj as Record<string, unknown>
  return (
    typeof p.id === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.title === 'string' &&
    typeof p.date === 'string' &&
    typeof p.category === 'string' &&
    Array.isArray(p.hashtags) &&
    typeof p.highlighted === 'boolean' &&
    typeof p.readingTime === 'number' &&
    typeof p.excerpt === 'string' &&
    typeof p.content === 'string' &&
    typeof p.assetsPath === 'string'
  )
}

export function validatePosts(data: unknown): Post[] {
  if (typeof data !== 'object' || data === null || !Array.isArray((data as Record<string, unknown>).posts)) {
    throw new Error('posts.json: formato inválido — falta campo "posts" array')
  }
  const raw = (data as { posts: unknown[] }).posts
  return raw.map((item, idx) => {
    if (!isPost(item)) {
      throw new Error(`posts.json: post[${idx}] tiene campos faltantes o inválidos`)
    }
    return item
  })
}
