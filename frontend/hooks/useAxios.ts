import axios from 'axios';
import { useCookies } from 'react-cookie';

import { COOKIE_NAME } from '@utils/constants';

export const useAxios = (apiPath?: string) => {
  const [cookies] = useCookies([COOKIE_NAME]);

  const cookie = cookies[COOKIE_NAME];

  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${apiPath || ''}`,
  });

  instance.defaults.headers.common['Accept'] = 'application/json';
  instance.defaults.headers.common['Content-Type'] = 'application/json';

  if (cookie) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
  }

  return instance;
};

export const usePublicClient = () => {
  return useAxios('api');
};

export const usePrivateClient = () => {
  return useAxios('private');
};