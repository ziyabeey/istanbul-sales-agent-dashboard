import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import {
    domainMusaitMi,
    domainTescilEt,
    domainPagesBagla,
} from '@/lib/cloudflareRegistrar'
import { waMesajGonder } from '@/lib/twilioClient'
import { telegramGonder } from '@/lib/telegram'

export async function POST(req: Request) {
    try {
        const { esnafId, secilenDomain } = await req.json()

        if (!esnafId || !secilenDomain) {
            return NextResponse.json(
                { error: 'esnafId ve secilenDomain zorunlu' },
                { status: 400 }
            )
        }

        const docRef = adminDb.collection('esnaflar').doc(esnafId)
        const doc    = await docRef.get()
        if (!doc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }
        const esnaf = doc.data()!

        // Paket kontrolü
        if (!['PREMIUM', 'PREMIUMPLUS'].includes(esnaf.paket)) {
            return NextResponse.json(
                { error: 'Bu paket domain hediyesi içermiyor' },
                { status: 403 }
            )
        }

        // Zaten tescil edilmiş mi?
        if (esnaf.domain?.tescilliDomain) {
            return NextResponse.json(
                { error: 'Domain zaten tescil edilmiş', domain: esnaf.domain.tescilliDomain },
                { status: 409 }
            )
        }

        // Müsaitlik kontrolü
        const musait = await domainMusaitMi(secilenDomain)
        if (!musait) {
            return NextResponse.json(
                { error: `${secilenDomain} müsait değil. Farklı bir domain seçin.` },
                { status: 409 }
            )
        }

        // İşlem başladı
        await docRef.update({ 'domain.durum': 'tescil_ediliyor' })

        // Arka planda tescil et (fire-and-forget)
        Promise.resolve().then(async () => {
            // 1. Domain tescil
            const tescil = await domainTescilEt(secilenDomain, esnaf)
            if (!tescil.basarili) {
                await docRef.update({ 'domain.durum': 'hata', 'domain.hata': tescil.hata })
                await telegramGonder(
                    `🚨 Domain tescil hatası!\n` +
                    `Esnaf: ${esnaf.isletmeAdiTam}\n` +
                    `Domain: ${secilenDomain}\n` +
                    `Hata: ${tescil.hata}`
                ).catch(() => {})
                return
            }

            // 2. Pages'e bağla (slug varsa)
            if (esnaf.slug) {
                await domainPagesBagla(secilenDomain, esnaf.slug).catch(() => {})
            }

            // 3. Firestore güncelle
            const bitisTarihi = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            await docRef.update({
                'domain.durum':          'aktif',
                'domain.tescilliDomain': secilenDomain,
                'domain.tescilTarihi':   new Date().toISOString(),
                'domain.bitisTarihi':    bitisTarihi.toISOString(),
                subdomainUrl: `https://${secilenDomain}`,
            })

            // 4. WA bildirim
            await waMesajGonder(
                esnaf.waNumarasi,
                `✅ *Alan adınız hazır!*\n\n` +
                `🌐 https://${secilenDomain}\n\n` +
                `Siteniz bu adrese taşındı. DNS yayılması 24 saate kadar sürebilir.\n` +
                `Sorun yaşarsanız: ${process.env.NEXT_PUBLIC_APP_URL}/yardim`,
                esnafId,
                'domain_tescil_basarili'
            ).catch(() => {})

            // 5. Telegram
            await telegramGonder(
                `🌐 Domain tescil edildi!\n` +
                `${esnaf.isletmeAdiTam}: ${secilenDomain}\n` +
                `Paket: ${esnaf.paket}`
            ).catch(() => {})
        }).catch(e => {
            // console.error('[DOMAIN SEC]', e)
            docRef.update({ 'domain.durum': 'hata', 'domain.hata': e.message }).catch(() => {})
        })

        return NextResponse.json({
            ok: true,
            mesaj: 'Domain tescil süreci başladı, 5-10 dakika içinde hazır olacak',
        })
    } catch (e: any) {
        // console.error('[DOMAIN SEC]', e)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
