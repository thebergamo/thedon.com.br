import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'
import IssueForm from 'components/Issue/IssueForm'
import { useRouter } from 'next/router'
import { createIssue } from 'lib/newsletter'
import { useMutation } from '@tanstack/react-query'

export type Props = {}

function CreateNewsletterPage(props: Props) {
  const t = useTranslations('CreateNewsletter')
  const { push } = useRouter()

  const mutation = useMutation({
    mutationFn: createIssue,
  })

  const handleCreate = async (values: Omit<Issue, 'id'>) => {
    try {
      await mutation.mutateAsync(values)
      await push('/admin')
    } catch (err) {
      throw err
    }
  }

  return (
    <div className="w-full md:w-[640px] lg:w-[820px]">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>{t('title')}</h1>
        </div>
      </section>
      <IssueForm handleAction={handleCreate} />
    </div>
  )
}

export default CreateNewsletterPage

CreateNewsletterPage.messages = ['CreateNewsletter', 'Issue', ...Root.messages]

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: pick(
        await import(`../../messages/${locale}.json`),
        CreateNewsletterPage.messages
      ),
    },
  }
}
