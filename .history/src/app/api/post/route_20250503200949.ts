import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/db';

import { authOptions } from '../auth/[...nextauth]/route';

/**
 * Handles the POST request to create a new post.
 *
 * This function requires the user to be authenticated. It retrieves the user session
 * and ensures the user has a valid session. If the session is not valid, it responds
 * with a 401 Unauthorized status.
 *
 * Upon successful authentication, it extracts the post content from the request body
 * and creates a new post entry in the database associated with the authenticated user.
 *
 * @param req - The incoming HTTP request object.
 * @returns A JSON response with the newly created post or an error message if the user is unauthorized.
 */

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const { content } = await req.json();

  const post = await prisma.post.create({
    data: {
      title: 'New Post',
      content,
      authorId: session?.user?.id,
    },
  });

  return NextResponse.json(post);
}
