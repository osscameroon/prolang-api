import { useMutation } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';

export const useDeleteLanguage = () => {
  const axiosInstance = usePrivateClient();

  return useMutation((languageId: string) => axiosInstance.delete(`/languages/${languageId}`));
};
