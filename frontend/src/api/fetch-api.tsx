import qs from 'qs';
import { getStrapiURL } from './api-helpers';
import { flattenAttributes } from './flattenAttributes';

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {},
) {
  try {
    if (!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN)
      throw new Error('The Strapi API Token environment variable is not set.');

    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ''}`,
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    console.log('DATA BEFORE FLATTENING: ', path);
    console.dir(data, { depth: null });
    const data2 = flattenAttributes(data);
    console.log('DATA AFTER FLATTENING: ');
    console.dir(data2, { depth: null });

    return data2;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    );
  }
}
