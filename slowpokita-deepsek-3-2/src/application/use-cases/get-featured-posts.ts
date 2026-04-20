import { PostRepository } from '@/domain/repositories/post-repository';
import { Post } from '@/domain/entities/post';

export class GetFeaturedPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.findFeatured();
  }
}