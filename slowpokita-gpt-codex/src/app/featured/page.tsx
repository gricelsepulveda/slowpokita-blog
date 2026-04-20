import { postUseCases } from "@/infrastructure/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";

export const metadata = { title: "Destacados" };

export default async function FeaturedPage() {
  const data = await postUseCases.listFeatured(1);
  return (
    <section>
      <h1>Posts destacados</h1>
      {data.items.length === 0 ? <p>Aun no hay posts destacados.</p> : (
        <div className="grid">{data.items.map(p => <PostCard key={p.id} post={p} />)}</div>
      )}
      <Pagination page={data.page} totalPages={data.totalPages} basePath="/featured" />
    </section>
  );
}
