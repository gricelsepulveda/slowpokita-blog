import { PostRepository } from '../../domain/repositories/postRepository';
import { Post } from '../../domain/models/post';

export class GetAllPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.getAllPosts();
  }
}