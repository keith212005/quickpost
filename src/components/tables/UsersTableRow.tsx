import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { toggleUserStatus } from '@/app/actions/toggleUserStatus';
import { TABLE_COLUMNS } from '@/constants/dummyData';
import { UserType } from '@/types/types';

import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { TableCell, TableRow } from '../ui/table';

type UsersTableRowProps = {
  visibleColumns: Record<string, boolean>;
  selected: boolean;
  onToggle: () => void;
  user: UserType;
};

export const UsersTableRow = ({
  visibleColumns,
  selected,
  onToggle,
  user,
}: UsersTableRowProps) => {
  const router = useRouter();
  return (
    <TableRow key={user.id}>
      <TableCell>
        <input
          type='checkbox'
          className='h-4 w-4'
          checked={selected}
          onChange={onToggle}
        />
      </TableCell>
      {visibleColumns[TABLE_COLUMNS[0]] && <TableCell>{user.id}</TableCell>}
      {visibleColumns[TABLE_COLUMNS[1]] && (
        <TableCell>
          <StatusTab user={user} />
        </TableCell>
      )}
      {visibleColumns[TABLE_COLUMNS[2]] && <TableCell>{user.name}</TableCell>}
      {visibleColumns[TABLE_COLUMNS[3]] && <TableCell>{user.email}</TableCell>}
      {visibleColumns[TABLE_COLUMNS[3]] && <TableCell>{user.role}</TableCell>}
      {visibleColumns[TABLE_COLUMNS[4]] && (
        <TableCell>{user.isOAuth ? 'Yes' : 'No'}</TableCell>
      )}
      {visibleColumns[TABLE_COLUMNS[5]] && (
        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
      )}
      {visibleColumns[TABLE_COLUMNS[6]] && (
        <TableCell>
          {user.lastLogin
            ? new Date(user.lastLogin).toLocaleDateString()
            : 'N/A'}
        </TableCell>
      )}
      {visibleColumns[TABLE_COLUMNS[7]] && (
        <TableCell>
          {user.emailVerified
            ? new Date(user.emailVerified).toLocaleDateString()
            : 'N/A'}
        </TableCell>
      )}
      {visibleColumns[TABLE_COLUMNS[8]] && (
        <TableCell>{user.posts.length}</TableCell>
      )}
      {visibleColumns[TABLE_COLUMNS[9]] && (
        <TableCell>{user.likes.length}</TableCell>
      )}

      <TableCell className='text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='border-border z-50 mt-2 w-44 rounded-md border bg-white p-1 shadow-md dark:bg-zinc-900'
          >
            <DropdownMenuItem
              className='hover:bg-muted cursor-pointer px-3 py-2 text-sm'
              onClick={() => alert('Edit user')}
            >
              <Label>Edit</Label>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              className='hover:bg-muted cursor-pointer px-3 py-2 text-sm text-red-500'
              onClick={async () => {
                try {
                  await toggleUserStatus({
                    userId: user.id,
                    status: user.isActive,
                  });

                  toast('User status updated successfully');
                  router.refresh();
                } catch (error) {
                  toast.error('Failed to update user');
                  console.error('Delete error:', error);
                }
              }}
            >
              <Label>{user.isActive ? 'Deactivate' : 'Activate'}</Label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const StatusTab = ({ user }: { user: UserType }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        user.isActive
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {user.isActive ? 'Active' : 'Inactive'}
    </span>
  );
};
