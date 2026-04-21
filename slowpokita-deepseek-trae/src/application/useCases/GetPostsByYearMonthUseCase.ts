import { PostRepository } from '../../domain/repositories/postRepository';
import { Post } from '../../domain/models/post';

export class GetPostsByYearMonthUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(year: number, month: number): Promise<Post[]> {
    return this.postRepository.getPostsByYearMonth(year, month);
  }
}