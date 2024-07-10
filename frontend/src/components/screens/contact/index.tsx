// 'use client';
import { getStrapiMedia } from '@/api/api-helpers';
import { getContactPage } from '@/api/contactPage';
import { getGlobal } from '@/api/getGlobal';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { ContactForm } from './contact-form';

export const Contact = async () => {
  const contactData = await getContactPage();
  const global = await getGlobal();

  const figureUrl = getStrapiMedia(contactData?.figure?.url);

  return (
    <div>
      <Navbar
        links={global?.navLink}
        logoText={global?.avatartext}
        logoUrl={global?.avatar?.url}
        theme="light"
        shadow
      />
      <div className="flex flex-col items-center gap-12 px-20 py-40 sm:flex-row sm:justify-center sm:gap-12 md:gap-24">
        <figure className="flex flex-1 rotate-2 items-center justify-center">
          {figureUrl && (
            <Image
              src={figureUrl}
              alt="contact"
              width={500}
              height={700}
              className="rounded-lg shadow-2xl drop-shadow-2xl"
            />
          )}
        </figure>
        <div className="flex flex-1 flex-col md:w-2/5">
          <h1 className="text-4xl font-medium text-slate-700 md:max-w-3xl md:text-6xl">
            {contactData.title}
          </h1>
          <p className="mb-14 mt-4 text-slate-800">{contactData.Description}</p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
