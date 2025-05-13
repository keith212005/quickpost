'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

type updatePostProps = {
  postId: string;
  title: string;
  content: string;
};

export async function updatePost({ postId, title, content }: updatePostProps) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
      },
    });
    return updatedPost;
  } catch (error) {
    console.error('UPDATE failed:', error);
    throw error;
  }
}
