import { useMutation } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';

export const useDeleteAuthor = () => {
  const axiosInstance = usePrivateClient();

  return useMutation((authorId: string) => axiosInstance.delete(`/authors/${authorId}`));
};
