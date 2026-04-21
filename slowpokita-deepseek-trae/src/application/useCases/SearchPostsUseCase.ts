import { PostRepository } from '../../domain/repositories/postRepository';
import { Post } from '../../domain/models/post';

export class SearchPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(query: string): Promise<Post[]> {
    return this.postRepository.searchPosts(query);
  }
}