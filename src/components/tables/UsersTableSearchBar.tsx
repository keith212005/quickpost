import React from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const UsersTableSearchBar = (props: React.ComponentProps<'input'>) => {
  return (
    <div className='mb-2 flex flex-col items-center gap-2 md:flex-row'>
      <Input
        type='text'
        placeholder='Filter users...'
        className='w-1/3'
        {...props}
      />
      <Button>Add User</Button>
    </div>
  );
};

export default UsersTableSearchBar;
