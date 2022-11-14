import { APIError } from 'api/APIError';
import { SimpleField } from 'components/Form/Field';
import { Loading } from 'components/Icons/Loading';
import { Rocket } from 'components/Icons/Rocket';
import { LoadableButton } from 'components/LoadableButton/LoadableButton';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const verify = async (token: string) => {
  const membersUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/members`;
  const res = await fetch(`${membersUrl}/verify/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const body = await res.json();

  if (!res.ok) {
    throw new APIError(res.statusText, res.status, body);
  }

  return body;
};

export default function VerifyEmail() {
  const [formError, setFormError] = useState<string | undefined>();
  const { query, push, replace } = useRouter();
  const token = query.token ?? null;

  useEffect(() => {
    if (token) {
      handleVerify({ verifyToken: token as string });
    }
  }, []);

  useEffect(() => {
    if (token && formError) {
      replace('/auth/verify', undefined, { shallow: true });
    }
  }, [token, formError, replace]);

  const title = token ? 'Welcome back!' : 'Checkout your inbox';
  const subTitle = token
    ? "Now you're a member!"
    : 'Paste the token you got from our email';

  const handleVerify = async ({ verifyToken }: { verifyToken: string }) => {
    try {
      await verify(verifyToken);
      push('/auth/sign-in');
    } catch (err) {
      if (err instanceof APIError) {
        setFormError(err.getErrorMessages());
      } else {
        setFormError('Unexpected error');
      }
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = useForm({
    defaultValues: { verifyToken: '' }
  });

  return (
    <>
      <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
      <h2 className="text-center text-xl tracking-tight text-gray-900">
        {subTitle}
      </h2>
      {formError && (
        <div className="rounded-md shadow-md bg-blue-600 p-4">
          <p className="text-white">{formError}</p>
        </div>
      )}
      {token && (
        <>
          <div className="relative flex w-full justify-center pb-4 text-slate-400">
            <span className="absolute w-10 h-10">
              <Loading />
            </span>
          </div>
          <p className="mt-4 text-center text-lg tracking-tight text-gray-900">
            Verifying token...
          </p>
        </>
      )}
      {!token && (
        <form
          onSubmit={handleSubmit(handleVerify)}
          className="rounded-md shadow-sm"
        >
          <div>
            <SimpleField
              controlled={{
                control,
                name: 'verifyToken'
              }}
              id="token"
              label="Verification Token"
              required
              placeholder="Paste your token here"
            />
            <LoadableButton
              type="submit"
              Icon={<Rocket />}
              isLoading={isSubmitting}
            >
              Verify me!
            </LoadableButton>
          </div>
        </form>
      )}
    </>
  );
}
