import { NextRequest, NextResponse } from 'next/server'
import { telegramGonder } from '@/lib/telegram'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_for_build')
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@kepenk.ai'
const ILETISIM_HEDEF = 'ziyabeey1@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const { adSoyad, isletme, email, mesaj } = await req.json()

    if (!adSoyad || !email || !mesaj) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }

    const bildirim = [
      '<b>YENI ILETISIM FORMU</b>',
      '',
      `<b>Ad Soyad:</b> ${adSoyad}`,
      `<b>Isletme:</b> ${isletme || '—'}`,
      `<b>E-posta:</b> ${email}`,
      `<b>Mesaj:</b>\n${mesaj}`,
      '',
      `⏰ ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}`,
    ].join('\n')

    // Telegram + email paralel gonder
    await Promise.all([
      telegramGonder(bildirim),
      resend.emails.send({
        from: `kepenk.ai İletişim <${FROM}>`,
        to: ILETISIM_HEDEF,
        replyTo: email,
        subject: `[kepenk.ai] İletişim Formu — ${adSoyad}`,
        html: `
          <h2>Yeni İletişim Formu</h2>
          <p><strong>Ad Soyad:</strong> ${adSoyad}</p>
          <p><strong>İşletme:</strong> ${isletme || '—'}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <hr>
          <p>${mesaj.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color:#999;font-size:12px">
            ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}
          </p>
        `,
      }),
    ])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}
