import { postUseCases } from "@/infrastructure/container";
import { PostCard } from "@/presentation/components/PostCard";
import { Pagination } from "@/presentation/components/Pagination";

export const metadata = { title: "Posts" };

export default async function PostsPage() {
  const data = await postUseCases.listPosts(1);
  return (
    <section>
      <h1>Ultimos posts</h1>
      <div className="grid">
        {data.items.map(p => <PostCard key={p.id} post={p} />)}
      </div>
      <Pagination page={data.page} totalPages={data.totalPages} basePath="/posts" />
    </section>
  );
}
