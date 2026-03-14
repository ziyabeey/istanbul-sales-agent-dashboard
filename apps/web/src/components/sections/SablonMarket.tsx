'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Info, ArrowLeft, ChevronRight, Eye, Filter, Package, Layers } from 'lucide-react'
import { SABLONLAR } from '@/data/sablonlar'
import type { Sablon } from '@/data/sablonlar'
import { MODULLER } from '@/data/moduller'
import { demoIcerikSec } from '@/data/demoIcerikleri'
import { ortakCSS, ortakNav, ortakFooter } from '@/data/sablonlar/ortak'
import { sektorProfiliBul, profilCssDegerleri } from '@/data/sektorKatalogu'

// ── Paket Renkleri ──────────────────────────────────────────────────
const PAKET_RENK: Record<string, { bg: string; text: string; border: string }> = {
    TEMEL: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.25)' },
    STANDART: { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
    BUYUME: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
    PREMIUM: { bg: 'rgba(168,85,247,0.12)', text: '#a855f7', border: 'rgba(168,85,247,0.25)' },
    PREMIUMPLUS: { bg: 'rgba(236,72,153,0.12)', text: '#ec4899', border: 'rgba(236,72,153,0.25)' },
}

// ── Filtre tipleri ──────────────────────────────────────────────────
type PaketFiltre = 'HEPSI' | 'TEMEL' | 'STANDART' | 'BUYUME' | 'PREMIUM'
type KategoriFiltre = 'HEPSI' | 'jenerik' | 'sektor'

const PAKET_FILTRELER: { key: PaketFiltre; label: string }[] = [
    { key: 'HEPSI', label: 'Tümü' },
    { key: 'TEMEL', label: 'Temel' },
    { key: 'STANDART', label: 'Standart' },
    { key: 'BUYUME', label: 'Büyüme' },
    { key: 'PREMIUM', label: 'Premium' },
]

// Sektöre özgü gerçekçi demo içerikle HTML şablonunu önizleme için doldur
const createPreviewHtml = (html: string, sablonId: string, etiketler?: string[]) => {
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

    preview = preview.replace(/\{\{MODUL_([A-Z_]+)\}\}/g, (match, modulAd) => {
        const id = modulAd.toLowerCase().replace(/_/g, '-')
        const mod = MODULLER.find(m => m.id === id)
        
        if (mod && mod.htmlSablon) {
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
                .replace(/DUYURU_METNI/g, '🎉 Yeni hizmetlerimiz yayında!')
                .replace(/KAMPANYA_BASLIK/g, 'Özel Kampanya')
                .replace(/KAMPANYA_ACIKLAMA/g, 'Sınırlı süre için geçerli')
                .replace(/INDIRIM_YUZDESI/g, '20')
                .replace(/SAATLER_JSON/g, JSON.stringify([
                    { gun: 'Pazartesi - Cuma', saat: '09:00 - 18:00' },
                    { gun: 'Cumartesi', saat: '10:00 - 15:00' }
                ]))
                .replace(/ISTATISTIKLER_JSON/g, JSON.stringify([
                    { deger: '10+', etiket: 'Yıllık Tecrübe' },
                    { deger: '1000+', etiket: 'Mutlu Müşteri' }
                ]))
                .replace(/ADIMLAR_JSON/g, JSON.stringify([
                    { baslik: 'İletişim', aciklama: 'Bize ulaşın ve talebinizi iletin.' },
                    { baslik: 'Planlama', aciklama: 'Sizin için en uygun planı yapalım.' },
                    { baslik: 'Uygulama', aciklama: 'Hızlı ve güvenli şekilde uygulayalım.' }
                ]))
                .replace(/MAKALELER_JSON/g, JSON.stringify([
                    { baslik: 'Sektördeki Son Trendler', oset: 'Bu yılın dikkat çeken gelişmeleri.' },
                    { baslik: 'Nasıl Seçim Yapılmalı?', oset: 'Doğru tercihi yapmanın püf noktaları.' }
                ]))
                .replace(/ILANLAR_JSON/g, JSON.stringify([
                    { baslik: 'Uzman Ekip Arkadaşı', aciklama: 'Deneyimli çalışma arkadaşları arıyoruz.' }
                ]))
                .replace(/HIKAYE_METNI/g, '2010 yılından beri sektörde öncü hizmet veriyoruz.')
                .replace(/MISYON_METNI/g, 'Müşteri memnuniyetini en üst düzeyde tutmak.')
        }
        return '';
    })

    return preview
}

