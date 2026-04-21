import { PostRepository } from '../../domain/repositories/postRepository';
import { Post } from '../../domain/models/post';

export class GetPostBySlugUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(slug: string): Promise<Post | null> {
    return this.postRepository.getPostBySlug(slug);
  }
}