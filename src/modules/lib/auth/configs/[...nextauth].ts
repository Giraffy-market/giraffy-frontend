import type { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { API_ENDPOINTS } from '@/shared/api/constans/routes';
import { httClient } from '@/shared/api/httClient';

type LoginResponse = {
  access_token: string;
  token_type: string;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Електронна пошта',
          type: 'email',
          placeholder: 'example@mail.com',
        },
        password: {
          label: 'Пароль',
          type: 'password',
          placeholder: 'Введіть пароль',
        },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const response = await httClient<LoginResponse>({
          endpoint: API_ENDPOINTS.AUTH.AUTHENTICATION_LOGIN,
          method: 'POST',
          data: {
            username: email,
            password: password,
          },
        });

        if (!response) return null;

        return response.data;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
