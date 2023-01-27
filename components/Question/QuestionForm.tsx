import { yupResolver } from '@hookform/resolvers/yup'
import { EditorField, SimpleField } from 'components/Form/Field'
import { Fire } from 'components/Icons/Fire'
import { LoadableButton } from 'components/LoadableButton/LoadableButton'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

const QuestionFormSchema = Yup.object().shape({
  title: Yup.string().required(),
  content: Yup.string().required(),
})

type QuestionFormValues = Omit<Question, 'id'>
type Props = {
  data?: QuestionFormValues
  // eslint-disable-next-line no-unused-vars
  handleAction: (values: QuestionFormValues) => Promise<void>
}

export default function QuestionForm({ data, handleAction }: Props) {
  const { back } = useRouter()
  const t = useTranslations('AMA.Question')
  const [formError, setFormError] = useState<string | undefined>()
  // @ts-ignore
  const defaultValues: QuestionFormValues = {
    ...{
      title: '',
      content: '',
    },
    ...data,
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<QuestionFormValues>({
    resolver: yupResolver(QuestionFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<QuestionFormValues> = async (
    questionValues
  ) => {
    try {
      await handleAction({
        ...questionValues,
      })
    } catch (err) {
      setFormError('Error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 space-y-6">
        {formError && (
          <div className="rounded-md shadow-md bg-blue-600 p-4">
            <p className="text-white">{formError}</p>
          </div>
        )}

        <div className="rounded-md shadown-sm flex flex-col gap-6">
          <div className="w-full">
            <SimpleField
              controlled={{
                control,
                name: 'title',
              }}
              id="title"
              label={t('title.label')}
              type="text"
              required
              maxLength={60}
              placeholder={t('title.placeholder')}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <EditorField
              controlled={{
                control,
                name: 'content',
              }}
              id="title"
              label={t('content.label')}
              placeholder={t('content.placeholder')}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="flex gap-6 w-1/3 float-right">
          <button
            type="reset"
            className="py-2 px-4 border-2 rounded-lg transition-all border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400 disabled:bg-gray-300"
            onClick={() => back()}
            disabled={isSubmitting}
          >
            {t('reset')}
          </button>
          <LoadableButton
            type="submit"
            Icon={<Fire />}
            isLoading={isSubmitting}
          >
            {t('action')}
          </LoadableButton>
        </div>
      </div>
    </form>
  )
}
