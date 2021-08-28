import { useQuery, UseQueryOptions } from 'react-query';

import { usePublicClient } from '@hooks/useAxios';
import { Language, LanguagesResponseData } from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveAllLanguages = (options?: UseQueryOptions<Language[]> | undefined) => {
  const axiosInstance = usePublicClient();

  return useQuery(QUERY_KEYS.getAllLanguages, async () => {
    const response = await axiosInstance.get<LanguagesResponseData>('languages/all');

    return response.data.data;
  }, options);
};
