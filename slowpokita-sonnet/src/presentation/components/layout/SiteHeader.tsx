import Link from 'next/link'
import { siteConfig } from '@/infrastructure/config/siteConfig'

export function SiteHeader() {
  return (
    <header style={{
      backgroundImage: `linear-gradient(to bottom, rgba(30,27,76,0.55), rgba(30,27,76,0.92)), url(${siteConfig.headerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '4rem 1rem 3rem',
      textAlign: 'center',
      borderBottom: '2px solid var(--pink)',
    }}>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        fontWeight: 800,
        background: 'linear-gradient(135deg, var(--pink), var(--yellow))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        marginBottom: '0.75rem',
      }}>
        {siteConfig.title}
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem' }}>
        {siteConfig.subtitle}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--cyan)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
          LinkedIn
        </a>
        <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--pink)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
          Instagram
        </a>
      </div>
    </header>
  )
}
