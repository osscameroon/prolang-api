import { useQuery } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';
import { UserResponseListData } from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveUsers = () => {
  const axiosInstance = usePrivateClient();

  return useQuery(QUERY_KEYS.getUsers, async () => {
    const response = await axiosInstance.get<UserResponseListData>('users');

    return response.data.data;
  });
};
