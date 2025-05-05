'use server';

import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db';
import { PostSchemaType } from '@/schemas/postSchema';

import { authOptions } from '../api/auth/[...nextauth]/route';

export async function createPost(formData: PostSchemaType) {
  const session = await getServerSession(authOptions);
  const { title, content } = formData;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.user?.id,
    },
  });

  try {
    await prisma.$accelerate.invalidate({
      tags: ['global_feed'],
    });
  } catch (error) {
    console.warn('Failed to invalidate cache:', error);
  }

  // console.log({ newPost }, 'has been created.')
  return newPost;
}
