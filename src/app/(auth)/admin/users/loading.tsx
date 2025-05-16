import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UsersTableSkeleton = () => {
  return (
    <Card className='mx-auto mt-4 w-full max-w-screen-xl gap-4 rounded-md border px-4 py-6 sm:px-6'>
      <div className='space-y-6'>
        <Skeleton className='h-8 w-40' /> {/* Title */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <Skeleton className='h-10 w-28' /> {/* Add User */}
          <div className='flex items-center gap-4'>
            <Skeleton className='h-10 w-48' /> {/* Search */}
            <Skeleton className='h-10 w-10 rounded-md' /> {/* View toggle */}
          </div>
        </div>
        <div className='overflow-x-auto rounded-xl border'>
          <table className='min-w-full table-auto text-sm'>
            <thead className='bg-muted/40'>
              <tr>
                {Array.from({ length: 11 }).map((_, i) => (
                  <th key={i} className='px-4 py-3 text-left'>
                    <Skeleton className='h-4 w-24' />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-muted divide-y'>
              {Array.from({ length: 6 }).map((_, rowIdx) => (
                <tr key={rowIdx} className='bg-background'>
                  {Array.from({ length: 11 }).map((_, colIdx) => (
                    <td key={colIdx} className='px-4 py-3'>
                      <Skeleton className='h-4 w-full max-w-[120px]' />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex items-center justify-center gap-4 pt-6'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className='h-8 w-8 rounded-md' />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default UsersTableSkeleton;
