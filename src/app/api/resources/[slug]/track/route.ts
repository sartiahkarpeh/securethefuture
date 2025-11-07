import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * POST /api/resources/[slug]/track
 * Track resource views and downloads
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { action } = body; // 'view' or 'download'

    // Validate action
    if (!action || (action !== 'view' && action !== 'download')) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "view" or "download"' },
        { status: 400 }
      );
    }

    // Find resource
    const resource = await prisma.resource.findUnique({
      where: { slug },
    });

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    // Update view or download count
    const updatedResource = await prisma.resource.update({
      where: { slug },
      data: {
        ...(action === 'view' && {
          views: {
            increment: 1,
          },
        }),
        ...(action === 'download' && {
          downloads: {
            increment: 1,
          },
        }),
      },
      select: {
        id: true,
        views: true,
        downloads: true,
      },
    });

    return NextResponse.json({
      success: true,
      action,
      stats: {
        views: updatedResource.views,
        downloads: updatedResource.downloads,
      },
    });
  } catch (error) {
    console.error('Error tracking resource:', error);
    return NextResponse.json(
      { error: 'Failed to track resource' },
      { status: 500 }
    );
  }
}
