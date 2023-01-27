import Root from 'components/Layout/Root'
import { getIssue, getIssues } from 'lib/newsletter'
import { pick } from 'lodash'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { formatDate } from 'utils/formatDate'

type Props = {
  issue: Issue
}

function IssuePage({ issue }: Props) {
  const { locale } = useRouter()
  return (
    <div className="w-full md:w-[640px] lg:w-[820px]">
      <section className="w-full mb-4">
        <h1 className="text-center mb-4">
          #{issue.id} - {issue.title}
        </h1>
        <h2 className="text-xl text-center">
          {formatDate(issue.publishedDate, locale)}
        </h2>
      </section>
      <main className="flex flex-col mt-4">
        {issue.articles.map((article, idx) => (
          <span key={`${article.title}_${idx}`} className="my-2">
            <a
              href={article.url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-xl font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#ffff80] to-[#ff80bf]"
            >
              {article.title}
            </a>
            <p className="text-lg mt-2">{article.description}</p>
            <hr className="mt-4" />
          </span>
        ))}
        <span>
          <h2 className="text-7xl text-center mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
            That&apos;s all folks!
          </h2>
        </span>
      </main>
    </div>
  )
}

export default IssuePage

IssuePage.messages = ['Issue', ...Root.messages]

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const id = (params?.id ?? -1) as number
  const issue = await getIssue(id)

  return {
    props: {
      issue,
      messages: pick(
        await import(`../../messages/${locale}.json`),
        IssuePage.messages
      ),
    },
  }
}

export async function getStaticPaths() {
  const issues = await getIssues({ draft: false })

  const paths = issues.map((issue) => ({
    params: {
      id: `${issue.id}`,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
