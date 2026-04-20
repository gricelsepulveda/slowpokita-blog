import { PostRepository } from '@/domain/repositories/post-repository';
import { PostSummary } from '@/domain/entities/post';
import { PaginationResult, PaginationParams } from '@/domain/value-objects/pagination';

export class GetPaginatedPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(params: PaginationParams): Promise<PaginationResult<PostSummary>> {
    return this.postRepository.getPaginatedPosts(params);
  }
}