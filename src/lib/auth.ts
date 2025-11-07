import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getDocById, COLLECTIONS } from './firestore-helpers';

// Get JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET;

// Validate JWT secret exists and is strong enough
function validateJWTSecret(): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required. Please set it in your .env file.');
  }
  if (JWT_SECRET.length < 32) {
    console.warn('WARNING: JWT_SECRET should be at least 32 characters long for security.');
  }
  return JWT_SECRET;
}

const TOKEN_NAME = 'auth-token';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate JWT token for a user
 */
export function generateToken(payload: JWTPayload): string {
  const secret = validateJWTSecret();
  return jwt.sign(payload, secret, {
    expiresIn: '7d', // Token expires in 7 days
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = validateJWTSecret();
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Get token from cookies
 */
export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value;
}

/**
 * Get current user from token
 */
export async function getCurrentUser() {
  const token = await getTokenFromCookies();
  
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  
  if (!payload) {
    return null;
  }

  // Fetch user from database
  const user = await getDocById(COLLECTIONS.USERS, payload.userId);
  
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar || null,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin || null,
  };
}

/**
 * Get user from request (for API routes)
 */
export async function getUserFromRequest(request: NextRequest) {
  // Try to get token from cookie
  let token = request.cookies.get(TOKEN_NAME)?.value;

  // If not in cookie, try Authorization header
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  
  if (!payload) {
    return null;
  }

  // Fetch user from database
  const user = await getDocById(COLLECTIONS.USERS, payload.userId);
  
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar || null,
  };
}

/**
 * Set auth cookie
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: TOKEN_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Clear auth cookie
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: string, requiredRole: string[]): boolean {
  return requiredRole.includes(userRole);
}

/**
 * Middleware to protect routes
 */
export async function requireAuth(request: NextRequest) {
  const user = await getUserFromRequest(request);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return null; // No error, continue
}

/**
 * Middleware to require specific roles
 */
export async function requireRole(request: NextRequest, roles: string[]) {
  const authResponse = await requireAuth(request);
  if (authResponse) return authResponse;
  
  const user = await getUserFromRequest(request);
  
  if (!user || !hasRole(user.role, roles)) {
    return NextResponse.json(
      { error: 'Forbidden: Insufficient permissions' },
      { status: 403 }
    );
  }

  return null; // No error, continue
}
