import Link from "next/link";
import { PostDTO } from "@/application/dto/PostDTO";

interface PostCardProps {
  post: PostDTO;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-bg-light rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      {post.coverImage && (
        <Link href={`/post/${post.slug}`}>
          <div className="aspect-video overflow-hidden">
            <img
              src={`/${post.assetsPath}/${post.coverImage}`}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-brand-cyan mb-3">
          <span>{post.category}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <Link href={`/post/${post.slug}`}>
          <h2 className="text-xl font-bold text-white mb-2 hover:text-brand-pink transition-colors">
            {post.title}
          </h2>
        </Link>
        {post.subtitle && (
          <p className="text-gray-400 text-sm mb-3">{post.subtitle}</p>
        )}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.hashtags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-brand-pink/20 text-brand-pink"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}