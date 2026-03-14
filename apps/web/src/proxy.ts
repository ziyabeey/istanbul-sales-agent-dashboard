import { NextResponse } from 'next/server'
import { auth } from "@/auth";

/**
 * Kepenk Unified Proxy (Next.js 16)
 * Combines: Subdomain routing + Auth protection
 *
 * edit.kepenk.ai    → /dashboard/sitem/editor
 * app.kepenk.ai     → /dashboard/manage
 * manage.kepenk.ai  → /dashboard/manage
 * *.kepenk.ai       → /[slug] (esnaf siteleri)
 */
export default auth((req) => {
    const url = req.nextUrl.clone()
    const hostname = req.headers.get('host') || ''
    const { pathname } = req.nextUrl
    const isLoggedIn = !!req.auth

    // ═══ SUBDOMAIN ROUTING ═══

    const subdomain = extractSubdomain(hostname)

    // ── edit.kepenk.ai → Editor ──
    if (subdomain === 'edit') {
        if (pathname === '/' || pathname === '') {
            url.pathname = '/dashboard/sitem/editor'
            return NextResponse.rewrite(url)
        }
        if (!pathname.startsWith('/dashboard/sitem/editor')) {
            url.pathname = `/dashboard/sitem/editor${pathname}`
            return NextResponse.rewrite(url)
        }
    }

    // ── app.kepenk.ai → Manage Dashboard (primary) ──
    if (subdomain === 'app') {
        if (pathname === '/' || pathname === '') {
            url.pathname = '/dashboard/manage'
            return NextResponse.rewrite(url)
        }
        if (!pathname.startsWith('/dashboard')) {
            url.pathname = `/dashboard${pathname}`
            return NextResponse.rewrite(url)
        }
    }

    // ── manage.kepenk.ai → Manage Dashboard ──
    if (subdomain === 'manage') {
        if (pathname === '/' || pathname === '') {
            url.pathname = '/dashboard/manage'
            return NextResponse.rewrite(url)
        }
        if (!pathname.startsWith('/dashboard/manage')) {
            url.pathname = `/dashboard/manage${pathname}`
            return NextResponse.rewrite(url)
        }
    }

    // ── Redirect old editor URL to edit.kepenk.ai ──
    if (
        pathname.startsWith('/dashboard/sitem/editor') &&
        subdomain !== 'edit' &&
        !isLocalDev(hostname)
    ) {
        const editUrl = new URL(pathname.replace('/dashboard/sitem/editor', '/'), `https://edit.kepenk.ai`)
        editUrl.search = url.search
        return NextResponse.redirect(editUrl, 301)
    }

    // ═══ AUTH PROTECTION ═══

    // Admin koruması
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const token = req.cookies.get('admin_token')?.value
        if (token !== process.env.ADMIN_SECRET_TOKEN) {
            return Response.redirect(new URL('/admin/login', req.nextUrl))
        }
    }

    // Dashboard koruması — giriş yapılmamışsa login'e yönlendir
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
            return Response.redirect(new URL(`/login?callbackUrl=${pathname}`, req.nextUrl))
        }
    }

    // Login sayfasında zaten giriş yapmışsa dashboard'a yönlendir
    if (pathname.startsWith("/login")) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/dashboard/manage", req.nextUrl))
        }
    }
});

/** Extract subdomain from hostname */
function extractSubdomain(hostname: string): string | null {
    const host = hostname.split(':')[0]

    if (host.endsWith('.kepenk.ai')) {
        const parts = host.replace('.kepenk.ai', '').split('.')
        return parts[parts.length - 1] || null
    }

    if (host.endsWith('.localhost')) {
        return host.replace('.localhost', '') || null
    }

    return null
}

/** Check if running in local development */
function isLocalDev(hostname: string): boolean {
    return hostname.includes('localhost') || hostname.includes('127.0.0.1') || hostname.includes('0.0.0.0')
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|mp4|webm)$).*)',
    ],
}
