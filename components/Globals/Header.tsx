import NextLink from 'next/link'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { AvatarStatus } from 'components/Profile/AvatarStatus'
import { ThemeSwitcher } from 'components/ThemeSwitcher/ThemeSwitcher'
import { LanguageSwitcher } from 'components/LanguageSwitcher/LanguageSwitcher'
import { SearchSwitcher } from 'components/Search/SearchSwitcher'
import globalsConfig from './globals.config'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

type NavItemProps = {
  href: string
  text: string
}

function NavItem({ href, text }: NavItemProps) {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  )
}

const header = globalsConfig.header

export function Header() {
  const { status } = useSession()
  const t = useTranslations('Header')
  return (
    <div className="flex flex-col justify-center px-8 z-10">
      <nav className="flex items-center justify-between w-full relative max-w-4xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900  dark:text-gray-100">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <div className="ml-[-0.60rem]">
          {header
            .filter(({ auth }) => (auth ? status === 'authenticated' : true))
            .map(({ link, title }) => (
              <NavItem key={link} href={link} text={t(title)} />
            ))}
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <SearchSwitcher />
          <AvatarStatus />
        </div>
      </nav>
    </div>
  )
}

Header.messages = ['Header']
