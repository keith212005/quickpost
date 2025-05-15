import { Skeleton } from '@/components/ui/skeleton';

const OverViewSkeleton = () => {
  return (
    <div className='grid gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='bg-muted/50 space-y-4 rounded-xl border p-6 shadow-sm'
        >
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-8 w-10' />
          <Skeleton className='h-3 w-3/4' />
        </div>
      ))}
    </div>
  );
};

export default OverViewSkeleton;
