import pick from 'lodash/pick'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
} from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'

export type Props = {
  newsletter: Issue
}

function UpdateIssuePage(props: Props) {
  const t = useTranslations('UpdateNewsletter')
  return (
    <div className="w-full flex flex-col">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>
            {t('title')} - {props.newsletter.title}
          </h1>
        </div>
      </section>
    </div>
  )
}

export default UpdateIssuePage

UpdateIssuePage.messages = ['UpdateNewsletter', ...Root.messages]

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext) {
  const id = params?.id as string
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/${id}`
  )
  const newsletter = await res.json()
  return {
    props: {
      newsletter,
      messages: pick(
        await import(`../../messages/${locale}.json`),
        UpdateIssuePage.messages
      ),
    },
  }
}
