'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [, startTransition] = useTransition()
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    if (val.trim().length > 1) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(val.trim())}`)
      })
    }
  }

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <input
        type="search"
        placeholder="Buscar por título, categoría o hashtag..."
        value={query}
        onChange={handleChange}
        style={{
          width: '100%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0.75rem 1.25rem',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  )
}
