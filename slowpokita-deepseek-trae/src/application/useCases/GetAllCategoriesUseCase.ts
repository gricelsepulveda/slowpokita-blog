import { PostRepository } from '../../domain/repositories/postRepository';

export class GetAllCategoriesUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<string[]> {
    return this.postRepository.getAllCategories();
  }
}