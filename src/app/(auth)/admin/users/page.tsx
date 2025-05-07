import React from 'react';

import { getAllUsers } from '@/app/actions/getAllUsers';
import UsersTable from '@/components/tables/UsersTable';

const UsersPage = async () => {
  const users = await getAllUsers();

  console.log({ users });
  return <UsersTable users={users} />;
};

export default UsersPage;
