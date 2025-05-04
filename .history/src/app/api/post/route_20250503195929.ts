import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const { content } = await req.json();

  const post = await prisma.post.create({
    data: {
      content,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(post);
}
