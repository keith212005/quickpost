'use server';

import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db';

import { authOptions } from '../api/auth/[...nextauth]/route';

export async function deletePost({ postId }) {
  const session = await getServerSession(authOptions);
 

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    await prisma.$accelerate.invalidate({ tags: ['my_posts'] });

  // console.log({ newPost }, 'has been created.')
  return newPost;
}
