'use server';

import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db';
import { PostSchemaType } from '@/schemas/postSchema';

import { authOptions } from '../api/auth/[...nextauth]/route';

export async function createPost({ postId }) {
  const session = await getServerSession(authOptions);
  const { title, content } = formData;

  try {
    await prisma.post.delete({
      where: { id: params.id },
    });

    await prisma.$accelerate.invalidate({ tags: ['my_posts'] });

  // console.log({ newPost }, 'has been created.')
  return newPost;
}
