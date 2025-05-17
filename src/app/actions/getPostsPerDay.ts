import { endOfDay, startOfDay, subDays } from 'date-fns';

import { prisma } from '@/lib/db';

type PostsPerDay = {
  date: string;
  posts: number;
};

export const getPostsPerDay = async (): Promise<PostsPerDay[]> => {
  const pastSevenDays = Array.from({ length: 7 }).map((_, i) => {
    const currentDate = subDays(new Date(), 6 - i);
    return {
      start: startOfDay(currentDate),
      end: endOfDay(currentDate),
      label: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });

  const results = await Promise.all(
    pastSevenDays.map(async ({ start, end, label }) => {
      const postCount = await prisma.post.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });
      return { date: label, posts: postCount };
    }),
  );

  return results;
};
