import { getArchiveStats } from '../lib/posts';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive | slowpokita',
  description: 'Browse posts by publication date. Navigate through years and months.',
  openGraph: {
    title: 'Archive | slowpokita',
    description: 'Browse posts by publication date. Navigate through years and months.',
  },
};

export default async function ArchivePage() {
  const archiveStats = await getArchiveStats();
  const byYear = new Map<number, Array<{ month: number; count: number }>>();
  archiveStats.forEach(({ year, month, count }) => {
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push({ month, count });
  });
  const years = Array.from(byYear.entries())
    .map(([year, months]) => ({ year, months }))
    .sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Archive</h1>
        <p className="text-muted mt-2">
          Browse posts by publication date.
        </p>
      </div>

      {years.map(({ year, months }) => (
        <div key={year} className="card">
          <h2 className="text-3xl font-bold text-primary mb-4">{year}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {months.sort((a, b) => b.month - a.month).map(({ month, count }) => {
              const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
              return (
                <Link
                  key={month}
                  href={`/archive/${year}/${month}`}
                  className="p-4 bg-background-dark border border-border rounded-lg text-center hover:bg-border transition-colors"
                >
                  <div className="text-lg font-semibold text-foreground">{monthName}</div>
                  <div className="text-muted text-sm">{count} post{count !== 1 ? 's' : ''}</div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}