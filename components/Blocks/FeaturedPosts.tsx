import BlogPostCard from 'components/Blog/PostCard'
import type { Post } from 'components/Blog/PostCard'
import { FeaturedElement } from './FeaturedElement'

type Props = {
  blockName: string
  posts: Post[]
}

export const FeaturedPosts = ({ blockName, posts }: Props) => {
  return (
    <FeaturedElement<Post>
      blockName={blockName}
      list={posts}
      element={(post) => {
        const { title, slug, date, description, image, content } = post

        return (
          <BlogPostCard
            key={slug}
            title={title}
            description={description}
            image={image}
            date={date}
            slug={slug}
            content={content}
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          />
        )
      }}
    />
  )
}
