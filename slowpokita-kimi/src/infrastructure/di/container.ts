import { FileSystemPostRepository } from "../adapters/FileSystemPostRepository";
import { GetPosts } from "@/application/useCases/GetPosts";
import { GetPostBySlug } from "@/application/useCases/GetPostBySlug";
import { GetFeaturedPosts } from "@/application/useCases/GetFeaturedPosts";
import { GetCategories } from "@/application/useCases/GetCategories";
import { GetPostsByCategory } from "@/application/useCases/GetPostsByCategory";
import { SearchPosts } from "@/application/useCases/SearchPosts";
import { GetArchive } from "@/application/useCases/GetArchive";
import { GetArchivePosts } from "@/application/useCases/GetArchivePosts";

const repository = new FileSystemPostRepository();

export const container = {
  getPosts: new GetPosts(repository),
  getPostBySlug: new GetPostBySlug(repository),
  getFeaturedPosts: new GetFeaturedPosts(repository),
  getCategories: new GetCategories(repository),
  getPostsByCategory: new GetPostsByCategory(repository),
  searchPosts: new SearchPosts(repository),
  getArchive: new GetArchive(repository),
  getArchivePosts: new GetArchivePosts(repository),
};