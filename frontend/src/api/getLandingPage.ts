import { fetchAPI } from './fetch-api';

export const getLandingPage = async () => {
  const path = `/landing-page`;

  const urlParamsObject = {
    populate: {
      seo: {
        populate: {
          sharedImage: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      hero: {
        populate: {
          bio: {
            populate: {
              avatar: {
                fields: [
                  'url',
                  'alternativeText',
                  'caption',
                  'width',
                  'height',
                ],
              },
            },
          },
          social_links: {
            fields: ['url', 'title', 'platform'],
          },
          picture: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
    },
  };

  return await fetchAPI(path, urlParamsObject);
};
