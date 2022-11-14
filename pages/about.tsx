import pick from "lodash/pick";
import { GetStaticPropsContext } from "next";
import Root from "components/Layout/Root";
import { useTranslations } from "next-intl";

export type Props = {};

function AboutPage(props: Props) {
  const t = useTranslations("About");
  return (
    <div className="w-full flex flex-col">
      <section className="mb-16 flex flex-col lg:flex-row lg:text-left text-center items-center">
        <div className="flex flex-col">
          <h1>{t("title")}</h1>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

AboutPage.messages = ["About", ...Root.messages];

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: pick(
        await import(`../messages/${locale}.json`),
        AboutPage.messages
      ),
    },
  };
}
