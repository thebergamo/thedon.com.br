import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'
import { IssueList } from 'components/Blocks/IssuesList'

export type Props = {
  issues: Issue[]
}

function NewsletterPage(props: Props) {
  const t = useTranslations('Newsletter')
  return (
    <div className="w-full flex flex-col">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>{t('title')}</h1>
          <h2 className="text-gray-700 dark:text-gray-200 text-lg my-4">
            {t('subtitle')}
            <span className="font-bold">@thebergamo</span>
          </h2>
        </div>
      </section>
      <IssueList title={t('latest')} issues={props.issues} />
    </div>
  )
}

export default NewsletterPage

NewsletterPage.messages = ['Newsletter', ...Root.messages]

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let issues = []
  if (process.env.BACKEND_API) {
    const res = await fetch(`${process.env.BACKEND_API}/newsletter`)
    issues = await res.json()
  }
  return {
    props: {
      issues,
      messages: pick(
        await import(`../messages/${locale}.json`),
        NewsletterPage.messages
      ),
    },
  }
}
