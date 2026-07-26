import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect dashboard and admin routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    // Session token check placeholder (Integrates with NextAuth, Clerk, etc.)
    const sessionToken = req.cookies.get('next-auth.session-token')?.value || req.cookies.get('__session')?.value;

    // Uncomment to enforce hard redirect when unauthenticated
    // if (!sessionToken) {
    //   return NextResponse.redirect(new URL('/login', req.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};