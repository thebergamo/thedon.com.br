import {
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form';

type InputProps = React.HTMLProps<HTMLInputElement> & {
  label: string;
};

type FieldProps<T extends FieldValues> = InputProps & {
  controlled: UseControllerProps<T>;
};

export function SimpleField<T extends FieldValues>({
  controlled,
  ...props
}: FieldProps<T>) {
  const { field, fieldState, formState } = useController(controlled);

  return (
    <div className="container mt-2 mb-2">
      <label htmlFor={field.name} className="text-sm">
        {props.label}
      </label>
      <input
        className="mt-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 dark:text-gray-200 text-gray-900 dark:placeholder-gray-300 placeholder-gray-500 focus:z-10 focus:border-gray-50 focus:outline-none focus:ring-gray-50 sm:text-sm"
        {...field}
        {...props}
        disabled={formState.isSubmitting}
      />
      {fieldState.error && (
        <em className="text-sm text-red-500">{fieldState.error.message}</em>
      )}
    </div>
  );
}
