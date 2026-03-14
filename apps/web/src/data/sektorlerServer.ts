import { sektorBul } from './sektorler'

export interface SektorKnowhow {
  sektor: string
  sikSorulanlar: { soru: string; cevap: string; aciliyet?: string }[]
  mevzuat: string[]
  mevsimsellik: Record<string, string>
  rakipler?: string[]
  ortalamaSureler?: Record<string, string>
  populerHizmetler?: string[]
  fiyatAraliklari?: Record<string, string>
  musteriProfili?: { demografik: string; karar: string; hassasiyet: string }
  caprazSatis?: string[]
  krizSenaryolari?: { tetikleyici: string; yanit: string }[]
  dijitalIpuclari?: string[]
  yasalUyarilar?: string[]
}

/**
 * Detaylı sektörel know-how yükleyici (sunucu tarafı).
 * data/sektorel_knowhow/{sektorId}.json dosyasından çeker.
 * AI agent'lar için zengin bilgi: FAQ, fiyatlar, kriz, çapraz satış vb.
 */
export async function sektorDetayliKnowhow(sektorId: string): Promise<SektorKnowhow | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    const dosya = path.join(process.cwd(), 'data', 'sektorel_knowhow', `${sektorId}.json`)
    const icerik = await fs.readFile(dosya, 'utf-8')
    return JSON.parse(icerik) as SektorKnowhow
  } catch {
    return null
  }
}

/**
 * AI agent system prompt'u için tam sektörel bilgi oluşturucu (sunucu tarafı).
 * Hem sektorler.ts'deki temel kuralları hem JSON know-how'u birleştirir.
 */
export async function sektorZenginPrompt(sektorId: string): Promise<string> {
  const s = sektorBul(sektorId)
  if (!s) return ''

  const parts: string[] = []
  parts.push(`## Sektör: ${s.ad} (${s.emoji})`)

  // Temel davranış kuralları
  if (s.knowHow) parts.push(`Temel Kural: ${s.knowHow}`)
  if (s.aiDavranisi) parts.push(`Davranış Tarzı: ${s.aiDavranisi}`)
  if (s.satisStratejisi) parts.push(`Satış Stratejisi: ${s.satisStratejisi}`)

  // Detaylı know-how (JSON)
  const kh = await sektorDetayliKnowhow(sektorId)
  if (kh) {
    // Sık Sorulan Sorular
    if (kh.sikSorulanlar?.length) {
      parts.push('\n### Sık Sorulan Sorular ve Cevapları:')
      for (const faq of kh.sikSorulanlar) {
        const acil = faq.aciliyet === 'yuksek' ? ' [ACİL]' : ''
        parts.push(`S: "${faq.soru}"${acil}\nC: ${faq.cevap}`)
      }
    }

    // Fiyat aralıkları
    if (kh.fiyatAraliklari) {
      parts.push('\n### Fiyat Rehberi:')
      for (const [hizmet, fiyat] of Object.entries(kh.fiyatAraliklari)) {
        if (hizmet === 'not') {
          parts.push(`NOT: ${fiyat}`)
        } else {
          parts.push(`- ${hizmet}: ${fiyat}`)
        }
      }
    }

    // Ortalama süreler
    if (kh.ortalamaSureler) {
      parts.push('\n### Ortalama Hizmet Süreleri:')
      for (const [hizmet, sure] of Object.entries(kh.ortalamaSureler)) {
        parts.push(`- ${hizmet}: ${sure}`)
      }
    }

    // Mevsimsellik
    if (kh.mevsimsellik) {
      parts.push('\n### Mevsimsel Takvim:')
      for (const [mevsim, bilgi] of Object.entries(kh.mevsimsellik)) {
        parts.push(`- ${mevsim}: ${bilgi}`)
      }
    }

    // Çapraz satış
    if (kh.caprazSatis?.length) {
      parts.push('\n### Çapraz Satış Fırsatları:')
      for (const tip of kh.caprazSatis) {
        parts.push(`- ${tip}`)
      }
    }

    // Kriz senaryoları
    if (kh.krizSenaryolari?.length) {
      parts.push('\n### Kriz Senaryoları:')
      for (const k of kh.krizSenaryolari) {
        parts.push(`Durum: ${k.tetikleyici}\nYapılacak: ${k.yanit}`)
      }
    }

    // Yasal uyarılar
    if (kh.yasalUyarilar?.length) {
      parts.push('\n### YASAL UYARILAR (KESİNLİKLE UYGULA):')
      for (const u of kh.yasalUyarilar) {
        parts.push(`⚠️ ${u}`)
      }
    }

    // Mevzuat
    if (kh.mevzuat?.length) {
      parts.push('\n### İlgili Mevzuat:')
      parts.push(kh.mevzuat.join(', '))
    }
  }

  return parts.join('\n')
}
