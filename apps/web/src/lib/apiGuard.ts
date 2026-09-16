import { NextResponse } from 'next/server'
import type { RequestContext } from '../../../../packages/auth/src/types/canonical'
import type { ServicePrincipal } from '../../../../packages/security/src/servicePrincipal'
import { resolveCanonicalBusinessContextFromRequest } from './auth/businessSession'
import {
    readAdminSessionToken,
    validateAdminSessionToken,
    type AdminSession,
} from './auth/adminSession'
import { verifyServiceRequest, type ServiceRequirement } from './serviceAuth'

type GuardOptions = {
    requireUserSession?: boolean
    requireServicePrincipal?: ServiceRequirement
    requireCronSecret?: boolean
    requireAdminSession?: boolean
    /** @deprecated P0-06 compatibility alias. Semantics are durable AdminSession, never x-admin-token. */
    requireAdminToken?: boolean
    requireADKBearer?: boolean
}

type GuardResult =
    | {
        ok: true
        context?: RequestContext
        servicePrincipal?: ServicePrincipal
        adminSession?: AdminSession
    }
    | { ok: false; response: NextResponse }

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

export function isSameOriginMutation(request: Request): boolean {
    if (SAFE_METHODS.has(request.method.toUpperCase())) return true

    const origin = request.headers.get('origin')
    if (!origin) return false

    try {
        const originUrl = new URL(origin)
        const requestUrl = new URL(request.url)
        const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
        const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
        const expectedHost = forwardedHost || request.headers.get('host') || requestUrl.host
        const expectedProtocol = forwardedProto ? `${forwardedProto}:` : requestUrl.protocol

        return originUrl.host === expectedHost && originUrl.protocol === expectedProtocol
    } catch {
        return false
    }
}

export async function apiGuard(
    request: Request,
    options: GuardOptions = {}
): Promise<GuardResult> {
    let context: RequestContext | undefined
    let servicePrincipal: ServicePrincipal | undefined
    let adminSession: AdminSession | undefined

    if (options.requireUserSession) {
        const resolved = await resolveCanonicalBusinessContextFromRequest(request)
        if (!resolved) {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
            }
        }
        context = resolved
    }

    if (options.requireServicePrincipal) {
        const resolved = verifyServiceRequest(request, options.requireServicePrincipal)
        if (!resolved) {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
            }
        }
        servicePrincipal = resolved
    }

    if (options.requireCronSecret) {
        const secret =
            request.headers.get('x-cron-secret') ||
            request.headers.get('authorization')?.replace('Bearer ', '')

        if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
            console.warn('[apiGuard] Cron secret geçersiz')
            return {
                ok: false,
                response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
            }
        }
    }

    if (options.requireAdminSession || options.requireAdminToken) {
        if (!isSameOriginMutation(request)) {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
            }
        }

        const token = readAdminSessionToken(request)
        if (!token) {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
            }
        }

        try {
            const session = await validateAdminSessionToken(token)
            if (!session) {
                return {
                    ok: false,
                    response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
                }
            }
            adminSession = session
        } catch {
            return {
                ok: false,
                response: NextResponse.json(
                    { error: 'Admin authentication unavailable' },
                    { status: 503 }
                ),
            }
        }
    }

    if (options.requireADKBearer) {
        const auth = request.headers.get('authorization')
        if (auth !== `Bearer ${process.env.ADK_BEARER_TOKEN}`) {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
            }
        }
    }

    return {
        ok: true,
        ...(context ? { context } : {}),
        ...(servicePrincipal ? { servicePrincipal } : {}),
        ...(adminSession ? { adminSession } : {}),
    }
}
