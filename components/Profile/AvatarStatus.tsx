import { Exit } from 'components/Icons/Exit';
import { Person } from 'components/Icons/Person';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'components/Popover/Popover';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Avatar() {
  return (
    <Popover>
      <div className="flex -space-x-1 center">
        <PopoverTrigger asChild>
          <div className="flex h-8 w-8 rounded-full ring-2 ring-dark dark:ring-white bg-black dark:bg-white justify-center items-center">
            <p className="text-sm text-white dark:text-black">MB</p>
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={5}>
          <>
            <Link
              href="#"
              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Person />
              <div className="ml-4">
                <p className="text-base font-medium">My Profile</p>
              </div>
            </Link>
            <button
              onClick={() => signOut()}
              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Exit />
              <div className="ml-4">
                <p className="text-base font-medium ">Logout</p>
              </div>
            </button>
          </>
        </PopoverContent>
      </div>
    </Popover>
  );
}

function BecomeMember() {
  return (
    <Link
      href="/auth/sign-in"
      className="py-2 px-4 border-2 border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400 rounded-lg transition-all"
    >
      Become a member
    </Link>
  );
}

export function AvatarStatus() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  if (isLoading) {
    return null;
  }

  return (
    <div className="">{isAuthenticated ? <Avatar /> : <BecomeMember />}</div>
  );
}
