import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { siteConfig } from '@/infrastructure/config/siteConfig'
import { PostContent } from '@/presentation/components/post/PostContent'
import { CategoryBadge } from '@/presentation/components/ui/CategoryBadge'

const repo = new JsonPostRepository()

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await repo.getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await repo.getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.seo?.seoTitle ?? post.title,
    description: post.seo?.seoDescription ?? post.excerpt,
    openGraph: {
      title: post.seo?.seoTitle ?? post.title,
      description: post.seo?.seoDescription ?? post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: post.seo?.ogImage ? [`/posts/${post.assetsPath}/${post.seo.ogImage}`] : [siteConfig.defaultOgImage],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await repo.getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'slowpokita' },
    url: `${siteConfig.url}/post/${post.slug}`,
  }

  return (
    <article style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <CategoryBadge category={post.category} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {post.readingTime} min de lectura
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: '0.75rem',
        }}>
          {post.title}
        </h1>

        {post.subtitle && (
          <p style={{ color: 'var(--cyan)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '1rem' }}>
            {post.subtitle}
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
          {post.hashtags.map((tag) => (
            <span key={tag} style={{
              fontSize: '0.8rem', color: 'var(--cyan)',
              background: 'rgba(10,189,198,0.1)',
              padding: '0.2rem 0.65rem', borderRadius: '20px',
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <PostContent content={post.content} assetsPath={post.assetsPath} images={post.images} />
    </article>
  )
}
