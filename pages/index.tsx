import pick from "lodash/pick";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import Root from "components/Layout/Root";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FeaturedPosts } from "components/Blocks/FeaturedPosts";
import { getPostBySlug } from "lib/blog";

export type Props = {
  featuredPosts: any[];
};

function HomePage(props: Props) {
  const t = useTranslations("Home");
  return (
    <div className="w-full flex flex-col">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="items-center">
          <Image
            src="/avatar-hello.png"
            width="124"
            height="124"
            alt="Marcos Bérgamo memoji smiling"
          />
        </div>
        <div className="flex flex-col">
          <h1>{t("greeting")}</h1>
          <h2 className="text-gray-700 dark:text-gray-200 text-lg mb-4">
            {t("work-title")}
            <span className="font-semibold">{t("company")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg">
            {t("description")}
          </p>
        </div>
      </section>
      <FeaturedPosts blockName="Featured Posts" posts={props.featuredPosts} />
    </div>
  );
}

export default HomePage;

HomePage.messages = ["Home", "Post", ...Root.messages];

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const featuredParams = [
    "date",
    "slug",
    "title",
    "image",
    "content",
    "description",
  ];
  const featuredPosts = [
    getPostBySlug("generate-social-images-as-a-service", featuredParams),
  ];
  return {
    props: {
      featuredPosts,
      messages: pick(
        await import(`../messages/${locale}.json`),
        HomePage.messages
      ),
    },
  };
}
