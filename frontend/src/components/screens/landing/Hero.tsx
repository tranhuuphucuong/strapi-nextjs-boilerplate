import Navbar from '@/components/Navbar';
import { SocialLink } from '@/types';
import Image from 'next/image';
import { getStrapiMedia } from '../../../api/api-helpers';
import { getGlobal } from '../../../api/getGlobal';
import HighlightedText from '../../HighlightedText';
import { RenderSocialIcon } from '../../SocialIcon';

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  id: string;
  url: string;
  name: string;
  alternativeText: string;
}

interface HeroProps {
  data?: {
    bio: {
      id: number;
      title: string;
      description: string;
      avatar: {
        id: number;
        url: string;
        alternativeText: null;
        caption: null;
        width: number;
        height: number;
      };
    };
    social_links: { data: SocialLink[] };
    picture: {
      id: number;
      url: string;
      alternativeText: null;
      caption: null;
      width: number;
      height: number;
    };
    // id: string;
    // title: string;
    // description: string;
    // picture: Picture;
    // buttons: Button[];
  };
}

export default async function Hero({ data }: HeroProps) {
  const { bio, social_links, picture } = data || {};
  const imgUrl = getStrapiMedia(picture?.url);
  const avatarUrl = getStrapiMedia(bio?.avatar.url);
  const global = await getGlobal();

  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global) return null;

  // const navbarLogoUrl = getStrapiMedia(navbar.navbarLogo.logoImg?.url);

  // const footerLogoUrl = getStrapiMedia(footer.footerLogo.logoImg?.url);

  // const socialLinks = footer.socialLinks;

  return (
    <section
      className="background-image bg-cover bg-fixed bg-center bg-no-repeat text-slate-100 dark:bg-black dark:text-gray-100"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundPositionY: '-100px',
      }}
    >
      <Navbar links={global.navLink} logoText={''} />
      <div className="container mx-auto flex flex-col justify-center p-6 sm:py-12 lg:flex-row lg:justify-between lg:py-32">
        <div className="flex flex-col justify-center rounded-lg p-6 text-center lg:max-w-xl lg:text-left xl:max-w-3xl">
          <div className="mb-8 flex items-center space-x-6 drop-shadow-2xl">
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="logo"
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <HighlightedText
              text={bio?.title}
              tag="h1"
              className="text-5xl font-bold leading-none sm:text-6xl"
              color="dark:text-violet-400"
            />
          </div>

          <HighlightedText
            text={
              bio?.description +
              ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia magni non est ipsa quod!'
            }
            tag="p"
            className="tmt-6 mb-4 text-lg drop-shadow-2xl"
            color="dark:text-violet-400"
          />

          <div className="mt-4 flex flex-col drop-shadow-2xl sm:flex-row sm:items-center sm:justify-center sm:space-x-8 lg:justify-start">
            {social_links?.data.map((link: SocialLink) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.title}
                  target={'_blank'}
                  className="justify-centers flex items-center rounded-full dark:bg-violet-400 dark:text-gray-900"
                >
                  <RenderSocialIcon
                    social={link.platform}
                    className="h-6 w-6"
                  />
                </a>
              );
            })}
          </div>
        </div>
        {/* <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <Image
            src={imgUrl || ""}
            alt={
              data.picture.data.attributes.alternativeText || "none provided"
            }
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
            width={600}
            height={600}
          />
        </div> */}
      </div>
    </section>
  );
}
