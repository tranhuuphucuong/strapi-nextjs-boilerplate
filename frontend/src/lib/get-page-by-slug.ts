import { fetchAPI } from '@/api/fetch-api';

export async function getPageBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const path = `/pages`;
  const urlParamsObject = {
    filters: { slug },
    locale: lang,
    populate: {
      contentSections: {
        populate: {
          picture: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          video: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          buttons: {
            populate: true,
          },
          feature: {
            populate: {
              fields: [
                'title',
                'description',
                'showLink',
                'newTab',
                'url',
                'text',
              ],
              media: {
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
          testimonials: {
            populate: {
              picture: {
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
          plans: {
            populate: ['product_features'],
          },
          submitButton: {
            populate: true,
          },
        },
      },
      seo: {
        fields: ['metaTitle', 'metaDescription'],
        populate: { shareImage: true },
      },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await fetchAPI(path, urlParamsObject, options);
}
