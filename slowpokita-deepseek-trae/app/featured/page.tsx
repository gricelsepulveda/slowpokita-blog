import { getFeaturedPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import { Post } from '../../src/domain/models/post';
import { Metadata } from 'next';

const POSTS_PER_PAGE = 10;

interface FeaturedPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Featured posts | slowpokita',
    description: 'Handpicked articles worth highlighting. Curated collection of the best content.',
    openGraph: {
      title: 'Featured posts | slowpokita',
      description: 'Handpicked articles worth highlighting. Curated collection of the best content.',
    },
  };
}

export default async function FeaturedPage({ searchParams }: FeaturedPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));

  const allFeatured = await getFeaturedPosts();
  const totalPages = Math.ceil(allFeatured.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const posts = allFeatured.slice(startIdx, endIdx);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Featured posts</h1>
        <p className="text-muted mt-2">
          Handpicked articles worth highlighting. {allFeatured.length} featured posts.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-2xl font-bold text-primary mb-4">No featured posts yet</h3>
          <p className="text-muted">Check back later for highlighted content.</p>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/featured"
            />
          )}
        </>
      )}
    </div>
  );
}