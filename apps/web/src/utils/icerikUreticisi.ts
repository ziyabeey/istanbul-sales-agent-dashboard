import { adminDb } from '@/lib/firebaseAdmin'
import { buHaftaSezonlar } from '@/data/sezonlar'

/**
 * Haftalık sosyal medya içerik üretimi.
 * Sezon bilgisini context olarak ekler, The Creator ajanına gönderir.
 */
export async function haftaIcerikUret(
  esnafId: string,
  platformlar: string[]
): Promise<void> {
  const esnaf = (await adminDb.collection('esnaflar').doc(esnafId).get()).data()
  if (!esnaf) return

  // Bu hafta önemli sezon var mı?
  const aktifSezonlar = buHaftaSezonlar(esnaf.sektor)

  const sezonBaglami = aktifSezonlar.length > 0
    ? `\n\nONEMLI — Bu hafta icin ozel baglam:\n` +
      aktifSezonlar.map(s =>
        `${s.ad} (${s.oncelikSeviye === 3 ? 'COK ONEMLI' : 'ONEMLI'})\n${s.icerikNotu}`
      ).join('\n\n')
    : ''

  // The Creator ajanına sezon bilgisiyle gönder
  const { runAgent } = await import('@/agents/agentRunner')
  await runAgent('the_creator', {
    action: 'haftalik_icerik',
    esnafId,
    sektor: esnaf.sektor,
    isletmeAdi: esnaf.isletmeAdi || esnaf.ad,
    ilce: esnaf.ilce,
    platformlar,
    sezonBaglami,
  }).catch(e => console.error(`[ICERIK URETICI] ${esnafId}:`, e.message))
}
