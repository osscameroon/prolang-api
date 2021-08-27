import { useCookies } from 'react-cookie';
import { useQuery, useQueryClient } from 'react-query';

import { User, UserResponseData } from '@typings/common';
import { COOKIE_NAME } from '@utils/constants';
import { usePrivateClient } from '@hooks/useAxios';

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_NAME]);
  const axiosInstance = usePrivateClient();
  const queryClient = useQueryClient();

  const cookie = cookies[COOKIE_NAME];

  const user = queryClient.getQueryData<User>('getUser');

  const { data, isLoading } = useQuery(
    'getAuthenticated',
    async () => {
      const response = await axiosInstance.get<UserResponseData>('users/me');

      return response.data.data;
    },
    {
      cacheTime: 24 * 3600,
      enabled: Boolean(cookie) && !Boolean(user),
    },
  );

  const saveToken = (token: string) => {
    setCookie(COOKIE_NAME, token, { path: '/', secure: true });
  };

  const deleteToken = () => {
    removeCookie(COOKIE_NAME, { path: '/' });
  };

  return { deleteToken, loading: isLoading, saveToken, user: data || user };
};

export { useAuth };
