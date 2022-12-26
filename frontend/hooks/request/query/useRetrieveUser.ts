import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { User, UserResponseData } from '@typings/common';
import { usePrivateClient } from '@hooks/useAxios';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveUser = (languageId: string, options?: UseQueryOptions<User>) => {
  const axiosInstance = usePrivateClient();

  return useQuery<User, unknown, User, QueryKey>(
    [QUERY_KEYS.getUser, languageId],
    async ({ queryKey: [, id] }) => {
      const response = await axiosInstance.get<UserResponseData>(`users/${id}`);

      return response.data.data;
    },
    options,
  );
};
