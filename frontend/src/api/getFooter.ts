import { Media } from '@/types';
import { fetchAPI } from './fetch-api';

type FooterProps = {
  footerLogo?: Media;
  logoText: string;
  socialLinks: {
    data: any[];
  };
  legalLinks: any[];
};

const defaultFooter = {
  logoText: '',
  socialLinks: {
    data: [],
  },
  legalLinks: [],
};

export const getFooter = async (): Promise<FooterProps> => {
  const path = `/footer`;

  const urlParamsObject = {
    populate: {
      footerLogo: {
        fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
      },
      legalLinks: true,
      socialLinks: {
        fields: ['url', 'title', 'platform', 'icon'],
      },
    },
  };

  const footerData = await fetchAPI(path, urlParamsObject);
  if (!footerData) return defaultFooter;
  return footerData;
};
