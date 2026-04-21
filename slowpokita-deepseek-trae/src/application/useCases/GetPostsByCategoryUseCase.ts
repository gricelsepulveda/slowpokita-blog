import { PostRepository } from '../../domain/repositories/postRepository';
import { Post } from '../../domain/models/post';

export class GetPostsByCategoryUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(category: string): Promise<Post[]> {
    return this.postRepository.getPostsByCategory(category);
  }
}