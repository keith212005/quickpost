import { NextResponse } from 'next/server';

import { getPostsPerDay } from '@/app/actions/getPostsPerDay';

export async function GET() {
  const data = await getPostsPerDay();
  return NextResponse.json(data);
}
