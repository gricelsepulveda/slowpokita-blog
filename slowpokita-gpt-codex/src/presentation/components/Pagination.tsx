import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ page, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;
  const href = (n: number) => (n === 1 ? basePath : `${basePath}/${n}`);
  return (
    <nav className="pagination" aria-label="Paginacion">
      {page > 1 && <Link href={href(page - 1)}>&larr; Anterior</Link>}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(n =>
        n === page ? <span key={n} className="current">{n}</span> : <Link key={n} href={href(n)}>{n}</Link>
      )}
      {page < totalPages && <Link href={href(page + 1)}>Siguiente &rarr;</Link>}
    </nav>
  );
}
