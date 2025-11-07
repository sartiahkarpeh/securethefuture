import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/auth';

/**
 * GET /api/tags
 * Get all tags
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeCount = searchParams.get('includeCount') === 'true';

    if (includeCount) {
      // Get tags with usage count
      const tags = await prisma.tag.findMany({
        include: {
          _count: {
            select: {
              newsArticles: true,
              events: true,
              resources: true,
              mediaItems: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      // Transform to flatten count
      const transformedTags = tags.map(tag => ({
        ...tag,
        usageCount: 
          tag._count.newsArticles +
          tag._count.events +
          tag._count.resources +
          tag._count.mediaItems,
        breakdown: {
          news: tag._count.newsArticles,
          events: tag._count.events,
          resources: tag._count.resources,
          media: tag._count.mediaItems,
        },
      }));

      return NextResponse.json({ tags: transformedTags });
    }

    // Simple tag list without counts
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tags
 * Create a new tag (admin/editor only)
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
    const { name, slug, description } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if tag already exists
    const existingTag = await prisma.tag.findUnique({
      where: { slug },
    });

    if (existingTag) {
      return NextResponse.json(
        { error: 'A tag with this slug already exists' },
        { status: 400 }
      );
    }

    // Create tag
    const tag = await prisma.tag.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { error: 'Failed to create tag' },
      { status: 500 }
    );
  }
}
