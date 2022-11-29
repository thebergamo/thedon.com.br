import '../styles/globals.css'

import { ThemeProvider } from 'next-themes'
import { SessionProvider, useSession } from 'next-auth/react'

import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { PropsWithChildren, ReactElement, ReactNode, useState } from 'react'
import Root from 'components/Layout/Root'
import { ScrollInfoProvider } from '@faceless-ui/scroll-info'
import { WindowInfoProvider } from '@faceless-ui/window-info'
import { Session } from 'next-auth'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NextIntlProvider } from 'next-intl'
import { useRouter } from 'next/router'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: typeof Root
  auth?: boolean
}

type PageProps = {
  messages: IntlMessages
  session?: Session
  dehydratedState?: unknown
}

type AppPropsWithLayout = AppProps<PageProps> & {
  Component: NextPageWithLayout<PageProps>
}

const breakpoints = {
  xs: '480',
  s: '600',
  m: '850',
  l: '1280',
  xl: '1680',
  xxl: '1920',
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Create a client
  const [queryClient] = useState(() => new QueryClient())
  const Layout = Component.Layout || Root
  const authenticated = Component.auth || false
  return (
    <ScrollInfoProvider>
      <WindowInfoProvider breakpoints={breakpoints}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <SessionProvider session={session}>
              <ThemeProvider attribute="class">
                <SessionAware authRoute={authenticated}>
                  <NextIntlProvider messages={pageProps.messages}>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </NextIntlProvider>
                </SessionAware>
              </ThemeProvider>
            </SessionProvider>
          </Hydrate>
        </QueryClientProvider>
      </WindowInfoProvider>
    </ScrollInfoProvider>
  )
}

const SessionAware: React.FC<PropsWithChildren<{ authRoute: boolean }>> = ({
  children,
  authRoute,
}) => {
  const { push } = useRouter()
  const { status } = useSession()

  if (status === 'loading') {
    return null
  }

  if (authRoute && status !== 'authenticated') {
    push('404')
    return null
  }

  return <>{children}</>
}

export default MyApp
