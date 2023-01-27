import { useMutation } from '@tanstack/react-query'
import Root from 'components/Layout/Root'
import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import QuestionForm from '../../components/Question/QuestionForm'
import { createQuestion } from '../../lib/manage-questions'

function CreateQuestionPage() {
  const t = useTranslations('CreateQuestion')
  const { replace } = useRouter()

  const mutation = useMutation({
    mutationFn: createQuestion,
  })

  const handleCreate = async (values: Omit<Question, 'id'>) => {
    const question = await mutation.mutateAsync(values)
    await replace(`/ama/${question.id}`)
  }

  return (
    <div className="w-full md:w-[640px] lg:w-[820px]">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>{t('title')}</h1>
        </div>
      </section>
      <QuestionForm handleAction={handleCreate} />
    </div>
  )
}

export default CreateQuestionPage

CreateQuestionPage.messages = ['CreateQuestion', 'AMA', ...Root.messages]
CreateQuestionPage.auth = true

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: pick(
        await import(`../../messages/${locale}.json`),
        CreateQuestionPage.messages
      ),
    },
  }
}
