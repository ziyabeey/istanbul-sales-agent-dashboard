import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { runAgent } from '@/agents/agentRunner'
import { instagramProfilAl, instagramKalitePuanHesapla } from '@/lib/instagramScraper'
import { telegramGonder } from '@/lib/telegram'
import { apiGuard } from '@/lib/apiGuard'

/**
 * POST /api/lead/scan
 * Body: { isletmeler: [{ad: string, ilce: string, telefon?: string}] }
 *
 * Lead tarama pipeline:
 * 1. lead_madencisi → Instagram profil analizi + lead skoru
 * 2. derin_arastirmaci → İşletme araştırması
 * 3. mesaj_mimari → Kişiselleştirilmiş ilk temas mesajı oluştur
 * 4. Firestore'a leads koleksiyonuna kaydet
 */
export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const { isletmeler } = await request.json()
        if (!Array.isArray(isletmeler) || isletmeler.length === 0) {
            return NextResponse.json({ error: 'isletmeler dizisi zorunlu' }, { status: 400 })
        }

        const islenmiş: any[] = []
        const BATCH_SIZE = 5

        for (let i = 0; i < isletmeler.length; i += BATCH_SIZE) {
            const batch = isletmeler.slice(i, i + BATCH_SIZE)

            await Promise.all(batch.map(async (isletme: any) => {
                try {
                    const { ad, ilce, telefon } = isletme

                    // 1. Instagram profil çek
                    const slug = ad.toLowerCase()
                        .replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ı/g, 'i')
                        .replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ç/g, 'c')
                        .replace(/[^a-z0-9]/g, '')
                    const igProfil = await instagramProfilAl(slug)
                    const igPuan = instagramKalitePuanHesapla(igProfil)

                    // 2. lead_madencisi ile analiz
                    const leadAnaliz = await runAgent('lead_madencisi', {
                        isletme: ad,
                        ilce,
                        telefon: telefon || null,
                        instagram: igProfil,
                        igPuan,
                    })

                    const leadSkoru = leadAnaliz?.leadSkoru ?? igPuan
                    if (leadSkoru < 20) return // Düşük skoru atla

                    // 3. mesaj_mimari ile ilk temas mesajı yaz
                    const mesajTonu = leadAnaliz?.onerilen_mesaj_tonu || 'soguk'
                    const mesaj = await runAgent('mesaj_mimari', {
                        action: 'ilk_temas',
                        isletme: ad,
                        ilce,
                        ton: mesajTonu,
                        instagram: igProfil,
                    })

                    // 4. Firestore'a kaydet
                    await adminDb.collection('leads').add({
                        isletme: ad,
                        ilce,
                        telefon: telefon || null,
                        instagramUsername: igProfil.varMi ? slug : null,
                        leadSkoru,
                        mesajTonu,
                        hazirMesaj: typeof mesaj === 'string' ? mesaj : JSON.stringify(mesaj),
                        durum: 'bekliyor', // bekliyor | gonderildi | cevapladi | kapandi
                        kayitTarihi: Timestamp.now(),
                        topIlgisi: null,
                    })

                    islenmiş.push({ ad, ilce, leadSkoru })
                } catch (e: any) {
                    // console.error(`[LEAD SCAN] ${isletme.ad}:`, e.message)
                }
            }))

            // Rate limit: batch arası bekle
            if (i + BATCH_SIZE < isletmeler.length) {
                await new Promise(r => setTimeout(r, 2000))
            }
        }

        const topLeadlar = islenmiş.sort((a, b) => b.leadSkoru - a.leadSkoru).slice(0, 5)

        // Telegram raporu
        if (islenmiş.length > 0) {
            await telegramGonder(
                `🎯 <b>Lead Tarama Tamamlandı</b>\n` +
                `Taranan: ${isletmeler.length} işletme\n` +
                `Kayıt edilen: ${islenmiş.length} lead\n\n` +
                `<b>Top 5 Lead:</b>\n` +
                topLeadlar.map(l => `• ${l.ad} (${l.ilce}) — Skor: ${l.leadSkoru}`).join('\n')
            ).catch(() => {})
        }

        return NextResponse.json({
            ok: true,
            taranan: isletmeler.length,
            kaydedilen: islenmiş.length,
            topLeadlar,
        })
    } catch (error: any) {
        // console.error('[LEAD SCAN]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
