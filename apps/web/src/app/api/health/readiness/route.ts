import { NextResponse } from 'next/server'
import {
    getControlledLaunchEnvReadiness,
    getFeatureEnvReadiness,
    isProductionEnvReady,
} from '@/lib/envReadiness'

type FirebaseAdminStatus = 'ok' | 'missing' | 'error'

function unauthorizedResponse() {
    return NextResponse.json(
        { error: 'Yetkisiz', code: 'UNAUTHORIZED' },
        { status: 401 }
    )
}

async function getFirebaseAdminStatus(): Promise<FirebaseAdminStatus> {
    try {
        const { adminDb } = await import('@/lib/firebaseAdmin')
        return adminDb ? 'ok' : 'missing'
    } catch {
        return 'error'
    }
}

export async function GET(request: Request) {
    const adminSecret = process.env.ADMIN_SECRET_TOKEN?.trim()
    const adminToken = request.headers.get('x-admin-token')?.trim()

    if (!adminSecret || adminToken !== adminSecret) {
        return unauthorizedResponse()
    }

    const controlledLaunch = getControlledLaunchEnvReadiness()
    const features = getFeatureEnvReadiness()
    const firebaseAdmin = await getFirebaseAdminStatus()
    const featuresReady = Object.values(features).every((feature) => feature.ready)

    return NextResponse.json({
        ok: isProductionEnvReady() && featuresReady && firebaseAdmin !== 'error',
        service: 'kepenk-web',
        time: new Date().toISOString(),
        controlledLaunch,
        features,
        firebaseAdmin,
    })
}
