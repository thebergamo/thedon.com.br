import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { payloadClient } from './apiClient';

type Medias = {
  docs: MediaType[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type MediaFilter = {
  limit: number;
  tag: string[];
  page?: number;
};

export function fetchMedia(
  { limit, page, tag }: MediaFilter,
  token?: string
): Promise<Medias> {
  const tagQuery = `where[tags][in]=${tag.join(',')}`;
  return payloadClient<Medias>({
    endpoint: `api/media?${tagQuery}&limit=${limit}${
      page ? `&page=${page}` : ''
    }`,
    token
  });
}

export function useMedias(limit: number, page: number, tag: string[]) {
  const { data } = useSession();
  const token = data?.jwt;

  return useQuery({
    queryKey: ['medias', { limit, page, tag }, token],
    queryFn: () => fetchMedia({ limit, page, tag }, token),
    refetchOnWindowFocus: false
  });
}
