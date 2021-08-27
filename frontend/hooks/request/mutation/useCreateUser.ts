import { useMutation } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';
import { CreateUserInput, UserResponseData } from '@typings/common';

export const useCreateUser = () => {
  const axiosInstance = usePrivateClient();

  return useMutation((input: CreateUserInput) => axiosInstance.post<UserResponseData>('/users', input));
};
