import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * POST /api/newsletter/subscribe
 * Subscribe to newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        const subscriber = await prisma.newsletterSubscriber.update({
          where: { email: email.toLowerCase() },
          data: {
            active: true,
            ...(name && { name }),
          },
        });

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
          data: {
            id: subscriber.id,
            email: subscriber.email,
          },
        });
      }
    }

    // Create new subscriber
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        name,
        active: true,
        confirmedAt: new Date(), // Auto-confirm for now
      },
    });

    // TODO: Send welcome email
    // TODO: Send confirmation email (if double opt-in)

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! You will receive our latest updates.',
      data: {
        id: subscriber.id,
        email: subscriber.email,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
