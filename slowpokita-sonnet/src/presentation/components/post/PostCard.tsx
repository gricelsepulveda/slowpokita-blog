import Link from 'next/link'
import { Post } from '@/domain/entities/Post'
import { CategoryBadge } from '@/presentation/components/ui/CategoryBadge'

interface Props {
  post: Post
}

export function PostCard({ post }: Props) {
  return (
    <article style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <CategoryBadge category={post.category} />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {post.readingTime} min de lectura
        </span>
        {post.highlighted && (
          <span style={{
            background: 'var(--yellow)',
            color: '#1E1B4C',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.15rem 0.5rem',
            borderRadius: '4px',
            letterSpacing: '0.05em',
          }}>
            DESTACADO
          </span>
        )}
      </div>

      <Link href={`/post/${post.slug}`}>
        <h2 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.4rem',
          lineHeight: 1.3,
        }}>
          {post.title}
        </h2>
      </Link>

      {post.subtitle && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
          {post.subtitle}
        </p>
      )}

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
        {post.excerpt}
      </p>

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {post.hashtags.map((tag) => (
          <span key={tag} style={{
            fontSize: '0.75rem',
            color: 'var(--cyan)',
            background: 'rgba(10,189,198,0.1)',
            padding: '0.2rem 0.6rem',
            borderRadius: '20px',
          }}>
            #{tag}
          </span>
        ))}
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <Link href={`/post/${post.slug}`} style={{
          color: 'var(--pink)',
          fontWeight: 600,
          fontSize: '0.85rem',
          letterSpacing: '0.05em',
        }}>
          Leer más →
        </Link>
      </div>
    </article>
  )
}
