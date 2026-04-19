import { container } from "@/infrastructure/di/container";
import Link from "next/link";

export const metadata = {
  title: "Archivo | slowpokita",
  description: "Archivo histórico de posts",
};

export default async function ArchivePage() {
  const archive = await container.getArchive.execute();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Archivo</h1>
      <div className="space-y-8">
        {archive.map((year) => (
          <div key={year.year} className="bg-bg-light rounded-xl p-6">
            <h2 className="text-2xl font-bold text-brand-pink mb-4">{year.year}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {year.months.map((month) => (
                <Link
                  key={month.month}
                  href={`/archive/${year.year}/${String(month.month).padStart(2, "0")}`}
                  className="p-3 bg-bg rounded-lg text-center hover:bg-brand-cyan/20 transition-colors"
                >
                  <div className="text-brand-cyan font-bold">{month.monthName}</div>
                  <div className="text-xs text-gray-400">{month.posts.length} posts</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}