'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/${page}`;
  };

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-background-light border border-border rounded-lg hover:bg-border transition-colors"
        >
          Previous
        </Link>
      )}
      {start > 1 && (
        <>
          <Link
            href={getPageUrl(1)}
            className={`px-4 py-2 rounded-lg ${1 === currentPage ? 'bg-primary text-white' : 'bg-background-light border border-border hover:bg-border'}`}
          >
            1
          </Link>
          {start > 2 && <span className="px-2 text-muted">...</span>}
        </>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`px-4 py-2 rounded-lg ${page === currentPage ? 'bg-primary text-white' : 'bg-background-light border border-border hover:bg-border'}`}
        >
          {page}
        </Link>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2 text-muted">...</span>}
          <Link
            href={getPageUrl(totalPages)}
            className={`px-4 py-2 rounded-lg ${totalPages === currentPage ? 'bg-primary text-white' : 'bg-background-light border border-border hover:bg-border'}`}
          >
            {totalPages}
          </Link>
        </>
      )}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-background-light border border-border rounded-lg hover:bg-border transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}