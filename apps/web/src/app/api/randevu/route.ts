import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { zodGuard, randevuOlusturSema } from '@/lib/zodSemalar'
import { rateLimitCheck } from '@/lib/rateLimiter'

// ── HTML Entity Escaping (XSS Koruması) ────────────────────────────────────
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

// ── Bildirim Gönderici (Side-Effects) ──────────────────────────────────────

interface BildirimParams {
    randevuRef: FirebaseFirestore.DocumentReference
    esnaf: FirebaseFirestore.DocumentData
    esnafId: string
    musteriAd: string
    musteriTel: string
    musteriEmail?: string
    hizmet: string
    trTarih: string
    saat: string
    notlar?: string
    randevuId: string
}

async function esnafaWhatsAppBildir(params: BildirimParams): Promise<void> {
    try {
        const { waMesajGonder } = await import('@/lib/twilioClient')
        await waMesajGonder(
            params.esnaf.waNumarasi,
            `📅 *Yeni Randevu Talebi!*\n\n` +
            `👤 ${params.musteriAd}\n` +
            `📱 ${params.musteriTel}\n` +
            `✂️ ${params.hizmet}\n` +
            `📆 ${params.trTarih} — ${params.saat}\n` +
            `${params.notlar ? `📝 ${params.notlar}\n` : ''}\n` +
            `Dashboard'dan onaylayın veya "onayla" yazın.`,
            params.esnafId,
            'randevu_bildirim'
        )
        await params.randevuRef.update({ 'bildirimGonderildi.esnafWhatsapp': true })
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Bilinmeyen hata'
        // console.error('[RANDEVU] WhatsApp bildirimi gönderilemedi:', message)
    }
}

async function musteriyeEmailBildir(params: BildirimParams): Promise<void> {
    if (!params.musteriEmail) return

    try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@kepenk.ai'

        const isletmeAdi = params.esnaf.isletmeAdiTam || params.esnaf.ad

        await resend.emails.send({
            from: `${isletmeAdi} via kepenk.ai <${FROM}>`,
            to: params.musteriEmail,
            subject: `📅 Randevu Talebiniz Alındı — ${isletmeAdi}`,
            html: randevuEmailHtml({
                isletmeAdi,
                musteriAd: params.musteriAd,
                hizmet: params.hizmet,
                tarih: params.trTarih,
                saat: params.saat,
                telefon: params.esnaf.telefon,
            }),
        })
        await params.randevuRef.update({ 'bildirimGonderildi.musteriEmail': true })
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Bilinmeyen hata'
        // console.error('[RANDEVU] Email gönderilemedi:', message)
    }
}

function operatorTelegramBildir(params: BildirimParams): void {
    telegramGonder(
        `📅 <b>Yeni Randevu</b>\n` +
        `${params.esnaf.isletmeAdiTam || params.esnaf.ad}\n` +
        `👤 ${escapeHtml(params.musteriAd)} | ${params.musteriTel}\n` +
        `✂️ ${escapeHtml(params.hizmet)} | ${params.trTarih} ${params.saat}\n` +
        `ID: <code>${params.randevuId}</code>`
    ).catch((e: unknown) => {
        // console.error('[RANDEVU] Telegram gönderilemedi:', e)
    })
}

// ── POST /api/randevu — Yeni randevu oluştur ───────────────────────────────
export async function POST(request: Request) {
    // ── Rate Limit ──
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
    const rl = rateLimitCheck(`randevu:${clientIp}`, 'webhook')
    if (!rl.allowed) {
        return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
    }

    try {
        const body = await request.json()

        // ── Zod Validation ──
        const parsed = zodGuard(randevuOlusturSema, body)
        if (!parsed.ok) {
            return NextResponse.json(
                { error: parsed.hata, detaylar: parsed.detaylar },
                { status: 400 }
            )
        }

        const {
            esnafId, musteriAd, musteriTel, musteriEmail,
            hizmet, tarih, saat, notlar,
        } = parsed.data

        // Esnaf var mı + paket kontrolü
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }
        const esnaf = esnafDoc.data()!

        // Telefon normalize
        const temizTel = musteriTel.replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^90/, '')

        // Randevu tarihi kontrolü (geçmiş tarih olmasın)
        const randevuTarih = new Date(`${tarih}T${saat}:00`)
        if (randevuTarih < new Date()) {
            return NextResponse.json({ error: 'Geçmiş tarih için randevu alınamaz' }, { status: 400 })
        }

        // Firestore'a randevu kaydet
        const randevuRef = await adminDb.collection('randevular').add({
            esnafId,
            musteriAd,
            musteriTel: `+90${temizTel}`,
            musteriEmail: musteriEmail || null,
            hizmet,
            tarih,
            saat,
            randevuZamani: Timestamp.fromDate(randevuTarih),
            notlar: notlar || null,
            durum: 'bekliyor',
            olusturma: Timestamp.now(),
            bildirimGonderildi: {
                esnafWhatsapp: false,
                musteriEmail: false,
                hatirlatma: false,
            },
        })

        const randevuId = randevuRef.id

        // Tarih formatla
        const trTarih = new Date(tarih).toLocaleDateString('tr-TR', {
            day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'
        })

        // ── Bildirimleri gönder (paralel, fire-and-forget ama loglanan) ──
        const bildirimParams: BildirimParams = {
            randevuRef, esnaf, esnafId, musteriAd, musteriTel,
            musteriEmail, hizmet, trTarih, saat, notlar, randevuId,
        }

        // Bu bildirimler arka planda çalışır, ana yanıtı bloklamaz
        void Promise.allSettled([
            esnafaWhatsAppBildir(bildirimParams),
            musteriyeEmailBildir(bildirimParams),
        ])

        operatorTelegramBildir(bildirimParams)

        return NextResponse.json({
            randevuId,
            mesaj: 'Randevu talebiniz alındı. En kısa sürede onay bildirilecektir.',
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        // console.error('[RANDEVU POST]', message)
        return NextResponse.json({ error: 'Randevu oluşturulamadı' }, { status: 500 })
    }
}

