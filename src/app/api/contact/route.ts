import { NextRequest, NextResponse } from 'next/server';
import { createDoc, getDocByField, updateDoc, COLLECTIONS, adminDB } from '@/lib/firestore-helpers';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * POST /api/contact
 * Submit a contact form message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message, newsletter } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Create contact message
    const contactMessage = await createDoc(COLLECTIONS.CONTACT_MESSAGES, {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone: phone || null,
      subject,
      message,
      newsletter: newsletter || false,
      status: 'UNREAD',
    });

    // If newsletter opt-in, add to newsletter subscribers
    if (newsletter) {
      try {
        const existingSubscriber = await getDocByField(
          COLLECTIONS.NEWSLETTER_SUBSCRIBERS,
          'email',
          email.toLowerCase()
        );

        if (existingSubscriber) {
          await updateDoc(COLLECTIONS.NEWSLETTER_SUBSCRIBERS, existingSubscriber.id, {
            name: `${firstName} ${lastName}`,
            active: true,
          });
        } else {
          await createDoc(COLLECTIONS.NEWSLETTER_SUBSCRIBERS, {
            email: email.toLowerCase(),
            name: `${firstName} ${lastName}`,
            active: true,
            confirmedAt: Timestamp.now(),
          });
        }
      } catch (error) {
        console.error('Error adding to newsletter:', error);
        // Don't fail the contact form submission if newsletter fails
      }
    }

    // TODO: Send email notification to admin
    // TODO: Send auto-reply to user

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        id: contactMessage.id,
        createdAt: new Date(),
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Get all contact messages (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    // Build query
    let query = adminDB.collection(COLLECTIONS.CONTACT_MESSAGES)
      .orderBy('createdAt', 'desc');

    if (status) {
      query = query.where('status', '==', status);
    }

    // Get all matching documents for count
    const allDocs = await query.get();
    const total = allDocs.size;

    // Get paginated results
    const paginatedSnapshot = await query
      .offset(skip)
      .limit(limit)
      .get();

    const messages = paginatedSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || null,
    }));

    return NextResponse.json({
      success: true,
      data: messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}
