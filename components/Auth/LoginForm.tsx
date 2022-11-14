import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { LoadableButton } from 'components/LoadableButton/LoadableButton';
import { Lock } from 'components/Icons/Lock';
import { useRouter } from 'next/router';
import { SimpleField } from 'components/Form/Field';
import Link from 'next/link';

interface loginValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

type ErrorCode = 'CredentialsSignin' | 'Default';

const errorCodes = {
  CredentialsSignin:
    'Sign In failed. Check the details you provided are correct.',
  Default: 'Sign In failed. Please use Contact Page to talk with code: FAUTH'
};

export default function LoginForm() {
  const { query } = useRouter();
  let callbackUrl = query.callbackUrl || '/';
  const errorCode: ErrorCode = query.error as ErrorCode;

  if (Array.isArray(callbackUrl)) {
    callbackUrl = callbackUrl[0];
  }

  const defaultValues: loginValues = {
    email: '',
    password: ''
  };

  const onSubmit: SubmitHandler<loginValues> = async ({
    email,
    password
  }: loginValues) => {
    // Do auth
    const response = await signIn('credentials', {
      email,
      password,
      callbackUrl: callbackUrl as string
    });
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 space-y-6">
        {errorCode && (
          <div className="rounded-md shadow-md bg-blue-600 p-4">
            <p className="text-gray-50">{errorCodes[errorCode]}</p>
          </div>
        )}
        <div className="-space-y-px rounded-md shadow-sm">
          <SimpleField
            id="email-address"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            controlled={{
              control,
              name: 'email',
              rules: { required: true }
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
              name: 'password',
              rules: { required: true }
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/auth/sign-up"
              className="font-medium dark:hover:text-gray-300"
            >
              New here? Sign Up
            </Link>
          </div>
          <div className="text-sm">
            <Link
              href="/auth/forgot-password"
              className="font-medium dark:hover:text-gray-300"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <LoadableButton
            type="submit"
            Icon={<Lock />}
            isLoading={isSubmitting}
          >
            Sign In
          </LoadableButton>
        </div>
      </div>
    </form>
  );
}
