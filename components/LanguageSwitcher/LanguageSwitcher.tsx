import classNames from 'classnames';
import { BrazilFlag } from 'components/Icons/BrazilFlag';
import { USFlag } from 'components/Icons/USFlag';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'components/Popover/Popover';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const languageMap: Record<string, React.FC> = {
  'pt-BR': BrazilFlag,
  'en-US': USFlag
};

const getFlag = (locale: string) => {
  const Flag = languageMap[locale];

  return <Flag />;
};

export const LanguageSwitcher: React.FC = () => {
  const { locale, defaultLocale, locales, pathname } = useRouter();

  return (
    <Popover>
      <div
        aria-label="Toggle Language"
        className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
      >
        <PopoverTrigger asChild>
          <div className="h-6 w-6 flex">
            {getFlag((locale || defaultLocale) as string)}
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={5} className="p-0">
          <div className="mlm-4">
            {locales?.map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l}
                className={classNames(
                  locale === l
                    ? 'font-semibold text-gray-900 dark:text-gray-200 bg-gray-200 dark:bg-gray-700'
                    : 'font-normal text-gray-600 dark:text-gray-400',
                  '-m-3 flex items-center rounded-lg p-3 mb-4 last:mb-0 hover:bg-gray-300 dark:hover:bg-gray-800'
                )}
              >
                {getFlag(l)}
                <div className="ml-4 self-center">
                  <p className="text-base font-medium">{l}</p>
                </div>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};
