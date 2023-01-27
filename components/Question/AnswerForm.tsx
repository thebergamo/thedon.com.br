import { yupResolver } from '@hookform/resolvers/yup'
import { EditorField } from 'components/Form/Field'
import { LoadableButton } from 'components/LoadableButton/LoadableButton'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Edit } from '../Icons/Edit'

const AnswerFormSchema = Yup.object().shape({
  content: Yup.string().required(),
})

type AnswerFormValues = Omit<Question, 'id'>
type Props = {
  data?: AnswerFormValues
  handleAction: (values: AnswerFormValues) => Promise<void>
}

export default function AnswerForm({ data, handleAction }: Props) {
  const t = useTranslations('AMA.Answer')
  const [formError, setFormError] = useState<string | undefined>()
  const defaultValues: AnswerFormValues = {
    ...{
      content: '',
    },
    ...data,
  }

  const {
    handleSubmit,
    formState,
    formState: { isSubmitting, isSubmitSuccessful },
    control,
    reset,
  } = useForm<AnswerFormValues>({
    resolver: yupResolver(AnswerFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({})
    }
  }, [formState, reset])

  const onSubmit: SubmitHandler<AnswerFormValues> = async (answerValues) => {
    try {
      await handleAction({
        ...answerValues,
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
        <LoadableButton type="submit" Icon={<Edit />} isLoading={isSubmitting}>
          {t('action')}
        </LoadableButton>
      </div>
    </form>
  )
}
