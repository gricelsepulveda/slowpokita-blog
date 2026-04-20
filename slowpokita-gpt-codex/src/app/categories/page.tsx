import Link from "next/link";
import { postUseCases } from "@/infrastructure/container";

export const metadata = { title: "Categorias" };

export default async function CategoriesPage() {
  const cats = await postUseCases.listCategories();
  return (
    <section>
      <h1>Categorias</h1>
      <div className="category-list">
        {cats.map(c => (
          <Link key={c.slug} href={`/category/${c.slug}`}>{c.name} ({c.count})</Link>
        ))}
      </div>
    </section>
  );
}
