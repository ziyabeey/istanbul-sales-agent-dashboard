import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_for_build')
const FROM_EMAIL = process.env.FROM_EMAIL || 'kepenk.ai <noreply@kepenk.ai>'

/**
 * POST /api/admin/marketing/email-kampanya
 * Toplu kepenk.ai marketing emaili gönder
 * Body: { segment, konu, html, onizleme? }
 * Segment: 'leadler' | 'aktif_esnaflar' | 'paket:TEMEL' | 'paket:STANDART' | ...
 */
export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!adminDb) return NextResponse.json({ error: 'DB yok' }, { status: 500 })

    const { segment, konu, html, onizleme } = await request.json()

    if (!konu || !html) {
        return NextResponse.json({ error: 'konu ve html zorunlu' }, { status: 400 })
    }

    // Önizleme modunda gerçek email gönderme
    if (onizleme) {
        return NextResponse.json({ ok: true, onizleme: true, html })
    }

    // Alıcıları belirle
    const alicilar: string[] = await getAlicilar(segment)

    if (alicilar.length === 0) {
        return NextResponse.json({ ok: false, error: 'Bu segmentte email adresi bulunamadı' })
    }

    // Batch gönder (Resend free limit: 100/gün)
    const BATCH = 50
    let gonderilen = 0
    let hata = 0

    for (let i = 0; i < alicilar.length; i += BATCH) {
        const batch = alicilar.slice(i, i + BATCH)
        try {
            // Resend batch send
            await resend.batch.send(
                batch.map(email => ({
                    from: FROM_EMAIL,
                    to: email,
                    subject: konu,
                    html,
                }))
            )
            gonderilen += batch.length
        } catch (e) {
            // console.error('[EMAIL KAMPANYA] batch hata:', e)
            hata += batch.length
        }

        // Rate limit arasında bekle
        if (i + BATCH < alicilar.length) {
            await new Promise(r => setTimeout(r, 1000))
        }
    }

    // Kampanya kaydı
    await adminDb.collection('marketingKampanyalar').add({
        segment,
        konu,
        hedefSayisi: alicilar.length,
        gonderilen,
        hata,
        tarih: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true, gonderilen, hata, toplam: alicilar.length })
}

// GET — kampanya geçmişi
export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!adminDb) return NextResponse.json({ kampanyalar: [] })

    const snap = await adminDb.collection('marketingKampanyalar')
        .orderBy('tarih', 'desc')
        .limit(20)
        .get()

    return NextResponse.json({
        kampanyalar: snap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => ({ id: d.id, ...d.data() })),
    })
}

// ─── Segment → Email listesi ──────────────────────────────────────────────
async function getAlicilar(segment: string): Promise<string[]> {
    if (!adminDb) return []
    const emails: string[] = []

    if (segment === 'leadler') {
        // Leads koleksiyonundan email varsa al (çoğunda yok, telefon var)
        const snap = await adminDb.collection('leads')
            .where('durum', '==', 'bekliyor')
            .limit(200)
            .get()
        snap.docs.forEach((d: FirebaseFirestore.QueryDocumentSnapshot) => {
            const email = d.data().email
            if (email && typeof email === 'string' && email.includes('@')) {
                emails.push(email)
            }
        })
    } else if (segment === 'aktif_esnaflar') {
        const snap = await adminDb.collection('esnaflar')
            .where('durum', '==', 'aktif')
            .limit(500)
            .get()
        snap.docs.forEach((d: FirebaseFirestore.QueryDocumentSnapshot) => {
            const email = d.data().email
            if (email && typeof email === 'string' && email.includes('@')) {
                emails.push(email)
            }
        })
    } else if (segment.startsWith('paket:')) {
        const paket = segment.replace('paket:', '')
        const snap = await adminDb.collection('esnaflar')
            .where('paket', '==', paket)
            .where('durum', '==', 'aktif')
            .limit(500)
            .get()
        snap.docs.forEach((d: FirebaseFirestore.QueryDocumentSnapshot) => {
            const email = d.data().email
            if (email && typeof email === 'string' && email.includes('@')) {
                emails.push(email)
            }
        })
    }

    return [...new Set(emails)] // Tekrarları kaldır
}
