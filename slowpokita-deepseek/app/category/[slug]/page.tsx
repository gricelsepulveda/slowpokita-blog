import { JsonPostRepository } from '@infrastructure/repositories/json-post-repository';
import { GetCategoryPostsUseCase } from '@application/use-cases/post-use-cases';
import PostCard from '@presentation/components/posts/post-card';
import Pagination from '@presentation/components/ui/pagination';
import MainLayout from '@presentation/components/layout/main-layout';
import { notFound } from 'next/navigation';
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1');
  const pageSize = 10;

  const repository = new JsonPostRepository();
  const getCategoryPostsUseCase = new GetCategoryPostsUseCase(repository);
  const result = await getCategoryPostsUseCase.execute(resolvedParams.slug, currentPage, pageSize);

  if (result.items.length === 0) {
    notFound();
  }
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Categoría: {resolvedParams.slug}</h1>
          <p className="text-gray-400">
            Posts en la categoría {resolvedParams.slug}.
          </p>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.items.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
                </div>

        <Pagination
          currentPage={currentPage}
          totalPages={result.totalPages}
          basePath={`/category/${resolvedParams.slug}`}
          hasNext={result.hasNext}
          hasPrev={result.hasPrev}
        />
                </div>
    </MainLayout>
  );
}