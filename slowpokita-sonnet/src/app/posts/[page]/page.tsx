import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { getAllPostsPaginated } from '@/application/usecases/GetAllPosts'
import { PostCard } from '@/presentation/components/post/PostCard'
import { Pagination } from '@/presentation/components/ui/Pagination'

const repo = new JsonPostRepository()

interface Props {
  params: Promise<{ page: string }>
}

export const metadata: Metadata = { title: 'Posts' }

export default async function PostsPage({ params }: Props) {
  const { page: pageStr } = await params
  const page = parseInt(pageStr, 10)
  if (isNaN(page) || page < 1) notFound()

  const { posts, totalPages } = await getAllPostsPaginated(repo, page)
  if (posts.length === 0) notFound()

  return (
    <div style={{ paddingTop: '2rem' }}>
      <h1 style={{ color: 'var(--pink)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Posts — página {page}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
    </div>
  )
}
