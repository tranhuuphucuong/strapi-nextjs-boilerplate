import { fetchAPI } from './fetch-api';

export const getContactPage = async () => {
  const path = `/contact-page`;
  const urlParamsObject = {
    populate: {
      figure: true,
    },
  };

  return await fetchAPI(path, urlParamsObject);
};

export const postContactForm = async (data: any) => {
  const path = `/contact-submissions`;
  return await fetchAPI(
    path,
    {},
    {
      method: 'POST',
      body: JSON.stringify({ data }),
    },
  );
};
