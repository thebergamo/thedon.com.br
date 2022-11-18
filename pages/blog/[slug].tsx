import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'
import Root from 'components/Layout/Root'
import { useTranslations } from 'next-intl'
import { convertMarkdownToHtml, getAllPosts, getPostBySlug } from 'lib/blog'
import PostLayout from 'components/Layout/PostLayout'
import { ReactElement } from 'react'

export type Props = {
  errorCode?: number
  post: any
}

function BlogPage({ post, errorCode }: Props) {
  const t = useTranslations('Blog')

  if (errorCode) {
    return (
      <>
        <h1>Oh no! ;(</h1>
      </>
    )
  }

  const title = `${post.title} // Zeno Rocha`
  const description = post.description || ''
  const url = `https://zenorocha.com/${post.slug}`
  const date = new Date(post.date).toISOString()
  const image = post.image
    ? `https://thedon.com.br${post.image}`
    : 'https://thedon.com.br/static/images/home-opt.jpg'

  return (
    <div className="container flex flex-col">
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}

export default BlogPage

BlogPage.messages = ['Blog', 'Post', ...Root.messages]

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  let post = null
  let errorCode = null

  try {
    const slug = (params?.slug ?? '') as string

    post = getPostBySlug(slug, [
      'canonical_url',
      'content',
      'date',
      'description',
      'image',
      'lang',
      'slug',
      'title',
    ])

    post.content = await convertMarkdownToHtml(post.content)
  } catch (err) {
    errorCode = 404
  }

  return {
    props: {
      post,
      errorCode,
      messages: pick(
        await import(`../../messages/${locale}.json`),
        BlogPage.messages
      ),
    },
  }
}

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return <PostLayout>{page}</PostLayout>
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }))

  console.info(paths)

  return {
    paths,
    fallback: 'blocking',
  }
}
