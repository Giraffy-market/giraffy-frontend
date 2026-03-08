import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    error?: string;
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    access_token: string;
    refresh_token: string;
    user_id: string;
    expired_in: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    user_id?: string;
    expiresAt?: number;
    error?: string;
  }
}
