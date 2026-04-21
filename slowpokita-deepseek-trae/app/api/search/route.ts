import { NextRequest, NextResponse } from 'next/server';
import { JsonPostRepository } from '../../../src/infrastructure/repositories/JsonPostRepository';
import { SearchPostsUseCase } from '../../../src/application/useCases/SearchPostsUseCase';
import path from 'path';

const dataPath = path.join(process.cwd(), 'content', 'posts.json');
const repository = new JsonPostRepository(dataPath);
const searchUseCase = new SearchPostsUseCase(repository);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  
  try {
    const results = await searchUseCase.execute(query);
    
    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results: results.map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        category: post.category,
        hashtags: post.hashtags,
        excerpt: post.excerpt,
        date: post.date,
      })),
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}