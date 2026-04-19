import { container } from "@/infrastructure/di/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";

export const metadata = {
  title: "Posts | slowpokita",
  description: "Todos los posts del blog",
};

export default async function PostsPage() {
  const { posts, hasMore } = await container.getPosts.execute(1);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Todos los Posts</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={1} hasMore={hasMore} basePath="/posts" />
    </div>
  );
}