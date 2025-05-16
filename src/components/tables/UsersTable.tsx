'use client';
import React, { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Override USER_TABLE_COLUMNS with custom rendering logic for isActive
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { USER_TABLE_COLUMNS } from '@/constants/constants';
import { TABLE_COLUMNS, USERS_PER_PAGE } from '@/constants/dummyData';
import { TUserSchema } from '@/types/dbTablesTypes';

import { Button } from '../ui/button';
import { Paginate } from '../ui/Paginate';
import ToggleColumnDropDown from './ToggleColumnDropDown';
import UsersTableSearchBar from './UsersTableSearchBar';

const UsersTable = ({ userss }: { userss: TUserSchema[] }) => {
  const users = useMemo(() => {
    return userss;
  }, []);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState(() =>
    Object.fromEntries(
      USER_TABLE_COLUMNS.map((col) => [col.accessorKey, true]),
    ),
  );

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = React.useMemo(() => {
    return filteredUsers.slice(
      (currentPage - 1) * USERS_PER_PAGE,
      currentPage * USERS_PER_PAGE,
    );
  }, [filteredUsers, currentPage]);

  const [columnSizing, setColumnSizing] = useState({});
  const visibleUserTableColumns = useMemo(() => {
    return USER_TABLE_COLUMNS.filter(
      (col) => visibleColumns[col.accessorKey] !== false,
    );
  }, [visibleColumns]);

  const table = useReactTable({
    data: paginatedUsers,
    columns: visibleUserTableColumns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 150,
      minSize: 100,
      maxSize: 600,
    },
    state: {
      columnSizing,
    },
    onColumnSizingChange: setColumnSizing,
  });

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  React.useEffect(() => {
    console.log('Filtered users:', filteredUsers.length);
    console.log('Paginated users:', paginatedUsers.length);
  }, [filteredUsers, paginatedUsers]);

  return (
    <Card className='mx-auto mt-4 w-full max-w-screen-xl gap-4 overflow-x-auto rounded-md border px-4 py-6 sm:px-6'>
      <h1 className='mb-4 text-3xl font-bold'>All Users</h1>

      <div className='flex flex-col items-start gap-2 pb-4 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <Button className='mb-4'>Add User</Button>
          <UsersTableSearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ToggleColumnDropDown
          columns={USER_TABLE_COLUMNS.map((col) => ({
            accessorKey: col.accessorKey,
            header:
              typeof col.header === 'string' ? col.header : col.accessorKey,
          }))}
          visibleColumns={visibleColumns}
          toggleColumn={toggleColumn}
        />
      </div>

      <div className='mt-4 w-full overflow-x-auto rounded-md border'>
        <div className='min-w-max'>
          <Table className='min-w-full table-auto'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`sticky top-0 z-10 bg-gray-200 dark:bg-zinc-800 ${header.index === 0 ? 'left-0 z-20 bg-gray-200 dark:bg-zinc-800' : ''}`}
                      style={{
                        width: `${header.getSize()}px`,
                        position: 'relative',
                      }}
                    >
                      <div className='flex w-full items-center justify-between'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className='bg-muted absolute top-0 right-0 h-full w-2 shrink-0 cursor-col-resize'
                        />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={USER_TABLE_COLUMNS.length}
                    className='text-muted-foreground text-center'
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: `${cell.column.getSize()}px` }}
                        className={`${cell.column.getIndex() === 0 ? 'sticky left-0 z-10 bg-white dark:bg-zinc-900' : ''}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Paginate
        page={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </Card>
  );
};

export default UsersTable;
