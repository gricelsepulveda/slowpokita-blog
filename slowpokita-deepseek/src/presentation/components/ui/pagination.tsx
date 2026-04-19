import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  hasNext,
  hasPrev,
}: PaginationProps) {
  const getPageHref = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/${page}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {hasPrev && (
        <Link
          href={getPageHref(currentPage - 1)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF2E97]/30 transition-colors"
        >
          <ChevronLeft size={18} />
          <span>Anterior</span>
        </Link>
      )}

      <div className="flex items-center space-x-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          if (pageNum < 1 || pageNum > totalPages) return null;

          return (
            <Link
              key={pageNum}
              href={getPageHref(pageNum)}
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-colors',
                currentPage === pageNum
                  ? 'bg-gradient-to-r from-[#FF2E97] to-[#FFD402] text-black'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              )}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {hasNext && (
        <Link
          href={getPageHref(currentPage + 1)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF2E97]/30 transition-colors"
        >
          <span>Siguiente</span>
          <ChevronRight size={18} />
        </Link>
      )}
    </div>
  );
}