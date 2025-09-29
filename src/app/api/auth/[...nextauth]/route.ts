import NextAuth from 'next-auth';

import { authOptions } from '@/modules/auth/configs/AuthConfig';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
