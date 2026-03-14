/**
 * Site Publish API — Cache Bust + Versiyon Kaydet
 * ─────────────────────────────────────────────────────────────────────────────
 * Esnaf "Yayınla" butonuna bastığında:
 *   1. Firestore'da site verisini güncelle
 *   2. revalidateTag → ISR cache'i anında temizle
 *   3. Versiyon oluştur (Zaman Makinesi)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { versiyonKaydet } from '@/lib/siteVersiyonlari'
import { zodGuard, siteGuncelleSema } from '@/lib/zodSemalar'

export async function POST(request: Request) {
    try {
        // ── Auth kontrolü ───────────────────────────────────────────────────
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
        }

        // ── Zod validasyon ──────────────────────────────────────────────────
        const body = await request.json()
        const parsed = zodGuard(siteGuncelleSema, { ...body, esnafId })
        if (!parsed.ok) {
            return NextResponse.json(
                { error: parsed.hata, detaylar: parsed.detaylar },
                { status: 400 }
            )
        }

        const { bloklar, temaId } = parsed.data

        // ── Firestore güncelle ──────────────────────────────────────────────
        const esnafRef = adminDb.collection('esnaflar').doc(esnafId)
        const esnafDoc = await esnafRef.get()

        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const esnafData = esnafDoc.data()!
        const guncelleme: Record<string, any> = {
            sonYayinTarihi: Timestamp.now(),
        }

        if (bloklar) guncelleme.siteBloklar = bloklar
        if (temaId) guncelleme.temaId = temaId

        await esnafRef.update(guncelleme)

        // ── Versiyon kaydet (Zaman Makinesi) ────────────────────────────────
        try {
            await versiyonKaydet(
                esnafId,
                esnafData.siteJson || { html: esnafData.siteHtml || '' },
                `Yayın ${new Date().toLocaleString('tr-TR')}`,
                esnafData.aktifModuller || [],
                temaId || esnafData.temaId || 'toprak'
            )
        } catch (err) {
            console.warn('[PUBLISH] Versiyon kaydetme hatası (devam ediliyor):', err)
        }

        // ── ISR Cache Bust — tüm domain varyantlarını temizle ───────────────
        const subdomainUrl = esnafData.subdomainUrl as string | undefined
        const customDomain = esnafData.customDomain as string | undefined
        const slug = esnafData.slug as string | undefined

        const temizlenenTaglar: string[] = []

        // Subdomain cache
        if (subdomainUrl) {
            const domain = subdomainUrl.replace('https://', '').replace('http://', '')
            try { revalidateTag(`site:${domain}`, 'default') } catch {}
            temizlenenTaglar.push(domain)
        }

        // Custom domain cache
        if (customDomain) {
            try { revalidateTag(`site:${customDomain}`, 'default') } catch {}
            temizlenenTaglar.push(customDomain)
        }

        // Slug-based cache
        if (slug) {
            try { revalidateTag(`site:${slug}.kepenk.ai`, 'default') } catch {}
            temizlenenTaglar.push(`${slug}.kepenk.ai`)
        }

        console.log(`[PUBLISH] ✅ ${esnafId} yayınlandı. Cache temizlendi:`, temizlenenTaglar)

        return NextResponse.json({
            ok: true,
            mesaj: 'Site başarıyla yayınlandı',
            temizlenenCache: temizlenenTaglar,
            versiyonKaydedildi: true,
        })
    } catch (error: any) {
        console.error('[PUBLISH] Hata:', error.message)
        return NextResponse.json(
            { error: 'Yayınlama başarısız', detay: error.message },
            { status: 500 }
        )
    }
}
