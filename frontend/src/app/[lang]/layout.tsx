import { getStrapiURL } from '@/api/api-helpers';
import '@/globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Providers from './providers';

import { getFooter } from '@/api/getFooter';
import { getGlobal } from '@/api/getGlobal';
import { getMetadata } from '@/api/getMetadata';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { FALLBACK_SEO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { i18n } from '../../../i18n-config';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  // TODO: CREATE A CUSTOM ERROR PAGE
  const { footerLogo, logoText, socialLinks, legalLinks } = await getFooter();
  const global = await getGlobal();
  // const navbarLogoUrl = getStrapiMedia(navbar.navbarLogo.logoImg?.url);
  // const footerLogoUrl = getStrapiMedia(footer.footerLogo.logoImg?.url);

  return (
    <html lang={params.lang}>
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <Providers>
          <main className="bg-slate-50 bg-gradient-to-b from-white to-slate-100 dark:bg-gray-700 dark:text-gray-100">
            {children}
          </main>
        </Providers>
        <Footer
          footerLogo={footerLogo}
          logoText={logoText}
          socialLinks={socialLinks?.data}
          legalLinks={legalLinks}
          navLinks={global.navLink}
        />
        <Toaster />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const meta = await getMetadata();

  if (!meta) return FALLBACK_SEO;

  const { title, description, favicon } = meta;
  const { url } = favicon;

  return {
    title,
    description,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}
