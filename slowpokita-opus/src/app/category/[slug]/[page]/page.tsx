import { notFound } from "next/navigation";
import { postUseCases } from "@/infrastructure/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";

export default async function CategoryPaged({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 1) notFound();
  const result = await postUseCases.listByCategory(slug, n);
  if (!result) notFound();
  return (
    <section>
      <h1>Categoria: {result.name} - pagina {result.data.page}</h1>
      <div className="grid">{result.data.items.map(p => <PostCard key={p.id} post={p} />)}</div>
      <Pagination page={result.data.page} totalPages={result.data.totalPages} basePath={`/category/${slug}`} />
    </section>
  );
}
