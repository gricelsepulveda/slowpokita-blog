import { Post } from '../../src/domain/models/post';
import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={`card ${featured ? 'highlighted' : ''}`}>
      <div className="flex flex-col md:flex-row gap-6">
        {post.coverImage && (
          <div className="md:w-1/3">
            <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        )}
        <div className={`${post.coverImage ? 'md:w-2/3' : 'w-full'}`}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="tag">{post.category}</span>
            <span className="text-muted text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="text-muted text-sm">• {post.readingTime} min read</span>
            {post.highlighted && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          <Link href={`/post/${post.slug}`}>
            <h2 className="text-2xl font-bold text-foreground hover:text-primary transition-colors mb-2">
              {post.title}
            </h2>
            {post.subtitle && (
              <h3 className="text-lg text-muted mb-3">{post.subtitle}</h3>
            )}
          </Link>
          <p className="text-foreground mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.hashtags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={`/post/${post.slug}`}
            className="inline-flex items-center text-accent font-medium hover:text-secondary"
          >
            Read more
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}