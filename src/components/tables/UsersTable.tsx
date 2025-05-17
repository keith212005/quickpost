'use client';
import React, { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

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
import { USERS_PER_PAGE } from '@/constants/dummyData';
import { TUserSchema } from '@/types/dbTablesTypes';

import { Button } from '../ui/button';
import { Paginate } from '../ui/Paginate';
import Actions from './Actions';
import ToggleColumnDropDown from './ToggleColumnDropDown';
import UsersTableSearchBar from './UsersTableSearchBar';

const UsersTable = ({ userList }: { userList: TUserSchema[] }) => {
  const users = useMemo(
    () => (Array.isArray(userList) ? userList : []),
    [userList],
  );

  // State declarations
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState(() =>
    Object.fromEntries(
      USER_TABLE_COLUMNS.map((col) => [
        col.accessorKey,
        !['id', 'image'].includes(col.accessorKey), // hide these columns
      ]),
    ),
  );
  const [columnSizing, setColumnSizing] = useState({});

  // Toggle visibility of columns
  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  // Filter users based on search input
  const filteredUsers = useMemo(() => {
    return (users ?? []).filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  // Extract visible columns based on visibility state
  const visibleUserTableColumns = useMemo(() => {
    return USER_TABLE_COLUMNS.filter(
      (col) => visibleColumns[col.accessorKey] !== false,
    );
  }, [visibleColumns]);

  // Paginate filtered users
  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(
      (currentPage - 1) * USERS_PER_PAGE,
      currentPage * USERS_PER_PAGE,
    );
  }, [filteredUsers, currentPage]);

  // React table instance
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

  // Reset current page if it exceeds total pages
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <Card className='mx-auto mt-4 w-full max-w-screen-xl gap-4 rounded-md border px-4 py-6 sm:px-6'>
      <h1 className='mb-4 text-3xl font-bold'>All Users</h1>

      {/* Search and Add User Controls */}
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

      {/* Table with fixed Action column and scrollable content */}
      <div className='flex w-full overflow-x-auto'>
        {/* Fixed Action Column */}
        <div className='sticky left-0 z-30 border-r bg-white dark:bg-zinc-900'>
          <Table>
            <TableHeader>
              <TableRow className='h-14 align-middle'>
                <TableHead className='w-[50px] text-center'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id} className='h-14 align-middle'>
                  <TableCell className='h-14 w-[50px] text-center align-middle'>
                    <Actions user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Scrollable Table */}
        <div className='min-w-max'>
          <Table className='min-w-full table-auto'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='h-14 align-middle'>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className='relative bg-gray-200 text-center dark:bg-zinc-800'
                      style={{
                        width: `${header.getSize()}px`,
                      }}
                    >
                      <div className='w-full text-center'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className='bg-muted absolute top-0 right-0 h-full w-2 shrink-0 cursor-col-resize transition-colors duration-200 hover:bg-gray-400'
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
                  <TableRow key={row.id} className='h-14 align-middle'>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: `${cell.column.getSize()}px` }}
                        className='h-14 text-center align-middle'
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

      {/* Pagination Controls */}
      <Paginate
        page={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </Card>
  );
};

export default UsersTable;
