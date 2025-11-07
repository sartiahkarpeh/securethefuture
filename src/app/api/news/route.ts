import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { adminDB, COLLECTIONS } from '@/lib/firestore-helpers';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * GET /api/news
 * Get all news articles with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const published = searchParams.get('published') !== 'false'; // Default to published only

    const skip = (page - 1) * limit;

    // Build Firestore query
    let query: any = adminDB.collection(COLLECTIONS.NEWS_ARTICLES);
    
    // Filter by published status
    if (published) {
      query = query.where('published', '==', true);
    }

    // Filter by category
    if (category) {
      query = query.where('category', '==', category);
    }

    // Filter by featured
    if (featured !== null && featured === 'true') {
      query = query.where('featured', '==', true);
    }

    // Order by published date
    query = query.orderBy('publishedAt', 'desc');

    // Execute query
    const snapshot = await query.get();
    
    // Convert to array and apply search filter (client-side for text search)
    let articles = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      publishedAt: doc.data().publishedAt?.toDate?.()?.toISOString() || null,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
    }));

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      articles = articles.filter((article: any) => {
        return (
          article.title?.toLowerCase().includes(searchLower) ||
          article.excerpt?.toLowerCase().includes(searchLower) ||
          article.content?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Get total count
    const total = articles.length;

    // Apply pagination
    const paginatedArticles = articles.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      data: paginatedArticles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/news
 * Create a new news article (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication and role
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (user.role !== 'ADMIN' && user.role !== 'EDITOR') {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      image,
      authorName,
      readTime,
      featured,
      published,
      tagIds,
    } = body;

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingArticle = await adminDB
      .collection(COLLECTIONS.NEWS_ARTICLES)
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (!existingArticle.empty) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 400 }
      );
    }

    // Prepare article data
    const now = Timestamp.now();
    const articleData: any = {
      title,
      slug,
      excerpt,
      content,
      category,
      image: image || '/images/news/default.jpg',
      readTime: readTime || '5 min read',
      featured: featured || false,
      published: published || false,
      publishedAt: published ? now : now,
      authorId: user.id,
      authorName: authorName || user.name || user.email,
      authorEmail: user.email,
      tagIds: tagIds || [],
      createdAt: now,
      updatedAt: now,
    };

    // Create news article
    const docRef = await adminDB
      .collection(COLLECTIONS.NEWS_ARTICLES)
      .add(articleData);

    const article = {
      id: docRef.id,
      ...articleData,
      publishedAt: articleData.publishedAt.toDate().toISOString(),
      createdAt: articleData.createdAt.toDate().toISOString(),
      updatedAt: articleData.updatedAt.toDate().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: article,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    );
  }
}
