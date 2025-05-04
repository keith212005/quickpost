import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { env } from './lib/env';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  const protectedPaths = ['/dashboard', '/admin', '/profile'];
}
