import { PostRepository } from '@/domain/repositories/post-repository';
import { Post } from '@/domain/entities/post';

export class GetPostBySlugUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(slug: string): Promise<Post | null> {
    return this.postRepository.findBySlug(slug);
  }
}