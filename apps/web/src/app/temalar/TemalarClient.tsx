'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/layout/Navbar'
import FooterTrustSection from '@/components/sections/FooterTrustSection'
import TemaHero from '@/components/temalar/TemaHero'
import SektorPills from '@/components/temalar/SektorPills'
import FilterBar from '@/components/temalar/FilterBar'
import TemplateGrid from '@/components/temalar/TemplateGrid'
import TemaPagination from '@/components/temalar/TemaPagination'
import InspirationCarousel from '@/components/temalar/InspirationCarousel'
import AICTABanner from '@/components/temalar/AICTABanner'
import EmptyState from '@/components/temalar/EmptyState'
import TemplatePreviewModal from '@/components/temalar/TemplatePreviewModal'
import { useTemalar } from '@/hooks/useTemalar'
import { TEMA_KATALOGU, INSPIRATIONAL_TEMALAR } from '@/data/temaKatalogu'
import { LEGACY_SABLONLAR as SABLONLAR } from '@/data/sablonlar'
import { demoIcerikSec } from '@/data/demoIcerikleri'
import { ortakCSS, ortakNav, ortakFooter } from '@/data/sablonlar/ortak'
import { sektorProfiliBul, profilCssDegerleri } from '@/data/sektorKatalogu'
import { MODULLER } from '@/data/moduller'
import type { TemaKartiItem } from '@/types/temaKatalogu'

