import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * POST /api/events/[slug]/rsvp
 * RSVP to an event
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find event
    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            rsvps: true,
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

    if (!event.published) {
      return NextResponse.json(
        { error: 'Event is not available for registration' },
        { status: 400 }
      );
    }

    // Check if event is in the past
    if (new Date(event.date) < new Date()) {
      return NextResponse.json(
        { error: 'Cannot RSVP to past events' },
        { status: 400 }
      );
    }

    // Check if max attendees reached
    if (event.maxAttendees && event._count.rsvps >= event.maxAttendees) {
      return NextResponse.json(
        { error: 'Event is at full capacity' },
        { status: 400 }
      );
    }

    // Check if user already RSVP'd
    const existingRsvp = await prisma.rSVP.findUnique({
      where: {
        eventId_email: {
          eventId: event.id,
          email: email.toLowerCase(),
        },
      },
    });

    if (existingRsvp) {
      return NextResponse.json(
        { error: 'You have already RSVP\'d to this event' },
        { status: 400 }
      );
    }

    // Create RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        eventId: event.id,
        name,
        email: email.toLowerCase(),
        phone,
        message,
      },
    });

    // Update attendees count
    await prisma.event.update({
      where: { id: event.id },
      data: {
        attendees: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'RSVP successful! You will receive a confirmation email shortly.',
      data: {
        id: rsvp.id,
        name: rsvp.name,
        email: rsvp.email,
        eventTitle: event.title,
        eventDate: event.date,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to create RSVP' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/events/[slug]/rsvp
 * Get all RSVPs for an event (admin only)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Find event
    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        rsvps: {
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

    return NextResponse.json({
      success: true,
      data: {
        eventId: event.id,
        eventTitle: event.title,
        totalRsvps: event.rsvps.length,
        maxAttendees: event.maxAttendees,
        rsvps: event.rsvps,
      },
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSVPs' },
      { status: 500 }
    );
  }
}
