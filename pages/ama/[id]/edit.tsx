import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query'
import Root from 'components/Layout/Root'
import QuestionForm from 'components/Question/QuestionForm'
import { getQuestion } from 'lib/read-questions'
import pick from 'lodash/pick'
import { GetServerSidePropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useQuestion } from '../../../lib/hooks/question.hook'
import { updateQuestion } from '../../../lib/manage-questions'

export type Props = {
  id: string
}

function UpdateQuestionPage(props: Props) {
  const t = useTranslations('UpdateQuestion')
  const { push } = useRouter()
  const { data = {} } = useQuestion(props.id)

  const mutation = useMutation({
    mutationFn: updateQuestion,
  })

  const handleUpdate = async (values: Omit<Question, 'id'>) => {
    const id = props.id
    await mutation.mutateAsync({ id, ...values })
    await push(`/ama/${id}`)
  }

  return (
    <div className="w-full md:w-[640px] lg:w-[820px]">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>
            {t('title')} - {data.title}
          </h1>
        </div>
      </section>
      <QuestionForm data={data} handleAction={handleUpdate} />
    </div>
  )
}

export default UpdateQuestionPage

UpdateQuestionPage.messages = ['UpdateQuestion', 'AMA', ...Root.messages]
UpdateQuestionPage.auth = true

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext) {
  const id = (params?.id ?? -1) as number
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['questions', id], () => getQuestion(id))

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
      messages: pick(
        await import(`../../../messages/${locale}.json`),
        UpdateQuestionPage.messages
      ),
    },
  }
}
