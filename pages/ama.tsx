import cn from 'classnames'
import Root from 'components/Layout/Root'
import pick from 'lodash/pick'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FeaturedElement } from '../components/Blocks/FeaturedElement'
import QuestionCard from '../components/Question/QuestionCard'
import { QuestionList } from '../components/Question/QuestionList'
import { getFeaturedQuestions, getQuestions } from '../lib/read-questions'
import { authOptions } from './api/auth/[...nextauth]'

export type Props = {
  featuredQuestions: Question[]
  questions: Question[]
}

function AMAPage(props: Props) {
  const t = useTranslations('AMA')
  const { status } = useSession()
  return (
    <div className="w-full flex flex-col md:min-w-[640px] lg:min-w-[890px]">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center justify-center">
        <div className="flex flex-col text-center">
          <h1>{t('title')}</h1>
          <h2 className="text-gray-700 dark:text-gray-200 text-lg my-4">
            {t('subtitle')}
          </h2>
        </div>
      </section>
      <div>
        <div>
          <FeaturedElement<Question>
            blockName="Featured Questions"
            list={props.featuredQuestions}
            element={(question) => {
              const { title, owner, createdAt, answers, id } = question

              return (
                <QuestionCard
                  key={id}
                  title={title}
                  createdAt={createdAt}
                  gradient="from-[#3F2B96] via-[#3B82F6] to-[#A8C0FF]"
                  answers={answers}
                  id={id}
                  ownerName={owner.username}
                  ownerPicture={owner.image}
                />
              )
            }}
          />
        </div>
      </div>
      <div>
        <div className="text-right">
          <Link
            href={status === 'authenticated' ? '/ama/create' : '/auth/sign-in'}
            className={cn(
              'py-2 px-4 border-2 hover:font-semibold',
              'border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400',
              'rounded-lg transition-all text-2xl',
              'bg-gradient-to-br from-[#3F2B96] via-[#3B82F6] to-[#A8C0FF]'
            )}
          >
            Ask your question
          </Link>
        </div>
        <QuestionList title="All Questions" questions={props.questions} />
      </div>
    </div>
  )
}

export default AMAPage

AMAPage.messages = ['AMA', ...Root.messages]

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  const { locale } = ctx
  const isLogged = Boolean(session)

  const [featuredQuestions, questions] = await Promise.all([
    getFeaturedQuestions(isLogged),
    getQuestions({ limit: 10, offset: 0 }, isLogged),
  ])

  console.log(questions)

  return {
    props: {
      featuredQuestions,
      questions,
      messages: pick(
        await import(`../messages/${locale}.json`),
        AMAPage.messages
      ),
    },
  }
}
