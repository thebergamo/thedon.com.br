import NewUserForm from 'components/Auth/NewUserForm';
import { AuthLayout } from 'components/Layout/AuthLayout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const SignUp: NextPageWithLayout = () => {
  return <NewUserForm />;
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      avatarSrc="/avatar-hello.png"
      avatarAlt="Marcos Avatar smilling!"
      title="You're one step closer to my exclusive content!"
      subTitle="You're one step closer to my exclusive content!"
    >
      {page}
    </AuthLayout>
  );
};

export default SignUp;
