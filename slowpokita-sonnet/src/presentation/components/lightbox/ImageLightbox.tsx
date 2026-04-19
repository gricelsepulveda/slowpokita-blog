'use client'

import { useEffect } from 'react'

interface Props {
  src: string
  onClose: () => void
}

export function ImageLightbox({ src, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
        cursor: 'zoom-out',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          background: 'var(--pink)', border: 'none',
          color: '#fff', fontWeight: 800, fontSize: '1.2rem',
          width: '2.5rem', height: '2.5rem', borderRadius: '50%',
          cursor: 'pointer', lineHeight: 1,
        }}
        aria-label="Cerrar"
      >
        ×
      </button>
      <img
        src={src}
        alt="imagen ampliada"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          borderRadius: 'var(--radius)',
          boxShadow: '0 0 60px rgba(255,46,151,0.3)',
          cursor: 'default',
        }}
      />
    </div>
  )
}
