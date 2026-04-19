import { JsonPostRepository } from '@infrastructure/repositories/json-post-repository';
import { GetPostBySlugUseCase } from '@application/use-cases/post-use-cases';
import PostContent from '@presentation/components/posts/post-content';
import MainLayout from '@presentation/components/layout/main-layout';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const repository = new JsonPostRepository();
  const getPostUseCase = new GetPostBySlugUseCase(repository);
  const post = await getPostUseCase.execute(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.date), 'dd MMMM yyyy', { locale: es });

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/posts"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver a todos los posts
        </Link>

        <article className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="inline-flex items-center space-x-1 text-sm text-gray-400">
                <Calendar size={14} />
                <span>{formattedDate}</span>
              </span>
              <span className="inline-flex items-center space-x-1 text-sm text-gray-400">
                <Clock size={14} />
                <span>{post.readingTime} min de lectura</span>
              </span>
              <span className="inline-block px-3 py-1 bg-[#0ABDC6]/20 text-[#0ABDC6] rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            {post.subtitle && (
              <p className="text-xl text-gray-300 mb-6">{post.subtitle}</p>
            )}

            <div className="flex flex-wrap gap-2">
              {post.hashtags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 text-sm text-gray-500"
                >
                  <Tag size={12} />
                  <span>#{tag}</span>
                </span>
              ))}
            </div>
          </header>

          {post.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <div 
                className="h-64 md:h-96 bg-gradient-to-br from-[#FF2E97]/20 to-[#0ABDC6]/20"
                style={{
                  backgroundImage: `url(${post.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <PostContent
              content={post.content}
              images={post.images}
              assetsPath={post.assetsPath}
            />
          </div>

          <footer className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400">
              Publicado el {formattedDate} en la categoría {post.category}.
            </p>
          </footer>
        </article>
      </div>
    </MainLayout>
  );
}