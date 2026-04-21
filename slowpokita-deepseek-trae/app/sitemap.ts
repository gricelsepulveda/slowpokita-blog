import { getAllPosts, getAllCategories, getArchiveStats } from './lib/posts';
import { BLOG_TITLE } from './config';

const BASE_URL = 'https://slowpokita.com';

export default async function sitemap() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const archiveStats = await getArchiveStats();

  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/post/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/category/${encodeURIComponent(category)}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const archiveUrls = archiveStats.map(({ year, month }) => ({
    url: `${BASE_URL}/archive/${year}/${month}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const staticUrls = [
    {
      url: BASE_URL,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/posts`,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/featured`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/categories`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/archive`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  return [...staticUrls, ...postUrls, ...categoryUrls, ...archiveUrls];
}