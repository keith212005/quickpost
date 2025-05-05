'use server';

import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db';

import { authOptions } from '../api/auth/[...nextauth]/route';

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  const title = formData.get('title');
  const text = formData.get('text');
  const url = formData.get('url');

  // const newPost = await prisma.post.create({
  //   data: {
  //     title: title?.toString() ?? '',
  //     content: text?.toString() ?? '',
  //     url: url?.toString() ?? '',
  //     vote: 0,
  //   },
  // });

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.user?.id,
    },
  });

  await prisma.$accelerate.invalidate({
    tags: ['global_feed'],
  });

  // console.log({ newPost }, 'has been created.')
  return newPost;
}
