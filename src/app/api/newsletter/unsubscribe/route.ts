import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * POST /api/newsletter/unsubscribe
 * Unsubscribe from newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

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

    // Check if subscriber exists
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Email address not found in our subscriber list' },
        { status: 404 }
      );
    }

    if (!existing.active) {
      return NextResponse.json(
        { message: 'You are already unsubscribed from our newsletter' },
        { status: 200 }
      );
    }

    // Deactivate subscription (soft delete)
    await prisma.newsletterSubscriber.update({
      where: { email: email.toLowerCase() },
      data: {
        active: false,
      },
    });

    // TODO: Send unsubscribe confirmation email

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter. We\'re sorry to see you go!',
    });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}
