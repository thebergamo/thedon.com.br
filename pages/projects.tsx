import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'
import { FeaturedElement } from 'components/Blocks/FeaturedElement'
import { Repo } from 'components/Icons/Repo'
import Link from 'next/link'
import classNames from 'classnames'
import { FeaturedGhProjects } from 'components/Blocks/FeaturedGhProjects'

export type Props = {
  ghProjects: Repository[]
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
      <FeaturedGhProjects
        blockName={t('ghProjects')}
        projects={props.ghProjects}
      />
    </div>
  )
}

export default ProjectsPage

ProjectsPage.messages = ['Projects', ...Root.messages]

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let ghProjects = []
  if (process.env.BACKEND_API) {
    const res = await fetch(`${process.env.BACKEND_API}/github`)
    ghProjects = await res.json()
  }
  return {
    props: {
      ghProjects,
      messages: pick(
        await import(`../messages/${locale}.json`),
        ProjectsPage.messages
      ),
    },
  }
}
