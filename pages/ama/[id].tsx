import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import Root from 'components/Layout/Root'
import 'easymde/dist/easymde.min.css'
import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { Bolt, Unbolt } from '../../components/Icons/Bolt'
import { Calendar } from '../../components/Icons/Calendar'
import { Comments, EmptyComment } from '../../components/Icons/Comments'
import { Delete } from '../../components/Icons/Delete'
import { Edit } from '../../components/Icons/Edit'
import { Lock, UnLock } from '../../components/Icons/Lock'
import { LoadableAction } from '../../components/LoadableButton/LoadableButton'
import AnswerForm from '../../components/Question/AnswerForm'
import { AnswerList } from '../../components/Question/AnswerList'
import { QuestionOwner } from '../../components/Question/QuestionCard'
import { Subscribe } from '../../components/Subscribe'
import { useQuestion } from '../../lib/hooks/question.hook'
import {
  addAnswer,
  deleteQuestion,
  makeFeatured,
  makePrivate,
} from '../../lib/manage-questions'
import { getQuestion, getQuestions } from '../../lib/read-questions'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

export type Props = {
  questionId: string
}

function Editor({ id }) {
  const queryClient = useQueryClient()
  const [answer, setAnswer] = useState('')
  const answerMutation = useMutation({
    mutationFn: addAnswer,
    onSuccess(data) {
      queryClient.setQueryData(['questions', id], (old) => ({
        ...old,
        ...data,
      }))
    },
  })

  const handleSubmit = async (data) => {
    await answerMutation.mutateAsync({ id, ...data })

    setAnswer('')
  }

  return (
    <div>
      <AnswerForm handleAction={handleSubmit} />
    </div>
  )
}

function QuestionActions({
  question,
  isAdmin = false,
}: {
  question: Question
  isAdmin: boolean
}) {
  const queryClient = useQueryClient()
  const t = useTranslations('AMA.Actions')
  const deleteMutation = useMutation({
    mutationFn: deleteQuestion,
  })
  const makeFeaturedMutation = useMutation({
    mutationFn: makeFeatured,
    onSuccess(data) {
      queryClient.setQueryData(['questions', question.id], (old) => ({
        ...old,
        status: data.status,
      }))
    },
  })
  const makePrivateMutation = useMutation({
    mutationFn: makePrivate,
    onSuccess(data) {
      queryClient.setQueryData(['questions', question.id], (old) => ({
        ...old,
        private: data.private,
      }))
    },
  })

  const { id, private: isPrivate, status } = question

  const isFeatured = status === 'FEATURED'

  const publicActionLabel = makePrivateMutation.isLoading
    ? t('makingPublic')
    : t('makePublic')
  const privateActionLabel = makePrivateMutation.isLoading
    ? t('makingPrivate')
    : t('makePrivate')

  const featuredActionLabel = makeFeaturedMutation.isLoading
    ? t('featuring')
    : t('featured')
  const unfeaturedActionLabel = makeFeaturedMutation.isLoading
    ? t('unfeaturing')
    : t('unfeatured')

  return (
    <div className="flex flex-col md:flex-row justify-around mb-4">
      <Link href={`/ama/${id}/edit`} className={`flex hover:text-blue-400`}>
        <span className="h-5 w-5 mr-2">
          <Edit />
        </span>
        {t('edit')}
      </Link>
      <LoadableAction
        Icon={<Delete />}
        isLoading={deleteMutation.isLoading}
        onClick={() => deleteMutation.mutateAsync(id)}
      >
        {deleteMutation.isLoading ? t('deleting') : t('delete')}
      </LoadableAction>
      {isAdmin && (
        <LoadableAction
          Icon={isPrivate ? <UnLock /> : <Lock />}
          isLoading={makePrivateMutation.isLoading}
          onClick={() =>
            makePrivateMutation.mutateAsync({ id, makePrivate: !isPrivate })
          }
        >
          {isPrivate && publicActionLabel}
          {!isPrivate && privateActionLabel}
        </LoadableAction>
      )}
      {isAdmin && (
        <LoadableAction
          Icon={isFeatured ? <Unbolt /> : <Bolt />}
          isLoading={makeFeaturedMutation.isLoading}
          onClick={() =>
            makeFeaturedMutation.mutateAsync({ id, makeFeatured: !isFeatured })
          }
        >
          {isFeatured && unfeaturedActionLabel}
          {!isFeatured && featuredActionLabel}
        </LoadableAction>
      )}
    </div>
  )
}

function QuestionPage({ questionId }: Props) {
  const { data: question } = useQuestion(questionId)
  const { status, data } = useSession()

  if (!question) {
    return <h1>Loading...</h1>
  }

  console.log({ question })

  const date = question.createdAt.split('T')[0]
  const isAdmin = data?.user.roles.includes('admin')
  const canManage = question.ownerId === data?.user.id || isAdmin

  return (
    <div className="w-full flex flex-col md:min-w-[640px] lg:min-w-[890px]">
      <div>
        <h1>{question.title}</h1>
        <div className="flex justify-between my-4">
          <QuestionOwner
            image={question.owner.image}
            name={question.owner.username}
          />
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <Calendar />
            <span className="ml-2 align-baseline capsize">{date}</span>
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            {question.answers.length === 0 ? <EmptyComment /> : <Comments />}
            <span className="ml-2 align-baseline capsize capitalize">
              {question.answers.length}
            </span>
          </div>
        </div>
        {canManage && <QuestionActions question={question} isAdmin={isAdmin} />}
      </div>
      <hr />
      <span
        className="prose dark:prose-invert max-w-prose"
        dangerouslySetInnerHTML={{ __html: question.content }}
      />

      <hr className="my-4" />
      <div className="">
        <h2 className="text-gray-700 dark:text-gray-200 text-xl font-semibold my-4">
          Answers{' '}
          {question.answers.length > 0 && `(${question.answers.length})`}
        </h2>
        <div className="mb-4">
          {question.answers.length > 0 && (
            <AnswerList data={question.answers} />
          )}
          {question.answers.length === 0 && (
            <h3>No Answers yet! Be the first!</h3>
          )}
        </div>
        {status === 'authenticated' ? (
          <Editor id={questionId} />
        ) : (
          <Subscribe
            title={'Would you like to comment?'}
            subtitle={
              "Don't think twice, become a member and get access to comments + exclusive questions"
            }
          />
        )}
      </div>
    </div>
  )
}

export default QuestionPage

QuestionPage.messages = ['AMA', ...Root.messages]

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const queryClient = new QueryClient()

  const id = (params?.id ?? '') as string

  const question = await getQuestion(id)

  await queryClient.prefetchQuery({
    queryKey: ['questions', id],
    queryFn: () => question,
  })

  return {
    props: {
      questionId: id,
      dehydratedState: dehydrate(queryClient),
      messages: pick(
        await import(`../../messages/${locale}.json`),
        QuestionPage.messages
      ),
    },
  }
}

export async function getStaticPaths() {
  const questions = await getQuestions({ limit: 100, offset: 0 })

  const paths = questions.map((question) => ({
    params: {
      id: question.id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
