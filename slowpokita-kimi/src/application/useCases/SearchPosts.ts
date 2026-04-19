import { PostRepository } from "@/domain/repositories/PostRepository";
import { toPostDTOList } from "../dto/PostDTO";

export class SearchPosts {
  constructor(private readonly repository: PostRepository) {}

  async execute(query: string) {
    if (!query.trim()) return [];
    const posts = await this.repository.search(query);
    return toPostDTOList(posts);
  }
}