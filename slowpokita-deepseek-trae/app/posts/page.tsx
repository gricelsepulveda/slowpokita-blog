import { getAllPosts, searchPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { Post } from '../../src/domain/models/post';
import { Metadata } from 'next';

const POSTS_PER_PAGE = 10;

interface PostsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PostsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchQuery = params.search;
  const title = searchQuery ? `Search: "${searchQuery}" | slowpokita` : 'All posts | slowpokita';
  const description = searchQuery
    ? `Search results for "${searchQuery}"`
    : 'Browse all blog posts about tech, design, and creative coding.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));
  const searchQuery = params.search || '';

  const allPosts = searchQuery
    ? await searchPosts(searchQuery)
    : await getAllPosts();

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIdx, endIdx);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">All posts</h1>
          <p className="text-muted mt-2">
            {searchQuery
              ? `Found ${allPosts.length} posts matching "${searchQuery}"`
              : `Browse all ${allPosts.length} posts`}
          </p>
        </div>
        <div className="w-full md:w-64">
          <SearchBar />
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-2xl font-bold text-primary mb-4">No posts found</h3>
          <p className="text-muted">
            {searchQuery
              ? `No posts match "${searchQuery}". Try a different search term.`
              : 'No posts available yet.'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/posts"
            />
          )}
        </>
      )}
    </div>
  );
}