import { Calendar } from 'components/Icons/Calendar'
import Link from 'next/link'
import { Comments, EmptyComment } from '../Icons/Comments'
import { AvatarPhoto } from '../Profile/AvatarStatus'

export default function QuestionItem({
  id,
  title,
  createdAt,
  answers,
  ownerName,
  ownerPicture,
}: {
  id: string
  title: string
  createdAt: Date
  ownerName: string
  ownerPicture: string
  answers: number
}) {
  return (
    <Link href={`/ama/${id}`} className="w-full hover:underline">
      <div className="w-full mb-4">
        <div className="flex flex-col justify-between md:flex-row">
          <h4 className="lg:w-3/5 mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
            {title}
          </h4>
          <div className="flex justify-between lg:w-2/5 under">
            <div className="flex items-center text-gray-600 dark:text-gray-400 capsize">
              <AvatarPhoto image={ownerPicture} name={ownerName} />
              <span className="ml-2 align-baseline font-bold capsize">
                {ownerName}
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400 capsize">
              <Calendar />
              <span className="ml-2 align-baseline capsize">
                {createdAt.toISOString().split('T')[0]}
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400 capsize">
              {answers === 0 ? <EmptyComment /> : <Comments />}
              <span className="ml-2 align-baseline capsize capitalize">
                {answers}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
