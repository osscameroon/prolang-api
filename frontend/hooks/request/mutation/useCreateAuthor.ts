import { useMutation } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';
import { CreateAuthorInput, AuthorResponseData } from '@typings/common';

export const useCreateAuthor = () => {
  const axiosInstance = usePrivateClient();

  return useMutation((input: CreateAuthorInput) => axiosInstance.post<AuthorResponseData>('/authors', input));
};
