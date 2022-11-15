import Link from 'next/link'
import cn from 'classnames'
import { Calendar } from 'components/Icons/Calendar'
import Image from 'next/image'
import { url } from 'inspector'
import readingTime from 'reading-time'
import { useTranslations } from 'next-intl'
import { Clock } from 'components/Icons/Clock'

export type Post = {
  date: string
  description: string
  image: string
  title: string
  slug: string
  content: string
}

type Props = Post & {
  gradient: string
}

export default function BlogPostCard({
  title,
  slug,
  date,
  description,
  image,
  content,
  gradient,
}: Props) {
  const t = useTranslations('Post')
  const stats = readingTime(content)
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'transform hover:scale-[1.01] transition-all',
        'rounded-xl w-full bg-gradient-to-r p-1',
        gradient
      )}
    >
      <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
        <span
          className="bg-cover bg-center w-full h-36"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="flex flex-col justify-between">
          <h4 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-100 tracking-tight">
            {title}
          </h4>
          <span className="mb-2 sm:mb-6 line-clamp-4">{description}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <Calendar />
            <span className="ml-2 align-baseline capsize">{date}</span>
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <Clock />
            <span className="ml-2 align-baseline capsize capitalize">
              {t('readingTime', { time: Math.ceil(stats.minutes) })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
