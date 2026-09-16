import { NextResponse } from 'next/server'
import type { RequestContext } from '../../../../packages/auth/src/types/canonical'
import { resolveCanonicalBusinessContextFromRequest } from './auth/businessSession'

type GuardOptions = {
    requireUserSession?: boolean
    requireCronSecret?: boolean
    requireAdminToken?: boolean
    requireADKBearer?: boolean
}

type GuardResult =
    | { ok: true; context?: RequestContext }
    | { ok: false; response: NextResponse }

export async function apiGuard(
    request: Request,
    options: GuardOptions = {}
): Promise<GuardResult> {
    let context: RequestContext | undefined

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

    if (options.requireCronSecret) {
        // Cloud Scheduler header. ServicePrincipal cutover belongs to P0-04.
        const secret =
            request.headers.get('x-cron-secret') ||
            request.headers.get('authorization')?.replace('Bearer ', '')

        if (secret !== process.env.CRON_SECRET) {
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
        if (token !== process.env.ADMIN_SECRET_TOKEN) {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
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

    return context ? { ok: true, context } : { ok: true }
}
