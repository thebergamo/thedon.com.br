import VerifyEmail from 'components/Auth/VerifyEmail';
import { AuthLayout } from 'components/Layout/AuthLayout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const Verify: NextPageWithLayout = () => {
  return <VerifyEmail />;
};

Verify.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout avatarSrc="/avatar.png" avatarAlt="Marcos Avatar thumbs up!">
      {page}
    </AuthLayout>
  );
};

export default Verify;
