'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { THEME_CATALOG_ARRAY } from '@kepenk/templates/src/registry/theme-catalog'
import { THEME_MAP } from '@kepenk/templates/src/registry/theme-map'
import { isRetiredDemo } from '@/data/sablonlar/curation'

export type DemoKategori = 'yerel-esnaf' | 'profesyonel' | 'saglik-guzellik' | 'etkinlik' | 'diger'
export const KATEGORILER: Record<DemoKategori, { ad: string; sayi: number }> = {
  'yerel-esnaf': { ad: 'Yerel Esnaf', sayi: 0 },
  'profesyonel': { ad: 'Profesyonel', sayi: 0 },
  'saglik-guzellik': { ad: 'Sağlık & Güzellik', sayi: 0 },
  'etkinlik': { ad: 'Etkinlik', sayi: 0 },
  'diger': { ad: 'Diğer', sayi: 0 },
}

const CATEGORY_MAP: Record<string, DemoKategori> = {
  berber: 'yerel-esnaf', restoran: 'yerel-esnaf', oto: 'yerel-esnaf', firin: 'yerel-esnaf', elektrikci: 'yerel-esnaf', tesisatci: 'yerel-esnaf', kafe: 'yerel-esnaf', asansor: 'yerel-esnaf', boyaci: 'yerel-esnaf',
  doktor: 'saglik-guzellik', guzellik: 'saglik-guzellik', disci: 'saglik-guzellik', eczane: 'saglik-guzellik', veteriner: 'saglik-guzellik', klinik: 'saglik-guzellik',
  avukat: 'profesyonel', muhasebeci: 'profesyonel', mimarlik: 'profesyonel', emlakci: 'profesyonel', hukuk: 'profesyonel',
  dugun: 'etkinlik', fotografci: 'etkinlik', muzik: 'etkinlik',
}
interface VitrinItem {
  key: string
  ad: string
  kategori: DemoKategori
  path: string
  sektorLabel: string
  accent: string
  bg: string
  text: string
  tier: string
  sektorId: string
  font: string
  heroBaslik: string
}

