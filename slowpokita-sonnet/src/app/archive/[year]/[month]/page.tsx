import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { PostCard } from '@/presentation/components/post/PostCard'

const repo = new JsonPostRepository()

interface Props {
  params: Promise<{ year: string; month: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month } = await params
  return { title: `Archivo ${year}/${month}` }
}

export default async function ArchiveMonthPage({ params }: Props) {
  const { year, month } = await params
  const posts = await repo.getPostsByYearMonth(parseInt(year, 10), parseInt(month, 10))
  if (posts.length === 0) notFound()

  return (
    <div style={{ paddingTop: '2rem' }}>
      <h1 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Archivo — {year}/{month}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  )
}
