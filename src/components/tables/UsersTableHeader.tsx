import React from 'react';

import { TABLE_COLUMNS } from '@/constants/dummyData';
import { UserType } from '@/types/types';

import { TableHead, TableHeader, TableRow } from '../ui/table';

type UsersTableHeaderProps = {
  filteredUsers: UserType[];
  selectedUsers: string[];
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visibleColumns: Record<string, boolean>;
};

export const UsersTableHeader = ({
  visibleColumns,
  handleSelectAll,
  selectedUsers,
  filteredUsers,
}: UsersTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <input
            type='checkbox'
            className='h-4 w-4'
            checked={
              selectedUsers.length === filteredUsers.length &&
              filteredUsers.length > 0
            }
            onChange={handleSelectAll}
          />
        </TableHead>
        {visibleColumns[TABLE_COLUMNS[0]] && (
          <TableHead>{TABLE_COLUMNS[0]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[1]] && (
          <TableHead>{TABLE_COLUMNS[1]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[2]] && (
          <TableHead>{TABLE_COLUMNS[2]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[3]] && (
          <TableHead>{TABLE_COLUMNS[3]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[4]] && (
          <TableHead>{TABLE_COLUMNS[4]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[5]] && (
          <TableHead>{TABLE_COLUMNS[5]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[6]] && (
          <TableHead>{TABLE_COLUMNS[6]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[7]] && (
          <TableHead>{TABLE_COLUMNS[7]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[8]] && (
          <TableHead>{TABLE_COLUMNS[8]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[9]] && (
          <TableHead>{TABLE_COLUMNS[9]}</TableHead>
        )}
        {visibleColumns[TABLE_COLUMNS[10]] && (
          <TableHead>{TABLE_COLUMNS[10]}</TableHead>
        )}
        <TableHead className='text-right'>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
