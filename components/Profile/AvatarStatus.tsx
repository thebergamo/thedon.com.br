import { Exit } from 'components/Icons/Exit'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'components/Popover/Popover'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Person } from '../Icons/Person'

export function AvatarPhoto({
  name,
  image,
}: {
  name?: string | null
  image?: string | null
}) {
  return (
    <div className="flex h-8 w-8 rounded-full overflow-hidden ring-2 ring-dark dark:ring-white bg-black dark:bg-white justify-center items-center">
      {!image && <Person />}
      {image && (
        <Image
          src={image || ''}
          alt={`Github profile image of ${name}`}
          width={460}
          height={460}
        />
      )}
    </div>
  )
}

function Avatar({
  name,
  image,
}: {
  name?: string | null
  image?: string | null
}) {
  return (
    <Popover>
      <div className="flex -space-x-1 center">
        <PopoverTrigger asChild>
          <div>
            <AvatarPhoto name={name} image={image} />
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={5}>
          <>
            <p className="font-semibold pb-4 border-b-2">{name}</p>
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
  )
}

function BecomeMember() {
  return (
    <Link
      href="/auth/sign-in"
      className="py-2 px-4 border-2 border-gray-800 dark:border-gray-200 hover:ring-2 ring-gray-400 rounded-lg transition-all"
    >
      Become a member
    </Link>
  )
}

export function AvatarStatus() {
  const { status, data } = useSession()
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'
  if (isLoading) {
    return null
  }

  return (
    <div className="">
      {isAuthenticated ? (
        <Avatar name={data?.user?.name} image={data?.user?.image} />
      ) : (
        <BecomeMember />
      )}
    </div>
  )
}
