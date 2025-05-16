import { Skeleton } from '@/components/ui/skeleton';

const OverViewSkeleton = () => {
  return (
    <div className='space-y-6 px-6 py-10'>
      {/* Stat cards */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='bg-muted/50 space-y-4 rounded-xl border p-6 shadow-sm'
          >
            <Skeleton className='h-4 w-1/3' />
            <Skeleton className='h-8 w-12' />
            <Skeleton className='h-3 w-1/2' />
          </div>
        ))}
      </div>

      {/* Chart skeletons */}
      <div className='grid gap-4 lg:grid-cols-2'>
        <div className='bg-muted/50 h-[300px] rounded-xl border p-6 shadow-sm'>
          <Skeleton className='h-full w-full' />
        </div>
        <div className='bg-muted/50 h-[300px] rounded-xl border p-6 shadow-sm'>
          <Skeleton className='h-full w-full' />
        </div>
      </div>
    </div>
  );
};

export default OverViewSkeleton;
