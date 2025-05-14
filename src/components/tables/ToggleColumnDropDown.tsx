import React from 'react';
import { Check, Settings2 } from 'lucide-react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

type ToggleColumnDropDownProps = {
  columns: string[];
  visibleColumns: Record<string, boolean>;
  toggleColumn: (col: string) => void;
};

const ToggleColumnDropDown = ({
  columns,
  visibleColumns,
  toggleColumn,
}: ToggleColumnDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm'>
          <Settings2 className='mr-2 h-4 w-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='border-border bg-background z-50 mt-2 w-40 rounded-md border p-2 shadow-md focus:outline-none'>
        <div className='p-2'>
          <h4 className='mb-2 px-2 text-sm font-bold'>Toggle columns</h4>
          <Separator />
          <div className='mt-2 flex flex-col gap-1'>
            {columns.map((col) => (
              <div key={col} onClick={() => toggleColumn(col)}>
                <label className='hover:bg-muted flex cursor-pointer flex-row items-center rounded-sm px-2 py-1 text-sm'>
                  <div className='flex h-4 w-4 items-center justify-center'>
                    {visibleColumns[col] && <Check className='h-4 w-4' />}
                  </div>
                  <span className='ml-2'>{col}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToggleColumnDropDown;
