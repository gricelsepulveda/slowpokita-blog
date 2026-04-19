import type { MetadataRoute } from "next";
import { postUseCases } from "@/infrastructure/container";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await postUseCases.listPosts(1);
  const all = [...posts.items];
  const base = siteConfig.url;
  return [
    { url: `${base}/`, changeFrequency: "weekly" },
    { url: `${base}/posts`, changeFrequency: "weekly" },
    { url: `${base}/featured`, changeFrequency: "weekly" },
    { url: `${base}/categories`, changeFrequency: "monthly" },
    { url: `${base}/archive`, changeFrequency: "monthly" },
    ...all.map(p => ({ url: `${base}/post/${p.slug}`, lastModified: p.date }))
  ];
}
