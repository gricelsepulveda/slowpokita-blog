import { notFound } from 'next/navigation'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { getPostsByCategoryPaginated } from '@/application/usecases/GetAllPosts'
import { PostCard } from '@/presentation/components/post/PostCard'
import { Pagination } from '@/presentation/components/ui/Pagination'

const repo = new JsonPostRepository()

interface Props {
  params: Promise<{ slug: string; page: string }>
}

export default async function CategoryPageN({ params }: Props) {
  const { slug, page: pageStr } = await params
  const page = parseInt(pageStr, 10)
  if (isNaN(page) || page < 1) notFound()

  const { posts, totalPages } = await getPostsByCategoryPaginated(repo, slug, page)
  if (posts.length === 0) notFound()

  return (
    <div style={{ paddingTop: '2rem' }}>
      <h1 style={{ color: 'var(--cyan)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Categoría: {slug} — página {page}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} basePath={`/category/${slug}`} />
    </div>
  )
}
