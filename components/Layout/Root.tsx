import Head from 'next/head'
import { useRouter } from 'next/router'

import { Header } from 'components/Globals/Header'
import Footer from 'components/Globals/Footer'
import { PropsWithChildren } from 'react'
import { Subscribe } from 'components/Subscribe'

export default function RootLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const meta = {
    title: 'Marcos Bérgamo',
    description: `Writer, mostly software writer`,
    type: 'website',
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://thedon.com.br${router.asPath}`}
        />
        <link rel="canonical" href={`https://thedon.com.br${router.asPath}`} />
        <link
          key="rss-feed"
          rel="alternative"
          type="application/rss+xml"
          title="RSS feed for thedon.com.br"
          href="/feed.xml"
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Marcos Bérgamo" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@thebergamo" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>

      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50  dark:bg-gray-900"
      >
        <Header />
        <div className="flex flex-col justify-center items-start mx-auto max-w-4xl pb-16">
          {children}
          <Subscribe />
        </div>
        <Footer />
      </main>
    </div>
  )
}

RootLayout.messages = ['Root', ...Header.messages, ...Footer.messages]
