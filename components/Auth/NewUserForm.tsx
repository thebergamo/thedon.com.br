'use client';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { LoadableButton } from 'components/LoadableButton/LoadableButton';
import { SimpleField } from 'components/Form/Field';
import { Rocket } from 'components/Icons/Rocket';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface NewUserValues {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string | undefined;
}

const NewUserSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  repeatedPassword: Yup.string()
    .required('Repeated password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

async function createNewMember(user: Omit<NewUserValues, 'repeatedPassword'>) {
  const membersUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/members`;
  const res = await fetch(membersUrl, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  });
  const newUser = await res.json();

  return newUser;
}

export default function NewUserForm() {
  const { push } = useRouter();
  const [formError, setFormError] = useState<string | undefined>();
  const defaultValues: NewUserValues = {
    name: '',
    email: '',
    password: '',
    repeatedPassword: ''
  };

  const onSubmit: SubmitHandler<NewUserValues> = async ({
    repeatedPassword,
    ...user
  }: NewUserValues) => {
    try {
      await createNewMember(user);
      await push('/auth/verify');
    } catch (err) {
      setFormError(
        'There was a problem creating your account. Please try again later.'
      );
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = useForm<NewUserValues>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
    mode: 'onChange'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-md shadow-sm">
      <div className="mt-8 space-y-6">
        {formError && (
          <div className="rounded-md shadow-md bg-blue-600 p-4">
            <p className="text-white">{formError}</p>
          </div>
        )}

        <div className="rounded-md shadown-sm">
          <SimpleField
            controlled={{
              control,
              name: 'email'
            }}
            id="email-address"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
          />
          <SimpleField
            id="name"
            label="Name"
            placeholder="Your name"
            controlled={{
              control,
              name: 'name'
            }}
          />
          <SimpleField
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            placeholder="Password"
            required
            controlled={{
              control,
              name: 'password'
            }}
          />
          <SimpleField
            id="repeatedPassword"
            type="password"
            label="Confirm Password"
            autoComplete="current-password"
            placeholder="Re-Type Password"
            required
            controlled={{
              control,
              name: 'repeatedPassword'
            }}
          />
        </div>
        <LoadableButton
          type="submit"
          Icon={<Rocket />}
          isLoading={isSubmitting}
        >
          Become a Member!
        </LoadableButton>
      </div>
    </form>
  );
}
