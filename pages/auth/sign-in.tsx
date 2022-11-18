import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import LoginForm from 'components/Auth/LoginForm'
import { AuthLayout } from 'components/Layout/AuthLayout'
import { ReactElement } from 'react'
import RootLayout from 'components/Layout/Root'

function SignIn() {
  return <LoginForm />
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      avatarSrc="/avatar-contact.png"
      avatarAlt="Marcos Avatar fistbump!"
      title="Sign In to access exclusive content"
    >
      {page}
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
