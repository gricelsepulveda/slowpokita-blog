'use client'

import { useState } from 'react'
import { PostImages } from '@/domain/entities/Post'
import { resolvePostImage } from '@/infrastructure/utils/resolveAsset'
import { ImageLightbox } from '@/presentation/components/lightbox/ImageLightbox'

interface Props {
  content: string
  assetsPath: string
  images?: PostImages
}

export function PostContent({ content, assetsPath, images }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const parts = content.split(/(\$image\w+)/g)

  const rendered = parts.map((part, i) => {
    const match = part.match(/^\$(\w+)$/)
    if (match && images) {
      const key = match[1]
      const filename = images[key]
      if (filename) {
        const src = resolvePostImage(assetsPath, filename)
        return (
          <div key={i} style={{
            textAlign: 'center',
            margin: '2rem 0',
          }}>
            <img
              src={src}
              alt={key}
              onClick={() => setLightboxSrc(src)}
              style={{
                maxWidth: '70%',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                cursor: 'zoom-in',
                border: '1px solid var(--border)',
              }}
            />
          </div>
        )
      }
    }
    return (
      <div key={i}>
        {part.split('\n\n').map((para, j) =>
          para.trim() ? (
            <p key={j} style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              {para.trim()}
            </p>
          ) : null
        )}
      </div>
    )
  })

  return (
    <div style={{ fontSize: '1.05rem', lineHeight: 1.85 }}>
      {rendered}
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  )
}
