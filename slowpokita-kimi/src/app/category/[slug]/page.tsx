import { container } from "@/infrastructure/di/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `Categoría: ${params.slug} | slowpokita`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = params.slug.replace(/-/g, " ");
  const { posts, hasMore } = await container.getPostsByCategory.execute(category, 1);

  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2 capitalize">
        Categoría: {category}
      </h1>
      <div className="grid gap-8 md:grid-cols-2 mt-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={1} hasMore={hasMore} basePath={`/category/${params.slug}`} />
    </div>
  );
}