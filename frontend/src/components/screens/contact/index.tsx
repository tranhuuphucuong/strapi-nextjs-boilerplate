// 'use client';
import { getStrapiMedia } from '@/api/api-helpers';
import { getContactPage } from '@/api/contactPage';
import { getGlobal } from '@/api/getGlobal';
import Navbar from '@/components/Navbar';
import { APIResponse } from '@/types/strapi';
import Image from 'next/image';
import { ContactForm } from './contact-form';

export const Contact = async () => {
  const contactData =
    (await getContactPage()) as APIResponse<'api::contact-page.contact-page'>;
  const global = (await getGlobal()) as APIResponse<'api::global.global'>;
  // const data = (await getData()) as APIResponseCollection<"api::post.post">;

  const figureUrl = getStrapiMedia(
    contactData.data?.attributes.figure?.data.attributes.url,
  );

  return (
    <div>
      <Navbar
        links={global.data?.attributes.navLink}
        logoText={global.data?.attributes.avatartext}
        logoUrl={global.data?.attributes.avatar?.data?.attributes.url}
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
            {contactData.data?.attributes.title}
          </h1>
          <p className="mb-14 mt-4 text-slate-800">
            {contactData.data?.attributes.Description}
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
