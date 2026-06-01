import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { requireOwnedAppointment } from '@/lib/esnafOwnership'

// ── PATCH /api/randevu/[id] — Randevu durumu güncelle ─────────────────────
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { durum } = body // 'onaylandi' | 'iptal' | 'tamamlandi'

        if (!['onaylandi', 'iptal', 'tamamlandi'].includes(durum)) {
            return NextResponse.json(
                { error: 'Geçersiz durum. Kabul edilen: onaylandi, iptal, tamamlandi' },
                { status: 400 }
            )
        }

        const ownership = await requireOwnedAppointment(request, id)
        if (!ownership.ok) return ownership.response

        const { randevuRef, randevu } = ownership
        await randevuRef.update({
            durum,
            guncelleme: Timestamp.now(),
        })

        // Müşteriye bildirim gönder
        const esnafDoc = await adminDb.collection('esnaflar').doc(randevu.esnafId).get()
        const esnaf = esnafDoc.data()!
        const isletmeAdi = esnaf.isletmeAdiTam || esnaf.ad

        const durumMesajlari: Record<string, string> = {
            onaylandi: `✅ Randevunuz onaylandı!\n📅 ${randevu.tarih} — ${randevu.saat}\n✂️ ${randevu.hizmet}\n📍 ${isletmeAdi}\n\nSizi bekliyoruz!`,
            iptal: `❌ Randevunuz iptal edildi.\n📅 ${randevu.tarih} — ${randevu.saat}\nYeni randevu almak için sitemizi ziyaret edebilirsiniz.`,
            tamamlandi: `🎉 Randevunuz tamamlandı. Teşekkür ederiz!\nBizi değerlendirmeniz çok önemli. ⭐`,
        }

        // WhatsApp müşteriye
        try {
            const { waMesajGonder } = await import('@/lib/twilioClient')
            await waMesajGonder(
                randevu.musteriTel,
                durumMesajlari[durum],
                randevu.esnafId,
                `randevu_${durum}`
            )
        } catch {
            // console.error('[RANDEVU] Müşteri WhatsApp bildirimi gönderilemedi:', e.message)
        }

        // Email müşteriye
        if (randevu.musteriEmail && durum === 'onaylandi') {
            try {
                const { Resend } = await import('resend')
                const resend = new Resend(process.env.RESEND_API_KEY)
                const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@kepenk.ai'

                await resend.emails.send({
                    from: `${isletmeAdi} via kepenk.ai <${FROM}>`,
                    to: randevu.musteriEmail,
                    subject: `✅ Randevunuz Onaylandı — ${isletmeAdi}`,
                    html: `<div style="font-family:sans-serif;max-width:500px;margin:auto;padding:20px">
                        <h2 style="color:#C04B1E">✅ Randevunuz Onaylandı!</h2>
                        <p><strong>${randevu.hizmet}</strong></p>
                        <p>📆 ${randevu.tarih} — ${randevu.saat}</p>
                        <p>📍 ${isletmeAdi}</p>
                        <p style="margin-top:20px;color:#666">Sizi bekliyoruz! Değişiklik için WhatsApp'tan ulaşabilirsiniz.</p>
                        <p style="font-size:11px;color:#999;margin-top:40px">kepenk.ai — akıllı esnaf asistanı</p>
                    </div>`,
                })
            } catch {
                // console.error('[RANDEVU] Onay emaili gönderilemedi:', e.message)
            }
        }

        // Telegram log
        telegramGonder(
            `📅 <b>Randevu ${durum === 'onaylandi' ? 'Onaylandı ✅' : durum === 'iptal' ? 'İptal ❌' : 'Tamamlandı 🎉'}</b>\n` +
            `${isletmeAdi} | ${randevu.musteriAd}\n` +
            `${randevu.tarih} ${randevu.saat}`
        ).catch(() => {})

        return NextResponse.json({ ok: true, durum })
    } catch {
        // console.error('[RANDEVU PATCH]', error)
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 })
    }
}

// ── DELETE /api/randevu/[id] — Randevu sil ────────────────────────────────
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const ownership = await requireOwnedAppointment(request, id)
        if (!ownership.ok) return ownership.response

        await ownership.randevuRef.delete()

        return NextResponse.json({ ok: true, mesaj: 'Randevu silindi' })
    } catch {
        // console.error('[RANDEVU DELETE]', error)
        return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 })
    }
}
