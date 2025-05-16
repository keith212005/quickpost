import React from 'react';

import { Input } from '../ui/input';

const UsersTableSearchBar = (props: React.ComponentProps<'input'>) => {
  return (
    <div className='mb-2 flex flex-col items-center gap-2 md:flex-row'>
      <Input
        type='text'
        placeholder='Filter users...'
        className='md:w-auto'
        {...props}
      />
    </div>
  );
};

export default UsersTableSearchBar;
