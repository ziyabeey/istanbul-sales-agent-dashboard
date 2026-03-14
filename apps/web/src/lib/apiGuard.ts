import { NextResponse } from 'next/server'

type GuardOptions = {
    requireCronSecret?: boolean
    requireAdminToken?: boolean
    requireADKBearer?: boolean
}

type GuardResult =
    | { ok: true }
    | { ok: false; response: NextResponse }

export async function apiGuard(
    request: Request,
    options: GuardOptions = {}
): Promise<GuardResult> {
    if (options.requireCronSecret) {
        // Cloud Scheduler header
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

    return { ok: true }
}
