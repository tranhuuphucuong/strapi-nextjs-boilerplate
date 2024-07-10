'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import { FaDiscord } from "react-icons/fa";
import { Media, SocialLink, StrapiLink } from '@/types';
import { getStrapiMedia } from '../api/api-helpers';
import Logo from './Logo';
import { RenderSocialIcon } from './SocialIcon';

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

type FooterProps = {
  footerLogo?: Media;
  logoText?: string;
  socialLinks?: SocialLink[];
  legalLinks?: StrapiLink[];
  navLinks?: StrapiLink[];
};

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && 'dark:border-violet-400 dark:text-violet-400'
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/blog/${attributes.slug}`}
        className="hover:dark:text-violet-400"
      >
        {attributes.name}
      </Link>
    </li>
  );
}

export default function Footer({
  socialLinks,
  navLinks,
  footerLogo,
  legalLinks,
  logoText,
}: FooterProps) {
  const logoUrl = getStrapiMedia(footerLogo?.url);
  return (
    <footer className="py-6 dark:bg-black dark:text-gray-50">
      <div className="container mx-auto space-y-6 divide-y divide-gray-400 divide-opacity-50 px-6 md:space-y-12">
        <div className="grid grid-cols-12">
          <div className="col-span-full pb-6 md:col-span-6 md:pb-0">
            {logoUrl && (
              <Logo src={logoUrl}>
                {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
              </Logo>
            )}
          </div>

          <div className="col-span-6 text-center md:col-span-3 md:text-left">
            <p className="pb-1 text-lg font-medium">Categories</p>
            <ul>
              {/* {categoryLinks.map((link: CategoryLink) => (
                <CategoryLink key={link.id} {...link} />
              ))} */}
            </ul>
          </div>

          <div className="col-span-6 text-center md:col-span-3 md:text-left">
            <p className="pb-1 text-lg font-medium">Menu</p>
            <ul>
              {navLinks?.map((link) => <FooterLink key={link.id} {...link} />)}
            </ul>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex">
            <span className="mr-2">
              ©{new Date().getFullYear()} All rights reserved
            </span>
            <ul className="flex">
              {legalLinks?.map((link: FooterLink) => (
                <Link
                  href={link.url}
                  className="mr-2 text-gray-400 hover:text-gray-300"
                  key={link.id}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex justify-center space-x-4 pt-4 lg:col-end-13 lg:pt-0">
            {socialLinks?.map((link) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.title}
                  target={'_blank'}
                  className="flex h-10 w-10 items-center justify-center rounded-full dark:bg-violet-400 dark:text-gray-900"
                >
                  <RenderSocialIcon social={link.platform} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
