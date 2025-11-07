import { NextRequest, NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import { requireAuth, requireRole } from '@/lib/auth';
import { COLLECTIONS, getDocByField, updateDoc, deleteDoc } from '@/lib/firestore-helpers';

/**
 * GET /api/resources/[slug]
 * Get a single resource by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

    // Get resource by slug
    const resource = await getDocByField(COLLECTIONS.RESOURCES, 'slug', slug);

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    // Check if published unless explicitly requested
    if (!includeUnpublished && !resource.published) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/resources/[slug]
 * Update a resource (admin/editor only)
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
      category,
      type,
      description,
      content,
      author,
      publisher,
      publishedDate,
      fileUrl,
      externalUrl,
      thumbnailUrl,
      url,
      image,
      duration,
      downloads,
      featured,
      published,
      tags,
    } = body;

    // Find existing resource
    const existingResource = await getDocByField(COLLECTIONS.RESOURCES, 'slug', slug);

    if (!existingResource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    // If changing slug, check if new slug exists
    if (newSlug && newSlug !== slug) {
      const slugExists = await getDocByField(COLLECTIONS.RESOURCES, 'slug', newSlug);

      if (slugExists) {
        return NextResponse.json(
          { error: 'A resource with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Validate category if provided
    if (category) {
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
    }

    // Validate type if provided
    if (type) {
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
    }

    // Build update data
    const updateData: any = {
      updatedAt: Timestamp.now(),
    };

    if (title !== undefined) updateData.title = title;
    if (newSlug !== undefined) updateData.slug = newSlug;
    if (category !== undefined) updateData.category = category;
    if (type !== undefined) updateData.type = type;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (author !== undefined) updateData.author = author;
    if (publisher !== undefined) updateData.publisher = publisher;
    if (publishedDate !== undefined) updateData.publishedDate = publishedDate ? Timestamp.fromDate(new Date(publishedDate)) : null;
    if (fileUrl !== undefined) updateData.fileUrl = fileUrl;
    if (externalUrl !== undefined) updateData.externalUrl = externalUrl;
    if (url !== undefined) updateData.url = url;
    if (thumbnailUrl !== undefined) updateData.thumbnailUrl = thumbnailUrl;
    if (image !== undefined) updateData.image = image;
    if (duration !== undefined) updateData.duration = duration;
    if (downloads !== undefined) updateData.downloads = downloads;
    if (featured !== undefined) updateData.featured = featured;
    if (published !== undefined) updateData.published = published;
    if (tags !== undefined) updateData.tags = tags;

    // Update resource
    await updateDoc(COLLECTIONS.RESOURCES, existingResource.id, updateData);

    // Get updated resource
    const updatedResource = await getDocByField(COLLECTIONS.RESOURCES, 'slug', newSlug || slug);

    return NextResponse.json(updatedResource);
  } catch (error) {
    console.error('Error updating resource:', error);
    return NextResponse.json(
      { error: 'Failed to update resource' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/resources/[slug]
 * Delete a resource (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const authResponse = await requireAuth(request);
    if (authResponse) return authResponse;

    // Only admins can delete resources
    const roleResponse = await requireRole(request, ['ADMIN']);
    if (roleResponse) return roleResponse;

    const { slug } = params;

    // Check if resource exists
    const resource = await getDocByField(COLLECTIONS.RESOURCES, 'slug', slug);

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    // Delete resource
    await deleteDoc(COLLECTIONS.RESOURCES, resource.id);

    return NextResponse.json({
      success: true,
      message: 'Resource deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    );
  }
}
