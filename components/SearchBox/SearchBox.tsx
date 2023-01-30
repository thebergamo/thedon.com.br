import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'components/Popover/Popover'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSearch } from '../../lib/hooks/search.hook'
import { MagnifierGlass } from '../Icons/MagnifierGlass'
import { Loader } from '../Loader/Loader'

export const SearchBox: React.FC = () => {
  const [search, setSearchValue] = useState('')
  const { isLoading, data } = useSearch(search)
  return (
    <Popover>
      <div
        aria-label="Toggle Search Box"
        className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
      >
        <PopoverTrigger asChild>
          <div className="h-6 w-6 flex">
            <MagnifierGlass />
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={5} className="p-0">
          <div className="max-w-md">
            <div className="relative w-full mb-4">
              <input
                aria-label="Search posts and questions"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search anything"
                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
              <svg
                className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="max-w-md">
              {isLoading && search !== '' && <Loader />}
              {search === '' && (
                <p className="text-white text-center">Start typing to search</p>
              )}
              {data && (
                <div className="px-2">
                  <div className="flex flex-col">
                    <p className="dark:text-gray-100 font-bold mb-2">
                      Questions
                    </p>
                    {data?.questions.map(({ title, id }) => (
                      <Link
                        href={`/ama/${id}`}
                        className="dark:text-gray-200 text-gray-400 hover:underline text-ellipsis"
                        key={id}
                      >
                        {title}
                      </Link>
                    ))}
                    {!data.questions.length && (
                      <p className="text-lg">No Results</p>
                    )}
                  </div>
                  <div>
                    <p className="dark:text-gray-100 font-bold my-2">Posts</p>
                    {data?.posts.map(({ title, slug }) => (
                      <Link
                        href={`/blog/${slug}`}
                        className="dark:text-gray-100 text-gray-600 hover:underline"
                        key={slug}
                      >
                        {title}
                      </Link>
                    ))}
                    {!data.posts.length && (
                      <p className="text-lg">No Results</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  )
}
