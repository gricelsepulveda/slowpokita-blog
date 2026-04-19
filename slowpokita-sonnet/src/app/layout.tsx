import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/infrastructure/config/siteConfig'
import { SiteHeader } from '@/presentation/components/layout/SiteHeader'
import { SiteNav } from '@/presentation/components/layout/SiteNav'
import { SearchBar } from '@/presentation/components/search/SearchBar'

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.title}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    siteName: siteConfig.title,
    images: [{ url: siteConfig.defaultOgImage }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SiteHeader />
        <SiteNav />
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem' }}>
          <SearchBar />
          <main>{children}</main>
        </div>
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          marginTop: '4rem',
          borderTop: '1px solid var(--border)'
        }}>
          © {new Date().getFullYear()} slowpokita — hecho con 💜 desde LATAM
        </footer>
      </body>
    </html>
  )
}
