import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

export const Subscribe = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className={cn(
          "max-w-xl flex flex-col",
          "transform hover:scale-[1.01] transition-all",
          "rounded-xl bg-gradient-to-tr p-1",
          "from-[#ffff80] to-[#ff80bf]"
        )}
      >
        <div className="bg-white dark:bg-gray-900 px-6 pb-8 rounded-xl">
          <div className="flex justify-center w-full">
            <Image
              src="/avatar-contact.png"
              width="62"
              height="62"
              alt="Marcos Bérgamo memoji fist bump"
            />
          </div>

          <p className="mt-6 text-center mb-2 text-3xl font-bold tracking-tight ">
            Get Access to Exclusive Content
          </p>
          <p className="text-center text-xl tracking-tight ">
            Become a member and get access to our newsletter and be the first to
            read my articles
          </p>
          <div className="text-center">
            <p className="text-lg my-4 font-bold tracking-tight">
              No spam, I promise!
            </p>
            <Link
              href="/auth/sign-in"
              className={cn(
                "py-2 px-4 border-2 hover:text-gray-900",
                "border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400",
                "rounded-lg transition-all",
                "hover:bg-gradient-to-br from-[#ffff80] to-[#ff80bf]"
              )}
            >
              Become a member
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
