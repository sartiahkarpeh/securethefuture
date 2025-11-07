import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDocByField, updateDoc, COLLECTIONS } from '@/lib/firestore-helpers';
import { generateToken, setAuthCookie } from '@/lib/auth';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('🔐 Login attempt:', { email, passwordLength: password?.length });

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    console.log('🔍 Looking for user with email:', email.toLowerCase());
    const user = await getDocByField(
      COLLECTIONS.USERS,
      'email',
      email.toLowerCase()
    );

    if (!user) {
      console.log('❌ User not found');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('✅ User found:', { id: user.id, email: user.email, hasPassword: !!user.password });

    // Verify password
    console.log('🔑 Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('🔑 Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await updateDoc(COLLECTIONS.USERS, user.id, {
      lastLogin: Timestamp.now(),
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    await setAuthCookie(token);

    // Return user data (without password)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
