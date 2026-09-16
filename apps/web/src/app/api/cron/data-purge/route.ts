import { NextResponse } from 'next/server'

/**
 * P0-08 hard cut: no route may claim privacy deletion completed until the
 * authoritative W10 lifecycle implementation exists.
 */
export async function GET(req: Request) {
    const authHeader = req.headers.get('authorization')
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
        success: false,
        authoritative: false,
        error: 'privacy_lifecycle_not_implemented',
        message: 'Data purge lifecycle is not implemented; no deletion was performed.',
    }, { status: 501 })
}
