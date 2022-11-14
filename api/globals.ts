import { useQueries } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { payloadClient } from './apiClient'

function fetchGlobal<ResultType>(
  name: 'header' | 'footer' | 'social-media',
  token?: string,
  locale?: string
): Promise<ResultType> {
  return payloadClient({
    endpoint: `api/globals/${name}?locale=${locale}`,
    token,
  })
}

export function useGlobals() {
  const { locale } = useRouter()
  const { data } = useSession()
  const token = '' //data?.jwt;

  console.log('globals', { data })
  return useQueries({
    queries: [
      {
        queryKey: ['globals', 'header', locale, token],
        queryFn: () => fetchGlobal<HeaderType>('header', token, locale),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['globals', 'footer', locale, token],
        queryFn: () => fetchGlobal<FooterType>('footer', token, locale),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['globals', 'social-media', locale, token],
        queryFn: () =>
          fetchGlobal<SocialMediaType>('social-media', token, locale),
        refetchOnWindowFocus: false,
      },
    ],
  })
}
