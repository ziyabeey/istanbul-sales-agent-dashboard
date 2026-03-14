import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. ahmetberber.com, ahmetberber.kepenk.ai, localhost:3001)
  let hostname = req.headers.get('host')!;

  // We only care about the domain part for routing in apps/sites
  // Special handling for localhost testing
  if (hostname.includes('localhost')) {
      // Allow testing like localhost:3001?site=ahmetberber.kepenk.ai
      const testSite = url.searchParams.get('site');
      if (testSite) {
          hostname = testSite;
      }
  }

  // Rewrite to /[domain]/path
  return NextResponse.rewrite(new URL(`/${hostname}${url.pathname}`, req.url));
}
