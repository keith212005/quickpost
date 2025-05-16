import React from 'react';

import { getAllUsers } from '@/app/actions/getAllUsers';
import UsersTable from '@/components/tables/UsersTable';

const UsersPage = async () => {
  const users = await getAllUsers();

  // console.log('Server logs users:', users.length);
  return (
    <div className='bg-background text-foreground min-h-screen px-4 py-6'>
      <UsersTable userss={users} />
    </div>
  );
};

export default UsersPage;
