'use client';
import React, { useState } from 'react';

import { Card } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { TABLE_COLUMNS, USERS_PER_PAGE } from '@/constants/dummyData';
import { UserType } from '@/types/types';

import ToggleColumnDropDown from './ToggleColumnDropDown';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTablePagination } from './UsersTablePagination';
import { UsersTableRow } from './UsersTableRow';
import UsersTableSearchBar from './UsersTableSearchBar';

const UsersTable = ({ users }: { users: UserType[] }) => {
  const [search, setSearch] = useState('');

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  );

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    TABLE_COLUMNS.reduce((acc, col) => ({ ...acc, [col]: true }), {}),
  );

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  return (
    <Card className='m-6 gap-3 p-6'>
      <h1 className='mb-4 text-3xl font-bold'>All Users</h1>

      <UsersTableSearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className='flex items-center justify-between'>
        <div></div>
        <div className='flex flex-col items-center'>
          <ToggleColumnDropDown
            columns={TABLE_COLUMNS}
            visibleColumns={visibleColumns}
            toggleColumn={toggleColumn}
          />
        </div>
      </div>

      <div className='mt-4 rounded-md border'>
        <Table>
          <UsersTableHeader
            filteredUsers={filteredUsers}
            selectedUsers={selectedUsers}
            handleSelectAll={handleSelectAll}
            visibleColumns={visibleColumns}
          />
          <TableBody>
            {paginatedUsers.map((user) => (
              <UsersTableRow
                key={user.id}
                user={user}
                visibleColumns={visibleColumns}
                selected={selectedUsers.includes(user.id)}
                onToggle={() => handleUserToggle(user.id)}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <UsersTablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
      />
    </Card>
  );
};

export default UsersTable;
