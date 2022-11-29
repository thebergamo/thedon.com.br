import { Calendar } from 'components/Icons/Calendar'
import { Clock } from 'components/Icons/Clock'
import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'
import readingTime from 'reading-time'

export const Post: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="overflow-hidden flex-1">{children}</main>
}

export const PostHero: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="overflow-hidden flex-1">{children}</main>
}

export const PostHeader: React.FC<{
  title: string
  image: string
  date: string
  content: string
}> = ({ title, image, date, content }) => {
  const t = useTranslations('Post')
  const stats = readingTime(content)
  return (
    <div className="h-screen flex justify-center flex-col">
      <h1 className="lg:text-7xl text-4xl text-center z-30">{title}</h1>
      <span
        className="absolute right-0 top-0 opacity-20 h-screen bg-cover bg-center w-full z-0"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="flex justify-center lg:text-2xl mb-8 mt-12 z-30">
        <div className="flex items-center  text-gray-800 dark:text-gray-200 capsize mr-8">
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
  )
}

export const PostContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="lg:flex lg:justify-center">
      <div className="lg:max-w-4xl">{children}</div>
    </div>
  )
}

export const PostContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}
