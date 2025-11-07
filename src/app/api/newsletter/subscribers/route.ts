import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/auth';

/**
 * GET /api/newsletter/subscribers
 * Get all newsletter subscribers (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await requireAuth(request);
    if (authResponse) return authResponse;

    // Check if user is admin or editor
    const roleResponse = await requireRole(request, ['ADMIN', 'EDITOR']);
    if (roleResponse) return roleResponse;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const active = searchParams.get('active'); // 'true', 'false', or null (all)
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build filter
    const where: any = {};

    if (active !== null) {
      where.active = active === 'true';
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get subscribers with pagination
    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);

    // Get active count
    const activeCount = await prisma.newsletterSubscriber.count({
      where: { active: true },
    });

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        total,
        active: activeCount,
        inactive: total - activeCount,
      },
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
}
