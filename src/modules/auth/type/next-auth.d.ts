import NextAuth from 'next-auth';
import type { JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user_id: string;
    access_token: string;
    refresh_token: string;
    token_type: string;
    expired_in: number;
  }
}
