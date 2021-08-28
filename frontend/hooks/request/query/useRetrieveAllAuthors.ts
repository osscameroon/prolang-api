import { useQuery, UseQueryOptions } from 'react-query';

import { usePublicClient } from '@hooks/useAxios';
import { Author, AuthorsResponseData } from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveAllAuthors = (options?: UseQueryOptions<Author[]> | undefined) => {
  const axiosInstance = usePublicClient();

  return useQuery(QUERY_KEYS.getAllAuthors, async () => {
    const response = await axiosInstance.get<AuthorsResponseData>('authors/all');

    return response.data.data;
  }, options);
};
