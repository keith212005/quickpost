export { auth as middleware } from '@/auth';
export const config = {
  matcher: ['/', '/user', '/user/:path*', '/admin', '/admin/:path*'],
};