const SECTOR_STYLE: Record<string, { accent: string; bg: string; text: string; font: string }> = {
  'berber':      { accent: '#b8960c', bg: '#0d0d0d', text: '#f2f2f2', font: 'Bebas Neue' },
  'restoran':    { accent: '#c2440e', bg: '#1e0f05', text: '#f5ede0', font: 'Cormorant Garamond' },
  'doktor':      { accent: '#4db8d4', bg: '#f4fbfc', text: '#1a3a4a', font: 'Outfit' },
  'guzellik':    { accent: '#d4709a', bg: '#fdf8f9', text: '#2d1527', font: 'Cormorant' },
  'avukat':      { accent: '#c9a84c', bg: '#f5f4f0', text: '#1c2b3a', font: 'Libre Baskerville' },
  'disci':       { accent: '#00c9a7', bg: '#f0fbf9', text: '#0d4f7c', font: 'Poppins' },
  'oto':         { accent: '#e63946', bg: '#111111', text: '#f5f5f5', font: 'Barlow Condensed' },
  'spor':        { accent: '#ff3c00', bg: '#0a0a0a', text: '#ffffff', font: 'Anton' },
  'kafe':        { accent: '#c2773a', bg: '#faf4ed', text: '#2c1a0e', font: 'Playfair Display' },
  'firin':       { accent: '#e8a030', bg: '#fffdf7', text: '#3b2507', font: 'Abril Fatface' },
  'eczane':      { accent: '#00897b', bg: '#f1fffe', text: '#004d40', font: 'Nunito' },
  'veteriner':   { accent: '#f4a261', bg: '#fff8f2', text: '#1b3a4b', font: 'Nunito' },
  'fotografci':  { accent: '#ff6b35', bg: '#111111', text: '#f5f5f5', font: 'Oswald' },
  'dugun':       { accent: '#a855f7', bg: '#1a0a2e', text: '#f5f3ff', font: 'Playfair Display' },
  'elektrikci':  { accent: '#f5a623', bg: '#0a0a1a', text: '#e8e8f0', font: 'Rajdhani' },
  'tesisatci':   { accent: '#f5a623', bg: '#0a0a1a', text: '#e8e8f0', font: 'Rajdhani' },
  'muhasebeci':  { accent: '#2d8653', bg: '#f0f4f8', text: '#0f2044', font: 'Montserrat' },
  'emlakci':     { accent: '#d4af37', bg: '#f9f7f2', text: '#1b2838', font: 'Playfair Display' },
  'ozelders':    { accent: '#4f46e5', bg: '#f0f4ff', text: '#1a2744', font: 'Nunito' },
  'kuyumcu':     { accent: '#d4af37', bg: '#050505', text: '#f5f5f5', font: 'Playfair Display' },
  'mimarlik':    { accent: '#c07941', bg: '#f5f0eb', text: '#1a1a1a', font: 'Syne' },
  'hukuk':       { accent: '#c9a84c', bg: '#f5f4f0', text: '#1c2b3a', font: 'Libre Baskerville' },
  'insaat':      { accent: '#0284c7', bg: '#f0f8ff', text: '#0c4a6e', font: 'Raleway' },
  'klinik':      { accent: '#4db8d4', bg: '#f4fbfc', text: '#1a3a4a', font: 'Outfit' },
  'fitness':     { accent: '#ff3c00', bg: '#0a0a0a', text: '#ffffff', font: 'Anton' },
  'temizlik':    { accent: '#22c55e', bg: '#f0fdf4', text: '#14532d', font: 'Nunito' },
  'terzi':       { accent: '#c9a84c', bg: '#f8f5f0', text: '#1e1b2e', font: 'Libre Baskerville' },
  'cicekci':     { accent: '#c9856a', bg: '#f9f5f0', text: '#1a2e1c', font: 'Gilda Display' },
  'muzik':       { accent: '#7c3aed', bg: '#0a0a0f', text: '#f0e6ff', font: 'Space Grotesk' },
  'cilingir':    { accent: '#e63946', bg: '#111111', text: '#f5f5f5', font: 'Outfit' },
  'nakliyat':    { accent: '#f59e0b', bg: '#1a0f05', text: '#fef3c7', font: 'Barlow Condensed' },
  'mobilyaci':   { accent: '#8b6f47', bg: '#f7f3ee', text: '#2a1f14', font: 'Fraunces' },
  'asansor':     { accent: '#0ea5e9', bg: '#f8fafc', text: '#0f172a', font: 'Outfit' },
  'boyaci':      { accent: '#d97706', bg: '#fdf6e3', text: '#451a03', font: 'Outfit' },
  'cambalkon':   { accent: '#0284c7', bg: '#f0f9ff', text: '#0c4a6e', font: 'Raleway' },
  'kargo':       { accent: '#0284c7', bg: '#f0f8ff', text: '#0c4a6e', font: 'Exo 2' },
  'kres':        { accent: '#f59e0b', bg: '#fffdf7', text: '#3b2507', font: 'Nunito' },
  'lastikci':    { accent: '#e63946', bg: '#111111', text: '#f5f5f5', font: 'Barlow Condensed' },
  'matbaa':      { accent: '#003049', bg: '#eae2b7', text: '#1a1a1a', font: 'Space Mono' },
  'organik':     { accent: '#22c55e', bg: '#f0fdf4', text: '#14532d', font: 'Quicksand' },
  'peyzaj':      { accent: '#22c55e', bg: '#f0fdf4', text: '#14532d', font: 'Nunito' },
  'otoyikama':   { accent: '#38bdf8', bg: '#0c1a2e', text: '#e0f2fe', font: 'Exo 2' },
  'haliyikama':  { accent: '#22c55e', bg: '#f0fdf4', text: '#14532d', font: 'Nunito' },
}

