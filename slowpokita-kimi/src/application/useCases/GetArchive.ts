import { PostRepository } from "@/domain/repositories/PostRepository";

export class GetArchive {
  constructor(private readonly repository: PostRepository) {}

  async execute() {
    return this.repository.getArchive();
  }
}