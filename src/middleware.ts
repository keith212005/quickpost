import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  // If session is missing or expired, redirect to signin
  const isLoggingOut = request.nextUrl.searchParams.get('loggedOut');

  if (!session || !session.user) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';

    if (!isLoggingOut) {
      url.searchParams.set('error', 'Session expired. Please sign in again.');
    }

    return NextResponse.redirect(url);
  }

  const role = session.user?.role;
  const isActive = session.user?.isActive;

  if (isActive === false) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set(
      'error',
      'Your account is not active. Please contact support.',
    );
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/user/feed', request.url));
  }

  if (pathname.startsWith('/user') && role !== 'user') {
    return NextResponse.redirect(
      new URL('/admin/dashboard/overview', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user', '/user/:path*', '/admin', '/admin/:path*'],
};
