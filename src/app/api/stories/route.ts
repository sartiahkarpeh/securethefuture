import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/auth';

/**
 * GET /api      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(story);s
 * Get all stories with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const type = searchParams.get('type'); // VIDEO, AUDIO, TEXT
    const featured = searchParams.get('featured'); // 'true' or 'false'
    const search = searchParams.get('search') || '';
    const published = searchParams.get('published') !== 'false'; // Default to true

    const skip = (page - 1) * limit;

    // Build filter
    const where: any = {
      published,
    };

    if (type) {
      where.type = type;
    }

    if (featured !== null) {
      where.featured = featured === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { storyteller: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get stories with pagination
    const [stories, total] = await Promise.all([
      prisma.story.findMany({
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
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.story.count({ where }),
    ]);

    return NextResponse.json({
      stories,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/stories
 * Create a new story (admin/editor only)
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
      name,
      age,
      type,
      category,
      excerpt,
      content,
      image,
      videoUrl,
      audioUrl,
      duration,
      featured,
      published,
      publishedAt,
      authorId,
    } = body;

    // Validate required fields
    if (!title || !slug || !name || !age || !type || !category || !excerpt || !image || !authorId) {
      return NextResponse.json(
        { error: 'Title, slug, name, age, type, category, excerpt, image, and authorId are required' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['VIDEO', 'AUDIO', 'TEXT'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid story type. Must be VIDEO, AUDIO, or TEXT' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingStory = await prisma.story.findUnique({
      where: { slug },
    });

    if (existingStory) {
      return NextResponse.json(
        { error: 'A story with this slug already exists' },
        { status: 400 }
      );
    }

    // Create story
    const story = await prisma.story.create({
      data: {
        title,
        slug,
        name,
        age,
        type,
        category,
        excerpt,
        content,
        image,
        videoUrl,
        audioUrl,
        duration,
        featured: featured || false,
        published: published || false,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        authorId,
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

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json(
      { error: 'Failed to create story' },
      { status: 500 }
    );
  }
}
