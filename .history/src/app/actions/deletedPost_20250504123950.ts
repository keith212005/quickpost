'use server';

import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db';

import { authOptions } from '../api/auth/[...nextauth]/route';

export async function deletePost({ postId }: { postId: string }) {
  const session = await getServerSession(authOptions);
  //   if (!session) return new NextResponse('Unauthorized', { status: 401 });

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    console.error('DELETE failed:', error);
  }

  try {
    await prisma.$accelerate.invalidate({
      tags: ['my_posts'],
    });
  } catch (error) {
    console.warn('Failed to invalidate cache:', error);
  }

  return postId;
}
