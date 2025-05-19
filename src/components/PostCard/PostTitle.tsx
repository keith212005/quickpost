'use client';

import { CardTitle } from '@/components/ui/card';

export default function PostTitle({ title }: { title: string }) {
  return (
    <div className='px-5'>
      <CardTitle className='text-foreground mt-1 font-semibold break-words whitespace-pre-wrap'>
        {title}
      </CardTitle>
    </div>
  );
}
