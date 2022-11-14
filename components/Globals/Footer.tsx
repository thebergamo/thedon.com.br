import Link from "next/link";
import Social from "./Socials";
import globalsConfig from "./globals.config";
import { useTranslations } from "next-intl";
import { chunk } from "lodash";

const footer = chunk(globalsConfig.footer, 2);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");
  return (
    <footer className="flex flex-col justify-center items-start max-w-4xl mx-auto w-full">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-4xl grid grid-cols-4 gap-4 pb-6 sm:grid-cols-3">
        <div className="flex flex-col space-y-4 col-span-2">
          {footer.map((chunk, chunkIndex) => {
            return (
              <div key={chunkIndex} className="grid grid-cols-2 gap-4">
                {chunk.map(({ link, title }) => (
                  <Link
                    key={link}
                    href={link}
                    className="text-gray-500 hover:underline dark:hover:text-gray-200 transition"
                  >
                    {t(title)}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
        <Social />
      </div>
      <div className="text-center w-full pb-6">
        <p className="text-gray-300">
          © Copyright {currentYear} - Marcos Bérgamo
        </p>
      </div>
    </footer>
  );
}

Footer.messages = ["Footer"];
