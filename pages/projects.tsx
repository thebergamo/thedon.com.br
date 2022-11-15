import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'

export type Props = {
  ghProjects: any[]
}

function ProjectsPage(props: Props) {
  const t = useTranslations('Projects')
  return (
    <div className="w-full flex flex-col">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>{t('title')}</h1>
        </div>
      </section>
      <section>
        <h2>GH Projects</h2>
        {props.ghProjects.map(({ name }) => (
          <>
            <h3>{name}</h3>
          </>
        ))}
      </section>
    </div>
  )
}

export default ProjectsPage

ProjectsPage.messages = ['Projects', ...Root.messages]

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BACKEND_API}/github`)
  const ghProjects = await res.json()

  return {
    props: {
      ghProjects,
    },
  }
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: pick(
        await import(`../messages/${locale}.json`),
        ProjectsPage.messages
      ),
    },
  }
}
