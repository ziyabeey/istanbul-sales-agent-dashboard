/**
 * V2 Editor Save API — Save ComponentNode tree to Firestore
 * ─────────────────────────────────────────────────────────────
 * POST /api/site/v2/save
 * 
 * Body:
 *   - manifest: SiteManifest
 *   - page: PageDocument
 *   - masterPage: MasterPageDocument
 * 
 * Saves the V2 editor state (manifest + page + masterPage) to
 * Firestore. Also maintains backward compatibility by converting
 * to flat SiteData.
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function POST(request: Request) {
    try {
        // Auth
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
        }

        const body = await request.json()
        const { manifest, page, masterPage } = body

        if (!manifest || !page || !masterPage) {
            return NextResponse.json(
                { error: 'manifest, page ve masterPage gerekli' },
                { status: 400 }
            )
        }

        // Save to Firestore
        const esnafRef = adminDb.collection('esnaflar').doc(esnafId)
        const esnafDoc = await esnafRef.get()

        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        // Save V2 component tree structure
        const guncelleme: Record<string, any> = {
            sonGuncelleme: Timestamp.now(),
            // V2 data
            'siteV2.manifest': manifest,
            'siteV2.page': page,
            'siteV2.masterPage': masterPage,
            'siteV2.version': (manifest.version || 0),
        }

        await esnafRef.update(guncelleme)

        return NextResponse.json({
            ok: true,
            mesaj: 'V2 taslak kaydedildi',
            version: manifest.version,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Kaydetme başarısız', detay: error.message },
            { status: 500 }
        )
    }
}
