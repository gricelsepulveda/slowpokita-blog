import { container } from "@/infrastructure/di/container";
import { PostCard } from "@/presentation/components/PostCard";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: { year: string; month: string };
}

export async function generateMetadata({ params }: Props) {
  const monthName = new Date(2000, parseInt(params.month) - 1, 1).toLocaleString("es-ES", { month: "long" });
  return {
    title: `Archivo: ${monthName} ${params.year} | slowpokita`,
  };
}

export default async function ArchiveMonthPage({ params }: Props) {
  const year = parseInt(params.year, 10);
  const month = parseInt(params.month, 10);
  const posts = await container.getArchivePosts.execute(year, month);

  if (posts.length === 0) notFound();

  const monthName = new Date(year, month - 1, 1).toLocaleString("es-ES", { month: "long" });

  return (
    <div>
      <nav className="mb-6">
        <Link href="/archive" className="text-brand-cyan hover:text-brand-pink">
          ← Volver al archivo
        </Link>
      </nav>
      <h1 className="text-3xl font-bold text-white mb-8 capitalize">
        {monthName} {year}
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}