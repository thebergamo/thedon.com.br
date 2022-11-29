import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import LoginForm from 'components/Auth/LoginForm'
import { AuthLayout } from 'components/Layout/AuthLayout'
import RootLayout from 'components/Layout/Root'

function SignIn() {
  return (
    <AuthLayout
      avatarSrc="/avatar-contact.png"
      avatarAlt="Marcos Avatar fistbump!"
      title="Sign In to access exclusive content"
    >
      <LoginForm />
    </AuthLayout>
  )
}

SignIn.messages = ['SignIn', ...RootLayout.messages]

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: pick(
        await import(`../../messages/${locale}.json`),
        SignIn.messages
      ),
    },
  }
}

export default SignIn
