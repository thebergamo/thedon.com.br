import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'
import { Table } from 'components/List/Table'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { formatDate } from 'utils/formatDate'
import { LoadableAction } from 'components/LoadableButton/LoadableButton'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Delete } from 'components/Icons/Delete'
import { Edit } from 'components/Icons/Edit'
import { deleteIssue, getIssues } from 'lib/newsletter'

const EditButton = ({ id, isLoading }: { id: number; isLoading?: boolean }) => {
  const t = useTranslations('Admin')
  return (
    <Link
      href={`/admin/${id}`}
      className={`flex hover:text-gray-400 ${
        isLoading ? 'pointer-events-none' : ''
      }`}
    >
      <span className="h-5 w-5 mr-2">
        <Edit />
      </span>
      {t('edit')}
    </Link>
  )
}

const DeleteButton = ({
  onClick,
  isLoading,
}: {
  isLoading: boolean
  onClick: () => void
}) => {
  const t = useTranslations('Admin')
  return (
    <LoadableAction Icon={<Delete />} isLoading={isLoading} onClick={onClick}>
      {t('delete')}
    </LoadableAction>
  )
}

const issuesQueryKey = ['issues', { draft: true }]

function AdminPage() {
  const t = useTranslations('Admin')
  const ti = useTranslations('Issue')
  const { locale } = useRouter()
  const queryClient = useQueryClient()
  const { data = [], isLoading } = useQuery({
    queryKey: issuesQueryKey,
    queryFn: () => getIssues({ draft: true }),
  })

  const mutation = useMutation({
    mutationFn: deleteIssue,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: issuesQueryKey })

      const previousData = queryClient.getQueriesData(issuesQueryKey)

      queryClient.setQueryData<Issue[]>(issuesQueryKey, (old) => {
        const filtered = old?.filter((o) => o.id !== id)
        return filtered
      })
      queryClient.getQueriesData(issuesQueryKey)

      return { previousData }
    },
    onError: (_err, _newData, context) => {
      queryClient.setQueryData(issuesQueryKey, context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: issuesQueryKey })
    },
  })

  const columns = useMemo<ColumnDef<Issue>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'title',
        header: ti('title.label'),
        size: -1,
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'publishedDate',
        header: ti('publishedDate.label'),
        cell: (info) => {
          let renderValue = ''
          const value = info.renderValue() as string

          if (value) {
            renderValue = formatDate(value, locale)
          } else {
            renderValue = '-'
          }

          return <span>{renderValue}</span>
        },
        footer: (info) => info.column.id,
      },
      {
        id: 'actions',
        header: t('actions'),
        cell: ({ row }) => (
          <span className="flex gap-3">
            <EditButton id={row.getValue('id')} />
            <DeleteButton
              isLoading={mutation.isLoading}
              onClick={() => {
                if (confirm(t('confirm.delete'))) {
                  return mutation.mutateAsync(row.getValue('id'))
                }
              }}
            />
          </span>
        ),
      },
    ],
    [locale, mutation, t, ti]
  )

  return (
    <div className="w-full md:w-[640px] lg:w-[820px]">
      <h1>{t('title')}</h1>
      <div className="flex justify-end">
        <Link
          href={'/admin/create'}
          className="py-2 px-4 border-2 border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400 rounded-lg transition-all"
          role="button"
        >
          {t('create')}
        </Link>
      </div>
      <Table<Issue> data={data} columns={columns} isLoading={isLoading} />
      {data.length === 0 && (
        <div className="flex justify-center mt-4">
          <p className="text-2xl">{t('empty')}</p>
        </div>
      )}
    </div>
  )
}

export default AdminPage

AdminPage.messages = ['Admin', 'Issue', ...Root.messages]
AdminPage.auth = true

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(issuesQueryKey, () =>
    getIssues({ draft: true })
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      messages: pick(
        await import(`../../messages/${locale}.json`),
        AdminPage.messages
      ),
    },
  }
}
