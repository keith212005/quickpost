import React from 'react';

import { Skeleton } from '../ui/skeleton';

const PostSkeleton = () => {
  return (
    <div className='mx-auto max-w-2xl space-y-6 p-4'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className='bg-card space-y-4 rounded-xl border p-6 shadow-sm'
        >
          <Skeleton className='h-5 w-3/4' /> {/* Post title */}
          <Skeleton className='h-4 w-1/3' /> {/* Author and date */}
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-4/6' />
          <div className='flex items-center justify-between pt-2'>
            <Skeleton className='h-4 w-16' /> {/* Likes */}
            <div className='flex gap-2'>
              <Skeleton className='h-8 w-20 rounded-md' /> {/* Edit button */}
              <Skeleton className='h-8 w-20 rounded-md' /> {/* Delete button */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;
