import Link from 'next/link'

interface Props {
  category: string
  asLink?: boolean
}

const COLORS: Record<string, string> = {
  personal: 'var(--pink)',
  viajes: 'var(--yellow)',
  tecnología: 'var(--cyan)',
  tecnologia: 'var(--cyan)',
}

function getColor(category: string): string {
  return COLORS[category.toLowerCase()] ?? 'var(--text-muted)'
}

export function CategoryBadge({ category, asLink = true }: Props) {
  const color = getColor(category)
  const style = {
    fontSize: '0.75rem',
    fontWeight: 700,
    color,
    border: `1px solid ${color}`,
    padding: '0.2rem 0.65rem',
    borderRadius: '20px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    display: 'inline-block',
  }

  if (!asLink) return <span style={style}>{category}</span>

  return (
    <Link href={`/category/${category.toLowerCase()}`} style={style}>
      {category}
    </Link>
  )
}
