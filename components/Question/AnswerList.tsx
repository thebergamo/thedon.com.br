import { Calendar } from 'components/Icons/Calendar'
import { Suspense } from 'react'
import { QuestionOwner } from './QuestionCard'

export default function AnswerItem({
  createdAt,
  ownerName,
  ownerPicture,
  content,
}: {
  id: string
  createdAt: Date
  ownerName: string
  ownerPicture: string
  content: string
}) {
  return (
    <div className="w-full mb-4 border-2 rounded-lg">
      <div className="flex flex-col justify-between md:flex-row bg-blue-600 p-4 rounded-lg">
        <div className="flex justify-between lg:w-1/3 under">
          <div className="text-gray-200 dark:text-gray-200">
            <QuestionOwner image={ownerPicture} name={ownerName} />
          </div>
          <div className="flex items-center text-gray-200 dark:text-gray-200 capsize">
            <Calendar />
            <span className="ml-2 align-baseline capsize">
              {createdAt.split('T')[0]}
            </span>
          </div>
        </div>
      </div>
      <span
        className="prose dark:prose-invert block mx-2 w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
type Props = {
  data: Answer[]
}

export const AnswerList = ({ data }: Props) => {
  return (
    <div>
      <Suspense fallback={null}>
        {data.map((answer, index) => {
          return (
            <div key={answer.id}>
              <AnswerItem
                createdAt={answer.createdAt}
                id={answer.id}
                ownerName={answer.owner.username}
                ownerPicture={answer.owner.image}
                content={answer.content}
              />
              {index < data.length - 1 && <hr className="mb-4" />}
            </div>
          )
        })}
      </Suspense>
    </div>
  )
}
