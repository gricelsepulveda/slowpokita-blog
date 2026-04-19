import { container } from "@/infrastructure/di/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";
import { notFound } from "next/navigation";

interface Props {
  params: { page: string };
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `Posts - Página ${params.page} | slowpokita`,
  };
}

export default async function PostsPage({ params }: Props) {
  const page = parseInt(params.page, 10);
  if (isNaN(page) || page < 1) notFound();

  const { posts, hasMore } = await container.getPosts.execute(page);
  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Todos los Posts</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={page} hasMore={hasMore} basePath="/posts" />
    </div>
  );
}