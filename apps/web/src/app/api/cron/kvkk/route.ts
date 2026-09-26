import { NextResponse } from 'next/server'

/**
 * P0-08 hard cut: simulated KVKK work is non-authoritative and must never
 * report compliance success before the real lifecycle implementation exists.
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
        message: 'KVKK lifecycle is not implemented; no retention or destruction work was performed.',
    }, { status: 501 })
}
