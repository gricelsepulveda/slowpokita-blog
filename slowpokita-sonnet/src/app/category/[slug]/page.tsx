import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { getPostsByCategoryPaginated } from '@/application/usecases/GetAllPosts'
import { PostCard } from '@/presentation/components/post/PostCard'
import { Pagination } from '@/presentation/components/ui/Pagination'

const repo = new JsonPostRepository()

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: `Categoría: ${slug}` }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const { posts, totalPages } = await getPostsByCategoryPaginated(repo, slug, 1)
  if (posts.length === 0) notFound()

  return (
    <div style={{ paddingTop: '2rem' }}>
      <h1 style={{ color: 'var(--cyan)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Categoría: {slug}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      <Pagination currentPage={1} totalPages={totalPages} basePath={`/category/${slug}`} />
    </div>
  )
}
