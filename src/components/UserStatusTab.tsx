import React from 'react';

type UserStatusTabProps = {
  isActive: boolean;
};

const UserStatusTab = ({ isActive }: UserStatusTabProps) => {
  return (
    <div
      className={`${
        isActive ? 'bg-green-500' : 'bg-red-500'
      } flex h-8 w-20 items-center justify-center rounded-full text-sm text-white`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </div>
  );
};

export default UserStatusTab;
