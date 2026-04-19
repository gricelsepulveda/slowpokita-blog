import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { getArchiveMap } from '@/application/usecases/GetAllPosts'

const repo = new JsonPostRepository()
export const metadata: Metadata = { title: 'Archivo' }

const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

export default async function ArchivePage() {
  const archive = await getArchiveMap(repo)
  const years = Object.keys(archive).sort((a, b) => +b - +a)

  return (
    <div style={{ paddingTop: '2rem' }}>
      <h1 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Archivo
      </h1>
      {years.map((year) => (
        <div key={year} style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--yellow)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.75rem' }}>{year}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.keys(archive[year]).sort().map((month) => (
              <Link key={month} href={`/archive/${year}/${month}`} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '0.4rem 0.9rem',
                color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600,
              }}>
                {MONTHS_ES[parseInt(month, 10) - 1]} ({archive[year][month].length})
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
