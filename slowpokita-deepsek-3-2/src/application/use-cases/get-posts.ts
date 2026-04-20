import { PostRepository } from '@/domain/repositories/post-repository';
import { Post } from '@/domain/entities/post';

export class GetPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}