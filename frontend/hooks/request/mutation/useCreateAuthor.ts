import { useMutation } from 'react-query';

import { useAxios } from '@hooks/useAxios';
import { CreateAuthorInput, AuthorResponseData } from '@typings/common';

export const useCreateAuthor = () => {
  const axiosInstance = useAxios();

  return useMutation((input: CreateAuthorInput) => axiosInstance.post<AuthorResponseData>('/authors', input));
};
