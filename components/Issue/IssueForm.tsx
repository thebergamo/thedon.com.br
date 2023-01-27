import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { SimpleField, TextAreaField } from 'components/Form/Field'
import { Cross } from 'components/Icons/Cross'
import { Fire } from 'components/Icons/Fire'
import { LoadableButton } from 'components/LoadableButton/LoadableButton'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import * as Yup from 'yup'

const IssueFormSchema = Yup.object().shape({
  article: Yup.array(),
  publishedDate: Yup.lazy((value) =>
    typeof value === 'string' ? Yup.string() : Yup.date()
  ),
  title: Yup.string().required(),
})

type IssueFormValues = Omit<Issue, 'id'>
type Props = {
  data?: IssueFormValues
  // eslint-disable-next-line no-unused-vars
  handleAction: (issueValues: IssueFormValues) => Promise<void>
}

export default function IssueForm({ data, handleAction }: Props) {
  const { back } = useRouter()
  const t = useTranslations('Issue')
  const [formError, setFormError] = useState<string | undefined>()
  const defaultValues: IssueFormValues = {
    ...{
      articles: [],
      publishedDate: '',
      title: '',
    },
    ...data,
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<IssueFormValues>({
    resolver: yupResolver(IssueFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray<IssueFormValues>({
    name: 'articles',
    control,
  })

  const onSubmit: SubmitHandler<IssueFormValues> = async ({
    publishedDate,
    ...issueValues
  }: IssueFormValues) => {
    try {
      await handleAction({
        ...issueValues,
        publishedDate: publishedDate ? publishedDate : undefined,
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

        <div className="rounded-md shadown-sm flex flex-col md:flex-row gap-6">
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
            />
          </div>
          <div>
            <SimpleField
              controlled={{
                control,
                name: 'publishedDate',
              }}
              id="title"
              label={t('publishedDate.label')}
              type="datetime-local"
            />
          </div>
        </div>
        <div>
          <fieldset className="border-2 dark:border-gray-200 p-4 rounded-lg">
            <legend className="font-semibold">{t('articles.label')}</legend>
            {fields.map((field, index) => {
              return (
                <section
                  key={field.id}
                  className="border-2 border-gray-200 dark:border-gray-300 p-2 rounded-md shadow-md bg-gray-200 dark:bg-gray-700 mt-4"
                >
                  <div>
                    <span className="text-lg font-semibold">#{index}</span>
                    <button
                      type="button"
                      title={t('remove')}
                      className="h-8 w-8 inline-flex justify-center items-center float-right"
                      onClick={() => remove(index)}
                    >
                      <Cross />
                    </button>
                  </div>
                  <SimpleField
                    type="text"
                    label={t('articles.title.label')}
                    placeholder={t('articles.title.placeholder')}
                    controlled={{
                      control,
                      name: `articles.${index}.title`,
                    }}
                  />
                  <TextAreaField
                    label={t('articles.description.label')}
                    placeholder={t('articles.description.placeholder')}
                    rows={3}
                    controlled={{
                      control,
                      name: `articles.${index}.description`,
                    }}
                  />
                  <SimpleField
                    type="url"
                    label={t('articles.url.label')}
                    placeholder={t('articles.url.placeholder')}
                    controlled={{
                      control,
                      name: `articles.${index}.url`,
                    }}
                  />
                </section>
              )
            })}
            <span
              className={classNames(
                'mt-4 flex w-full',
                fields.length === 0 && 'justify-center',
                fields.length !== 0 && 'justify-end'
              )}
            >
              <button
                type="button"
                className="py-2 px-4 border-2 rounded-lg transition-all border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400"
                onClick={() => append({ description: '', title: '', url: '' })}
              >
                {t('append')}
              </button>
            </span>
          </fieldset>
        </div>
        <div className="flex gap-6 w-1/3 float-right">
          <button
            type="reset"
            className="py-2 px-4 border-2 rounded-lg transition-all border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400"
            onClick={() => back()}
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
