import { NextRequest, NextResponse } from "next/server";
import { getFromCookies } from "./lib/actions/cookies.action";

export async function middleware(request: NextRequest) {
  const userData = await getFromCookies<UserData>('userData');

  // Define paths that should be publicly accessible without authentication
  const publicPaths = ['/sign-in', '/sign-up', '/_next', '/static', '/favicon.ico', '/icons', '/auth', '/root'];

  // Check if the request URL matches any of the public paths
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (!userData && !isPublicPath) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!sign-in|sign-up|_next|static|favicon.ico|icons).*)',
  ],
};
