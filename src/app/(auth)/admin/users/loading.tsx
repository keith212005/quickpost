import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UsersTableSkeleton = () => {
  return (
    <Card className='m-6 gap-3 p-6'>
      <div className='space-y-4 p-6'>
        <Skeleton className='h-8 w-40' /> {/* Title */}
        <Skeleton className='h-10 w-full max-w-md' /> {/* Search bar */}
        <div className='overflow-x-auto rounded-xl border'>
          <table className='divide-muted min-w-full divide-y text-sm'>
            <thead className='bg-muted/40'>
              <tr>
                {Array.from({ length: 10 }).map((_, i) => (
                  <th key={i} className='px-4 py-3'>
                    <Skeleton className='h-4 w-16' />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-muted divide-y'>
              {Array.from({ length: 10 }).map((_, rowIdx) => (
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
      </div>
    </Card>
  );
};

export default UsersTableSkeleton;
