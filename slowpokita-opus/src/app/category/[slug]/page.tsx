import { notFound } from "next/navigation";
import { postUseCases } from "@/infrastructure/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await postUseCases.listByCategory(slug, 1);
  if (!result) notFound();
  return (
    <section>
      <h1>Categoria: {result.name}</h1>
      <div className="grid">{result.data.items.map(p => <PostCard key={p.id} post={p} />)}</div>
      <Pagination page={result.data.page} totalPages={result.data.totalPages} basePath={`/category/${slug}`} />
    </section>
  );
}
