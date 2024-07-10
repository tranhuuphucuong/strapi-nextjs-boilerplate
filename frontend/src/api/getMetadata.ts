import { fetchAPI } from './fetch-api';

export const getMetadata = async () => {
  const urlParamsObject = {
    populate: {
      favicon: {
        fields: ['url'],
      },
    },
  };
  return await fetchAPI('/metadata', urlParamsObject);
};
