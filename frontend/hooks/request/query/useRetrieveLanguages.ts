import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { usePublicClient } from '@hooks/useAxios';
import {
  LanguageList,
  LanguageListResponseData,
  FilterLanguageParams,
} from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveLanguages = (
  { yearGroup, page, search }: FilterLanguageParams,
  options?: UseQueryOptions<LanguageList> | undefined,
) => {
  const axiosInstance = usePublicClient();
  const queryString = [
    `page=${page}`,
    search ? `search=${search}` : null,
    yearGroup ? `yearGroup=${yearGroup}` : null
  ]
    .filter((query) => Boolean(query))
    .join('&');

  return useQuery<LanguageList, unknown, LanguageList, QueryKey>(
    `${QUERY_KEYS.getLanguages}-${queryString}`,
    async () => {
      const response = await axiosInstance.get<LanguageListResponseData>(`languages?${queryString}`);

      return response.data.data;
    },
    options,
  );
};
