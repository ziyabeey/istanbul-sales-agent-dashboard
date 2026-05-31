import { NextResponse } from 'next/server'
import { auth } from "@/auth";
import { isMvpDashboardPathAllowed, isMvpTestReleaseEnabled } from '@/lib/mvpFeatureFlags'

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
    // NextAuth veya custom JWT session (kepenk_session cookie)
    const isLoggedIn = !!req.auth || !!req.cookies.get('kepenk_session')?.value

    // ═══ SUBDOMAIN ROUTING ═══

    const subdomain = extractSubdomain(hostname)
    const blockedDashboardRedirect = redirectBlockedMvpDashboard(pathname, req.nextUrl)
    if (blockedDashboardRedirect) return blockedDashboardRedirect

    // ── edit.kepenk.ai → Editor ──
    if (subdomain === 'edit') {
        if (pathname === '/' || pathname === '') {
            const targetPathname = '/dashboard/sitem/editor'
            const blocked = redirectBlockedMvpDashboard(targetPathname, req.nextUrl)
            if (blocked) return blocked
            url.pathname = targetPathname
            return NextResponse.rewrite(url)
        }
        if (!pathname.startsWith('/dashboard/sitem/editor')) {
            const targetPathname = `/dashboard/sitem/editor${pathname}`
            const blocked = redirectBlockedMvpDashboard(targetPathname, req.nextUrl)
            if (blocked) return blocked
            url.pathname = targetPathname
            return NextResponse.rewrite(url)
        }
    }

    // ── app.kepenk.ai → Manage Dashboard (primary) ──
    if (subdomain === 'app') {
        if (pathname === '/' || pathname === '') {
            const targetPathname = '/dashboard/manage'
            const blocked = redirectBlockedMvpDashboard(targetPathname, req.nextUrl)
            if (blocked) return blocked
            url.pathname = targetPathname
            return NextResponse.rewrite(url)
        }
        if (!pathname.startsWith('/dashboard')) {
            const targetPathname = `/dashboard${pathname}`
            const blocked = redirectBlockedMvpDashboard(targetPathname, req.nextUrl)
            if (blocked) return blocked
            url.pathname = targetPathname
            return NextResponse.rewrite(url)
        }
    }

    // ── manage.kepenk.ai → Manage Dashboard ──
    if (subdomain === 'manage') {
        if (pathname === '/' || pathname === '') {
            const targetPathname = '/dashboard/manage'
            const blocked = redirectBlockedMvpDashboard(targetPathname, req.nextUrl)
            if (blocked) return blocked
            url.pathname = targetPathname
            return NextResponse.rewrite(url)
        }
        if (!pathname.startsWith('/dashboard/manage')) {
            const targetPathname = `/dashboard/manage${pathname}`
            const blocked = redirectBlockedMvpDashboard(targetPathname, req.nextUrl)
            if (blocked) return blocked
            url.pathname = targetPathname
            return NextResponse.rewrite(url)
        }
    }

    // ── destek.kepenk.ai → Destek/Yardım Merkezi ──
    if (subdomain === 'destek') {
        if (pathname === '/' || pathname === '') {
            url.pathname = '/destek'
            return NextResponse.rewrite(url)
        }
        if (!pathname.startsWith('/destek')) {
            url.pathname = `/destek${pathname}`
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

    // Dashboard koruması — giriş yapılmamışsa /giris'e yönlendir
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
            return Response.redirect(new URL(`/giris?callbackUrl=${pathname}`, req.nextUrl))
        }
    }

    // Giriş sayfasında zaten giriş yapmışsa dashboard'a yönlendir
    if (pathname.startsWith("/giris")) {
        if (isLoggedIn) {
            return Response.redirect(new URL(isMvpTestReleaseEnabled() ? "/dashboard" : "/dashboard/manage", req.nextUrl))
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

function redirectBlockedMvpDashboard(pathname: string, requestUrl: URL) {
    if (
        isMvpTestReleaseEnabled() &&
        pathname.startsWith('/dashboard') &&
        !isMvpDashboardPathAllowed(pathname)
    ) {
        return NextResponse.redirect(new URL('/dashboard', requestUrl))
    }

    return null
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|mp4|webm)$).*)',
    ],
}
