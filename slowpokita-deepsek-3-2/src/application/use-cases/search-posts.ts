import { PostRepository } from '@/domain/repositories/post-repository';
import { PostSummary } from '@/domain/entities/post';
import { SearchParams, SearchResult } from '@/domain/value-objects/search';

export class SearchPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(params: SearchParams): Promise<SearchResult> {
    return this.postRepository.search(params);
  }
}