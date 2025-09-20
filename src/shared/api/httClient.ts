import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'Base-url',
});

type RequestType = {
  endpoint: string;
  params?: AxiosRequestConfig['params'];
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
};

export async function httClient<T>({
  endpoint,
  method = 'GET',
  data,
  headers,
  params,
}: RequestType): Promise<AxiosResponse<T>> {
  try {
    return await api.request({
      method,
      url: endpoint,
      data,
      params,
      headers,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
