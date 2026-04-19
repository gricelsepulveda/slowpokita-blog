import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { postUseCases } from "@/infrastructure/container";
import { PostContent } from "@/presentation/components/PostContent";
import { siteConfig } from "@/config/site";

interface Params { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await postUseCases.getBySlug(slug);
  if (!post) return {};
  const title = post.seo?.seoTitle ?? post.title;
  const description = post.seo?.seoDescription ?? post.excerpt;
  const image = post.seo?.ogImage ?? (post.coverImage ? `/content/posts/${post.slug}/${post.coverImage}` : undefined);
  return {
    title,
    description,
    alternates: { canonical: `/post/${post.slug}` },
    openGraph: {
      type: "article",
      title, description,
      url: `${siteConfig.url}/post/${post.slug}`,
      images: image ? [image] : undefined,
      publishedTime: post.date
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined }
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await postUseCases.getBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.name },
    articleSection: post.category,
    keywords: post.hashtags.join(", "),
    description: post.excerpt,
    mainEntityOfPage: `${siteConfig.url}/post/${post.slug}`
  };

  return (
    <article className="article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>{post.title}</h1>
      {post.subtitle && <p className="subtitle">{post.subtitle}</p>}
      <div className="meta">
        {new Date(post.date).toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" })}
        {" - "}{post.category}{" - "}{post.readingTime} min de lectura
      </div>
      <PostContent post={post} />
    </article>
  );
}
