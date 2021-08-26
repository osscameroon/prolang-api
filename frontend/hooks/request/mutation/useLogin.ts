import { useMutation } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';
import { LoginInput, LoginResponseData } from '@typings/common';

export const useLogin = () => {
  const axiosInstance = usePrivateClient();

  return useMutation((input: LoginInput) => axiosInstance.post<LoginResponseData>('/users/auth', input));
};
