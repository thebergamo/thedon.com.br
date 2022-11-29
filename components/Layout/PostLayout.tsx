import {
  Post,
  PostContainer,
  PostContent,
  PostHeader,
} from 'components/Blog/Post'
import Footer from 'components/Globals/Footer'
import { Header } from 'components/Globals/Header'
import { Subscribe } from 'components/Subscribe'
import { PropsWithChildren } from 'react'

type Props = {
  children: PropsWithChildren['children'] & { props: any }
}

export default function PostLayout({ children }: Props) {
  const { title, image, date, content } = children.props.post

  return (
    <>
      <Header />
      <main className="px-8 bg-gray-50 dark:bg-gray-900">
        <div className="z-10 mb-8">
          <PostHeader
            title={title}
            image={image}
            date={date}
            content={content}
          />
          <PostContent>
            <PostContainer>{children}</PostContainer>
          </PostContent>
        </div>
        <Subscribe />
        <Footer />
      </main>
    </>
  )
}
