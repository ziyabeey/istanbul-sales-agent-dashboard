import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Get hostname of request
  let hostname = req.headers.get('host')!;

  // Strip port number for consistent routing  
  hostname = hostname.replace(/:\d+$/, '');

  // Special handling for localhost/dev testing
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // ?site=ahmetberber.kepenk.ai → simulate custom domain
    const testSite = url.searchParams.get('site');
    if (testSite) {
      hostname = testSite;
    } else {
      // Use 'localhost' as the domain — page.tsx will check for ?theme= param
      hostname = 'localhost';
    }
  }

  // Rewrite to /[domain]/path, keeping all search params intact
  const rewritePath = `/${hostname}${url.pathname === '/' ? '' : url.pathname}`;
  url.pathname = rewritePath;
  return NextResponse.rewrite(url);
}
