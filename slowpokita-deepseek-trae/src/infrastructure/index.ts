import { JsonPostRepository } from './repositories/JsonPostRepository';
import { CONTENT_PATH } from './config';

export { JsonPostRepository } from './repositories/JsonPostRepository';
export { CONTENT_PATH } from './config';

export function createPostRepository(): JsonPostRepository {
  return new JsonPostRepository(CONTENT_PATH);
}