// ── GET /api/randevu?esnafId=xxx — Randevuları listele ─────────────────────
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) {
        return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
    }

    const snap = await adminDb
        .collection('randevular')
        .where('esnafId', '==', esnafId)
        .orderBy('randevuZamani', 'desc')
        .limit(50)
        .get()

    const randevular = snap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => ({
        id: d.id,
        ...d.data(),
        randevuZamani: d.data().randevuZamani?.toDate?.()?.toISOString() ?? null,
        olusturma: d.data().olusturma?.toDate?.()?.toISOString() ?? null,
    }))

    return NextResponse.json({ randevular })
}

// ── Randevu Onay Email Şablonu (XSS-Safe) ─────────────────────────────────
function randevuEmailHtml(params: {
    isletmeAdi: string
    musteriAd: string
    hizmet: string
    tarih: string
    saat: string
    telefon: string
}): string {
    // ── HTML escape tüm kullanıcı girdileri ──
    const isletmeAdi = escapeHtml(params.isletmeAdi)
    const musteriAd = escapeHtml(params.musteriAd)
    const hizmet = escapeHtml(params.hizmet)
    const tarih = escapeHtml(params.tarih)
    const saat = escapeHtml(params.saat)
    const temizTel = params.telefon.replace(/[^0-9]/g, '')

    return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0E0D0B;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px">
    <div style="text-align:center;margin-bottom:24px">
      <span style="font-size:22px;font-weight:900">
        <span style="color:#C04B1E">K</span><span style="color:#F8F4EE">EPENK</span><span style="color:#C04B1E">.ai</span>
      </span>
    </div>

    <div style="background:#1C1A17;border-radius:16px;padding:28px;margin-bottom:20px;text-align:center">
      <p style="font-size:36px;margin:0 0 8px">📅</p>
      <h1 style="color:#F8F4EE;font-size:20px;margin:0 0 6px">Randevu Talebiniz Alındı</h1>
      <p style="color:#7A7060;font-size:14px;margin:0">${isletmeAdi}</p>
    </div>

    <div style="background:#1C1A17;border-radius:16px;padding:24px;margin-bottom:20px">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="color:#7A7060;font-size:13px;padding:6px 0">👤 Müşteri</td>
          <td style="color:#F8F4EE;font-size:13px;text-align:right">${musteriAd}</td>
        </tr>
        <tr>
          <td style="color:#7A7060;font-size:13px;padding:6px 0">✂️ Hizmet</td>
          <td style="color:#F8F4EE;font-size:13px;text-align:right">${hizmet}</td>
        </tr>
        <tr>
          <td style="color:#7A7060;font-size:13px;padding:6px 0">📆 Tarih</td>
          <td style="color:#F8F4EE;font-size:13px;text-align:right">${tarih}</td>
        </tr>
        <tr>
          <td style="color:#7A7060;font-size:13px;padding:6px 0">🕐 Saat</td>
          <td style="color:#F8F4EE;font-size:13px;text-align:right;font-weight:700">${saat}</td>
        </tr>
      </table>
    </div>

    <div style="background:#1C1A17;border-radius:16px;padding:20px;margin-bottom:24px">
      <p style="color:#C9B49A;font-size:13px;margin:0 0 4px;font-weight:700">⏳ Onay Bekleniyor</p>
      <p style="color:#7A7060;font-size:12px;margin:0">İşletme randevunuzu en kısa sürede onaylayacak. Onay bildirimi size WhatsApp veya e-posta ile iletilecektir.</p>
    </div>

    <div style="text-align:center;margin-bottom:24px">
      <a href="https://wa.me/${temizTel}" style="background:#C04B1E;color:#F8F4EE;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:14px;display:inline-block">
        💬 WhatsApp ile İletişime Geç
      </a>
    </div>

    <p style="color:#4A4438;font-size:11px;text-align:center">
      kepenk.ai — akıllı esnaf asistanı<br>
      <a href="mailto:destek@kepenk.ai" style="color:#4A4438">destek@kepenk.ai</a>
    </p>
  </div>
</body>
</html>`
}
