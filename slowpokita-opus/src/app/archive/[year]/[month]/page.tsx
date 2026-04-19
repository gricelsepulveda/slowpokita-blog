import { notFound } from "next/navigation";
import { postUseCases } from "@/infrastructure/container";
import { PostCard } from "@/presentation/components/PostCard";

const MONTHS = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

export default async function ArchiveMonth({ params }: { params: Promise<{ year: string; month: string }> }) {
  const { year, month } = await params;
  const y = Number(year), m = Number(month);
  if (!Number.isInteger(y) || !Number.isInteger(m) || m < 1 || m > 12) notFound();
  const posts = await postUseCases.listByArchive(y, m);
  if (!posts.length) notFound();
  return (
    <section>
      <h1>{MONTHS[m - 1]} {y}</h1>
      <div className="grid">{posts.map(p => <PostCard key={p.id} post={p} />)}</div>
    </section>
  );
}
