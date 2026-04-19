import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { getAllPostsPaginated } from '@/application/usecases/GetAllPosts'
import { PostCard } from '@/presentation/components/post/PostCard'
import { Pagination } from '@/presentation/components/ui/Pagination'
import { HighlightedBanner } from '@/presentation/components/post/HighlightedBanner'

const repo = new JsonPostRepository()

export default async function HomePage() {
  const [{ posts, totalPages }, highlighted] = await Promise.all([
    getAllPostsPaginated(repo, 1),
    repo.getHighlightedPosts(),
  ])

  const featuredPost = highlighted[0] ?? null

  return (
    <div>
      {featuredPost && <HighlightedBanner post={featuredPost} />}
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: 'var(--pink)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Últimas entradas
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {totalPages > 1 && <Pagination currentPage={1} totalPages={totalPages} basePath="/posts" />}
      </section>
    </div>
  )
}
