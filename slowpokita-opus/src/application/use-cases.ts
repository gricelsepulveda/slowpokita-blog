import type { ArchiveEntry, Category, Paginated, Post } from "@/domain/post";
import { paginate, PAGE_SIZE } from "@/domain/pagination";
import type { PostRepository } from "@/domain/ports";

const byDateDesc = (a: Post, b: Post) => (a.date < b.date ? 1 : -1);

export class PostUseCases {
  constructor(private readonly repo: PostRepository) {}

  async listPosts(page = 1): Promise<Paginated<Post>> {
    const all = (await this.repo.findAll()).sort(byDateDesc);
    return paginate(all, page, PAGE_SIZE);
  }

  async listFeatured(page = 1): Promise<Paginated<Post>> {
    const all = (await this.repo.findAll()).filter(p => p.highlighted).sort(byDateDesc);
    return paginate(all, page, PAGE_SIZE);
  }

  async getBySlug(slug: string): Promise<Post | null> {
    return this.repo.findBySlug(slug);
  }

  async listCategories(): Promise<Category[]> {
    const all = await this.repo.findAll();
    const map = new Map<string, Category>();
    for (const p of all) {
      const slug = slugify(p.category);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { slug, name: p.category, count: 1 });
    }
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  async listByCategory(categorySlug: string, page = 1): Promise<{ data: Paginated<Post>; name: string } | null> {
    const all = (await this.repo.findAll()).sort(byDateDesc);
    const matched = all.filter(p => slugify(p.category) === categorySlug);
    if (!matched.length) return null;
    return { data: paginate(matched, page, PAGE_SIZE), name: matched[0].category };
  }

  async archive(): Promise<ArchiveEntry[]> {
    const all = await this.repo.findAll();
    const map = new Map<string, ArchiveEntry>();
    for (const p of all) {
      const d = new Date(p.date);
      const key = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}`;
      const existing = map.get(key);
      if (existing) existing.count += 1;
      else map.set(key, { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, count: 1 });
    }
    return [...map.values()].sort((a, b) => (a.year !== b.year ? b.year - a.year : b.month - a.month));
  }

  async listByArchive(year: number, month: number): Promise<Post[]> {
    const all = (await this.repo.findAll()).sort(byDateDesc);
    return all.filter(p => {
      const d = new Date(p.date);
      return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month;
    });
  }

  async searchIndex(): Promise<Array<Pick<Post, "slug" | "title" | "category" | "hashtags" | "excerpt" | "date">>> {
    const all = await this.repo.findAll();
    return all.map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      hashtags: p.hashtags,
      excerpt: p.excerpt,
      date: p.date
    }));
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
