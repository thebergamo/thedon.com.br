import { Loader } from 'components/Loader/Loader';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

type Props = {
  avatarSrc: string;
  avatarAlt: string;
  title?: string;
  subTitle?: string;
};

export const AuthLayout: React.FC<PropsWithChildren<Props>> = ({
  avatarSrc,
  avatarAlt,
  title,
  subTitle,
  children
}) => {
  const { push } = useRouter();
  const { status } = useSession();
  if (status === 'authenticated') {
    push('/');
    return null;
  }

  return (
    <main className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {status === 'loading' && <Loader />}
      {status === 'unauthenticated' && (
        <section className="w-lg  bg-gray-50 dark:bg-gray-800 dark:text-gray-100 rounded shadow max-w-md space-y-8 p-8">
          <div>
            <Image
              width={100}
              height={100}
              className="mx-auto h-20 w-auto"
              src={avatarSrc}
              alt={avatarAlt}
            />
            {title && (
              <h1 className="mt-6 text-center text-3xl font-bold tracking-tight">
                {title}
              </h1>
            )}
            {subTitle && (
              <h2 className="mt-4 text-center text-xl tracking-tight">
                {subTitle}
              </h2>
            )}
          </div>
          {children}
        </section>
      )}
    </main>
  );
};
