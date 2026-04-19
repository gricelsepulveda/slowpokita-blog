import { JsonPostRepository } from '@infrastructure/repositories/json-post-repository';
import { GetPostsUseCase } from '@application/use-cases/post-use-cases';
import PostCard from '@presentation/components/posts/post-card';
import Pagination from '@presentation/components/ui/pagination';
import MainLayout from '@presentation/components/layout/main-layout';
import { notFound } from 'next/navigation';

export default async function PostsPaginationPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const resolvedParams = await params;
  const currentPage = parseInt(resolvedParams.page);
  const pageSize = 10;

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const repository = new JsonPostRepository();
  const getPostsUseCase = new GetPostsUseCase(repository);
  const result = await getPostsUseCase.execute(currentPage, pageSize);

  if (currentPage > result.totalPages && result.totalPages > 0) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Todos los Posts</h1>
          <p className="text-gray-400">
            Página {currentPage} de {result.totalPages} • {result.total} artículos
          </p>
        </div>

        {result.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay posts disponibles.</p>
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
              basePath="/posts"
              hasNext={result.hasNext}
              hasPrev={result.hasPrev}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
}