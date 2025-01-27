import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect if no token
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, secretKey) as { role: string; username: string };

    // Example: Check for admin access
    if (request.nextUrl.pathname.startsWith('/admin') && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url)); // Redirect unauthorized users
    }

    // Example: Check for user access
    if (request.nextUrl.pathname.startsWith('/user') && decoded.role !== 'user') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (err) {
    console.error('Invalid token:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); // Proceed if everything is valid
}

// Define routes to protect
export const config = {
  matcher: [
    '/api/admin/:path*', // Protect admin API routes
    '/api/user/:path*', // Protect user API routes
  ],
};
