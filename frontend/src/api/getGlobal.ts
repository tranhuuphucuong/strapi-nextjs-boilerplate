import { fetchAPI } from './fetch-api';
const defaultGlobal = {
  navLink: [],
  avatar: {},
  avatartext: '',
};
export const getGlobal = async () => {
  const urlParamsObject = {
    populate: {
      navLink: true,
      avatar: true,
    },
  };
  return (await fetchAPI('/global', urlParamsObject)) || defaultGlobal;
};
