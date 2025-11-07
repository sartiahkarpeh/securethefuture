import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/auth';

/**
 * GET /api/stories/[slug]
 * Get a single story by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

    const where: any = { slug };

    // Only show published stories unless explicitly requested
    if (!includeUnpublished) {
      where.published = true;
    }

    const story = await prisma.story.findFirst({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json(
      { error: 'Failed to fetch story' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/stories/[slug]
 * Update a story (admin/editor only)
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
    const {
      title,
      newSlug,
      type,
      excerpt,
      content,
      storyteller,
      storytellerAge,
      storytellerLocation,
      videoUrl,
      audioUrl,
      thumbnailUrl,
      featured,
      published,
      tagIds,
    } = body;

    // Find existing story
    const existingStory = await prisma.story.findUnique({
      where: { slug },
    });

    if (!existingStory) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    // If changing slug, check if new slug exists
    if (newSlug && newSlug !== slug) {
      const slugExists = await prisma.story.findUnique({
        where: { slug: newSlug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'A story with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Validate type if provided
    if (type) {
      const validTypes = ['VIDEO', 'AUDIO', 'TEXT'];
      if (!validTypes.includes(type)) {
        return NextResponse.json(
          { error: 'Invalid story type. Must be VIDEO, AUDIO, or TEXT' },
          { status: 400 }
        );
      }
    }

    // Update story
    const story = await prisma.story.update({
      where: { slug },
      data: {
        ...(title && { title }),
        ...(newSlug && { slug: newSlug }),
        ...(type && { type }),
        ...(excerpt && { excerpt }),
        content: content !== undefined ? content : undefined,
        storyteller: storyteller !== undefined ? storyteller : undefined,
        storytellerAge: storytellerAge !== undefined ? storytellerAge : undefined,
        storytellerLocation: storytellerLocation !== undefined ? storytellerLocation : undefined,
        videoUrl: videoUrl !== undefined ? videoUrl : undefined,
        audioUrl: audioUrl !== undefined ? audioUrl : undefined,
        thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : undefined,
        featured: featured !== undefined ? featured : undefined,
        published: published !== undefined ? published : undefined,
        ...(tagIds !== undefined && {
          tags: {
            deleteMany: {},
            create: tagIds.map((tagId: string) => ({
              tag: { connect: { id: tagId } },
            })),
          },
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(story);
  } catch (error) {
    console.error('Error updating story:', error);
    return NextResponse.json(
      { error: 'Failed to update story' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/stories/[slug]
 * Delete a story (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const authResponse = await requireAuth(request);
    if (authResponse) return authResponse;

    // Only admins can delete stories
    const roleResponse = await requireRole(request, ['ADMIN']);
    if (roleResponse) return roleResponse;

    const { slug } = params;

    // Check if story exists
    const story = await prisma.story.findUnique({
      where: { slug },
    });

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    // Delete story (will cascade delete tags and media relationships)
    await prisma.story.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Story deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting story:', error);
    return NextResponse.json(
      { error: 'Failed to delete story' },
      { status: 500 }
    );
  }
}
