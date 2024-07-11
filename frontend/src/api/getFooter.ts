import { fetchAPI } from './fetch-api';

export const getFooter = async () => {
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

  return await fetchAPI(path, urlParamsObject);
};
