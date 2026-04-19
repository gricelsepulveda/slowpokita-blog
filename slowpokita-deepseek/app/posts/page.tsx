import { JsonPostRepository } from '@infrastructure/repositories/json-post-repository';
import { GetPostsUseCase } from '@application/use-cases/post-use-cases';
import PostCard from '@presentation/components/posts/post-card';
import Pagination from '@presentation/components/ui/pagination';
import MainLayout from '@presentation/components/layout/main-layout';

export default async function PostsPage({
  params,
}: {
  params: Promise<{ page?: string }>
}) {
  const resolvedParams = await params;
  const currentPage = parseInt(resolvedParams.page || '1');
  const pageSize = 10;

  const repository = new JsonPostRepository();
  const getPostsUseCase = new GetPostsUseCase(repository);
  const result = await getPostsUseCase.execute(currentPage, pageSize);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Todos los Posts</h1>
          <p className="text-gray-400">
            Explorar {result.total} artículos sobre desarrollo web, arquitectura de software y diseño.
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