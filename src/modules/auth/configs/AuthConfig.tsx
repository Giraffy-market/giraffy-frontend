import { type AuthOptions, type Session, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { LoginResponse } from '@/modules/auth/type/types';

import { routes } from '@/shared/api/constants/routes';
import { HttpError } from '@/shared/api/errors/http-error';

import { customFetch } from '../../../shared/api/fetch';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Електронна пошта',
          type: 'email',
          placeholder: 'example@mail.com',
          required: true,
        },
        password: {
          label: 'Пароль',
          type: 'password',
          placeholder: 'Введіть пароль',
          required: true,
        },
      },
      // @ts-expect-error next-auth err
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email та пароль не можуть бути порожніми');
        }

        try {
          const data = await customFetch<LoginResponse>(routes.auth.login, '', {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (data?.access_token) {
            return data;
          }
        } catch (error) {
          if (error instanceof HttpError) {
            throw new Error(error.message);
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) return { ...token, ...user };

      return token;
    },
    session: async ({ session, token }) => {
      session.access_token = token.access_token;

      return session;
    },
  },

  pages: {
    signIn: 'modal-login',
  },
};

export const getServerAuthSession = (): Promise<Session | null> =>
  getServerSession(authOptions);
