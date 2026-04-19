import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'

const repo = new JsonPostRepository()
export const metadata: Metadata = { title: 'Categorías' }

export default async function CategoriesPage() {
  const categories = await repo.getAllCategories()

  return (
    <div style={{ paddingTop: '2rem' }}>
      <h1 style={{ color: 'var(--cyan)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Categorías
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {categories.map((cat) => (
          <Link key={cat} href={`/category/${cat.toLowerCase()}`} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1rem 1.5rem',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'border-color 0.2s',
          }}>
            {cat}
          </Link>
        ))}
      </div>
    </div>
  )
}
