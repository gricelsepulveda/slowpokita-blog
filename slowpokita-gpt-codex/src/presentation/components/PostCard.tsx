import Link from "next/link";
import type { Post } from "@/domain/post";

function resolveCover(post: Post): string | null {
  if (!post.coverImage) return null;
  if (post.coverImage.startsWith("/") || post.coverImage.startsWith("http")) return post.coverImage;
  return `/content/posts/${post.slug}/${post.coverImage}`;
}

export function PostCard({ post }: { post: Post }) {
  const cover = resolveCover(post);
  return (
    <article className="card">
      {cover && <div className="cover" style={{ backgroundImage: `url(${cover})` }} />}
      <div className="body">
        <div className="meta">
          <span>{new Date(post.date).toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span>{post.category}</span>
          <span>{post.readingTime} min</span>
          {post.highlighted && <span className="badge-featured">Destacado</span>}
        </div>
        <h2><Link href={`/post/${post.slug}`}>{post.title}</Link></h2>
        {post.subtitle && <p className="excerpt">{post.subtitle}</p>}
        <p className="excerpt">{post.excerpt}</p>
        <div className="tags">
          {post.hashtags.map(h => <span key={h} className="tag">#{h}</span>)}
        </div>
      </div>
    </article>
  );
}
