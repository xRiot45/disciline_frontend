import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
