import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'
import { Table } from 'components/List/Table'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { Exit } from 'components/Icons/Exit'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { formatDate } from 'utils/formatDate'
import {
  LoadableAction,
  LoadableButton,
} from 'components/LoadableButton/LoadableButton'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  newsletters: Issue[]
}

const columnHelper = createColumnHelper<Issue>()

const EditButton = ({ id }: { id: number }) => {
  const t = useTranslations('Admin')
  return (
    <Link href={`/admin/${id}`} className="flex hover:text-gray-400">
      <span className="h-5 w-5 mr-2">
        <Exit />
      </span>
      {t('edit')}
    </Link>
  )
}

const DeleteButton = ({
  id,
  onClick,
  isLoading,
}: {
  id: number
  isLoading: boolean
  onClick: () => void
}) => {
  const t = useTranslations('Admin')
  return (
    <LoadableAction Icon={<Exit />} isLoading={isLoading} onClick={onClick}>
      {t('delete')}
    </LoadableAction>
  )
}

function AdminPage(props: Props) {
  const t = useTranslations('Admin')
  const ti = useTranslations('Issue')
  const { locale } = useRouter()

  const mutation = useMutation({
    mutationFn: (id) => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/newsletter/${id}`, {
        method: 'DELETE',
      })
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
        header: ti('title'),
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'publishedDate',
        header: ti('publishedDate'),
        cell: (info) => (
          <span>{formatDate(info.renderValue() as string, locale)}</span>
        ),
        footer: (info) => info.column.id,
      },
      {
        id: 'actions',
        header: t('actions'),
        cell: ({ row }) => (
          <span className="flex gap-3">
            <EditButton id={row.getValue('id')} />
            <DeleteButton
              id={row.getValue('id')}
              isLoading={mutation.isLoading}
              onClick={() => mutation.mutate(row.getValue('id'))}
            />
          </span>
        ),
      },
    ],
    []
  )
  return (
    <div className="w-full flex flex-col">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>{t('title')}</h1>
        </div>
      </section>
      <div className="flex justify-end">
        <Link
          href={'/admin/create'}
          className="py-2 px-4 border-2 border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400 rounded-lg transition-all"
          role="button"
        >
          {t('create')}
        </Link>
      </div>
      <Table<Issue> data={props.newsletters} columns={columns} />
    </div>
  )
}

export default AdminPage

AdminPage.messages = ['Admin', 'Issue', ...Root.messages]

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters?draft=true`
  )
  const newsletters = await res.json()
  return {
    props: {
      newsletters,
      messages: pick(
        await import(`../../messages/${locale}.json`),
        AdminPage.messages
      ),
    },
  }
}
