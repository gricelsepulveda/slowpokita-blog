import { JsonPostRepository } from '@infrastructure/repositories/json-post-repository';
import { GetCategoriesUseCase } from '@application/use-cases/post-use-cases';
import MainLayout from '@presentation/components/layout/main-layout';
import Link from 'next/link';
import { Folder } from 'lucide-react';

export default async function CategoriesPage() {
  const repository = new JsonPostRepository();
  const getCategoriesUseCase = new GetCategoriesUseCase(repository);
  const categories = await getCategoriesUseCase.execute();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-[#0ABDC6] to-[#FF2E97] rounded-xl">
              <Folder size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Categorías</h1>
              <p className="text-gray-400">
                Explorar posts por temas específicos.
              </p>
            </div>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay categorías disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#0ABDC6]/30 hover:shadow-2xl hover:shadow-[#0ABDC6]/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold group-hover:text-[#0ABDC6] transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                    {category.count} {category.count === 1 ? 'post' : 'posts'}
                  </span>
                </div>
                <p className="text-gray-400">
                  Explora todos los posts sobre {category.name.toLowerCase()}.
                </p>
                <div className="mt-4 flex items-center text-[#0ABDC6] group-hover:text-[#FFD402] font-medium">
                  Ver posts
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}