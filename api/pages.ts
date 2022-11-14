import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { payloadClient } from './apiClient';

type Page = {
  title: string;
  layout: Layout[];
  meta: MetaType;
};
type Pages = {
  docs: Page[];
};

function fetchGlobal(
  slug: string,
  { token, locale }: { token?: string; locale?: string }
): Promise<Pages> {
  return payloadClient({
    endpoint: `api/pages?where[slug][equals]=${slug}&locale=${locale}`,
    token
  });
}

export function usePage(slug: string) {
  const { locale } = useRouter();
  const { data } = useSession();
  const token = data?.jwt;

  return useQuery({
    queryKey: ['page', slug, token, locale],
    queryFn: () => fetchGlobal(slug, { token, locale }),
    refetchOnWindowFocus: false
  });
}
