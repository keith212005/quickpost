'use client';
import React, { lazy, Suspense, useMemo, useState } from 'react';
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
import { TUserSchema } from '@/types/dbTablesTypes';

const LazyPaginate = lazy(async () => ({
  default: (await import('../ui/Paginate')).Paginate,
}));
import UsersTableSkeleton from '@/app/(auth)/admin/users/loading';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';

import UsersTableSearchBar from './UsersTableSearchBar';

const LazyActions = lazy(() => import('./Actions'));
const LazyToggleColumnDropDown = lazy(() => import('./ToggleColumnDropDown'));

const UsersTable = () => {
  // Configuration constants
  const [visibleColumns, setVisibleColumns] = useState(() =>
    Object.fromEntries(
      USER_TABLE_COLUMNS.map((col) => [
        col.accessorKey,
        !['id', 'image'].includes(col.accessorKey), // hide these columns
      ]),
    ),
  );
  const [columnSizing, setColumnSizing] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Data fetching

  const { isPending, data } = usePaginatedQuery(
    ['users', page, search],
    () =>
      fetch(`/api/getAllUsers?page=${page}&search=${search}`).then((res) =>
        res.json(),
      ),
    page,
  );

  const users: TUserSchema[] = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  // Toggle visibility of columns
  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  // Calculate total pages from API, accounting for search and filtered count
  const totalPages = useMemo(() => {
    if (search && data?.totalFilteredCount !== undefined) {
      return Math.max(1, Math.ceil(data.totalFilteredCount / 10)); // assuming 10 items per page
    }
    return data?.totalPages ?? 1;
  }, [search, data]);

  // Extract visible columns based on visibility state
  const visibleUserTableColumns = useMemo(
    () =>
      USER_TABLE_COLUMNS.filter(
        (col) => visibleColumns[col.accessorKey] !== false,
      ),
    [visibleColumns],
  );

  // Pagination handled on server, use filteredUsers directly
  const paginatedUsers = users;

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

  // Reset page on search change
  React.useEffect(() => {
    setPage(1);
  }, [search]);

  // Ensure current page is valid after data refetch
  React.useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const SearchAndAddUserControls = (
    <div className='flex flex-col items-start gap-2 pb-4 sm:flex-row sm:items-start sm:justify-between'>
      <div>
        <UsersTableSearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Suspense
        fallback={
          <div className='text-muted-foreground text-sm'>
            Loading columns...
          </div>
        }
      >
        <LazyToggleColumnDropDown
          columns={USER_TABLE_COLUMNS.map((col) => ({
            accessorKey: col.accessorKey,
            header:
              typeof col.header === 'string' ? col.header : col.accessorKey,
          }))}
          visibleColumns={visibleColumns}
          toggleColumn={toggleColumn}
        />
      </Suspense>
    </div>
  );

  const FixedActionColumn = (
    <div className='sticky left-0 z-10 border-r bg-white dark:bg-zinc-900'>
      <Table>
        <TableHeader>
          <TableRow className='h-14 align-middle'>
            <TableHead className='text-muted-foreground w-[50px] text-center text-sm font-semibold'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id} className='h-14 align-middle'>
              <TableCell className='text-muted-foreground h-14 w-[50px] px-2 py-1 text-sm'>
                <div className='flex h-full items-center justify-center'>
                  <Suspense fallback={<div className='text-center'>...</div>}>
                    <LazyActions user={user} />
                  </Suspense>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  if (isPending) {
    return <UsersTableSkeleton />;
  }

  console.log('data:', data);

  return (
    <Card className='mx-auto mt-4 w-full max-w-screen-xl gap-4 rounded-md border px-4 py-6 sm:px-6'>
      <h1 className='text-muted-foreground mb-4 text-3xl font-bold'>
        All Users
      </h1>

      {SearchAndAddUserControls}

      <div className='flex w-full overflow-x-auto'>
        {FixedActionColumn}

        <div className='min-w-max'>
          <Table className='min-w-full table-auto'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='h-14 align-middle'>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className='text-muted-foreground relative bg-gray-200 text-center text-sm font-semibold dark:bg-zinc-800'
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
                    className='text-muted-foreground py-6 text-center text-sm'
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
                        className={`text-muted-foreground h-14 px-2 py-1 align-middle text-sm ${
                          cell.column.id === 'email' ||
                          cell.column.id === 'name'
                            ? 'text-left'
                            : 'text-center'
                        }`}
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

      {totalPages > 1 && (
        <Suspense
          fallback={
            <div className='text-muted-foreground text-center'>
              Loading pagination...
            </div>
          }
        >
          <LazyPaginate page={page} totalPages={totalPages} setPage={setPage} />
        </Suspense>
      )}
    </Card>
  );
};

export default UsersTable;
