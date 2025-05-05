'use server';

import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db';

import { authOptions } from '../api/auth/[...nextauth]/route';

type updatePostProps = {
  postId: string;
  title: string;
  content: string;
};

export async function updatePost({ postId, title, content }: updatePostProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');

  try {
    await prisma.post.update({ where: { id: postId }, data: { title, content }  } catch (error) {
    console.error('DELETE failed:', error);
  }

  return postId;
}
