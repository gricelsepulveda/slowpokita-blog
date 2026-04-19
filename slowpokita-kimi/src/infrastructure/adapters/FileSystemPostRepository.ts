import { Post, ArchiveYear, ArchiveMonth } from "@/domain/entities/Post";
import { PostRepository } from "@/domain/repositories/PostRepository";
import postsData from "../../../content/posts.json";

export class FileSystemPostRepository implements PostRepository {
  private posts: Post[] = postsData.posts;

  async getAll(): Promise<Post[]> { return this.posts; }
  async getBySlug(slug: string): Promise<Post | null> { return this.posts.find((p) => p.slug === slug) || null; }
  async getFeatured(): Promise<Post[]> { return this.posts.filter((p) => p.highlighted); }
  async getByCategory(category: string): Promise<Post[]> { return this.posts.filter((p) => p.category.toLowerCase() === category.toLowerCase()); }
  async getCategories(): Promise<string[]> {
    const cats: string[] = [];
    for (const p of this.posts) if (!cats.includes(p.category)) cats.push(p.category);
    return cats.sort();
  }
  async search(query: string): Promise<Post[]> {
    const lower = query.toLowerCase();
    return this.posts.filter((p) => p.title.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower) || p.hashtags.some((h) => h.toLowerCase().includes(lower)));
  }
  async getArchive(): Promise<ArchiveYear[]> {
    const byYear = new Map<number, Map<number, Post[]>>();
    for (const post of this.posts) {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      if (!byYear.has(year)) byYear.set(year, new Map());
      const byMonth = byYear.get(year)!;
      if (!byMonth.has(month)) byMonth.set(month, []);
      byMonth.get(month)!.push(post);
    }
    const result: ArchiveYear[] = [];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    byYear.forEach((byMonth, year) => {
      const monthList: ArchiveMonth[] = [];
      byMonth.forEach((posts, monthNum) => monthList.push({ month: monthNum, monthName: months[monthNum - 1], posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }));
      monthList.sort((a, b) => b.month - a.month);
      result.push({ year, months: monthList });
    });
    return result.sort((a, b) => b.year - a.year);
  }
  async getByYearMonth(year: number, month: number): Promise<Post[]> {
    return this.posts.filter((p) => { const date = new Date(p.date); return date.getFullYear() === year && date.getMonth() + 1 === month; });
  }
}