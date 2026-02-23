import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    const token = req.nextauth.token;

    const isMainPage = url.pathname === '/';
    const isCategoryPage = url.pathname.startsWith('/category');

    // Якщо немає токена І це НЕ головна І НЕ сторінка категорії — тоді редирект
    if (!token && !isMainPage && !isCategoryPage) {
      url.pathname = '/';
      url.searchParams.set('modal', 'modal-login');
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ['/profile/:path*', '/settings/:path*', '/chats/:path*'],
};
