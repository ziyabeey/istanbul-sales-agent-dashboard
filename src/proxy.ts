import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Sadece /admin ile başlayan rotaları koruyoruz, /admin/login'i hariç tutuyoruz
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const token = request.cookies.get('admin_token')?.value;

        // Gerçek bir senaryoda bu process.env'den gelir ve daha güvenli valide edilir
        if (token !== 'secret_admin_token_2026') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
