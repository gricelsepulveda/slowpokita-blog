import { container } from "@/infrastructure/di/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";

export const metadata = {
  title: "Destacados | slowpokita",
  description: "Posts destacados del blog",
};

export default async function FeaturedPage() {
  const { posts, hasMore } = await container.getFeaturedPosts.execute(1);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Posts Destacados</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-gray-400 text-center py-12">No hay posts destacados aún.</p>
      )}
      <Pagination currentPage={1} hasMore={hasMore} basePath="/featured" />
    </div>
  );
}