import { NextResponse } from 'next/server'
import { esnafSiteUret } from '@/utils/siteUreticisi'
import { isSiteGenerationEnabled, siteFeatureDisabledResponse } from '@/lib/site/siteFeatureFlags'
import { apiGuard } from '@/lib/apiGuard'
import { SERVICE_AUDIENCES, SERVICE_SCOPES } from '@/lib/serviceAuth'

export const maxDuration = 300

export async function POST(req: Request) {
    const guard = await apiGuard(req, {
        requireServicePrincipal: {
            audience: SERVICE_AUDIENCES.siteGenerator,
            scopes: [SERVICE_SCOPES.siteGenerate],
            allowedSubjects: ['cloud-tasks'],
            allowLegacyCronSecret: true,
        },
    })
    if (!guard.ok) return guard.response

    try {
        if (!isSiteGenerationEnabled()) {
            return siteFeatureDisabledResponse()
        }

        const body = await req.json()
        const { esnafId } = body

        if (!esnafId) {
            return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
        }

        const url = await esnafSiteUret(esnafId)
        return NextResponse.json({ ok: true, url })
    } catch (error: unknown) {
        // 500 intentionally keeps Cloud Tasks retry semantics.
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
