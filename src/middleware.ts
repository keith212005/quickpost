import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🚫 Skip middleware for public routes early
  const publicPaths = ['/login', '/register'];
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('token in middleware>>>>', token);

  if (!token) {
    // Redirect only if the request is not for the login or register page
    if (!['/login', '/register'].includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  const userRole = token.role || 'guest';
  const isActive = token.isActive ?? true; // Default to true if undefined

  // if user is not active, redirect to login page with error message
  if (!isActive) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set(
      'error',
      'Your account is inactive. Please contact support.',
    );
    return NextResponse.redirect(url);
  }

  const isAdminPath = pathname.startsWith('/admin');
  const isUserPath = pathname.startsWith('/user');

  // ✅ Block user from accessing admin route
  if (isAdminPath && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/user/feed', req.url));
  }

  // ✅ Block admin from accessing user route
  if (isUserPath && userRole !== 'user') {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/login', '/register'],
};
