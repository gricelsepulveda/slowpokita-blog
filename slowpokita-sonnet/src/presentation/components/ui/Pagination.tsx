import Link from 'next/link'

interface Props {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
      {currentPage > 1 && (
        <Link href={`${basePath}/${currentPage - 1}`} style={btnStyle(false)}>← Anterior</Link>
      )}
      {pages.map((p) => (
        <Link key={p} href={`${basePath}/${p}`} style={btnStyle(p === currentPage)}>
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`${basePath}/${currentPage + 1}`} style={btnStyle(false)}>Siguiente →</Link>
      )}
    </nav>
  )
}

function btnStyle(active: boolean) {
  return {
    padding: '0.45rem 1rem',
    borderRadius: 'var(--radius-sm)',
    background: active ? 'var(--pink)' : 'var(--bg-card)',
    color: active ? '#fff' : 'var(--text-secondary)',
    fontWeight: 600,
    fontSize: '0.85rem',
    border: `1px solid ${active ? 'var(--pink)' : 'var(--border)'}`,
  }
}