// ── Preview HTML üretimi (SablonMarket.tsx'den adapte) ──────────
function createPreviewHtml(html: string, sablonId: string, etiketler?: string[]): string {
  const d = demoIcerikSec(sablonId, etiketler)
  const profil = sektorProfiliBul(sablonId)
  const profilCss = profil ? profilCssDegerleri(profil) : null

  let preview = html
    .replace(/\$\{ortakCSS\}/g, ortakCSS)
    .replace(/\$\{ortakNav\}/g, ortakNav)
    .replace(/\$\{ortakFooter\}/g, ortakFooter)

  preview = preview
    .replace(/\{\{ISLETME_ADI\}\}/g, d.isletmeAdi)
    .replace(/\{\{ISLETME_KISAADI\}\}/g, d.kisaAd)
    .replace(/\{\{SEKTOR\}\}/g, d.sektor)
    .replace(/\{\{ILCE\}\}/g, d.ilce)
    .replace(/\{\{SEHIR\}\}/g, d.sehir)
    .replace(/\{\{TELEFON\}\}/g, d.telefon)
    .replace(/\{\{TELEFON_GOSTERIM\}\}/g, d.telefonGosterim)
    .replace(/\{\{WHATSAPP\}\}/g, d.whatsapp)
    .replace(/\{\{ADRES_METNI\}\}/g, d.adres)
    .replace(/\{\{HARITA_URL\}\}/g, `https://maps.google.com/maps?q=${encodeURIComponent(d.adres)}&output=embed`)
    .replace(/\{\{OG_URL\}\}/g, '#')
    .replace(/\{\{WA_MESAJ\}\}/g, encodeURIComponent(`Merhaba, ${d.isletmeAdi} hakkında bilgi almak istiyorum`))
    .replace(/\{\{CSS_ARKAPLAN\}\}/g, profilCss?.CSS_ARKAPLAN || '#0f0f0f')
    .replace(/\{\{CSS_KART\}\}/g, profilCss?.CSS_KART || '#1a1a1a')
    .replace(/\{\{CSS_VURGU\}\}/g, profilCss?.CSS_VURGU || '#c9541e')
    .replace(/\{\{CSS_HOVER\}\}/g, profilCss?.CSS_HOVER || '#a8441a')
    .replace(/\{\{CSS_METIN\}\}/g, profilCss?.CSS_METIN || '#f5f1eb')
    .replace(/\{\{CSS_ALT\}\}/g, profilCss?.CSS_ALT || '#94877a')
    .replace(/\{\{CSS_GRADIENT\}\}/g, profilCss?.CSS_GRADIENT || 'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)')
    .replace(/\{\{FONT_BASLIK\}\}/g, profilCss?.FONT_BASLIK || 'Syne')
    .replace(/\{\{FONT_METIN\}\}/g, profilCss?.FONT_METIN || 'Inter')
    .replace(/\{\{HERO_BASLIK\}\}/g, d.heroBaslik)
    .replace(/\{\{HERO_SLOGAN\}\}/g, d.heroSlogan)
    .replace(/\{\{HERO_CTA_BIRINCIL\}\}/g, d.ctaBirincil)
    .replace(/\{\{HERO_CTA_IKINCIL\}\}/g, d.ctaIkincil)
    .replace(/\{\{HIZMETLER_HTML\}\}/g, d.hizmetlerHtml)
    .replace(/\{\{NEDEN_BIZ_HTML\}\}/g, d.nedenBizHtml)
    .replace(/\{\{YORUMLAR_HTML\}\}/g, d.yorumlarHtml)
    .replace(/\{\{SEO_BASLIK\}\}/g, d.seoBaslik)
    .replace(/\{\{SEO_ACIKLAMA\}\}/g, d.seoAciklama)
    .replace(/\{\{INSTAGRAM_URL\}\}/g, '#')
    .replace(/\{\{FACEBOOK_URL\}\}/g, '#')
    .replace(/\{\{GMB_LINK\}\}/g, '#')

  // Modül yer tutucuları
  preview = preview.replace(/\{\{MODUL_([A-Z_]+)\}\}/g, (match, modulAd) => {
    const id = modulAd.toLowerCase().replace(/_/g, '-')
    const mod = MODULLER.find(m => m.id === id)
    if (mod?.htmlSablon) {
      return mod.htmlSablon
        .replace(/ISLETME_ADI/g, d.isletmeAdi)
        .replace(/WHATSAPP_NUMARA/g, d.telefon)
        .replace(/ESNAF_ID/g, 'demo-id')
        .replace(/KEPENK_API_URL/g, 'https://kepenk.ai')
        .replace(/TELEFON/g, d.telefonGosterim)
        .replace(/ADRES_METNI/g, d.adres)
        .replace(/HARITA_QUERY/g, encodeURIComponent(`${d.isletmeAdi} ${d.ilce} ${d.sehir}`))
        .replace(/KURUCU_ADI/g, d.kisaAd)
        .replace(/GMB_LINK/g, '#')
        .replace(/INSTAGRAM_URL/g, '#')
        .replace(/FACEBOOK_URL/g, '#')
        .replace(/YOUTUBE_URL/g, '#')
        .replace(/TIKTOK_URL/g, '#')
        .replace(/TWITTER_URL/g, '#')
        .replace(/BASVURU_LINK/g, '#')
        .replace(/DUYURU_LINK/g, '#')
        .replace(/DUYURU_METNI/g, 'Yeni hizmetlerimiz yayında!')
        .replace(/KAMPANYA_BASLIK/g, 'Özel Kampanya')
        .replace(/KAMPANYA_ACIKLAMA/g, 'Sınırlı süre için geçerli')
        .replace(/INDIRIM_YUZDESI/g, '20')
        .replace(/SAATLER_JSON/g, JSON.stringify([
          { gun: 'Pazartesi - Cuma', saat: '09:00 - 18:00' },
          { gun: 'Cumartesi', saat: '10:00 - 15:00' },
        ]))
        .replace(/ISTATISTIKLER_JSON/g, JSON.stringify([
          { deger: '10+', etiket: 'Yıllık Tecrübe' },
          { deger: '1000+', etiket: 'Mutlu Müşteri' },
        ]))
        .replace(/ADIMLAR_JSON/g, JSON.stringify([
          { baslik: 'İletişim', aciklama: 'Bize ulaşın ve talebinizi iletin.' },
          { baslik: 'Planlama', aciklama: 'Sizin için en uygun planı yapalım.' },
          { baslik: 'Uygulama', aciklama: 'Hızlı ve güvenli şekilde uygulayalım.' },
        ]))
        .replace(/MAKALELER_JSON/g, JSON.stringify([
          { baslik: 'Sektördeki Son Trendler', oset: 'Bu yılın dikkat çeken gelişmeleri.' },
          { baslik: 'Nasıl Seçim Yapılmalı?', oset: 'Doğru tercihi yapmanın püf noktaları.' },
        ]))
        .replace(/ILANLAR_JSON/g, JSON.stringify([
          { baslik: 'Uzman Ekip Arkadaşı', aciklama: 'Deneyimli çalışma arkadaşları arıyoruz.' },
        ]))
        .replace(/HIKAYE_METNI/g, '2010 yılından beri sektörde öncü hizmet veriyoruz.')
        .replace(/MISYON_METNI/g, 'Müşteri memnuniyetini en üst düzeyde tutmak.')
    }
    return ''
  })

  return preview
}

