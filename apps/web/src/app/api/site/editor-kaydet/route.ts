/**
 * Editor Save/Publish API
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/site/editor-kaydet
 * 
 * Body:
 *   - siteJson: object (SiteData — structured editor state)
 *   - siteHtml: string (generated full-page HTML)
 *   - publish?: boolean (if true, also bust ISR cache)
 * 
 * Saves to Firestore esnaflar/{esnafId}:
 *   - siteJson   → for continue-editing (reload into editor)
 *   - siteHtml   → for live rendering at /sites/[domain]
 *   - sonYayinTarihi (if publish=true)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
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
        const { siteJson, siteHtml, publish } = body

        if (!siteJson && !siteHtml) {
            return NextResponse.json({ error: 'siteJson veya siteHtml gerekli' }, { status: 400 })
        }

        // Build Firestore update
        const esnafRef = adminDb.collection('esnaflar').doc(esnafId)
        const esnafDoc = await esnafRef.get()

        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const guncelleme: Record<string, any> = {
            sonGuncelleme: Timestamp.now(),
        }

        // Always save siteJson (structured data for editor reload)
        if (siteJson) {
            guncelleme.siteJson = siteJson
        }

        // Save siteHtml (for live site rendering)
        if (siteHtml) {
            guncelleme.siteHtml = siteHtml
        }

        // If publishing, set publish date and bust cache
        if (publish) {
            guncelleme.sonYayinTarihi = Timestamp.now()
            guncelleme.yayinda = true
        }

        await esnafRef.update(guncelleme)

        // Cache bust if publishing
        if (publish) {
            const esnafData = esnafDoc.data()!
            const subdomainUrl = esnafData.subdomainUrl as string | undefined
            const customDomain = esnafData.customDomain as string | undefined
            const slug = esnafData.slug as string | undefined

            if (subdomainUrl) {
                const domain = subdomainUrl.replace('https://', '').replace('http://', '')
                try { revalidateTag(`site:${domain}`, 'default') } catch {}
            }
            if (customDomain) {
                try { revalidateTag(`site:${customDomain}`, 'default') } catch {}
            }
            if (slug) {
                try { revalidateTag(`site:${slug}.kepenk.ai`, 'default') } catch {}
            }
        }

        console.log(`[EDITOR] ${publish ? '🚀 Yayınlandı' : '💾 Kaydedildi'}: ${esnafId}`)

        return NextResponse.json({
            ok: true,
            mesaj: publish ? 'Site başarıyla yayınlandı' : 'Taslak kaydedildi',
        })
    } catch (error: any) {
        console.error('[EDITOR] Hata:', error.message)
        return NextResponse.json(
            { error: 'Kaydetme başarısız', detay: error.message },
            { status: 500 }
        )
    }
}
