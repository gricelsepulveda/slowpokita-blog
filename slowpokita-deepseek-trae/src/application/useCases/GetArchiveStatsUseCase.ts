import { PostRepository } from '../../domain/repositories/postRepository';

export class GetArchiveStatsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<Array<{ year: number; month: number; count: number }>> {
    return this.postRepository.getAllYearsMonths();
  }
}