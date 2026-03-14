/**
 * kaliteKontrol.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Master Prompt v2 — Kural Bloğu 5 tabanlı otomatik QA kontrolleri.
 * 12-madde kontrol listesi + regex tabanlı tespit.
 * siteUreticisi.ts hakem pipeline'ına ek olarak entegre edilebilir.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface KaliteRaporu {
  gecti: boolean
  puan: number        // 0-100
  sorunlar: KaliteSorunu[]
  uyarilar: string[]
}

export interface KaliteSorunu {
  madde: number       // 1-12
  seviye: 'kritik' | 'uyari'
  aciklama: string
}

/**
 * HTML çıktısını Master Prompt v2 kalite kontrol listesine göre tara.
 * Regex tabanlı hızlı kontrol — tam WCAG analizi değil, temel yakalama.
 */
export function htmlKaliteKontrol(html: string): KaliteRaporu {
  const sorunlar: KaliteSorunu[] = []
  const uyarilar: string[] = []
  const lower = html.toLowerCase()

  // ── Madde 1: Lorem ipsum veya placeholder metin ──
  if (/lorem\s*ipsum/i.test(html)) {
    sorunlar.push({ madde: 1, seviye: 'kritik', aciklama: '"Lorem ipsum" placeholder metni tespit edildi' })
  }
  if (/placeholder\s*text/i.test(html) || /sample\s*text/i.test(html)) {
    sorunlar.push({ madde: 1, seviye: 'uyari', aciklama: 'Placeholder/sample metin tespit edildi' })
  }
  if (/örnek\s*(hizmet|işletme|açıklama)/i.test(html)) {
    uyarilar.push('Madde 1: "Örnek" kelimesi içerik içinde bulundu — gerçekçi içerik kullanın')
  }

  // ── Madde 2: Kontrast riski (açık metin + açık zemin) ──
  // Açık renkli arka plan + açık renkli metin riski
  if (/color:\s*#[ef][ef][ef]/i.test(html) && /background[^;]*#[ef][ef][ef]/i.test(html)) {
    sorunlar.push({ madde: 2, seviye: 'uyari', aciklama: 'Açık arka plan + açık metin riski (WCAG AA kontrast)' })
  }
  // Koyu zemin kontrolü
  if (/background[^;]*:\s*#[012]/i.test(html)) {
    // Koyu zemin var — koyu metin de var mı kontrol et (sadece body/general level)
    if (/(?:^|;)\s*color:\s*#[0-3][0-3a-f][0-3a-f]/im.test(html)) {
      uyarilar.push('Madde 2: Koyu zemin üzerinde koyu metin olabilir — kontrast kontrol edin')
    }
  }

  // ── Madde 3: Görsel üstü metin overlay koruması ──
  const hasImageBg = /background[^}]*url\s*\(/i.test(html)
  const hasOverlay = /rgba\s*\(\s*0\s*,\s*0\s*,\s*0/i.test(html) || /linear-gradient.*rgba/i.test(html)
  if (hasImageBg && !hasOverlay) {
    sorunlar.push({ madde: 3, seviye: 'uyari', aciklama: 'Görsel arka plan var ama rgba overlay bulunamadı' })
  }

  // ── Madde 4: Navbar/section üstüste gelme ──
  const hasNavHeight = /--nav-h|--nav-height/i.test(html)
  const hasPaddingTop = /padding-top\s*:\s*calc/i.test(html)
  if (!hasNavHeight && !hasPaddingTop) {
    uyarilar.push('Madde 4: --nav-height veya padding-top:calc() bulunamadı — navbar/section çakışma riski')
  }

  // ── Madde 5: Alt attribute kontrolü ──
  const imgTags = html.match(/<img[^>]*>/gi) || []
  const missingAlt = imgTags.filter(img => !/alt\s*=/i.test(img))
  if (missingAlt.length > 0) {
    sorunlar.push({ madde: 5, seviye: 'uyari', aciklama: `${missingAlt.length} img tag(s) alt attribute eksik` })
  }

  // ── Madde 6: Mobil responsive kontrol ──
  if (!/@media.*max-width/i.test(html) && !/@media.*min-width/i.test(html)) {
    sorunlar.push({ madde: 6, seviye: 'uyari', aciklama: 'Hiç media query bulunamadı — responsive olmayabilir' })
  }
  if (/overflow-x\s*:\s*scroll/i.test(html)) {
    sorunlar.push({ madde: 6, seviye: 'uyari', aciklama: 'overflow-x: scroll tespit edildi — yatay scroll riski' })
  }

  // ── Madde 7: Hover/focus state kontrolü ──
  if (!/:hover/i.test(html)) {
    uyarilar.push('Madde 7: Hiç :hover state bulunamadı')
  }
  if (!/:focus/i.test(html) && !/:focus-visible/i.test(html)) {
    uyarilar.push('Madde 7: :focus veya :focus-visible state bulunamadı — erişilebilirlik sorunu')
  }

  // ── Madde 8: z-index çakışması ──
  if (/z-index\s*:\s*9999/i.test(html)) {
    sorunlar.push({ madde: 8, seviye: 'uyari', aciklama: 'z-index: 9999 tespit edildi — z-index çakışma riski' })
  }
  const zindexValues = (html.match(/z-index\s*:\s*(\d+)/gi) || [])
    .map(m => parseInt(m.replace(/z-index\s*:\s*/i, '')))
    .filter(n => !isNaN(n))
  if (zindexValues.length > 3 && new Set(zindexValues).size < zindexValues.length / 2) {
    uyarilar.push('Madde 8: Çok sayıda aynı z-index değeri — hiyerarşi karışıklığı riski')
  }

  // ── Madde 9: x-axis overflow ──
  // negative margin kullanımı
  if (/margin[^}]*:\s*-\d/i.test(html)) {
    uyarilar.push('Madde 9: Negatif margin kullanımı tespit edildi — overflow riski')
  }

  // ── Madde 10: Footer linkleri boş href="#" ──
  const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i)
  if (footerMatch) {
    const emptyHrefs = (footerMatch[0].match(/href\s*=\s*["']#["']/gi) || []).length
    if (emptyHrefs > 2) {
      uyarilar.push(`Madde 10: Footer'da ${emptyHrefs} adet boş href="#" bağlantısı var`)
    }
  }

  // ── Madde 11: Form label/aria-label ──
  const inputs = html.match(/<input[^>]*>/gi) || []
  const textareas = html.match(/<textarea[^>]*>/gi) || []
  const formFields = [...inputs, ...textareas]
  const missingLabels = formFields.filter(f =>
    !/aria-label/i.test(f) && !/id\s*=/i.test(f) // basitleştirilmiş kontrol
  )
  if (missingLabels.length > 0) {
    uyarilar.push(`Madde 11: ${missingLabels.length} form alanında aria-label veya id eksik`)
  }

  // ── Madde 12: CSS değişkenleri :root'ta tanımlı mı ──
  const cssVarUsages = html.match(/var\(--[a-z-]+\)/gi) || []
  const rootBlock = html.match(/:root\s*\{[^}]*\}/i)?.[0] || ''
  const undefinedVars = cssVarUsages.filter(v => {
    const varName = v.replace(/var\(|\)/g, '')
    return !rootBlock.includes(varName)
  })
  if (undefinedVars.length > 3) {
    uyarilar.push(`Madde 12: ${undefinedVars.length} CSS değişkeni :root'ta tanımsız olabilir`)
  }

  // ── Ek Master Prompt regex kontrolleri ──
  if (/color:\s*#fff\s*;/i.test(html) && /background:\s*#fff/i.test(html)) {
    uyarilar.push('Ek: Beyaz üstüne beyaz metin riski')
  }

  // ── Puan hesapla ──
  const kritikSayi = sorunlar.filter(s => s.seviye === 'kritik').length
  const uyariSayi = sorunlar.filter(s => s.seviye === 'uyari').length + uyarilar.length
  const puan = Math.max(0, 100 - (kritikSayi * 20) - (uyariSayi * 5))

  return {
    gecti: kritikSayi === 0 && puan >= 60,
    puan,
    sorunlar,
    uyarilar,
  }
}

/**
 * Kalite raporu özet logu
 */
export function kaliteRaporuLogla(rapor: KaliteRaporu, isletmeAdi: string): void {
  const status = rapor.gecti ? '✅ GEÇTİ' : '❌ BAŞARISIZ'
  console.log(`[QA] ${isletmeAdi}: ${status} (${rapor.puan}/100)`)
  for (const s of rapor.sorunlar) {
    console.log(`  [${s.seviye.toUpperCase()}] Madde ${s.madde}: ${s.aciklama}`)
  }
  for (const u of rapor.uyarilar) {
    console.log(`  [UYARI] ${u}`)
  }
}
