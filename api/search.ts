import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { payloadClient } from './apiClient'

type Results = {
  docs: SearchType[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export function fetchSearchResults(
  { term }: { term: string },
  token?: string
): Promise<Results> {
  return payloadClient<Results>({
    endpoint: `api/search?where[or][0][title][like]=${term}`,
    token,
  })
}

export function useSearch(term: string) {
  const { data } = useSession()
  const token = '' // data?.jwt;

  return useQuery({
    queryKey: ['searchResults', { term }, token],
    queryFn: () => fetchSearchResults({ term }, token),
    refetchOnWindowFocus: false,
    enabled: Boolean(term),
  })
}
