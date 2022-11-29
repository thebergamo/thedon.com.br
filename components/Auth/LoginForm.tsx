import * as Yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { LoadableButton } from 'components/LoadableButton/LoadableButton'
import { useRouter } from 'next/router'
import { Github } from 'components/Icons/Github'

type ErrorCode = 'CredentialsSignin' | 'Default'

const errorCodes = {
  CredentialsSignin:
    'Sign In failed. Check the details you provided are correct.',
  Default: 'Sign In failed. Please use Contact Page to talk with code: FAUTH',
}

export default function LoginForm() {
  const { query } = useRouter()
  let callbackUrl = query.callbackUrl || '/'
  const errorCode: ErrorCode = query.error as ErrorCode

  if (Array.isArray(callbackUrl)) {
    callbackUrl = callbackUrl[0]
  }

  return (
    <div className="mt-8 space-y-6">
      {errorCode && (
        <div className="rounded-md shadow-md bg-blue-600 p-4">
          <p className="text-gray-50">{errorCodes[errorCode]}</p>
        </div>
      )}

      <div>
        <LoadableButton
          onClick={() => signIn('github')}
          Icon={<Github />}
          isLoading={false}
          type="button"
        >
          Sign In with Github
        </LoadableButton>
      </div>
    </div>
  )
}
