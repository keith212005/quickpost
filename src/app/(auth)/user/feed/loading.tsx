import { Skeleton } from '@/components/ui/skeleton';

export default function FeedLoading() {
  return (
    <div className='mx-auto max-w-2xl space-y-4 p-4'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='rounded-md border p-4'>
          <Skeleton className='mb-2 h-6 w-1/2' />
          <Skeleton className='mb-1 h-4 w-full' />
          <Skeleton className='mb-1 h-4 w-5/6' />
          <Skeleton className='mb-2 h-6 w-1/2' />
          <Skeleton className='mb-1 h-4 w-full' />
          <Skeleton className='mb-1 h-4 w-5/6' />
          <Skeleton className='h-4 w-4/6' />
        </div>
      ))}
    </div>
  );
}
