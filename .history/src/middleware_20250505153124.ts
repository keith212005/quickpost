import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = ['/feed', '/myposts', '/profile', '/settings'];
  const authPages = ['/login', '/register'];

  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPage = authPages.some((path) => pathname.startsWith(path));

  // 🔐 Unauthenticated trying to access protected page
  if (isProtected && !token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Authenticated user trying to access login or register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/feed', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/feed/:path*',
    '/myposts/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/login',
    '/register',
  ],
};