const SECTOR_ICONS: Record<string, string> = {
  'berber':'✂️','restoran':'🍽️','doktor':'🩺','guzellik':'💄','avukat':'⚖️','disci':'🦷',
  'oto':'🔧','spor':'💪','kafe':'☕','firin':'🧁','eczane':'💊','veteriner':'🐾',
  'fotografci':'📷','dugun':'💍','elektrikci':'⚡','tesisatci':'🔩','muhasebeci':'📊',
  'emlakci':'🏠','ozelders':'📚','kuyumcu':'💎','mimarlik':'📐','hukuk':'⚖️',
  'insaat':'🏗️','klinik':'🏥','fitness':'🏋️','temizlik':'🧹','terzi':'🧵',
  'cicekci':'🌸','muzik':'🎵','cilingir':'🔑','nakliyat':'🚛','mobilyaci':'🛋️',
  'asansor':'🛗','boyaci':'🎨','cambalkon':'🪟','kargo':'📦','kres':'👶',
  'lastikci':'🛞','matbaa':'🖨️','organik':'🌿','peyzaj':'🌳','otoyikama':'🚗',
  'haliyikama':'🧼',
}

function slugToTier(slug: string, prefix: string): string {
  const suffix = slug.replace(prefix + '-', '')
  const map: Record<string, string> = {
    'sade':'Sade','klasik':'Klasik','modern':'Modern','prestij':'Prestij',
    'elite':'Elite','lux':'Lux','vip':'VIP','kurumsal':'Kurumsal',
    'ev':'Entry','ofis':'Pro','premium':'Premium',
  }
  return map[suffix] || suffix.charAt(0).toUpperCase() + suffix.slice(1)
}

export function buildItems(): VitrinItem[] {
  return THEME_CATALOG_ARRAY
    .filter(theme => Object.hasOwn(THEME_MAP, theme.id) && !isRetiredDemo(theme.id))
    .map(theme => {
    // Basic tier extraction from plan names
    const planMap: Record<string, string> = {
      'free': 'Sade', 'starter': 'Klasik', 'growth': 'Modern', 'pro': 'Prestij', 'enterprise': 'Kurumsal', 'elite': 'VIP'
    }
    const tier = planMap[theme.plan] || 'Standart'
    
    // Convert isDark + accentColor to hex colors for Swatch
    const bg = theme.isDark ? '#0a0a0a' : '#f8f8f8'
    const text = theme.isDark ? '#fafafa' : '#111111'
    const accent = theme.accentColor || '#3b82f6'

    return {
      key: theme.id,
      ad: theme.name,
      kategori: CATEGORY_MAP[theme.sectorId] || 'diger',
      path: `/demolar/${theme.id}`,
      sektorLabel: theme.sectorLabel,
      accent,
      bg,
      text,
      tier,
      sektorId: theme.sectorId,
      font: theme.fonts?.heading || 'Inter',
      heroBaslik: `${SECTOR_ICONS[theme.sectorId] || '🏢'} ${theme.sectorLabel}`,
    }
  })
}

const ALL_ITEMS = buildItems()

