import { getPostsByCategory } from '../../../lib/posts';
import PostCard from '../../../components/PostCard';
import Pagination from '../../../components/Pagination';
import { notFound } from 'next/navigation';
import { Post } from '../../../../src/domain/models/post';

const POSTS_PER_PAGE = 10;

interface CategoryPageProps {
  params: Promise<{ slug: string; page: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = decodeURIComponent(resolvedParams.slug);
  const currentPage = Math.max(1, parseInt(resolvedParams.page, 10));

  const allPosts = await getPostsByCategory(category);
  if (allPosts.length === 0) {
    notFound();
  }

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIdx, endIdx);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Category: {category}</h1>
        <p className="text-muted mt-2">
          {allPosts.length} post{allPosts.length !== 1 ? 's' : ''} in this category.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/category/${encodeURIComponent(category)}`}
        />
      )}
    </div>
  );
}