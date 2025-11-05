'use server';

import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { getServerAuthSession } from '@/modules/auth/configs/AuthConfig';

export const httpClient = async (): Promise<AxiosInstance> => {
  const session = await getServerAuthSession();

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${session?.access_token || ''}`,
    },
  });
};
