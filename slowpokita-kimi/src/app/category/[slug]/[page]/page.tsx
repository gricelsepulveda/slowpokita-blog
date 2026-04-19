import { container } from "@/infrastructure/di/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string; page: string };
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `Categoría: ${params.slug} - Página ${params.page} | slowpokita`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const page = parseInt(params.page, 10);
  if (isNaN(page) || page < 1) notFound();

  const category = params.slug.replace(/-/g, " ");
  const { posts, hasMore } = await container.getPostsByCategory.execute(category, page);

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
      <Pagination currentPage={page} hasMore={hasMore} basePath={`/category/${params.slug}`} />
    </div>
  );
}