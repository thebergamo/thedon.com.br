import { Suspense } from 'react'
import QuestionItem from './QuestionItem'

type Props = {
  title: string
  questions: Question[]
}

export const QuestionList = ({ title, questions }: Props) => {
  return (
    <div>
      <Suspense fallback={null}>
        <h2 className="mt-8 mb-6 text-xl font-bold tracking-tight md:text-2xl">
          {title}
        </h2>
        {questions.map((question, index) => {
          return (
            <div key={question.id}>
              <QuestionItem
                answers={question.answers.length}
                createdAt={question.createdAt}
                id={question.id}
                ownerName={question.owner.username}
                ownerPicture={question.owner.image}
                title={question.title}
              />
              {index < questions.length - 1 && <hr className="mb-4" />}
            </div>
          )
        })}
      </Suspense>
    </div>
  )
}
