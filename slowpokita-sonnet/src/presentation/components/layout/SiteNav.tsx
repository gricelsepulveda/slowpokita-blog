import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Posts' },
  { href: '/featured', label: 'Destacados' },
  { href: '/categories', label: 'Categorías' },
  { href: '/archive', label: 'Archivo' },
]

export function SiteNav() {
  return (
    <nav style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        gap: '0.25rem',
        overflowX: 'auto',
      }}>
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} style={{
            display: 'block',
            padding: '0.9rem 1rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            borderBottom: '2px solid transparent',
            transition: 'color 0.2s, border-color 0.2s',
          }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