// ── Static Color Swatch Card (NO iframe — instant rendering) ──
function SwatchPreview({ item }: { item: VitrinItem }) {
  const isDark = (() => {
    const hex = item.bg.replace('#', '')
    if (hex.length < 6) return false
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return (r * 0.299 + g * 0.587 + b * 0.114) < 128
  })()

  return (
    <div
      className="relative w-full h-[180px] overflow-hidden flex flex-col items-center justify-center"
      style={{ background: item.bg }}
    >
      {/* Decorative accent band */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: item.accent }} />
      
      {/* Mock nav */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between opacity-50">
        <span className="text-[8px] font-bold tracking-wide" style={{ color: item.text }}>
          {item.sektorLabel.split(' ')[0]}<span style={{ color: item.accent }}>.</span>
        </span>
        <div className="flex gap-2">
          {['Anasayfa', 'Hizmetler', 'İletişim'].map(t => (
            <span key={t} className="text-[6px]" style={{ color: `${item.text}80` }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Hero mockup */}
      <span className="text-3xl mb-1">{SECTOR_ICONS[item.sektorId] || '🏢'}</span>
      <span
        className="text-sm font-bold tracking-tight text-center px-4 leading-tight"
        style={{ color: item.text, fontFamily: `'${item.font}', sans-serif` }}
      >
        {item.sektorLabel}
      </span>
      <span className="text-[8px] mt-1 opacity-50" style={{ color: item.text }}>
        {item.tier} Tier
      </span>

      {/* CTA mockup */}
      <div className="flex gap-2 mt-3">
        <span
          className="text-[7px] px-3 py-1 rounded-md font-bold"
          style={{ background: item.accent, color: '#fff' }}
        >
          Randevu Al
        </span>
        <span
          className="text-[7px] px-3 py-1 rounded-md font-bold border"
          style={{ borderColor: item.accent, color: item.accent }}
        >
          Bizi Arayın
        </span>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 w-full h-8"
        style={{ background: `linear-gradient(transparent, ${item.bg})` }}
      />
    </div>
  )
}

// ── Card ──
function DemoCard({ item, index }: { item: VitrinItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Link href={item.path} prefetch={false}>
      <div
        ref={ref}
        className="group bg-card border border-border/30 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 cursor-pointer"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: `all .6s cubic-bezier(.4,0,.2,1) ${(index % 8) * 60}ms`,
        }}
      >
        <SwatchPreview item={item} />

        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span
              className="inline-block text-[9px] font-bold px-2.5 py-0.5 rounded-full border"
              style={{ background: `${item.accent}10`, color: item.accent, borderColor: `${item.accent}25` }}
            >
              {item.sektorLabel}
            </span>
            <span className="inline-block text-[8px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {item.tier}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-gold text-[10px]">★★★★★</span>
            <span className="px-3 py-1 rounded-lg bg-primary hover:bg-primary/90 text-white text-[9px] font-bold transition-colors">
              Canlı Demo →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Main ──
export default function VitrinPage() {
  const [kat, setKat] = useState<'tumu' | DemoKategori>('tumu')
  const [q, setQ] = useState('')
  const [qd, setQd] = useState('')
  const [sort, setSort] = useState<'default' | 'az' | 'sektor'>('default')

  useEffect(() => { const t = setTimeout(() => setQd(q), 200); return () => clearTimeout(t) }, [q])

  let list = ALL_ITEMS.filter(d => {
    if (kat !== 'tumu' && d.kategori !== kat) return false
    if (qd) { const s = qd.toLowerCase(); return d.ad.toLowerCase().includes(s) || d.sektorLabel.toLowerCase().includes(s) || d.key.toLowerCase().includes(s) }
    return true
  })
  if (sort === 'az') list = [...list].sort((a, b) => a.ad.localeCompare(b.ad, 'tr'))
  if (sort === 'sektor') list = [...list].sort((a, b) => a.sektorLabel.localeCompare(b.sektorLabel, 'tr'))

  const counts: Record<string, number> = { tumu: ALL_ITEMS.length }
  const katKeys: DemoKategori[] = ['yerel-esnaf', 'profesyonel', 'saglik-guzellik', 'etkinlik']
  katKeys.forEach(k => { counts[k] = ALL_ITEMS.filter(d => d.kategori === k).length })

  return (
    <>
      <div className="min-h-screen bg-background text-foreground font-lora">

        {/* ═══ HEADER ═══ */}
        <header className="sticky top-0 z-50 px-6 md:px-10 h-16 flex items-center justify-between bg-background/80 backdrop-blur-2xl border-b border-border/10">
          <Link href="/" className="font-syne font-black text-xl text-foreground tracking-tight">
            <span className="text-rust">K</span>EPENK<span className="text-rust text-sm font-normal">.ai</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <span className="bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold px-4 py-1.5 rounded-full">
              {ALL_ITEMS.length} Hazır Şablon
            </span>
            <Link href="/fiyatlar" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              Fiyatlar
            </Link>
          </div>
          <Link
            href="/onboarding"
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-syne transition-colors shadow-lg shadow-primary/20"
          >
            Hemen Başla
          </Link>
        </header>

        {/* ═══ HERO ═══ */}
        <section className="text-center pt-16 pb-10 px-6 relative overflow-hidden">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <h1 className="font-syne font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight mb-5 relative">
            {ALL_ITEMS.length}+ Hazır Demo,<br />
            <span className="bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
              {new Set(ALL_ITEMS.map(d => d.sektorId)).size} Sektör
            </span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed mb-8">
            Her sektöre özel 5 farklı tasarım seviyesi. Birini seçin, tıklayın ve canlı demoyu görün.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Sektör ara… (restoran, avukat, kuaför, emlak)"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 bg-card border border-border/30 rounded-2xl text-foreground text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
            />
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-2 flex-wrap max-w-3xl mx-auto">
            <button
              onClick={() => setKat('tumu')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-syne transition-all ${
                kat === 'tumu'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-warm/10 text-muted-foreground/50 border border-border/20 hover:text-foreground/70'
              }`}
            >
              Tümü ({counts.tumu})
            </button>
            {katKeys.map(k => (
              <button
                key={k}
                onClick={() => setKat(k)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-syne transition-all ${
                  kat === k
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-warm/10 text-muted-foreground/50 border border-border/20 hover:text-foreground/70'
                }`}
              >
                {KATEGORILER[k].ad} ({counts[k] || 0})
              </button>
            ))}
          </div>
        </section>

        {/* ═══ SORT ═══ */}
        <div className="flex justify-between items-center max-w-[1500px] mx-auto px-6 mb-4">
          <p className="text-muted-foreground/40 text-xs font-bold uppercase tracking-widest">
            {list.length} sonuç
          </p>
          <select
            className="bg-card border border-border/20 text-foreground/70 px-3 py-2 rounded-xl text-xs outline-none cursor-pointer"
            value={sort}
            onChange={e => setSort(e.target.value as typeof sort)}
          >
            <option value="default">Varsayılan</option>
            <option value="az">A-Z</option>
            <option value="sektor">Sektöre Göre</option>
          </select>
        </div>

        {/* ═══ GRID ═══ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-[1500px] mx-auto px-6 pb-20">
          {list.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-muted-foreground/30 text-sm font-syne">Sonuç bulunamadı</p>
            </div>
          ) : list.map((d, i) => <DemoCard key={d.key} item={d} index={i} />)}
        </div>

        {/* ═══ CTA ═══ */}
        <section className="bg-card border-t border-border/10 py-14 px-6 text-center">
          <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-foreground mb-3">
            Beğendiğiniz Şablonu Seçin,{' '}
            <span className="text-primary">AI Sitenizi Kursun</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Birkaç soruyu yanıtlayın — yapay zeka dakikalar içinde sitenizi oluştursun.
          </p>
          <Link
            href="/onboarding"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-syne font-bold text-lg transition-colors shadow-xl shadow-primary/20"
          >
            Hemen Başla — Ücretsiz Dene 🚀
          </Link>
        </section>

        <footer className="text-center py-6 border-t border-border/10">
          <p className="text-muted-foreground/30 text-xs">
            © 2025 <span className="text-primary/50 font-bold">kepenk.ai</span> · {ALL_ITEMS.length} hazır demo · {new Set(ALL_ITEMS.map(d => d.sektorId)).size} sektör
          </p>
        </footer>
      </div>
    </>
  )
}
