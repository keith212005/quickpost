// import { NextResponse } from 'next/server';

// import { prisma } from '@/lib/db';

// export async function GET() {
//   const posts = await prisma.post.findMany({
//     include: {
//       author: true,
//       likes: true,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });

//   return NextResponse.json(posts);
// }
