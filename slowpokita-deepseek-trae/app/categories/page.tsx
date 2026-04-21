import { getAllPosts } from '../lib/posts';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | slowpokita',
  description: 'Browse posts by topic. Explore software architecture, design, web development, and more.',
  openGraph: {
    title: 'Categories | slowpokita',
    description: 'Browse posts by topic. Explore software architecture, design, web development, and more.',
  },
};

export default async function CategoriesPage() {
  const posts = await getAllPosts();
  const categoryMap = new Map<string, number>();
  posts.forEach((post) => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
  });
  const categories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Categories</h1>
        <p className="text-muted mt-2">
          Browse posts by topic. {categories.length} categories in total.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/category/${encodeURIComponent(cat.name)}`}
            className="card hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-2xl font-bold text-primary mb-2">{cat.name}</h3>
            <p className="text-muted">
              {cat.count} post{cat.count !== 1 ? 's' : ''}
            </p>
            <div className="mt-4 text-accent font-medium">
              Explore →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}