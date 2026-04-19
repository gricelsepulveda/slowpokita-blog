import { JsonPostRepository } from '@infrastructure/repositories/json-post-repository';
import { GetFeaturedPostsUseCase } from '@application/use-cases/post-use-cases';
import PostCard from '@presentation/components/posts/post-card';
import Pagination from '@presentation/components/ui/pagination';
import MainLayout from '@presentation/components/layout/main-layout';
import { Star } from 'lucide-react';

export default async function FeaturedPage({
  params,
}: {
  params: Promise<{ page?: string }>
}) {
  const resolvedParams = await params;
  const currentPage = parseInt(resolvedParams.page || '1');
  const pageSize = 10;

  const repository = new JsonPostRepository();
  const getFeaturedUseCase = new GetFeaturedPostsUseCase(repository);
  const result = await getFeaturedUseCase.execute(currentPage, pageSize);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-[#FFD402] to-[#FF2E97] rounded-xl">
              <Star size={24} className="text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Posts Destacados</h1>
              <p className="text-gray-400">
                Los mejores artículos seleccionados manualmente.
              </p>
            </div>
          </div>
        </div>

        {result.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay posts destacados disponibles.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.items.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={result.totalPages}
              basePath="/featured"
              hasNext={result.hasNext}
              hasPrev={result.hasPrev}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
}