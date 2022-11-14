import BlogPost from "components/Blog/Posts";
import { Suspense } from "react";

type Props = {
  title: string;
  posts: any[];
};

export const PostList = ({ title, posts }: Props) => {
  console.log({ posts });
  return (
    <div>
      <Suspense fallback={null}>
        <h2 className="mt-8 mb-6 text-xl font-bold tracking-tight md:text-2xl">
          {title}
        </h2>
        {posts
          .filter((post) => !post.skip)
          .map((post) => {
            return (
              <BlogPost
                key={post.title}
                slug={post.slug}
                title={post.title}
                excerpt={post.description}
                publishedDate={post.date}
                content={post.content}
              />
            );
          })}
      </Suspense>
    </div>
  );
};
