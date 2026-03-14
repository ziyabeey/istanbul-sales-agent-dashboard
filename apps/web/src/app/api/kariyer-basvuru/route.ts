import { NextRequest, NextResponse } from 'next/server'
import { telegramGonder } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const { adSoyad, email, telefon, pozisyon, deneyim, portfoy, mesaj } = await req.json()

    if (!adSoyad || !email || !pozisyon) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }

    const bildirim = [
      '<b>YENI KARIYER BASVURUSU</b>',
      '',
      `<b>Ad Soyad:</b> ${adSoyad}`,
      `<b>E-posta:</b> ${email}`,
      `<b>Telefon:</b> ${telefon || '—'}`,
      `<b>Pozisyon:</b> ${pozisyon}`,
      `<b>Deneyim:</b> ${deneyim || '—'}`,
      `<b>Portfoy:</b> ${portfoy || '—'}`,
      `<b>Mesaj:</b>\n${mesaj || '—'}`,
      '',
      `⏰ ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}`,
    ].join('\n')

    await telegramGonder(bildirim)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}
