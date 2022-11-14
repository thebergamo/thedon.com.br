import { FormProvider as Form } from 'react-hook-form';

type FormProviderProps = {
  methods: any;
  onSubmit: (e: any) => Promise<void>;
  children: React.ReactElement;
};

export default function FormProvider({
  methods,
  onSubmit,
  children
}: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
