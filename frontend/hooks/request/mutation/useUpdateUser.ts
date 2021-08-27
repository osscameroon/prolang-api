import { useMutation } from 'react-query';

import { UpdateUserInput, UserResponseData } from '@typings/common';
import { usePrivateClient } from '@hooks/useAxios';

export const useUpdateUser = (id: string) => {
  const axiosInstance = usePrivateClient();

  return useMutation((input: UpdateUserInput) => axiosInstance.put<UserResponseData>(`/users/${id}`, input));
};
