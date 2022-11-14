import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross } from 'components/Icons/Cross';
import { PropsWithChildren } from 'react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export const DialogContent: React.FC<
  PropsWithChildren<DialogPrimitive.DialogContentProps>
> = ({ children, ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="bg-black opacity-70 fixed inset-0 animate-overlayShow" />
    <DialogPrimitive.Content className="bg-gray-800 rounded-lg w-1/2 top-1/4 left-1/4 fixed p-8 animate-contentShow">
      {children}
      <DialogPrimitive.Close asChild>
        <div className="h-8 w-8 inline-flex justify-center items-center absolute top-5 right-5">
          <Cross />
        </div>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
