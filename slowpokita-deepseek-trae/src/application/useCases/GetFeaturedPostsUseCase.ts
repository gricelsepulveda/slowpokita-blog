import { PostRepository } from '../../domain/repositories/postRepository';
import { Post } from '../../domain/models/post';

export class GetFeaturedPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.getFeaturedPosts();
  }
}