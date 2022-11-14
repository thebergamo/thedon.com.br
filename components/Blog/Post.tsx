import { Calendar } from "components/Icons/Calendar";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import readingTime from "reading-time";

export const Post: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="overflow-hidden flex-1">{children}</main>;
};

export const PostHero: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="overflow-hidden flex-1">{children}</main>;
};

export const PostHeader: React.FC<{
  title: string;
  image: string;
  date: string;
  content: string;
}> = ({ title, image, date, content }) => {
  const t = useTranslations("Post");
  const stats = readingTime(content);
  return (
    <div className="w-full h-screen -mb-52">
      <div
        className="absolute right-0 top-0 opacity-20 h-screen bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <h1 className="lg:text-9xl text-7xl relative mt-40">{title}</h1>
      <div className="flex justify-center lg:text-2xl mt-20">
        <div className="flex items-center  text-gray-800 dark:text-gray-200 capsize mr-8">
          <Calendar />
          <span className="ml-2 align-baseline capsize">{date}</span>
        </div>
        <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
          <Calendar />
          <span className="ml-2 align-baseline capsize capitalize">
            {t("readingTime", { time: Math.ceil(stats.minutes) })}
          </span>
        </div>
      </div>
    </div>
  );
};

export const PostContent: React.FC<PropsWithChildren> = ({ children }) => {
  return <article>{children}</article>;
};

export const PostContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
