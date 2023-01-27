import * as PopoverPrimitive from '@radix-ui/react-popover';
import { PropsWithChildren } from 'react';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent: React.FC<
  PropsWithChildren<PopoverPrimitive.PopoverContentProps>
> = ({ children, ...props }) => {
  return (
    <PopoverPrimitive.Content {...props} className="mt-3">
      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="relative grid gap-6 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-5 py-6 sm:gap-8 sm:p-8">
          {children}
        </div>
      </div>
    </PopoverPrimitive.Content>
  );
};
