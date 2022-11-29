import { Calendar } from 'components/Icons/Calendar'
import { Clock } from 'components/Icons/Clock'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import readingTime from 'reading-time'

export default function BlogPost({
  slug,
  title,
  excerpt,
  publishedDate,
  content,
}: {
  slug: string
  title: string
  excerpt: string
  publishedDate: string
  content: string
}) {
  const t = useTranslations('Post')
  const stats = readingTime(content)
  return (
    <Link href={`/blog/${slug}`} className="w-full">
      <div className="w-full mb-8">
        <div className="flex flex-col justify-between md:flex-row">
          <h4 className="lg:w-2/3 mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
            {title}
          </h4>
          <div className="flex justify-between lg:w-1/3">
            <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
              <Calendar />
              <span className="ml-2 align-baseline capsize">
                {publishedDate}
              </span>
            </div>
            <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
              <Clock />
              <span className="ml-2 align-baseline capsize capitalize">
                {t('readingTime', { time: Math.ceil(stats.minutes) })}
              </span>
            </div>
          </div>
        </div>
        <span className="text-gray-600 dark:text-gray-400">{excerpt}</span>
      </div>
    </Link>
  )
}
