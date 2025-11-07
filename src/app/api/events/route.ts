import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

/**
 * GET /api/events
 * Get all events with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const upcoming = searchParams.get('upcoming'); // true/false
    const published = searchParams.get('published') !== 'false';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (published) {
      where.published = true;
    }

    if (type) {
      where.type = type;
    }

    if (featured) {
      where.featured = featured === 'true';
    }

    if (upcoming === 'true') {
      where.date = {
        gte: new Date(),
      };
    } else if (upcoming === 'false') {
      where.date = {
        lt: new Date(),
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count
    const total = await prisma.event.count({ where });

    // Get events
    const events = await prisma.event.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        date: 'asc',
      },
      include: {
        organizerUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            rsvps: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/events
 * Create a new event (admin only)
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const {
      title,
      slug,
      description,
      type,
      date,
      time,
      endTime,
      location,
      address,
      virtualLink,
      maxAttendees,
      image,
      organizer,
      contactEmail,
      contactPhone,
      featured,
      published,
      registrationRequired,
      registrationUrl,
      tagIds,
    } = body;

    // Validate required fields
    if (!title || !slug || !description || !type || !date || !time || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug exists
    const existingEvent = await prisma.event.findUnique({
      where: { slug },
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: 'Event with this slug already exists' },
        { status: 400 }
      );
    }

    // First, ensure the user exists in the database
    // Check by email first since that's unique
    let dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    // If user doesn't exist in Prisma DB, create them
    if (!dbUser) {
      try {
        dbUser = await prisma.user.create({
          data: {
            id: user.id,
            email: user.email,
            name: user.name || user.email,
            password: '', // Empty password since using Firebase auth
            role: user.role as any,
          },
        });
      } catch (error: any) {
        // If creation fails due to ID conflict, find by email
        if (error.code === 'P2002') {
          dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
        } else {
          throw error;
        }
      }
    }

    // Ensure dbUser exists before proceeding
    if (!dbUser) {
      return NextResponse.json(
        { error: 'Failed to create or find user in database' },
        { status: 500 }
      );
    }

    // Create event
    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        type,
        date: new Date(date),
        time,
        endTime,
        location,
        address,
        virtualLink,
        maxAttendees,
        image: image || '/images/events/default.jpg',
        organizer: organizer || 'Secure the Future',
        contactEmail,
        contactPhone,
        featured: featured || false,
        published: published || false,
        registrationRequired: registrationRequired ?? true,
        registrationUrl,
        organizerId: dbUser.id,
        ...(tagIds && tagIds.length > 0 && {
          tags: {
            connect: tagIds.map((id: string) => ({ id })),
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
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
