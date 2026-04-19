import { JsonPostRepository } from '@infrastructure/repositories/json-post-repository';
import { GetArchiveMonthsUseCase } from '@application/use-cases/post-use-cases';
import MainLayout from '@presentation/components/layout/main-layout';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default async function ArchivePage() {
  const repository = new JsonPostRepository();
  const getArchiveMonthsUseCase = new GetArchiveMonthsUseCase(repository);
  const archiveMonths = await getArchiveMonthsUseCase.execute();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-[#FF2E97] to-[#FFD402] rounded-xl">
              <Calendar size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Archivo</h1>
              <p className="text-gray-400">
                Explorar posts por fecha de publicación.
              </p>
            </div>
          </div>
        </div>

        {archiveMonths.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay posts en el archivo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archiveMonths.map((month) => (
              <Link
                key={`${month.year}-${month.month}`}
                href={`/archive/${month.year}/${month.month}`}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#FF2E97]/30 hover:shadow-2xl hover:shadow-[#FF2E97]/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold group-hover:text-[#FF2E97] transition-colors">
                    {month.monthName} {month.year}
                  </h3>
                  <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                    {month.count} {month.count === 1 ? 'post' : 'posts'}
                  </span>
                </div>
                <p className="text-gray-400">
                  Posts publicados en {month.monthName.toLowerCase()} de {month.year}.
                </p>
                <div className="mt-4 flex items-center text-[#FF2E97] group-hover:text-[#FFD402] font-medium">
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