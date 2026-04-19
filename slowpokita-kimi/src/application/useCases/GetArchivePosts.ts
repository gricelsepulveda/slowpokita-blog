import { PostRepository } from "@/domain/repositories/PostRepository";
import { toPostDTOList } from "../dto/PostDTO";

export class GetArchivePosts {
  constructor(private readonly repository: PostRepository) {}

  async execute(year: number, month: number) {
    const posts = await this.repository.getByYearMonth(year, month);
    return toPostDTOList(posts);
  }
}