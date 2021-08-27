import { useMutation } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';
import { CreateLanguageInput, LanguageResponseData } from '@typings/common';

export const useCreateLanguage = () => {
  const axiosInstance = usePrivateClient();

  return useMutation((input: CreateLanguageInput) => axiosInstance.post<LanguageResponseData>('/languages', input));
};
