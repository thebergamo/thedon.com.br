import { getAllPosts } from 'lib/blog'
import RSS from 'rss'

/* @ts-ignore */
export async function getServerSideProps({ res }) {
  const feed = new RSS({
    title: 'Marcos Bérgamo',
    site_url: 'https://thedon.com.br',
    feed_url: 'https://thedon.com.br/feed.xml',
  })

  const posts = getAllPosts([
    'slug',
    'title',
    'url',
    'publishedDate',
    'description',
  ])
  /* @ts-ignore */
  posts.docs.forEach((post) => {
    feed.item({
      title: post.title,
      url: `https://thedon.com.br/blog/${post.slug}`,
      date: post.publishedDate,
      description: post.excerpt,
    })
  })

  res.setHeader('Content-Type', 'application/rss+xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  )

  res.write(feed.xml({ indent: true }))
  res.end()

  return {
    props: {},
  }
}

export default function RSSFeed() {
  return null
}
