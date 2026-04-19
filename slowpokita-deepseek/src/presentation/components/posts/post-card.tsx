import { PostSummary } from '@domain/entities/post';
import Link from 'next/link';
import { Calendar, Clock, Tag, Star } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PostCardProps {
  post: PostSummary;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = format(new Date(post.date), 'dd MMMM yyyy', { locale: es });

  return (
    <article className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-[#FF2E97]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF2E97]/10">
      {post.highlighted && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center space-x-1 bg-gradient-to-r from-[#FFD402] to-[#FF2E97] text-black px-3 py-1 rounded-full text-sm font-semibold">
            <Star size={14} />
            <span>Destacado</span>
          </div>
        </div>
      )}

      {post.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#FF2E97]/20 to-[#0ABDC6]/20"
            style={{
              backgroundImage: `url(${post.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center space-x-4 mb-3">
          <span className="inline-flex items-center space-x-1 text-sm text-gray-400">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </span>
          <span className="inline-flex items-center space-x-1 text-sm text-gray-400">
            <Clock size={14} />
            <span>{post.readingTime} min</span>
          </span>
        </div>

        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-[#0ABDC6]/20 text-[#0ABDC6] rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2 group-hover:text-[#FF2E97] transition-colors">
          <Link href={`/post/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        {post.subtitle && (
          <p className="text-gray-300 mb-3">{post.subtitle}</p>
        )}

        <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.hashtags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center space-x-1 text-xs text-gray-500"
            >
              <Tag size={12} />
              <span>#{tag}</span>
            </span>
          ))}
          {post.hashtags.length > 3 && (
            <span className="text-xs text-gray-500">+{post.hashtags.length - 3}</span>
          )}
        </div>

        <Link
          href={`/post/${post.slug}`}
          className="inline-flex items-center text-[#FF2E97] hover:text-[#FFD402] font-medium group/link"
        >
          Leer más
          <svg
            className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}