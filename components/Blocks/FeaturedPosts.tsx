import BlogPostCard from "components/Blog/PostCard";
import type { Post } from "components/Blog/PostCard";

type Props = {
  blockName: string;
  posts: Post[];
};

export const FeaturedPosts = ({ blockName: pageTitle, posts }: Props) => {
  return (
    <div className="w-full mb-6">
      <h2 className="font-bold text-xl md:text-2xl tracking-tight mb-6">
        {pageTitle}
      </h2>
      <div className="flex gap-6 flex-col md:flex-row">
        {posts
          .map((post) => {
            const { title, slug, date, description, image, content } = post;

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
            );
          })
          .filter(Boolean)}
      </div>
    </div>
  );
};
