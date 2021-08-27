import { useMutation } from 'react-query';

import { UpdateLanguageInput, LanguageResponseData } from '@typings/common';
import { usePrivateClient } from '@hooks/useAxios';

export const useUpdateLanguage = (id: string) => {
  const axiosInstance = usePrivateClient();

  return useMutation((input: UpdateLanguageInput) => axiosInstance.put<LanguageResponseData>(`/languages/${id}`, input));
};