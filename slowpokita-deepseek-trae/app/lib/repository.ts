import { createPostRepository } from '../../src/infrastructure';

let repository: ReturnType<typeof createPostRepository> | null = null;

export function getPostRepository() {
  if (!repository) {
    repository = createPostRepository();
  }
  return repository;
}