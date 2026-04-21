import { getPostsByYearMonth } from '../../../lib/posts';
import PostCard from '../../../components/PostCard';
import { notFound } from 'next/navigation';
import { Post } from '../../../../src/domain/models/post';

interface ArchiveMonthPageProps {
  params: Promise<{ year: string; month: string }>;
}

export default async function ArchiveMonthPage({ params }: ArchiveMonthPageProps) {
  const resolvedParams = await params;
  const year = parseInt(resolvedParams.year, 10);
  const month = parseInt(resolvedParams.month, 10);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    notFound();
  }

  const posts = await getPostsByYearMonth(year, month);
  const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          Archive: {monthName} {year}
        </h1>
        <p className="text-muted mt-2">
          {posts.length} post{posts.length !== 1 ? 's' : ''} published in {monthName} {year}.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}