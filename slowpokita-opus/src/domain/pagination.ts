import type { Paginated } from "./post";

export const PAGE_SIZE = 10;

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE): Paginated<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total,
    pageSize
  };
}
