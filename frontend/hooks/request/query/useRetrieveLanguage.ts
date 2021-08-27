import { useQuery, UseQueryOptions } from 'react-query';

import { Language, LanguageResponseData } from '@typings/common';
import { usePublicClient } from '@hooks/useAxios';
import { QUERY_KEYS } from '@utils/constants';

export const useRetrieveLanguage = (languageId: string, options?: UseQueryOptions<Language> | undefined) => {
  const axiosInstance = usePublicClient();

  return useQuery(
    [QUERY_KEYS.getLanguage, languageId],
    async ({ queryKey: [, id] }) => {
      const response = await axiosInstance.get<LanguageResponseData>(`languages/${id}`);

      return response.data.data;
    },
    options,
  );
};
