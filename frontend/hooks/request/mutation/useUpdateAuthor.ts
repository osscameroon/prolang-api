import { useMutation } from 'react-query';

import { UpdateAuthorInput, AuthorResponseData } from '@typings/common';
import { usePrivateClient } from '@hooks/useAxios';

export const useUpdateAuthor = (id: string) => {
  const axiosInstance = usePrivateClient();

  return useMutation((input: UpdateAuthorInput) => axiosInstance.put<AuthorResponseData>(`/authors/${id}`, input));
};
