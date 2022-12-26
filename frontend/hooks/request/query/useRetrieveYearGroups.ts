import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { usePublicClient } from '@hooks/useAxios';
import { YearGroup, YearGroupResponseData } from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveYearGroups = (options?: UseQueryOptions<YearGroup[]> | undefined) => {
  const axiosInstance = usePublicClient();

  return useQuery<YearGroup[], unknown, YearGroup[], QueryKey>(QUERY_KEYS.getYearGroups, async () => {
    const response = await axiosInstance.get<YearGroupResponseData>('years-groups');

    return response.data.data;
  }, options);
};