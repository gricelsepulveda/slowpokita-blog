import { MetadataRoute } from 'next'
import { JsonPostRepository } from '@/infrastructure/repositories/JsonPostRepository'
import { siteConfig } from '@/infrastructure/config/siteConfig'

const repo = new JsonPostRepository()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await repo.getAllPosts()
  const postEntries = posts.map((p) => ({
    url: `${siteConfig.url}/post/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: p.highlighted ? 0.9 : 0.7,
  }))

  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteConfig.url}/featured`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteConfig.url}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteConfig.url}/archive`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...postEntries,
  ]
}
