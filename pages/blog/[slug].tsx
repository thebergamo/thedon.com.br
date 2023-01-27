import PostLayout from 'components/Layout/PostLayout'
import Root from 'components/Layout/Root'
import { convertMarkdownToHtml, getAllPosts, getPostBySlug } from 'lib/blog'
import pick from 'lodash/pick'
import { GetStaticPropsContext } from 'next'

export type Props = {
  errorCode?: number
  post: any
}

function BlogPage({ post, errorCode }: Props) {
  if (errorCode) {
    return (
      <>
        <h1>Oh no! ;(</h1>
      </>
    )
  }

  return (
    <span
      className="prose dark:prose-invert max-w-prose"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
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

BlogPage.Layout = PostLayout

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
