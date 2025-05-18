'use client';
import React, { Suspense } from 'react';

import UsersTable from '@/components/tables/UsersTable';

import UsersTableSkeleton from './loading';

const UsersPage = () => {
  return (
    <div className='bg-background text-foreground min-h-screen px-4 py-6'>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </div>
  );
};

export default UsersPage;
