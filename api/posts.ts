import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { payloadClient } from './apiClient'

type Author = {
  name: string
  email: string
}

type Posts = {
  docs: PostType[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

type PostFilter = {
  limit: number
  page?: number
}

export function fetchPosts(
  { limit, page }: PostFilter,
  token?: string
): Promise<Posts> {
  return payloadClient<Posts>({
    endpoint: `api/posts?limit=${limit}${page ? `&page=${page}` : ''}`,
    token,
  })
}

export function usePosts(limit: number, page: number) {
  const { data } = useSession()
  const token = '' //data?.jwt;

  return useQuery({
    queryKey: ['posts', { limit, page }, token],
    queryFn: () => fetchPosts({ limit, page }, token),
    refetchOnWindowFocus: false,
  })
}
