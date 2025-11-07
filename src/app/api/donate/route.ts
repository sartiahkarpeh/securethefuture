import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const {
      amount,
      provider,
      donorName,
      donorEmail,
      donorPhone,
      message,
    } = data;

    // Validate required fields
    if (!amount || !provider) {
      return NextResponse.json(
        { success: false, error: 'Amount and provider are required' },
        { status: 400 }
      );
    }

    // Here you would:
    // 1. Store the donation intent in your database
    // 2. Send confirmation email to donor (if email provided)
    // 3. Notify your team about the pending donation
    // 4. Integrate with mobile money API if available

    // For now, we'll simulate a successful response
    const donationRecord = {
      id: `DON-${Date.now()}`,
      amount,
      provider,
      donorName: donorName || 'Anonymous',
      donorEmail,
      donorPhone,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Log the donation intent (in production, save to database)
    console.log('Donation Intent Recorded:', donationRecord);

    // Send success response
    return NextResponse.json({
      success: true,
      data: donationRecord,
      message: 'Donation intent recorded successfully. Please complete the payment via mobile money.',
    });

  } catch (error) {
    console.error('Donation API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process donation request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // This endpoint could be used to verify donation status
  const searchParams = request.nextUrl.searchParams;
  const donationId = searchParams.get('id');

  if (!donationId) {
    return NextResponse.json(
      { success: false, error: 'Donation ID is required' },
      { status: 400 }
    );
  }

  // Here you would check the donation status in your database
  // For now, return a mock response
  return NextResponse.json({
    success: true,
    data: {
      id: donationId,
      status: 'pending', // or 'completed', 'failed'
      message: 'Donation is being processed',
    },
  });
}
