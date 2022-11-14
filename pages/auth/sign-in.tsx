import LoginForm from 'components/Auth/LoginForm';
import { AuthLayout } from 'components/Layout/AuthLayout';
import { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';

const SignIn: NextPageWithLayout = () => {
  return <LoginForm />;
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      avatarSrc="/avatar-contact.png"
      avatarAlt="Marcos Avatar fistbump!"
      title="Sign In to access exclusive content"
    >
      {page}
    </AuthLayout>
  );
};

export default SignIn;
