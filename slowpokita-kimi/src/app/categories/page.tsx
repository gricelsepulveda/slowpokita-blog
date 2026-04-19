import { container } from "@/infrastructure/di/container";
import Link from "next/link";

export const metadata = {
  title: "Categorías | slowpokita",
  description: "Todas las categorías del blog",
};

export default async function CategoriesPage() {
  const categories = await container.getCategories.execute();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Categorías</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
            className="p-6 bg-bg-light rounded-xl hover:bg-brand-cyan/10 transition-colors group"
          >
            <h2 className="text-xl font-bold text-brand-pink group-hover:text-brand-yellow transition-colors">
              {category}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}