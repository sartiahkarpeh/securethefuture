import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/auth';

/**
 * GET /api/tags/[slug]
 * Get a single tag by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const tag = await prisma.tag.findUnique({
      where: { slug },
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
    });

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Transform to flatten count
    const transformedTag = {
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
    };

    return NextResponse.json(transformedTag);
  } catch (error) {
    console.error('Error fetching tag:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tag' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/tags/[slug]
 * Update a tag (admin/editor only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const authResponse = await requireAuth(request);
    if (authResponse) return authResponse;

    // Check if user is admin or editor
    const roleResponse = await requireRole(request, ['ADMIN', 'EDITOR']);
    if (roleResponse) return roleResponse;

    const { slug } = params;
    const body = await request.json();
    const { name, newSlug, description } = body;

    // Find existing tag
    const existingTag = await prisma.tag.findUnique({
      where: { slug },
    });

    if (!existingTag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    // If changing slug, check if new slug exists
    if (newSlug && newSlug !== slug) {
      const slugExists = await prisma.tag.findUnique({
        where: { slug: newSlug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'A tag with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update tag
    const tag = await prisma.tag.update({
      where: { slug },
      data: {
        ...(name && { name }),
        ...(newSlug && { slug: newSlug }),
        description: description !== undefined ? description : undefined,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tags/[slug]
 * Delete a tag (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const authResponse = await requireAuth(request);
    if (authResponse) return authResponse;

    // Only admins can delete tags
    const roleResponse = await requireRole(request, ['ADMIN']);
    if (roleResponse) return roleResponse;

    const { slug } = params;

    // Check if tag exists
    const tag = await prisma.tag.findUnique({
      where: { slug },
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
    });

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Check if tag is in use
    const usageCount = 
      tag._count.newsArticles +
      tag._count.events +
      tag._count.resources +
      tag._count.mediaItems;

    if (usageCount > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete tag. It is currently used by ${usageCount} item(s)`,
          usageCount,
          breakdown: {
            news: tag._count.newsArticles,
            events: tag._count.events,
            resources: tag._count.resources,
            media: tag._count.mediaItems,
          },
        },
        { status: 400 }
      );
    }

    // Delete tag
    await prisma.tag.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Tag deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
}
