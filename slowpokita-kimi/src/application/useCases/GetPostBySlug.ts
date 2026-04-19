import { PostRepository } from "@/domain/repositories/PostRepository";
import { toPostDTO } from "../dto/PostDTO";

export class GetPostBySlug {
  constructor(private readonly repository: PostRepository) {}

  async execute(slug: string) {
    const post = await this.repository.getBySlug(slug);
    if (!post) return null;
    return toPostDTO(post);
  }
}