import { PostRepository } from "@/domain/repositories/PostRepository";

export class GetCategories {
  constructor(private readonly repository: PostRepository) {}

  async execute() {
    return this.repository.getCategories();
  }
}