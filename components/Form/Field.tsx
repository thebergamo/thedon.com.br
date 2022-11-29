import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type InputProps = React.HTMLProps<HTMLInputElement> & {
  label: string
}

type TextAreaProps = React.HTMLProps<HTMLTextAreaElement> & {
  label: string
}

type FieldProps<T extends FieldValues, FieldTypeProps> = FieldTypeProps & {
  controlled: UseControllerProps<T>
}

const inputStyles =
  'mt-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 dark:text-gray-200 text-gray-900 dark:placeholder-gray-300 placeholder-gray-500 focus:z-10 focus:border-gray-50 focus:outline-none focus:ring-gray-50 sm:text-sm'

export function TextAreaField<T extends FieldValues>({
  controlled,
  value,
  ...props
}: FieldProps<T, TextAreaProps>) {
  const { field, fieldState, formState } = useController(controlled)

  return (
    <div className="container mt-2 mb-2">
      <label htmlFor={field.name} className="text-sm">
        {props.label}
      </label>
      <textarea
        className={inputStyles}
        {...field}
        {...props}
        disabled={formState.isSubmitting}
      >
        {value}
      </textarea>
      {fieldState.error && (
        <em className="text-sm text-red-500">{fieldState.error.message}</em>
      )}
    </div>
  )
}

export function SimpleField<T extends FieldValues>({
  controlled,
  ...props
}: FieldProps<T, InputProps>) {
  const { field, fieldState, formState } = useController(controlled)

  return (
    <div className="container mt-2 mb-2">
      <label htmlFor={field.name} className="text-sm">
        {props.label}
      </label>
      <input
        className={inputStyles}
        {...field}
        {...props}
        disabled={formState.isSubmitting}
      />
      {fieldState.error && (
        <em className="text-sm text-red-500">{fieldState.error.message}</em>
      )}
    </div>
  )
}
