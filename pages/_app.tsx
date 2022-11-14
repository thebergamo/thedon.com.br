import '../styles/globals.css'

import { ThemeProvider } from 'next-themes'
import { getSession, SessionProvider, useSession } from 'next-auth/react'

import type { AppContext, AppProps } from 'next/app'
import { GetServerSidePropsContext, NextPage } from 'next'
import { PropsWithChildren, ReactElement, ReactNode } from 'react'
import Root from 'components/Layout/Root'
import App from 'next/app'
import { ScrollInfoProvider } from '@faceless-ui/scroll-info'
import { WindowInfoProvider } from '@faceless-ui/window-info'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlProvider } from 'next-intl'
import { IntlMessages } from '../globals'

// Create a client
const queryClient = new QueryClient()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type PageProps = {
  messages: IntlMessages
  session?: Session
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
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ScrollInfoProvider>
      <WindowInfoProvider breakpoints={breakpoints}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class">
              <SessionAware>
                <NextIntlProvider messages={pageProps.messages}>
                  <Root>{getLayout(<Component {...pageProps} />)}</Root>
                </NextIntlProvider>
              </SessionAware>
            </ThemeProvider>
          </SessionProvider>
        </QueryClientProvider>
      </WindowInfoProvider>
    </ScrollInfoProvider>
  )
}

const SessionAware: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession()

  if (status === 'loading') {
    return null
  }

  return <>{children}</>
}

export default MyApp
