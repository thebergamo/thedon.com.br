import {
  Post,
  PostContainer,
  PostContent,
  PostHeader,
  PostHero,
} from "components/Blog/Post";
import { PropsWithChildren } from "react";

type Props = {
  children: PropsWithChildren["children"] & { props: any };
};

export default function PostLayout({ children }: Props) {
  console.log("POST LAYOUT", children.props);
  const { title, image, date, content } = children.props.post;

  const PostType = image ? PostHero : Post;

  return (
    <div>
      <PostHeader title={title} image={image} date={date} content={content} />
      <PostContent>
        <PostContainer>{children}</PostContainer>
      </PostContent>
    </div>
  );
}
