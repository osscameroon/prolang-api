import { useQuery } from 'react-query';

import { usePublicClient } from '@hooks/useAxios';
import { YearGroupResponseData } from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveYearGroups = () => {
  const axiosInstance = usePublicClient();

  return useQuery(QUERY_KEYS.getYearGroups, async () => {
    const response = await axiosInstance.get<YearGroupResponseData>('years-groups');

    return response.data.data;
  });
};