// ═══════════════════════════════════════════════════════════════
// ANA BİLEŞEN
// ═══════════════════════════════════════════════════════════════

export default function TemalarClient() {
  const [seciliTema, setSeciliTema] = useState<TemaKartiItem | null>(null)

  const {
    filtreler,
    filtreGuncelle,
    filtreleriSifirla,
    aktifFiltreSayisi,
    sayfaliTemalar,
    sayfa,
    setSayfa,
    toplamSayfa,
    toplamSonuc,
    sektorSayilari,
  } = useTemalar(TEMA_KATALOGU)

  // Preview HTML cache — yalnızca gerçek şablonlar için
  const previewCache = useMemo(() => {
    const cache: Record<string, string> = {}
    for (const s of SABLONLAR) {
      cache[s.id] = createPreviewHtml(s.htmlKodu, s.id, s.etiketler)
    }
    return cache
  }, [])

  // Seçili temanın preview HTML'i
  const seciliPreviewHtml = useMemo(() => {
    if (!seciliTema?.gercekSablonId) return null
    return previewCache[seciliTema.gercekSablonId] || null
  }, [seciliTema, previewCache])

  // Filtre aktif mi? (ilham carousel'i gizlemek için)
  const filtreAktif = !!filtreler.arama || !!filtreler.sektor || aktifFiltreSayisi > 0

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <TemaHero
        aramaValue={filtreler.arama}
        onAramaChange={(val) => filtreGuncelle('arama', val)}
        toplamSayi={TEMA_KATALOGU.length}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <SektorPills
          aktifSektor={filtreler.sektor}
          onSektorChange={(val) => filtreGuncelle('sektor', val)}
          sektorSayilari={sektorSayilari}
        />

        <FilterBar
          filtreler={filtreler}
          filtreGuncelle={filtreGuncelle}
          filtreleriSifirla={filtreleriSifirla}
          aktifFiltreSayisi={aktifFiltreSayisi}
          toplamSonuc={toplamSonuc}
        />

        {/* İlham carousel — filtre yokken ve ilk sayfadayken */}
        {!filtreAktif && sayfa === 1 && (
          <InspirationCarousel
            temalar={INSPIRATIONAL_TEMALAR}
            onOnizle={setSeciliTema}
          />
        )}

        {sayfaliTemalar.length > 0 ? (
          <>
            <TemplateGrid
              temalar={sayfaliTemalar}
              previewCache={previewCache}
              onOnizle={setSeciliTema}
            />
            <TemaPagination
              sayfa={sayfa}
              toplamSayfa={toplamSayfa}
              onSayfaDegistir={setSayfa}
            />
          </>
        ) : (
          <EmptyState onSifirla={filtreleriSifirla} />
        )}

        <AICTABanner />
      </div>

      <FooterTrustSection />

      {/* Preview Modal */}
      <TemplatePreviewModal
        tema={seciliTema}
        previewHtml={seciliPreviewHtml}
        onClose={() => setSeciliTema(null)}
      />
    </div>
  )
}
