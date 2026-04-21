import { getAllPosts, getFeaturedPosts } from './lib/posts';
import PostCard from './components/PostCard';
import Link from 'next/link';

export default async function Home() {
  const [allPosts, featuredPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
  ]);

  const recentPosts = allPosts.slice(0, 5);
  const featured = featuredPosts.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Welcome to <span className="text-secondary">slowpokita</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          A minimalist blog about tech, design, and creative coding. Built with Next.js and hexagonal architecture.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/posts" className="btn btn-primary">
            Browse all posts
          </Link>
          <Link href="/featured" className="btn btn-secondary">
            Featured articles
          </Link>
          <Link href="/categories" className="btn btn-accent">
            Explore categories
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Featured</h2>
            <Link href="/featured" className="text-accent hover:text-secondary font-medium">
              View all featured →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((post) => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-foreground">Recent posts</h2>
          <Link href="/posts" className="text-accent hover:text-secondary font-medium">
            View all posts →
          </Link>
        </div>
        <div className="space-y-8">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">Categories</h3>
          <p className="text-muted mb-4">
            Explore posts by topic. From software architecture to UI design.
          </p>
          <Link href="/categories" className="btn btn-primary">
            Browse categories
          </Link>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">Archive</h3>
          <p className="text-muted mb-4">
            Navigate through past posts by year and month. Rediscover old gems.
          </p>
          <Link href="/archive" className="btn btn-secondary">
            Explore archive
          </Link>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">Search</h3>
          <p className="text-muted mb-4">
            Find exactly what you're looking for. Search by title, tags, or category.
          </p>
          <Link href="/posts" className="btn btn-accent">
            Start searching
          </Link>
        </div>
      </section>
    </div>
  );
}