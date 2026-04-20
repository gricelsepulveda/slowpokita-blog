import { PostUseCases } from "@/application/use-cases";
import { postRepository } from "./json-post-repository";

export const postUseCases = new PostUseCases(postRepository);
