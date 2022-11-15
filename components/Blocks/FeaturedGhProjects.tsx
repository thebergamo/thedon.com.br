import classNames from 'classnames'
import type { Post } from 'components/Blog/PostCard'
import { Repo } from 'components/Icons/Repo'
import Link from 'next/link'
import { FeaturedElement } from './FeaturedElement'

type Props = {
  blockName: string
  projects: Repository[]
}

export const FeaturedGhProjects = ({ blockName, projects }: Props) => {
  return (
    <FeaturedElement<Repository>
      blockName={blockName}
      list={projects}
      element={(el) => {
        return (
          <Link
            href={el.url}
            className={classNames(
              'transform hover:scale-[1.01] transition-all',
              'rounded-xl w-full bg-gradient-to-r p-1',
              'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'
            )}
          >
            <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
              <div className="flex flex-col justify-between">
                <Repo />
                <h4 className="text-lg md:text-xl font-semibold w-full text-gray-900 dark:text-gray-100 tracking-tight">
                  {el.name}
                </h4>
                <span className="mb-2 sm:mb-6 line-clamp-4">
                  {el.description}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ml-2 align-baseline capsize">
                    {el.stars}
                  </span>
                </div>
                <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ml-2 align-baseline capsize capitalize font-semibold">
                    {el.language}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    />
  )
}
