import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_for_build')
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@kepenk.ai'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kepenk.ai'

// ─── HOŞ GELDİN + FATURA EMAİLİ ───────────────────────────────────────────

export async function hosgeldinEmaili(esnaf: {
  ad: string
  unvan: string
  email?: string
  telefon: string
  paket: string
  subdomain: string
  odemeId: string
  tutar: number
}): Promise<void> {
  if (!esnaf.email) return  // Email yoksa atla, WA var zaten

  const tarih = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  await resend.emails.send({
    from: `kepenk.ai <${FROM}>`,
    to: esnaf.email,
    subject: `🎉 Hoş geldiniz ${esnaf.ad} ${esnaf.unvan}! kepenk.ai'ye katıldınız.`,
    html: `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hoş Geldiniz — kepenk.ai</title>
</head>
<body style="margin:0;padding:0;background:#0E0D0B;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px">
      <span style="font-size:28px;font-weight:900;letter-spacing:-1px">
        <span style="color:#C04B1E">K</span><span style="color:#F8F4EE">EPENK</span><span style="color:#C04B1E">.ai</span>
      </span>
    </div>

    <!-- Başlık -->
    <div style="background:#1C1A17;border-radius:16px;padding:32px;text-align:center;margin-bottom:24px">
      <p style="font-size:40px;margin:0 0 8px">🎉</p>
      <h1 style="color:#F8F4EE;font-size:24px;margin:0 0 8px">
        Hoş geldiniz, ${esnaf.ad} ${esnaf.unvan}!
      </h1>
      <p style="color:#7A7060;font-size:15px;margin:0;font-style:italic">
        "Kepengini aç, gerisini biz hallederiz."
      </p>
    </div>

    <!-- Paket bilgisi -->
    <div style="background:#1C1A17;border-radius:16px;padding:24px;margin-bottom:24px">
      <h2 style="color:#C04B1E;font-size:14px;text-transform:uppercase;
                 letter-spacing:2px;margin:0 0 16px">Aktif Paketiniz</h2>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:#F8F4EE;font-size:20px;font-weight:700">
          ${esnaf.paket}
        </span>
        <span style="color:#C9B49A;font-size:18px">
          ${esnaf.tutar.toLocaleString('tr-TR')}₺/ay
        </span>
      </div>
      <p style="color:#7A7060;font-size:13px;margin:8px 0 0">
        Siteniz: <a href="https://${esnaf.subdomain}.kepenk.ai"
          style="color:#C04B1E">https://${esnaf.subdomain}.kepenk.ai</a>
      </p>
    </div>

    <!-- Fatura -->
    <div style="background:#1C1A17;border-radius:16px;padding:24px;margin-bottom:24px">
      <h2 style="color:#C04B1E;font-size:14px;text-transform:uppercase;
                 letter-spacing:2px;margin:0 0 16px">Ödeme Makbuzu</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="color:#7A7060;font-size:13px;padding:4px 0">Tarih</td>
          <td style="color:#F8F4EE;font-size:13px;text-align:right">${tarih}</td>
        </tr>
        <tr>
          <td style="color:#7A7060;font-size:13px;padding:4px 0">İşlem No</td>
          <td style="color:#F8F4EE;font-size:13px;text-align:right;
                     font-family:monospace">${esnaf.odemeId}</td>
        </tr>
        <tr>
          <td style="color:#7A7060;font-size:13px;padding:4px 0">Tutar</td>
          <td style="color:#F8F4EE;font-size:13px;text-align:right;font-weight:700">
            ${esnaf.tutar.toLocaleString('tr-TR')}₺
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px">
      <a href="${APP_URL}/dashboard"
         style="background:#C04B1E;color:#F8F4EE;text-decoration:none;
                padding:16px 32px;border-radius:12px;font-weight:700;
                font-size:16px;display:inline-block">
        Dashboard'uma Git →
      </a>
    </div>

    <!-- Sonraki adımlar -->
    <div style="background:#1C1A17;border-radius:16px;padding:24px;margin-bottom:32px">
      <h2 style="color:#C04B1E;font-size:14px;text-transform:uppercase;
                 letter-spacing:2px;margin:0 0 16px">Sıradaki Adımlar</h2>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${[
        ['📱', 'İçerik Stüdyosu', 'Bugünkü sosyal medya içeriğiniz hazır'],
        ['⭐', 'Google Yönetimi', '3 gün içinde Google puanınız takibe alınıyor'],
        ['📦', 'Partner Etiketi', 'Vitrin etiketiniz kargoya verildi'],
      ].map(([emoji, baslik, aciklama]) => `
          <div style="display:flex;gap:12px;align-items:flex-start">
            <span style="font-size:20px">${emoji}</span>
            <div>
              <p style="color:#F8F4EE;font-size:14px;font-weight:700;margin:0">${baslik}</p>
              <p style="color:#7A7060;font-size:13px;margin:2px 0 0">${aciklama}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Footer -->
    <p style="color:#4A4438;font-size:12px;text-align:center">
      kepenk.ai — yzt.digital tarafından geliştirilmiştir<br>
      <a href="${APP_URL}/gizlilik" style="color:#4A4438">Gizlilik Politikası</a> ·
      <a href="mailto:destek@kepenk.ai" style="color:#4A4438">destek@kepenk.ai</a>
    </p>
  </div>
</body>
</html>`,
  })
}

// ─── HAFTALIK RAPOR EMAİLİ ────────────────────────────────────────────────

export async function haftalikRaporEmaili(esnaf: {
  ad: string
  unvan: string
  email?: string
  ziyaretci: number
  googlePuani: number
  icerikKopya: number
  aktifGun: number
  subdomainUrl: string
}): Promise<void> {
  if (!esnaf.email) return

  const hafta = getHaftaAralik()

  await resend.emails.send({
    from: `kepenk.ai <${FROM}>`,
    to: esnaf.email,
    subject: `📊 Haftalık raporunuz hazır — ${hafta}`,
    html: `
<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0E0D0B;
             font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">

    <div style="text-align:center;margin-bottom:24px">
      <span style="font-size:22px;font-weight:900">
        <span style="color:#C04B1E">K</span><span style="color:#F8F4EE">EPENK</span>
        <span style="color:#C04B1E">.ai</span>
      </span>
    </div>

    <div style="background:#1C1A17;border-radius:16px;padding:24px;margin-bottom:24px">
      <h1 style="color:#F8F4EE;font-size:20px;margin:0 0 4px">
        Haftalık Raporunuz
      </h1>
      <p style="color:#7A7060;font-size:13px;margin:0">${hafta}</p>
    </div>

    <!-- Metrik kartları -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px">
      ${[
        ['👥', 'Ziyaretçi', esnaf.ziyaretci.toString(), 'bu hafta'],
        ['⭐', 'Google Puanı', esnaf.googlePuani.toFixed(1), '/ 5.0'],
        ['📋', 'İçerik Kopyalandı', esnaf.icerikKopya.toString(), 'kez'],
        ['📅', 'Aktif Gün', esnaf.aktifGun.toString(), 'gün'],
      ].map(([emoji, baslik, deger, alt]) => `
        <div style="background:#1C1A17;border-radius:12px;padding:16px">
          <p style="font-size:20px;margin:0 0 4px">${emoji}</p>
          <p style="color:#7A7060;font-size:11px;text-transform:uppercase;
                    letter-spacing:1px;margin:0">${baslik}</p>
          <p style="color:#F8F4EE;font-size:24px;font-weight:700;margin:4px 0 0">${deger}</p>
          <p style="color:#4A4438;font-size:11px;margin:2px 0 0">${alt}</p>
        </div>
      `).join('')}
    </div>

    <div style="text-align:center;margin-bottom:32px">
      <a href="${APP_URL}/dashboard/raporlar"
         style="background:#C04B1E;color:#F8F4EE;text-decoration:none;
                padding:14px 28px;border-radius:12px;font-weight:700;
                font-size:14px;display:inline-block">
        Detaylı Raporu Gör →
      </a>
    </div>

    <p style="color:#4A4438;font-size:11px;text-align:center">
      kepenk.ai ·
      <a href="${APP_URL}/dashboard/profil" style="color:#4A4438">
        Bildirimleri Düzenle
      </a>
    </p>
  </div>
</body>
</html>`,
  })
}

// ─── YARDIMCI ─────────────────────────────────────────────────────────────

function getHaftaAralik(): string {
  const now = new Date()
  const mon = new Date(now)
  mon.setDate(now.getDate() - ((now.getDay() + 6) % 7))
  const sun = new Date(mon)
  sun.setDate(mon.getDate() + 6)
  const fmt = (d: Date) =>
    d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })
  return `${fmt(mon)} – ${fmt(sun)}`
}
