import type { Metadata } from 'next'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { PostCard } from '@/presentation/components/post/PostCard'

const repo = new JsonPostRepository()
export const metadata: Metadata = { title: 'Búsqueda' }

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  const posts = query.length > 1 ? await repo.searchPosts(query) : []

  return (
    <div style={{ paddingTop: '2rem' }}>
      <h1 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Resultados para: &quot;{query}&quot;
      </h1>
      {posts.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>Sin resultados.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  )
}
