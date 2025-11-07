import { NextRequest, NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import { requireAuth, requireRole } from '@/lib/auth';
import { COLLECTIONS, createDoc } from '@/lib/firestore-helpers';

/**
 * GET /api/resources
 * Get all resources with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search') || '';
    const published = searchParams.get('published') !== 'false'; // Default to true

    const skip = (page - 1) * limit;

    // Build Firestore query
    let query = adminDB.collection(COLLECTIONS.RESOURCES)
      .where('published', '==', published);

    if (category) {
      query = query.where('category', '==', category);
    }

    if (type) {
      query = query.where('type', '==', type);
    }

    if (featured !== null && featured === 'true') {
      query = query.where('featured', '==', true);
    }

    // Order by creation date (index now created)
    query = query.orderBy('createdAt', 'desc');

    // Execute query
    const snapshot = await query.get();
    
    // Convert to array and apply search filter (client-side for text search)
    let resources = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
    }));

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      resources = resources.filter((resource: any) => {
        return (
          resource.title?.toLowerCase().includes(searchLower) ||
          resource.description?.toLowerCase().includes(searchLower) ||
          resource.author?.toLowerCase().includes(searchLower) ||
          resource.publisher?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Get total count before pagination
    const total = resources.length;

    // Apply pagination
    const paginatedResources = resources.slice(skip, skip + limit);

    return NextResponse.json({
      resources: paginatedResources,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/resources
 * Create a new resource (admin/editor only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await requireAuth(request);
    if (authResponse) return authResponse;

    // Check if user is admin or editor
    const roleResponse = await requireRole(request, ['ADMIN', 'EDITOR']);
    if (roleResponse) return roleResponse;

    const body = await request.json();
    const {
      title,
      slug,
      category,
      type,
      description,
      url,
      fileUrl,
      image,
      featured,
      published,
      tags,
      creatorId,
      author,
      publisher,
      duration,
      downloads,
    } = body;

    // Validate required fields
    if (!title || !slug || !category || !type || !description) {
      return NextResponse.json(
        { error: 'Title, slug, category, type, and description are required' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = [
      'HELPLINES',
      'TREATMENT',
      'SUPPORT_GROUPS',
      'EDUCATION',
      'RECOVERY',
      'FAMILY',
      'PROFESSIONAL',
      'PREVENTION',
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = [
      'PDF',
      'VIDEO',
      'AUDIO',
      'ARTICLE',
      'EXTERNAL_LINK',
      'TOOL',
      'INFOGRAPHIC',
    ];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingSnapshot = await adminDB.collection(COLLECTIONS.RESOURCES)
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (!existingSnapshot.empty) {
      return NextResponse.json(
        { error: 'A resource with this slug already exists' },
        { status: 400 }
      );
    }

    // Create resource
    const resourceData = {
      title,
      slug,
      category,
      type,
      description,
      url: url || null,
      fileUrl: fileUrl || null,
      image: image || null,
      author: author || null,
      publisher: publisher || null,
      duration: duration || null,
      downloads: downloads || 0,
      creatorId,
      featured: featured || false,
      published: published || false,
      tags: tags || [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const resourceId = await createDoc(COLLECTIONS.RESOURCES, resourceData);

    return NextResponse.json(
      { id: resourceId, ...resourceData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}
