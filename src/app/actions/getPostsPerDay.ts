import { endOfDay, startOfDay, subDays } from 'date-fns';

import { prisma } from '@/lib/db';

export const getPostsPerDay = async () => {
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i); // last 7 days, oldest to newest
    return {
      start: startOfDay(date),
      end: endOfDay(date),
      label: date.toLocaleDateString('en-US', { weekday: 'short' }), // e.g. "Mon"
    };
  });

  const results = await Promise.all(
    last7Days.map(async ({ start, end, label }) => {
      const count = await prisma.post.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });

      return { date: label, posts: count };
    }),
  );

  return results;
};
