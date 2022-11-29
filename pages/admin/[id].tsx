import pick from 'lodash/pick'
import { GetServerSidePropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'
import IssueForm from 'components/Issue/IssueForm'
import { useRouter } from 'next/router'
import { getIssue, updateIssue } from 'lib/newsletter'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueries,
  useQuery,
} from '@tanstack/react-query'

export type Props = {
  id: number
}

function UpdateIssuePage(props: Props) {
  const t = useTranslations('UpdateNewsletter')
  const { push } = useRouter()
  const { data = {} } = useQuery({
    queryKey: issueQueryKey(props.id),
    queryFn: () => getIssue(props.id),
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  })

  const mutation = useMutation({
    mutationFn: updateIssue,
  })

  const { publishedDate = '', ...restIssue } = data

  const newPublishedDate = publishedDate ? publishedDate.split('Z')[0] : ''
  const issue: Issue = {
    ...restIssue,
    publishedDate: newPublishedDate,
  }

  const handleUpdate = async (values: Omit<Issue, 'id'>) => {
    const id = props.id
    await mutation.mutateAsync({ id, ...values })
    await push('/admin')
  }

  return (
    <div className="w-full md:w-[640px] lg:w-[820px]">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>
            {t('title')} - {data.title}
          </h1>
        </div>
      </section>
      <IssueForm data={issue} handleAction={handleUpdate} />
    </div>
  )
}

export default UpdateIssuePage

UpdateIssuePage.messages = ['UpdateNewsletter', 'Issue', ...Root.messages]

const issueQueryKey = (id: number) => ['issues', { id, draft: true }]

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext) {
  const id = (params?.id ?? -1) as number
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(issueQueryKey(id), () => getIssue(id))

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
      messages: pick(
        await import(`../../messages/${locale}.json`),
        UpdateIssuePage.messages
      ),
    },
  }
}
