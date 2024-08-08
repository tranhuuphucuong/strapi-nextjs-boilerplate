'use client';
import { getStrapiMedia } from '@/api/api-helpers';
import { APIResponse } from '@/types/strapi';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';

interface NavLinkProps {
  id?: number;
  url?: string;
  newTab?: boolean;
  text?: string;
}

interface MobileNavLink extends NavLinkProps {
  closeMenu: () => void;
}

function NavLink({ url = '#', text = '' }: NavLinkProps) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`mx-4 -mb-1 flex items-center hover:underline dark:border-transparent ${
          path === url && 'dark:border-violet-400 dark:text-violet-400'
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url = '#', text = '', closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && 'dark:border-violet-400 dark:text-violet-400'
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
  links,
  logoText,
  theme = 'dark',
  logoUrl,
  shadow = false,
}: {
  links?: APIResponse<'api::global.global'>['data']['attributes']['navLink'];
  logoText?: string;
  theme?: 'dark' | 'light';
  logoUrl?: string;
  shadow?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const logo = logoUrl ? getStrapiMedia(logoUrl) : undefined;

  return (
    <div
      className={cx(
        theme === 'dark'
          ? 'p-4 text-white dark:bg-black'
          : 'p-4 text-slate-700',
        shadow ? 'border-b-2 border-solid shadow-sm' : '',
      )}
    >
      <div className="container mx-auto flex h-16 justify-between px-0 sm:px-6">
        <Logo src={logo || undefined}>
          {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
        </Logo>

        <div className="ml-auto hidden flex-shrink-0 items-center lg:flex">
          <ul className="hidden items-stretch space-x-3 capitalize lg:flex">
            {links?.map((item, i) => (
              <NavLink key={i} url={item.url} text={item.text} />
            ))}
          </ul>
        </div>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" />{' '}
          {/* Overlay */}
          <Dialog.Panel className="fixed inset-y-0 z-50 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10 ltr:right-0 rtl:left-0">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Strapi</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  {links?.map((item, i) => (
                    <MobileNavLink
                      key={i}
                      closeMenu={closeMenu}
                      url={item.url}
                      text={item.text}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        <button
          className="p-4 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-7 w-7 text-gray-100" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