/* ─────────────────────────────────────────────────────────
   FULLSCREEN DEMO VIEW
   ───────────────────────────────────────────────────────── */
function DemoTamEkran({ sablon, onClose }: { sablon: Sablon, onClose: () => void }) {
    const [showModules, setShowModules] = useState(false)
    const [disabledModules, setDisabledModules] = useState<Set<string>>(new Set())

    // Memoize preview with module toggle support
    const previewHtml = useMemo(
        () => createPreviewHtml(sablon.htmlKodu, sablon.id, sablon.etiketler),
        [sablon]
    )
    const paketRenk = PAKET_RENK[sablon.minPaket] || PAKET_RENK.TEMEL

    // Modül detay listesi
    const modulDetay = useMemo(() => {
        if (!sablon.moduller) return []
        return sablon.moduller.map(id => {
            const mod = MODULLER.find(m => m.id === id)
            return mod ? { id, ad: mod.ad, aciklama: mod.aciklama, hasUI: !!mod.htmlSablon } : null
        }).filter(Boolean) as { id: string; ad: string; aciklama: string; hasUI: boolean }[]
    }, [sablon])

    const aktifSayi = modulDetay.length - disabledModules.size

    const toggleModule = (id: string) => {
        setDisabledModules(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col"
        >
            {/* ─── Üst Bar ─── */}
            <div className="flex items-center justify-between px-4 md:px-6 h-14 bg-[#111] border-b border-white/10 shrink-0 z-10">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="hidden sm:inline">Şablonlara Dön</span>
                </button>

                <div className="flex items-center gap-3">
                    <span className="text-lg">{sablon.icon}</span>
                    <span className="text-white font-bold text-sm md:text-base line-clamp-1">{sablon.ad}</span>
                    <span
                        className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border hidden sm:inline"
                        style={{ background: paketRenk.bg, color: paketRenk.text, borderColor: paketRenk.border }}
                    >
                        {sablon.minPaket}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Modül toggle butonu */}
                    {modulDetay.length > 0 && (
                        <button
                            onClick={() => setShowModules(!showModules)}
                            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${showModules ? 'bg-rust/20 text-rust border border-rust/30' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
                        >
                            <Layers className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">{aktifSayi}/{modulDetay.length} Modül</span>
                        </button>
                    )}
                    <button
                        onClick={() => window.location.href = `/sablonlar/${sablon.id}/duzenle`}
                        className="bg-rust hover:bg-rust/90 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 transition-all group"
                    >
                        <span className="hidden sm:inline">Ücretsiz Düzenle</span>
                        <span className="sm:hidden">Düzenle</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* ─── Demo iframe + Modül paneli ─── */}
            <div className="flex-1 relative flex">
                <div className="flex-1 relative">
                    <iframe
                        className="w-full h-full border-none absolute inset-0"
                        srcDoc={previewHtml}
                        title={`${sablon.ad} Demo`}
                        style={{ background: '#fff' }}
                    />
                </div>

                {/* Modül toggle paneli */}
                <AnimatePresence>
                    {showModules && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 340, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="bg-[#111] border-l border-white/10 overflow-y-auto shrink-0"
                        >
                            <div className="p-4">
                                <h3 className="text-sm font-bold text-white/80 mb-1 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-rust" />
                                    Modül Yönetimi
                                </h3>
                                <p className="text-[11px] text-white/30 mb-2">
                                    Modülleri açıp kapatarak şablonunuzu özelleştirin.
                                </p>
                                <div className="flex items-center gap-2 mb-4 text-[10px]">
                                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full font-bold">
                                        {aktifSayi} Aktif
                                    </span>
                                    {disabledModules.size > 0 && (
                                        <span className="bg-white/5 text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                                            {disabledModules.size} Kapalı
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    {modulDetay.map(m => {
                                        const aktif = !disabledModules.has(m.id)
                                        return (
                                            <div
                                                key={m.id}
                                                className={`rounded-lg p-3 transition-all cursor-pointer ${aktif ? 'bg-white/[0.04] border border-white/[0.08]' : 'bg-white/[0.01] border border-white/[0.03] opacity-50'}`}
                                                onClick={() => toggleModule(m.id)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {/* Toggle switch */}
                                                    <div className={`w-8 h-[18px] rounded-full flex items-center transition-all shrink-0 ${aktif ? 'bg-emerald-500/30' : 'bg-white/10'}`}>
                                                        <div className={`w-3.5 h-3.5 rounded-full transition-all ${aktif ? 'bg-emerald-400 translate-x-[18px]' : 'bg-white/30 translate-x-[2px]'}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-semibold text-white/80 truncate">{m.ad}</div>
                                                    </div>
                                                    {!m.hasUI && (
                                                        <span className="text-[8px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold shrink-0">
                                                            YAKINDA
                                                        </span>
                                                    )}
                                                </div>
                                                {aktif && (
                                                    <div className="text-[10px] text-white/30 leading-relaxed mt-1 pl-10">{m.aciklama}</div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Daha fazla modül bilgisi */}
                                <div className="mt-6 pt-4 border-t border-white/5">
                                    <p className="text-[10px] text-white/20 text-center">
                                        Üyelik sonrası tüm modülleri aktifleştirebilirsiniz.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

/* ─────────────────────────────────────────────────────────
   TEMPLATE CARD WITH LIVE PREVIEW THUMBNAIL
   ───────────────────────────────────────────────────────── */
function SablonKarti({ sablon, previewHtml, onClick }: { sablon: Sablon, previewHtml: string, onClick: () => void }) {
    const paketRenk = PAKET_RENK[sablon.minPaket] || PAKET_RENK.TEMEL
    const modulSayisi = sablon.moduller?.length || 0

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all duration-300"
            onClick={onClick}
        >
            {/* ─── Live Preview Thumbnail ─── */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
                <div className="absolute inset-0 origin-top-left" style={{ width: '400%', height: '400%', transform: 'scale(0.25)', transformOrigin: 'top left' }}>
                    <iframe
                        className="w-full h-full border-none pointer-events-none"
                        srcDoc={previewHtml}
                        title={`${sablon.ad} Önizleme`}
                        tabIndex={-1}
                        loading="lazy"
                        sandbox="allow-same-origin"
                        style={{ background: '#fff' }}
                    />
                </div>

                {/* Paket badge (üst sağ köşe) */}
                <div className="absolute top-3 right-3 z-10">
                    <span
                        className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md border backdrop-blur-md"
                        style={{ background: paketRenk.bg, color: paketRenk.text, borderColor: paketRenk.border }}
                    >
                        {sablon.minPaket}
                    </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-semibold text-sm border border-white/20 shadow-2xl">
                        <Eye className="w-4 h-4" />
                        Demo Siteyi Aç
                    </div>
                </div>
            </div>

            {/* ─── Card Info ─── */}
            <div className="p-4 border-t border-white/[0.04]">
                <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-lg">{sablon.icon}</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-rust transition-colors line-clamp-1 flex-1">
                        {sablon.ad}
                    </h3>
                </div>
                <p className="text-white/35 text-[11px] line-clamp-1 leading-relaxed mb-2">
                    {sablon.aciklama}
                </p>
                {/* Modül sayısı */}
                {modulSayisi > 0 && (
                    <div className="flex items-center gap-1.5 text-white/25 text-[10px]">
                        <Layers className="w-3 h-3" />
                        <span>{modulSayisi} Modül Aktif</span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */
export default function SablonMarket() {
    const [arama, setArama] = useState('')
    const [seciliSablon, setSeciliSablon] = useState<Sablon | null>(null)
    const [paketFiltre, setPaketFiltre] = useState<PaketFiltre>('HEPSI')
    const [kategoriFiltre, setKategoriFiltre] = useState<KategoriFiltre>('HEPSI')

    const filtrelenmisSablonlar = useMemo(() => {
        return SABLONLAR.filter(s => {
            // Arama
            const aramaUygun = !arama || 
                s.ad.toLowerCase().includes(arama.toLowerCase()) ||
                s.aciklama.toLowerCase().includes(arama.toLowerCase()) ||
                s.etiketler?.some(e => e.toLowerCase().includes(arama.toLowerCase()))

            // Paket filtre
            const paketUygun = paketFiltre === 'HEPSI' || s.minPaket === paketFiltre

            // Kategori filtre
            const kategoriUygun = kategoriFiltre === 'HEPSI' || s.kategori === kategoriFiltre

            return aramaUygun && paketUygun && kategoriUygun
        })
    }, [arama, paketFiltre, kategoriFiltre])

    // Memoize preview HTML for each template (expensive operation)
    const previewCache = useMemo(() => {
        const cache: Record<string, string> = {}
        for (const s of SABLONLAR) {
            cache[s.id] = createPreviewHtml(s.htmlKodu, s.id, s.etiketler)
        }
        return cache
    }, [])

    const aktifFiltreSayisi = (paketFiltre !== 'HEPSI' ? 1 : 0) + (kategoriFiltre !== 'HEPSI' ? 1 : 0)

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-24">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                        Hazır <span className="text-rust">Site Şablonları</span>
                    </h1>
                    <p className="text-base text-white/50 leading-relaxed mb-6">
                        Sektörünüze özel, AI destekli profesyonel web sitesi şablonları. Canlı önizlemeye tıklayın.
                    </p>

                    <div className="relative max-w-md mx-auto mb-6">
                        <input
                            type="text"
                            placeholder="Şablon ara..."
                            value={arama}
                            onChange={(e) => setArama(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rust/50 focus:ring-1 focus:ring-rust/50 transition-all"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    </div>
                </div>

                {/* ─── Filtre Bar ─── */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    {/* Kategori filtresi */}
                    <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
                        {[
                            { key: 'HEPSI' as KategoriFiltre, label: 'Tümü' },
                            { key: 'sektor' as KategoriFiltre, label: '🏢 Sektörel' },
                            { key: 'jenerik' as KategoriFiltre, label: '📐 Jenerik' },
                        ].map(f => (
                            <button
                                key={f.key}
                                onClick={() => setKategoriFiltre(f.key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    kategoriFiltre === f.key
                                        ? 'bg-white/10 text-white shadow-sm'
                                        : 'text-white/40 hover:text-white/60'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {/* Paket filtresi */}
                    <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
                        {PAKET_FILTRELER.map(f => {
                            const renk = f.key !== 'HEPSI' ? PAKET_RENK[f.key] : null
                            return (
                                <button
                                    key={f.key}
                                    onClick={() => setPaketFiltre(f.key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                        paketFiltre === f.key
                                            ? 'shadow-sm'
                                            : 'text-white/40 hover:text-white/60'
                                    }`}
                                    style={paketFiltre === f.key && renk ? {
                                        background: renk.bg,
                                        color: renk.text,
                                        borderColor: renk.border,
                                    } : paketFiltre === f.key ? {
                                        background: 'rgba(255,255,255,0.1)',
                                        color: '#fff',
                                    } : undefined}
                                >
                                    {f.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Sonuç sayısı */}
                    <div className="ml-auto text-xs text-white/30">
                        {filtrelenmisSablonlar.length} / {SABLONLAR.length} şablon
                    </div>
                </div>

                {/* Grid */}
                {filtrelenmisSablonlar.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filtrelenmisSablonlar.map(sablon => (
                                <SablonKarti
                                    key={sablon.id}
                                    sablon={sablon}
                                    previewHtml={previewCache[sablon.id] || ''}
                                    onClick={() => setSeciliSablon(sablon)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <Info className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Şablon bulunamadı</h3>
                        <p className="text-white/50 mb-4">Arama kriterlerinize uygun şablon eşleşmedi.</p>
                        <button
                            onClick={() => { setArama(''); setPaketFiltre('HEPSI'); setKategoriFiltre('HEPSI') }}
                            className="text-rust text-sm font-semibold hover:underline"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                )}

            </div>

            {/* Fullscreen Demo */}
            <AnimatePresence>
                {seciliSablon && (
                    <DemoTamEkran
                        sablon={seciliSablon}
                        onClose={() => setSeciliSablon(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
