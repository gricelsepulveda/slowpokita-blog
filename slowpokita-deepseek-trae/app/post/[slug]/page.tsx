import { getPostBySlug } from '../../lib/posts';
import PostContent from '../../components/PostContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.hashtags,
    authors: [{ name: 'slowpokita' }],
    openGraph: {
      type: 'article',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.date,
      tags: post.hashtags,
      images: post.ogImage ? [{ url: post.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.ogImage ? [post.ogImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-12">
        <nav className="text-sm text-muted mb-4">
          <Link href="/posts" className="hover:text-accent">
            Posts
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${post.category}`} className="hover:text-accent">
            {post.category}
          </Link>
          <span className="mx-2">/</span>
          <span>{post.title}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {post.title}
        </h1>
        {post.subtitle && (
          <h2 className="text-2xl text-muted mb-6">{post.subtitle}</h2>
        )}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <time dateTime={post.date} className="text-muted">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="text-muted">•</span>
          <span className="text-muted">{post.readingTime} min read</span>
          <span className="text-muted">•</span>
          <Link
            href={`/category/${post.category}`}
            className="tag hover:bg-border hover:text-foreground"
          >
            {post.category}
          </Link>
          {post.highlighted && (
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        {post.coverImage && (
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </header>

      <div className="mb-12">
        <PostContent post={post} />
      </div>

      <footer className="border-t border-border pt-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {post.hashtags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <Link
            href="/posts"
            className="btn btn-secondary"
          >
            ← Back to all posts
          </Link>
          <Link
            href={`/category/${post.category}`}
            className="btn btn-accent"
          >
            More in {post.category} →
          </Link>
        </div>
      </footer>
    </article>
  );
}