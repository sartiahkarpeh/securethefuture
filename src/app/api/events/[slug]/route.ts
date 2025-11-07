import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

/**
 * GET /api/events/[slug]
 * Get a single event by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        organizerUser: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        rsvps: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Only return published events to non-authenticated users
    const user = await getUserFromRequest(request);
    if (!event.published && (!user || (user.role !== 'ADMIN' && user.role !== 'EDITOR'))) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/events/[slug]
 * Update an event (admin only)
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

    // Find existing event
    const existingEvent = await prisma.event.findUnique({
      where: { slug },
    });

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // If slug is being changed, check for conflicts
    if (body.slug && body.slug !== slug) {
      const slugConflict = await prisma.event.findUnique({
        where: { slug: body.slug },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'Event with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update event
    const event = await prisma.event.update({
      where: { slug },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.description && { description: body.description }),
        ...(body.type && { type: body.type }),
        ...(body.date && { date: new Date(body.date) }),
        ...(body.time && { time: body.time }),
        ...(body.endTime !== undefined && { endTime: body.endTime }),
        ...(body.location && { location: body.location }),
        ...(body.address !== undefined && { address: body.address }),
        ...(body.virtualLink !== undefined && { virtualLink: body.virtualLink }),
        ...(body.maxAttendees !== undefined && { maxAttendees: body.maxAttendees }),
        ...(body.image && { image: body.image }),
        ...(body.organizer && { organizer: body.organizer }),
        ...(body.contactEmail !== undefined && { contactEmail: body.contactEmail }),
        ...(body.contactPhone !== undefined && { contactPhone: body.contactPhone }),
        ...(typeof body.featured !== 'undefined' && { featured: body.featured }),
        ...(typeof body.published !== 'undefined' && { published: body.published }),
        ...(typeof body.registrationRequired !== 'undefined' && { registrationRequired: body.registrationRequired }),
        ...(body.registrationUrl !== undefined && { registrationUrl: body.registrationUrl }),
        ...(body.tagIds && {
          tags: {
            set: [],
            connect: body.tagIds.map((id: string) => ({ id })),
          },
        }),
      },
      include: {
        organizerUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/events/[slug]
 * Delete an event (admin only)
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
        { error: 'Forbidden: Only admins can delete events' },
        { status: 403 }
      );
    }

    const { slug } = params;

    const event = await prisma.event.findUnique({
      where: { slug },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Delete event (RSVPs will be deleted automatically due to cascade)
    await prisma.event.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
