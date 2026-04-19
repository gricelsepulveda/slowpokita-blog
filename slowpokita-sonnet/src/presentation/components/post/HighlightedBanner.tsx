import Link from 'next/link'
import { Post } from '@/domain/entities/Post'
import { CategoryBadge } from '@/presentation/components/ui/CategoryBadge'

interface Props {
  post: Post
}

export function HighlightedBanner({ post }: Props) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, var(--bg-card) 0%, #2a1f6e 100%)',
      borderRadius: 'var(--radius)',
      padding: '2rem',
      marginTop: '2rem',
      border: '1px solid var(--pink)',
      boxShadow: '0 0 30px rgba(255,46,151,0.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0,
        background: 'var(--yellow)', color: '#1E1B4C',
        fontSize: '0.7rem', fontWeight: 800,
        padding: '0.3rem 1rem',
        letterSpacing: '0.1em',
      }}>
        POST DESTACADO
      </div>
      <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <CategoryBadge category={post.category} />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <Link href={`/post/${post.slug}`}>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: 1.2,
        }}>
          {post.title}
        </h2>
      </Link>
      {post.subtitle && (
        <p style={{ color: 'var(--cyan)', fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 500 }}>
          {post.subtitle}
        </p>
      )}
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
        {post.excerpt}
      </p>
      <Link href={`/post/${post.slug}`} style={{
        display: 'inline-block',
        marginTop: '1.25rem',
        background: 'var(--pink)',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.85rem',
        padding: '0.6rem 1.4rem',
        borderRadius: '30px',
        letterSpacing: '0.05em',
      }}>
        Leer entrada →
      </Link>
    </section>
  )
}
