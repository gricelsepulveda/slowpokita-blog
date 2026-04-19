import { container } from "@/infrastructure/di/container";
import { PostContent } from "@/presentation/components/PostContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await container.getPostBySlug.execute(params.slug);
  if (!post) return { title: "Post no encontrado" };

  return {
    title: post.seoTitle || `${post.title} | slowpokita`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.ogImage ? [`/${post.assetsPath}/${post.ogImage}`] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await container.getPostBySlug.execute(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto">
      <nav className="mb-6">
        <Link href="/posts" className="text-brand-cyan hover:text-brand-pink">
          ← Volver a posts
        </Link>
      </nav>
      
      {post.coverImage && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8">
          <img
            src={`/${post.assetsPath}/${post.coverImage}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-3 text-sm text-brand-cyan mb-4">
        <span className="px-3 py-1 rounded-full bg-brand-cyan/10">
          {post.category}
        </span>
        <span>{new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</span>
        <span>• {post.readingTime}</span>
      </div>

      <h1 className="text-4xl font-bold text-white mb-2">{post.title}</h1>
      {post.subtitle && (
        <p className="text-xl text-gray-400 mb-6">{post.subtitle}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {post.hashtags.map((tag) => (
          <span
            key={tag}
            className="text-sm px-3 py-1 rounded-full bg-brand-pink/20 text-brand-pink"
          >
            #{tag}
          </span>
        ))}
      </div>

      <PostContent post={post} />
    </article>
  );
}