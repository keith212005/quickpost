import { NextRequest, NextResponse } from 'next/server';

import { getAllPosts } from '@/app/actions/getAllPosts';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const take = 10;
  const skip = (page - 1) * take;

  const result = await getAllPosts(take, skip);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    data: result.data,
    totalPages: Math.ceil((result.totalCount ?? 0) / take),
  });
}
