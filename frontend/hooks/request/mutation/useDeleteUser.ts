import { useMutation } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';

export const useDeleteUser = () => {
  const axiosInstance = usePrivateClient();

  return useMutation((userId: string) => axiosInstance.delete(`/users/${userId}`));
};
