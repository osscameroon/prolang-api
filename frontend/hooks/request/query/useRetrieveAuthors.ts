import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { usePublicClient } from '@hooks/useAxios';
import { AuthorList, AuthorListResponseData, FilterQueryParams } from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveAuthors = (
  { page, search }: FilterQueryParams,
  options?: UseQueryOptions<AuthorList> | undefined,
) => {
  const axiosInstance = usePublicClient();
  const queryString = [`page=${page}`, search ? `search=${search}` : null]
    .filter((query) => Boolean(query))
    .join('&');
  
  return useQuery<AuthorList, unknown, AuthorList, QueryKey>(
    `${QUERY_KEYS.getAuthors}-${queryString}`,
    async () => {
      const response = await axiosInstance.get<AuthorListResponseData>(`authors?${queryString}`);

      return response.data.data;
    },
    options,
  );
};
