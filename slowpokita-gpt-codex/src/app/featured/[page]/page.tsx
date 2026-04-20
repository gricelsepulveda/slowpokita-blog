import { notFound } from "next/navigation";
import { postUseCases } from "@/infrastructure/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";

export default async function FeaturedPaged({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 1) notFound();
  const data = await postUseCases.listFeatured(n);
  return (
    <section>
      <h1>Destacados - pagina {data.page}</h1>
      <div className="grid">{data.items.map(p => <PostCard key={p.id} post={p} />)}</div>
      <Pagination page={data.page} totalPages={data.totalPages} basePath="/featured" />
    </section>
  );
}
