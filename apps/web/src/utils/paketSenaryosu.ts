import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { waMesajGonder, esnafHitap } from '@/lib/twilioClient'
import { hosgeldinEmaili } from '@/lib/emailClient'
import { createHttpTask } from '@/lib/cloudTasksClient'
import { haftaIcerikUret } from './icerikUreticisi'
import { esnafModulleri } from '@/data/moduller'
import { PAKET_FIYATLARI_AYLIK } from '@/data/paketler'
import { stripLegacyCommercialFields } from '@/lib/core/canary'

export async function paketSenaryosuCalistir(
  esnafId: string,
  paket: string,
  odemeId: string
): Promise<void> {
  const docRef = adminDb.collection('esnaflar').doc(esnafId)
  const doc = await docRef.get()
  if (!doc.exists) throw new Error(`Esnaf bulunamadı: ${esnafId}`)
  const esnaf = doc.data()!

  // ── 1. HERKESE ORTAK: Firestore güncelle ──────────────────────────────────
  // KC-05 canary: `durum` / `paket` / `aktifModuller` are Core-owned for canary
  // tenants and only arrive through the projection; the legacy root write is
  // reduced to the non-commercial fields.
  const ortakGuncelleme = stripLegacyCommercialFields(esnafId, {
    durum:   'aktif',
    paket,
    odemeId,
    yenilenmeTarihi: Timestamp.fromDate(
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ),
  })
  await docRef.update(ortakGuncelleme.patch)

  // ── 2. PAKET BAZLI MODÜLLER ────────────────────────────────────────────────
  const aktifModuller = esnafModulleri(esnaf.sektor, paket)
  const modulGuncelleme = stripLegacyCommercialFields(esnafId, {
    aktifModuller: aktifModuller.map(m => m.id),
  })
  if (Object.keys(modulGuncelleme.patch).length > 0) {
    await docRef.update(modulGuncelleme.patch)
  }

  // ── 2.5. VAPI SESLI ASISTAN (BUYUME+) ────────────────────────────────────
  if (['BUYUME', 'PREMIUM', 'PREMIUMPLUS'].includes(paket)) {
    import('@/lib/vapiClient')
      .then(({ createVoiceAgentForEsnaf }) => createVoiceAgentForEsnaf(esnafId))
      .then(agentId => {
        if (agentId) {
          return adminDb.collection('esnaflar').doc(esnafId).update({ vapiAktif: true })
        }
      })
      .catch(e => telegramGonder(`⚠️ VAPI kurulum hatası: ${esnafId}\n${e.message}`).catch(console.error))
  }

  // ── 3. SİTE ÜRETİMİ (CLOUD TASKS İLE ARKA PLANA ATILDI) ──────────────────
  createHttpTask(
    'site-uretim-kuyrugu',
    '/api/workers/site-ureticisi',
    { esnafId }
  ).then(() => {
    console.log(`[KUYRUK] Sİte üretim işi ${esnafId} için kuyruğa eklendi.`)
    waMesajGonder(
      esnaf.waNumarasi,
      `✅ Siteniz yapay zeka tarafından hazırlanmak üzere sıraya alındı.\n\n3-4 dakika içinde hazır olacak ve size mesaj olarak linki göndereceğim.\n\nDashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      esnafId,
      'site_siraya_alindi'
    ).catch(console.error)
  }).catch(e => {
    telegramGonder(`⚠️ Site kuyruk hatası: ${esnafId}\n${e.message}`)
  })

  // ── 4. İÇERİK ÜRETİMİ ────────────────────────────────────────────────────
  const platformlar = ['instagram']
  if (['STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'].includes(paket)) {
    platformlar.push('facebook')
  }
  if (['BUYUME', 'PREMIUM', 'PREMIUMPLUS'].includes(paket) && esnaf.googlePlacesId) {
    platformlar.push('gmb')
  }

  haftaIcerikUret(esnafId, platformlar).catch(console.error)

  // ── 5. PAKET'E ÖZEL AKSIYONLAR ────────────────────────────────────────────

  if (paket === 'TEMEL') {
    await waMesajGonder(
      esnaf.waNumarasi,
      `🎉 Hoş geldiniz ${esnafHitap(esnaf)}!\n\n` +
      `Siteniz hazırlanıyor, 2-3 dakika içinde WhatsApp'a link gelecek.\n\n` +
      `📱 İlk sosyal medya içerikleriniz de hazırlanıyor.\n` +
      `Dashboard'dan görebilirsiniz: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      esnafId, 'hosgeldin_temel'
    )
  }

  if (paket === 'STANDART') {
    await waMesajGonder(
      esnaf.waNumarasi,
      `🎉 Hoş geldiniz ${esnafHitap(esnaf)}!\n\n` +
      `✅ Siteniz hazırlanıyor\n` +
      `✅ Sabah mesajları aktif (her sabah 08:00)\n` +
      `✅ Google yorum takibi başlıyor\n\n` +
      `Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      esnafId, 'hosgeldin_standart'
    )
    await adminDb.collection('esnaflar').doc(esnafId).update({
      'ayarlar.googleYorumTakip': true,
      'ayarlar.sabahMesaji': true,
    })
  }

  if (paket === 'BUYUME') {
    await waMesajGonder(
      esnaf.waNumarasi,
      `🚀 Hoş geldiniz ${esnafHitap(esnaf)}!\n\n` +
      `✅ Randevu sistemi sitenize eklendi\n` +
      `✅ Google + Meta Ads kurulum başlıyor\n` +
      `✅ Haftalık operasyon raporu aktif\n\n` +
      `Reklam hesaplarınızı bağlamak için: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/reklam`,
      esnafId, 'hosgeldin_buyume'
    )
    await telegramGonder(
      `💰 <b>BÜYÜME paketi satışı!</b>\n` +
      `Esnaf: ${esnaf.isletmeAdiTam}\n` +
      `Sektör: ${esnaf.sektor}\n` +
      `Reklam hesabı bağlama için takip et.`
    )
    await adminDb.collection('esnaflar').doc(esnafId).update({
      'ayarlar.googleYorumTakip': true,
      'ayarlar.sabahMesaji': true,
      'ayarlar.reklamYonetimi': true,
      'ayarlar.randevuSistemi': true,
    })
  }

  if (paket === 'PREMIUM' || paket === 'PREMIUMPLUS') {
    // Domain hediyesi akışını başlat (fire-and-forget)
    import('@/lib/cloudflareRegistrar')
      .then(({ domainHediyeAkisi }) => domainHediyeAkisi(esnafId, paket))
      .catch(e => telegramGonder(`🚨 Domain hediye akışı hatası: ${esnafId}\n${e.message}`).catch(console.error))

    await telegramGonder(
      `⭐ <b>${paket} paketi satışı!</b>\n` +
      `Esnaf: ${esnaf.isletmeAdiTam}\n` +
      `AKSIYONLAR:\n` +
      `1. Domain seçim mesajı WA'ya gönderildi (otomasyon aktif)\n` +
      `2. Tüm ajanlar aktifleştirildi\n` +
      `3. Hesap yöneticisi ata (PREMIUMPLUS)`
    )
    await waMesajGonder(
      esnaf.waNumarasi,
      `🌟 Hoş geldiniz ${esnafHitap(esnaf)}!\n\n` +
      `${paket} paketine hoş geldiniz. Hesap yöneticiniz 2 saat içinde sizinle iletişime geçecek.\n\n` +
      (paket === 'PREMIUMPLUS'
        ? `📞 Telegram'dan direkt ulaşabilirsiniz: @kepenkai_destek`
        : `Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`),
      esnafId, 'hosgeldin_premium'
    )
    await adminDb.collection('esnaflar').doc(esnafId).update({
      'ayarlar.googleYorumTakip': true,
      'ayarlar.sabahMesaji': true,
      'ayarlar.reklamYonetimi': true,
      'ayarlar.randevuSistemi': true,
      'ayarlar.leadMadencisi': true,
      'ayarlar.customDomain': true,
      'ayarlar.vipDestek': paket === 'PREMIUMPLUS',
    })
  }

  // ── 6. EMAIL ──────────────────────────────────────────────────────────────
  if (esnaf.email) {
    const tutar = PAKET_FIYATLARI_AYLIK[paket] ?? 399
    hosgeldinEmaili({
      ad: esnaf.ad,
      unvan: esnaf.unvan ?? 'Usta',
      email: esnaf.email,
      telefon: esnaf.telefon,
      paket,
      subdomain: esnaf.subdomain || 'hazırlaniyor',
      odemeId,
      tutar,
    }).catch(console.error)
  }

  // ── 7. ADMIN BİLDİRİMİ ────────────────────────────────────────────────────
  await telegramGonder(
    `💳 <b>Yeni Ödeme</b>\n` +
    `${esnaf.isletmeAdiTam} — ${paket}\n` +
    `${esnaf.ilce}/${esnaf.sektor}\n` +
    `Modüller: ${aktifModuller.map(m => m.ad).join(', ')}`
  )
}
