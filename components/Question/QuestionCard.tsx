import cn from 'classnames'
import { Calendar } from 'components/Icons/Calendar'
import Link from 'next/link'
import { Comments, EmptyComment } from '../Icons/Comments'
import { AvatarPhoto } from '../Profile/AvatarStatus'

type QuestionProps = Pick<Question, 'id' | 'title' | 'createdAt' | 'answers'>

type Props = QuestionProps & {
  gradient: string
  ownerName: string
  ownerPicture: string
}

export function QuestionOwner({
  image,
  name,
}: {
  image: string
  name: string
}) {
  return (
    <div className="flex items-center capsize">
      <AvatarPhoto image={image} name={name} />
      <span className="ml-2 align-baseline font-bold capsize">{name}</span>
    </div>
  )
}

export default function QuestionCard({
  id,
  title,
  createdAt,
  answers,
  gradient,
  ownerName,
  ownerPicture,
}: Props) {
  const date = createdAt.toISOString().split('T')[0]
  return (
    <Link
      href={`/ama/${id}`}
      className={cn(
        'transform hover:scale-[1.01] transition-all',
        'rounded-xl w-full bg-gradient-to-r p-1',
        gradient
      )}
    >
      <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
        <div className="flex flex-col justify-between">
          <h4 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-100 tracking-tight line-clamp-2">
            {title}
          </h4>
          <div className="text-gray-800 dark:text-gray-200">
            <QuestionOwner name={ownerName} image={ownerPicture} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <Calendar />
            <span className="ml-2 align-baseline capsize">{date}</span>
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            {answers.length === 0 ? <EmptyComment /> : <Comments />}
            <span className="ml-2 align-baseline capsize capitalize">
              {answers.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
