import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { adminDB, COLLECTIONS } from '@/lib/firestore-helpers';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * GET /api/news/[slug]
 * Get a single news article by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Find article by slug
    const snapshot = await adminDB
      .collection(COLLECTIONS.NEWS_ARTICLES)
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const articleData = doc.data();
    
    const article: any = {
      id: doc.id,
      ...articleData,
      publishedAt: articleData.publishedAt?.toDate?.()?.toISOString() || null,
      createdAt: articleData.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: articleData.updatedAt?.toDate?.()?.toISOString() || null,
    };

    // Only return published articles to non-authenticated users
    const user = await getUserFromRequest(request);
    if (!articleData.published && (!user || (user.role !== 'ADMIN' && user.role !== 'EDITOR'))) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news article' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/news/[slug]
 * Update a news article (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
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

    const { slug } = params;
    const body = await request.json();

    // Find existing article
    const snapshot = await adminDB
      .collection(COLLECTIONS.NEWS_ARTICLES)
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const existingData = doc.data();

    // If slug is being changed, check for conflicts
    if (body.slug && body.slug !== slug) {
      const slugConflict = await adminDB
        .collection(COLLECTIONS.NEWS_ARTICLES)
        .where('slug', '==', body.slug)
        .limit(1)
        .get();

      if (!slugConflict.empty) {
        return NextResponse.json(
          { error: 'Article with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: Timestamp.now(),
    };

    if (body.title) updateData.title = body.title;
    if (body.slug) updateData.slug = body.slug;
    if (body.excerpt) updateData.excerpt = body.excerpt;
    if (body.content) updateData.content = body.content;
    if (body.category) updateData.category = body.category;
    if (body.image) updateData.image = body.image;
    if (body.authorName !== undefined) updateData.authorName = body.authorName || user.name || user.email;
    if (body.readTime) updateData.readTime = body.readTime;
    if (typeof body.featured !== 'undefined') updateData.featured = body.featured;
    
    if (typeof body.published !== 'undefined') {
      updateData.published = body.published;
      // If publishing for the first time
      if (body.published && !existingData.published) {
        updateData.publishedAt = Timestamp.now();
      }
    }
    
    if (body.tagIds) updateData.tagIds = body.tagIds;

    // Update article
    await doc.ref.update(updateData);

    // Get updated article
    const updatedDoc = await doc.ref.get();
    const updatedData = updatedDoc.data();

    const article = {
      id: updatedDoc.id,
      ...updatedData,
      publishedAt: updatedData?.publishedAt?.toDate?.()?.toISOString() || null,
      createdAt: updatedData?.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: updatedData?.updatedAt?.toDate?.()?.toISOString() || null,
    };

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error updating news article:', error);
    return NextResponse.json(
      { error: 'Failed to update news article' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/news/[slug]
 * Delete a news article (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Only admins can delete articles' },
        { status: 403 }
      );
    }

    const { slug } = params;

    // Check if article exists
    const snapshot = await adminDB
      .collection(COLLECTIONS.NEWS_ARTICLES)
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete article
    await snapshot.docs[0].ref.delete();

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json(
      { error: 'Failed to delete news article' },
      { status: 500 }
    );
  }
}
