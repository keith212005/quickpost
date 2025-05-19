import React from 'react';

import UsersTable from '@/components/tables/UsersTable';

const UsersPage = () => {
  return (
    <div className='bg-background text-foreground min-h-screen px-4 py-6'>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
