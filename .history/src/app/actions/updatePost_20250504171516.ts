'use server';

import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db';

import { authOptions } from '../api/auth/[...nextauth]/route';

type updatePostProps = {
  postId: string;
  title: string;
  content: string;
};

export async function updatePost({ postId }: updatePostProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    console.error('DELETE failed:', error);
  }

  return postId;
}
