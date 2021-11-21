import express from 'express';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { setupRestEndpoints } from '../../rest/server';
import { SERVER_PORT } from '../../shared/core/config';

export type TestInstance = { apiClient: AxiosInstance; httpServer: any };

const getAxiosResponseData = (response: AxiosResponse) => response.data;

const handleAxiosRequestFailure = ({ response }: AxiosError) => {
  return Promise.reject({
    data: response?.data,
    status: response?.status,
  });
};

const resolveAxiosError = (e: any) => e;

const startServer = async () => {
  const app = express();

  setupRestEndpoints(app);

  return new Promise((resolve) => {
    const httpServer = app.listen(SERVER_PORT, async () => {
      const originalClose = httpServer.close.bind(httpServer);

      // @ts-ignore
      httpServer.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };
      resolve(httpServer);
    });
  });
};

const initializeServerAndApiClient = async (): Promise<TestInstance> => {
  const httpServer = await startServer();
  // @ts-ignore
  const baseURL = `http://localhost:${httpServer.address().port}`;

  const apiClient = axios.create({ baseURL });

  apiClient.interceptors.response.use(getAxiosResponseData, handleAxiosRequestFailure);

  return { apiClient, httpServer };
};

export { initializeServerAndApiClient, resolveAxiosError };
