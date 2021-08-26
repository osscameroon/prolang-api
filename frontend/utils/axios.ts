import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string | undefined => {
  const axiosError = error as AxiosError;

  return axiosError.response?.data.message;
};
