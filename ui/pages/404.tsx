import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

function NotFoundPage() {
  const t = useTranslations('404')
  return (
    <div className="w-full flex flex-col">
      <section className="mb-16 flex flex-col text-center items-center">
        <div className="items-center">
          <Image
            src="/avatar-hello.png"
            width="124"
            height="124"
            alt="Marcos Bérgamo memoji smiling"
          />
        </div>
        <div className="flex flex-col">
          <h1>{t('title')}</h1>
          <p className="text-gray-700 dark:text-gray-200 text-2xl mb-4 mt-6">
            {t('missing')}
          </p>
          <p className="text-gray-700 dark:text-gray-200 text-2xl mb-4">
            {t('suggestion')}
          </p>
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage

NotFoundPage.messages = ['404', ...Root.messages]

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: pick(
        await import(`../messages/${locale}.json`),
        NotFoundPage.messages
      ),
    },
  }
}
