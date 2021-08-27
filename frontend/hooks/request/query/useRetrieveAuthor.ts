import { useQuery, UseQueryOptions } from 'react-query';

import { Author } from '@typings/common';
import { usePublicClient } from '@hooks/useAxios';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveAuthor = (authorId: string, options?: UseQueryOptions<Author> | undefined) => {
  const axiosInstance = usePublicClient();

  return useQuery(
    [QUERY_KEYS.getAuthor, authorId],
    async ({ queryKey: [, id] }) => {
      const response = await axiosInstance.get<{ data: any }>(`authors/${id}`);

      const { data } = response.data;

      return {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
      } as Author;
    },
    options,
  );
};
