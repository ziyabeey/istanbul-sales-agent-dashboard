import { NextRequest, NextResponse } from 'next/server'
import {
    BUSINESS_SESSION_COOKIE,
    resolveCanonicalBusinessContext,
} from '@/lib/auth/businessSession'
import { isMvpDashboardPathAllowed, isMvpTestReleaseEnabled } from '@/lib/mvpFeatureFlags'

/**
 * Kepenk Unified Proxy (Next.js 16)
 * Combines: Subdomain routing + canonical business-session protection.
 *
 * edit.kepenk.ai    → /dashboard/sitem/editor
 * app.kepenk.ai     → /dashboard/manage
 * manage.kepenk.ai  → /dashboard/manage
 * *.kepenk.ai       → /[slug] (esnaf siteleri)
 */
export default async function proxy(req: NextRequest) {
    const url = req.nextUrl.clone()
    const hostname = req.headers.get('host') || ''
    const { pathname } = req.nextUrl
    const subdomain = extractSubdomain(hostname)

    const dashboardTarget = resolveDashboardTarget(subdomain, pathname)
    const sessionToken = req.cookies.get(BUSINESS_SESSION_COOKIE)?.value
    const shouldResolveBusinessContext = Boolean(sessionToken) && (
        Boolean(dashboardTarget) || pathname.startsWith('/giris')
    )
    const businessContext = shouldResolveBusinessContext
        ? await resolveCanonicalBusinessContext(sessionToken)
        : null

    // Business dashboard authority is canonical Session -> User -> Membership.
    // Random cookies, expired/revoked sessions and legacy esnafId JWTs do not
    // count as logged in here.
    if (dashboardTarget && !businessContext) {
        return NextResponse.redirect(buildLoginUrl(req.nextUrl, subdomain, dashboardTarget))
    }

    // Giriş sayfasında canonical oturum varsa dashboard'a yönlendir.
    if (pathname.startsWith('/giris')) {
        if (businessContext) {
            const target = defaultDashboardForSubdomain(subdomain)
            return NextResponse.redirect(new URL(target, req.nextUrl))
        }

        // Login must remain reachable on app/edit/manage subdomains instead of
        // being rewritten back under /dashboard and causing an auth loop.
        return NextResponse.next()
    }

    // Auth endpoints must never be rewritten under a dashboard subdomain.
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next()
    }

    // Admin auth remains owned by P0-06. P0-03 intentionally does not turn
    // business RequestContext into an admin principal.
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const token = req.cookies.get('admin_token')?.value
        if (token !== process.env.ADMIN_SECRET_TOKEN) {
            return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
        }
    }

    // Any dashboard target is authorized before rewrite/redirect decisions.
    if (dashboardTarget) {
        const blocked = redirectBlockedMvpDashboard(dashboardTarget, req.nextUrl)
        if (blocked) return blocked

        // Redirect old editor URL to edit.kepenk.ai after authorization.
        if (
            pathname.startsWith('/dashboard/sitem/editor') &&
            subdomain !== 'edit' &&
            !isLocalDev(hostname)
        ) {
            const editUrl = new URL(
                pathname.replace('/dashboard/sitem/editor', '/'),
                'https://edit.kepenk.ai'
            )
            editUrl.search = url.search
            return NextResponse.redirect(editUrl, 301)
        }

        if (dashboardTarget !== pathname) {
            url.pathname = dashboardTarget
            return NextResponse.rewrite(url)
        }

        return NextResponse.next()
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

    const blockedDashboardRedirect = redirectBlockedMvpDashboard(pathname, req.nextUrl)
    if (blockedDashboardRedirect) return blockedDashboardRedirect

    return NextResponse.next()
}

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

function resolveDashboardTarget(subdomain: string | null, pathname: string): string | null {
    if (pathname.startsWith('/giris') || pathname.startsWith('/api/auth')) return null

    if (subdomain === 'edit') {
        if (pathname === '/' || pathname === '') return '/dashboard/sitem/editor'
        if (pathname.startsWith('/dashboard/sitem/editor')) return pathname
        return `/dashboard/sitem/editor${pathname}`
    }

    if (subdomain === 'app') {
        if (pathname === '/' || pathname === '') return '/dashboard/manage'
        if (pathname.startsWith('/dashboard')) return pathname
        return `/dashboard${pathname}`
    }

    if (subdomain === 'manage') {
        if (pathname === '/' || pathname === '') return '/dashboard/manage'
        if (pathname.startsWith('/dashboard/manage')) return pathname
        return `/dashboard/manage${pathname}`
    }

    return pathname.startsWith('/dashboard') ? pathname : null
}

function defaultDashboardForSubdomain(subdomain: string | null): string {
    if (subdomain === 'edit') return '/dashboard/sitem/editor'
    return isMvpTestReleaseEnabled() ? '/dashboard' : '/dashboard/manage'
}

function buildLoginUrl(requestUrl: URL, subdomain: string | null, callbackUrl: string): URL {
    const loginUrl = new URL('/giris', requestUrl)

    // Business subdomain redirects go to the apex login surface so /giris is
    // never caught by dashboard subdomain rewriting.
    if (subdomain === 'edit' || subdomain === 'app' || subdomain === 'manage') {
        if (loginUrl.hostname.endsWith('.kepenk.ai')) {
            loginUrl.hostname = 'kepenk.ai'
        } else if (loginUrl.hostname.endsWith('.localhost')) {
            loginUrl.hostname = 'localhost'
        }
    }

    loginUrl.search = ''
    loginUrl.searchParams.set('callbackUrl', callbackUrl)
    return loginUrl
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
