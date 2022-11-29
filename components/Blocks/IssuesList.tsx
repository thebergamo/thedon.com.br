import { Calendar } from 'components/Icons/Calendar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { formatDate } from 'utils/formatDate'

type Props = {
  title: string
  issues: Issue[]
}

export const IssueList = ({ title, issues }: Props) => {
  const { locale } = useRouter()
  return (
    <div>
      <Suspense fallback={null}>
        <h2 className="mt-8 mb-6 text-xl font-bold tracking-tight md:text-2xl">
          {title}
        </h2>
        {issues.map((issue) => {
          return (
            <Link
              key={issue.id}
              href={`/newsletter/${issue.id}`}
              className="w-full hover:underline"
            >
              <div className="w-full mb-8 p-4">
                <div className="flex flex-col justify-between md:flex-row">
                  <h4 className="lg:w-2/3 mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
                    #{issue.id} - {issue.title}
                  </h4>
                  <div className="flex justify-between lg:w-1/3">
                    <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
                      <Calendar />
                      <span className="ml-2 align-baseline capsize">
                        {formatDate(issue.publishedDate, locale)}
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            </Link>
          )
        })}
      </Suspense>
    </div>
  )
}
