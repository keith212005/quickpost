import { TUserSchema } from '@/types/dbTablesTypes';

export const StatusTab = ({ user }: { user: TUserSchema }) => {
  return (
    <span
      className={`inline-block w-[80px] rounded-full px-[10px] py-[4px] text-center text-xs font-semibold ${
        user.isActive
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {user.isActive ? 'Active' : 'Inactive'}
    </span>
  );
};
