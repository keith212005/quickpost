import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const { postId } = await req.json();

  const like = await prisma.like.upsert({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId,
      },
    },
    update: {},
    create: {
      userId: session.user.id,
      postId,
    },
  });

  return NextResponse.json(like);
}
