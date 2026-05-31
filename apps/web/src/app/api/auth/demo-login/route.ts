import { NextRequest, NextResponse } from 'next/server'
import { DEMO_ESNAF_ID, DEMO_USER, isDemoModeEnabled, safeDemoRedirectPath } from '@/lib/demoMode'
import { oturumOlustur } from '@/lib/sessionManager'

async function createDemoSessionResponse(request: NextRequest, redirect: boolean) {
    if (!isDemoModeEnabled()) {
        return NextResponse.json({ error: 'Demo mode kapali' }, { status: 403 })
    }

    const redirectTo = safeDemoRedirectPath(
        request.nextUrl.searchParams.get('redirect') ||
        request.nextUrl.searchParams.get('callbackUrl')
    )

    const response = redirect
        ? NextResponse.redirect(new URL(redirectTo, request.url))
        : NextResponse.json({
            ok: true,
            isDemo: true,
            esnafId: DEMO_ESNAF_ID,
            user: DEMO_USER,
            redirectTo,
        })

    await oturumOlustur(DEMO_ESNAF_ID, response)
    return response
}

export async function GET(request: NextRequest) {
    return createDemoSessionResponse(request, true)
}

export async function POST(request: NextRequest) {
    return createDemoSessionResponse(request, false)
}
