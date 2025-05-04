import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = ['/dashboard', '/admin', '/profile'];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isProtected && !token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*'],
};
