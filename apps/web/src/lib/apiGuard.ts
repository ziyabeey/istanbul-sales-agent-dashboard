import { NextResponse } from 'next/server'
import type { RequestContext } from '../../../../packages/auth/src/types/canonical'
import type { ServicePrincipal } from '../../../../packages/security/src/servicePrincipal'
import { resolveCanonicalBusinessContextFromRequest } from './auth/businessSession'
import { verifyServiceRequest, type ServiceRequirement } from './serviceAuth'

type GuardOptions = {
    requireUserSession?: boolean
    requireServicePrincipal?: ServiceRequirement
    requireCronSecret?: boolean
    requireAdminToken?: boolean
    requireADKBearer?: boolean
}

type GuardResult =
    | { ok: true; context?: RequestContext; servicePrincipal?: ServicePrincipal }
    | { ok: false; response: NextResponse }

export async function apiGuard(
    request: Request,
    options: GuardOptions = {}
): Promise<GuardResult> {
    let context: RequestContext | undefined
    let servicePrincipal: ServicePrincipal | undefined

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
        // Legacy compatibility only. New worker/task routes should use
        // requireServicePrincipal and opt into this secret only route-by-route.
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

    if (options.requireAdminToken) {
        // AdminPrincipal/AdminSession convergence belongs to P0-06.
        const token = request.headers.get('x-admin-token')
        if (!process.env.ADMIN_SECRET_TOKEN || token !== process.env.ADMIN_SECRET_TOKEN) {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
            }
        }
    }

    if (options.requireADKBearer) {
        const auth = request.headers.get('authorization')
        if (!process.env.ADK_BEARER_TOKEN || auth !== `Bearer ${process.env.ADK_BEARER_TOKEN}`) {
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
    }
}
