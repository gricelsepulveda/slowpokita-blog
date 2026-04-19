import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  basePath: string;
}

export function Pagination({ currentPage, hasMore, basePath }: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = hasMore ? currentPage + 1 : null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      {prevPage ? (
        <Link
          href={basePath === "/" ? `/posts/${prevPage}` : `${basePath}/${prevPage}`}
          className="px-6 py-3 bg-bg-light text-brand-cyan rounded-lg hover:bg-brand-cyan/20 transition-colors"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="px-6 py-3 bg-bg-dark text-gray-600 rounded-lg cursor-not-allowed">
          ← Anterior
        </span>
      )}
      <span className="text-gray-400 font-medium">Página {currentPage}</span>
      {nextPage ? (
        <Link
          href={basePath === "/" ? `/posts/${nextPage}` : `${basePath}/${nextPage}`}
          className="px-6 py-3 bg-bg-light text-brand-cyan rounded-lg hover:bg-brand-cyan/20 transition-colors"
        >
          Siguiente →
        </Link>
      ) : (
        <span className="px-6 py-3 bg-bg-dark text-gray-600 rounded-lg cursor-not-allowed">
          Siguiente →
        </span>
      )}
    </div>
  );
}