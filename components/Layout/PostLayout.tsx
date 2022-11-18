import {
  Post,
  PostContainer,
  PostContent,
  PostHeader,
  PostHero,
} from 'components/Blog/Post'
import { PropsWithChildren } from 'react'

type Props = {
  children: PropsWithChildren['children'] & { props: any }
}

export default function PostLayout({ children }: Props) {
  const { title, image, date, content } = children.props.post

  return (
    <div className="">
      <PostHeader title={title} image={image} date={date} content={content} />
      <PostContent>
        <PostContainer>{children}</PostContainer>
      </PostContent>
    </div>
  )
}
