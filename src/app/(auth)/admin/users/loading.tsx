import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UsersTableSkeleton = () => {
  return (
    <Card className='mx-auto mt-4 w-full max-w-screen-xl gap-4 rounded-md border px-4 py-6 sm:px-6'>
      <div className='space-y-6'>
        <Skeleton className='h-8 w-40' /> {/* Title */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-10 w-28' /> {/* Add User */}
            <Skeleton className='h-10 w-48' /> {/* Filter users */}
          </div>
          <div className='flex items-center gap-4'>
            <Skeleton className='h-10 w-48' /> {/* Search */}
            <Skeleton className='h-10 w-10 rounded-md' /> {/* View toggle */}
          </div>
        </div>
        <div className='overflow-x-auto rounded-xl border'>
          <table className='min-w-full table-auto text-sm'>
            <thead className='bg-muted/40'>
              <tr>
                <th className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-8' />
                </th>
                {/* Action */}
                <th className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-24' />
                </th>
                {/* Name */}
                <th className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-48' />
                </th>
                {/* Email */}
                <th className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-20' />
                </th>
                {/* Status */}
                <th className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-20' />
                </th>
                {/* Role */}
                <th className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-12' />
                </th>
                {/* isOAuth */}
                <th className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-40' />
                </th>
                {/* Last Login */}
                <th className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-40' />
                </th>
                {/* Created At */}
              </tr>
            </thead>
            <tbody className='divide-muted divide-y'>
              {Array.from({ length: 10 }).map((_, rowIdx) => (
                <tr key={rowIdx} className='bg-background'>
                  <td className='px-4 py-3'>
                    <Skeleton className='h-4 w-8' />
                  </td>
                  {/* Action */}
                  <td className='px-4 py-3'>
                    <Skeleton className='h-4 w-24' />
                  </td>
                  {/* Name */}
                  <td className='px-4 py-3'>
                    <Skeleton className='h-4 w-48' />
                  </td>
                  {/* Email */}
                  <td className='px-4 py-3'>
                    <Skeleton className='h-6 w-20 rounded-full' />
                  </td>
                  {/* Status */}
                  <td className='px-4 py-3'>
                    <Skeleton className='h-4 w-20' />
                  </td>
                  {/* Role */}
                  <td className='px-4 py-3'>
                    <Skeleton className='h-4 w-12' />
                  </td>
                  {/* isOAuth */}
                  <td className='px-4 py-3'>
                    <Skeleton className='h-4 w-40' />
                  </td>
                  {/* Last Login */}
                  <td className='px-4 py-3'>
                    <Skeleton className='h-4 w-40' />
                  </td>
                  {/* Created At */}
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
