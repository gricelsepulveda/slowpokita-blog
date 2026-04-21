import { getPostRepository } from './repository';
import {
  GetAllPostsUseCase,
  GetFeaturedPostsUseCase,
  GetPostBySlugUseCase,
  GetPostsByCategoryUseCase,
  GetPostsByYearMonthUseCase,
  GetAllCategoriesUseCase,
  GetArchiveStatsUseCase,
  SearchPostsUseCase,
} from '../../src/application';

const repository = getPostRepository();

const getAllPostsUseCase = new GetAllPostsUseCase(repository);
const getFeaturedPostsUseCase = new GetFeaturedPostsUseCase(repository);
const getPostBySlugUseCase = new GetPostBySlugUseCase(repository);
const getPostsByCategoryUseCase = new GetPostsByCategoryUseCase(repository);
const getPostsByYearMonthUseCase = new GetPostsByYearMonthUseCase(repository);
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(repository);
const getArchiveStatsUseCase = new GetArchiveStatsUseCase(repository);
const searchPostsUseCase = new SearchPostsUseCase(repository);

export async function getAllPosts() {
  return getAllPostsUseCase.execute();
}

export async function getFeaturedPosts() {
  return getFeaturedPostsUseCase.execute();
}

export async function getPostBySlug(slug: string) {
  return getPostBySlugUseCase.execute(slug);
}

export async function getPostsByCategory(category: string) {
  return getPostsByCategoryUseCase.execute(category);
}

export async function getPostsByYearMonth(year: number, month: number) {
  return getPostsByYearMonthUseCase.execute(year, month);
}

export async function getAllCategories() {
  return getAllCategoriesUseCase.execute();
}

export async function getArchiveStats() {
  return getArchiveStatsUseCase.execute();
}

export async function searchPosts(query: string) {
  return searchPostsUseCase.execute(query);
}