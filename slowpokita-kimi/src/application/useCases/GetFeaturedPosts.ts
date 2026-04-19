import { PostRepository } from "@/domain/repositories/PostRepository";
import { toPostDTOList } from "../dto/PostDTO";

export class GetFeaturedPosts {
  constructor(private readonly repository: PostRepository) {}

  async execute(page: number, limit: number = 10) {
    const posts = await this.repository.getFeatured();
    const sorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      posts: toPostDTOList(sorted.slice(start, end)),
      total: sorted.length,
      hasMore: end < sorted.length,
    };
  }
}