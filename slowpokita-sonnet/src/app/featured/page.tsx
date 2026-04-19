import type { Metadata } from 'next'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { getHighlightedPostsPaginated } from '@/application/usecases/GetAllPosts'
import { PostCard } from '@/presentation/components/post/PostCard'
import { Pagination } from '@/presentation/components/ui/Pagination'

const repo = new JsonPostRepository()
export const metadata: Metadata = { title: 'Destacados' }

export default async function FeaturedPage() {
  const { posts, totalPages } = await getHighlightedPostsPaginated(repo, 1)

  return (
    <div style={{ paddingTop: '2rem' }}>
      <h1 style={{ color: 'var(--yellow)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Posts destacados
      </h1>
      {posts.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No hay posts destacados aún.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
          <Pagination currentPage={1} totalPages={totalPages} basePath="/featured" />
        </>
      )}
    </div>
  )
}
