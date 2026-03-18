'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Info, ArrowLeft, ChevronRight, Eye, Layers } from 'lucide-react'
import { UNIFIED_SABLONLAR, SEKTOR_FILTRELERI } from '@/data/sablonlar/unified-catalog'
import type { Sablon } from '@/data/sablonlar'
import { MODULLER } from '@/data/moduller'

// ── Paket Renkleri ──────────────────────────────────────────────────
const PAKET_RENK: Record<string, { bg: string; text: string; border: string }> = {
    TEMEL: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.25)' },
    STANDART: { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
    BUYUME: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
    PREMIUM: { bg: 'rgba(168,85,247,0.12)', text: '#a855f7', border: 'rgba(168,85,247,0.25)' },
    PREMIUMPLUS: { bg: 'rgba(236,72,153,0.12)', text: '#ec4899', border: 'rgba(236,72,153,0.25)' },
}

// ── Filtre tipleri ──────────────────────────────────────────────────
type PaketFiltre = 'HEPSI' | 'TEMEL' | 'STANDART' | 'BUYUME' | 'PREMIUM' | 'PREMIUMPLUS'

const PAKET_FILTRELER: { key: PaketFiltre; label: string }[] = [
    { key: 'HEPSI', label: 'Tümü' },
    { key: 'TEMEL', label: 'Temel' },
    { key: 'STANDART', label: 'Standart' },
    { key: 'BUYUME', label: 'Büyüme' },
    { key: 'PREMIUM', label: 'Premium' },
    { key: 'PREMIUMPLUS', label: 'Premium+' },
]

// Sektör filter options from unified catalog
const SEKTOR_FILTRE_SECENEKLERI = [
    { id: 'HEPSI', label: 'Tüm Sektörler', count: UNIFIED_SABLONLAR.length },
    ...SEKTOR_FILTRELERI,
]

/* ─────────────────────────────────────────────────────────
   FULLSCREEN DEMO VIEW
   ───────────────────────────────────────────────────────── */
function DemoTamEkran({ sablon, onClose }: { sablon: Sablon, onClose: () => void }) {
    const [showModules, setShowModules] = useState(false)
    const [disabledModules, setDisabledModules] = useState<Set<string>>(new Set())

    // Memoize preview with module toggle support
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
                        onClick={() => window.location.href = `/kayit?sablon=${sablon.id}`}
                        className="bg-rust hover:bg-rust/90 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 transition-all group"
                    >
                        <span className="hidden sm:inline">Bu Temayı Kullan</span>
                        <span className="sm:hidden">Kullan</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* ─── Demo iframe + Modül paneli ─── */}
            <div className="flex-1 relative flex">
                <div className="flex-1 relative">
                    <iframe
                        className="w-full h-full border-none absolute inset-0"
                        src={`/demolar/${sablon.id}`}
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
function SablonKarti({ sablon, onClick }: { sablon: Sablon, onClick: () => void }) {
    const paketRenk = PAKET_RENK[sablon.minPaket] || PAKET_RENK.TEMEL
    // etiketler: [sectorLabel, planLabel, theme(Koyu/Açık), "N bölüm", "N sayfa"]
    const bolumEtiketi = sablon.etiketler?.find(e => e.includes('bölüm'))
    const sayfaEtiketi = sablon.etiketler?.find(e => e.includes('sayfa'))

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
                        src={`/demolar/${sablon.id}`}
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
                <p className="text-white/60 text-[11px] line-clamp-1 leading-relaxed mb-2">
                    {sablon.aciklama}
                </p>
                {/* Bölüm & sayfa bilgisi */}
                {(bolumEtiketi || sayfaEtiketi) && (
                    <div className="flex items-center gap-3 text-white/25 text-[10px]">
                        {bolumEtiketi && (
                            <span className="flex items-center gap-1">
                                <Layers className="w-3 h-3" />
                                {bolumEtiketi}
                            </span>
                        )}
                        {sayfaEtiketi && <span>{sayfaEtiketi}</span>}
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
    const [sektorFiltre, setSektorFiltre] = useState('HEPSI')

    const filtrelenmisSablonlar = useMemo(() => {
        return UNIFIED_SABLONLAR.filter(s => {
            // Arama
            const aramaUygun = !arama ||
                s.ad.toLowerCase().includes(arama.toLowerCase()) ||
                s.aciklama.toLowerCase().includes(arama.toLowerCase()) ||
                s.etiketler?.some(e => e.toLowerCase().includes(arama.toLowerCase()))

            // Paket filtre
            const paketUygun = paketFiltre === 'HEPSI' || s.minPaket === paketFiltre

            // Sektör filtre — match by sector label in etiketler[0]
            const sektorUygun = sektorFiltre === 'HEPSI' || s.etiketler?.[0] === SEKTOR_FILTRE_SECENEKLERI.find(sf => sf.id === sektorFiltre)?.label

            return aramaUygun && paketUygun && sektorUygun
        })
    }, [arama, paketFiltre, sektorFiltre])

    const aktifFiltreSayisi = (paketFiltre !== 'HEPSI' ? 1 : 0) + (sektorFiltre !== 'HEPSI' ? 1 : 0)

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-24">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                        Hazır <span className="text-rust">Site Şablonları</span>
                    </h1>
                    <p className="text-base text-white/50 leading-relaxed mb-6">
                        40 sektör, 200 profesyonel tema. Canlı önizlemeye tıklayın, beğendiğinizi seçin.
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
                    {/* Sektör filtresi — dropdown */}
                    <div className="relative">
                        <select
                            value={sektorFiltre}
                            onChange={(e) => setSektorFiltre(e.target.value)}
                            className="appearance-none bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2 pr-8 text-xs font-semibold text-white/80 focus:outline-none focus:border-rust/50 transition-all cursor-pointer"
                            style={{ backgroundImage: 'none' }}
                        >
                            {SEKTOR_FILTRE_SECENEKLERI.map(sf => (
                                <option key={sf.id} value={sf.id} className="bg-[#1a1a1a] text-white">
                                    {sf.label} ({sf.count})
                                </option>
                            ))}
                        </select>
                        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 rotate-90 pointer-events-none" />
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

                    {/* Aktif filtre temizle */}
                    {aktifFiltreSayisi > 0 && (
                        <button
                            onClick={() => { setPaketFiltre('HEPSI'); setSektorFiltre('HEPSI'); setArama('') }}
                            className="text-rust/60 hover:text-rust text-xs font-medium transition-colors"
                        >
                            Temizle ({aktifFiltreSayisi})
                        </button>
                    )}

                    {/* Sonuç sayısı */}
                    <div className="ml-auto text-xs text-white/30">
                        {filtrelenmisSablonlar.length} / {UNIFIED_SABLONLAR.length} şablon
                    </div>
                </div>

                {/* Grid */}
                {filtrelenmisSablonlar.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filtrelenmisSablonlar.map(sablon => (
                                <SablonKarti key={sablon.id} sablon={sablon} onClick={() => setSeciliSablon(sablon)} />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <Info className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Şablon bulunamadı</h3>
                        <p className="text-white/50 mb-4">Arama kriterlerinize uygun şablon eşleşmedi.</p>
                        <button
                            onClick={() => { setArama(''); setPaketFiltre('HEPSI'); setSektorFiltre('HEPSI') }}
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
