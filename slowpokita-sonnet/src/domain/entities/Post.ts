export interface PostImages {
  [key: string]: string
}

export interface PostSEO {
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
}

export interface Post {
  id: string
  slug: string
  title: string
  subtitle?: string
  date: string
  category: string
  hashtags: string[]
  highlighted: boolean
  readingTime: number
  coverImage?: string
  excerpt: string
  content: string
  assetsPath: string
  images?: PostImages
  seo?: PostSEO
}

export interface PostsData {
  posts: Post[]
}
