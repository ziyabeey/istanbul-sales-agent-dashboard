'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { DEMOLAR, KATEGORILER } from '@/data/demoVitrinData'
import { demoHtmlUret } from '@/utils/demoHtmlUretici'
import type { DemoKategori, DemoSector } from '@/data/demoVitrinData'

// ── Lazy iframe ──────────────────────────────────────────────────
function LazyIframe({ demo }: { demo: DemoSector }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [srcdoc, setSrcdoc] = useState<string | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) { 
          setShouldLoad(true)
          if (!demo.path) {
            setSrcdoc(demoHtmlUret(demo)) 
          }
          obs.unobserve(el) 
        } 
      },
      { rootMargin: '300px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [demo])

  return (
    <div ref={ref} className="relative w-full h-[240px] overflow-hidden bg-white">
      {!shouldLoad ? (
        <div className="w-full h-full animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
      ) : (
        <>
          {demo.path ? (
            <iframe
              src={demo.path} scrolling="no"
              onLoad={() => setLoaded(true)}
              style={{ width: 1440, height: 900, transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none', border: 'none', opacity: loaded ? 1 : 0.5, backgroundColor: 'white', transition: 'opacity 0.5s' }}
            />
          ) : (
            <iframe
              srcDoc={srcdoc || ''} scrolling="no" sandbox="allow-same-origin allow-scripts"
              onLoad={() => setLoaded(true)}
              style={{ width: 1440, height: 900, transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none', border: 'none', opacity: loaded ? 1 : 0, transition: 'opacity .5s', backgroundColor: 'white' }}
            />
          )}
          {!loaded && !demo.path && <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />}
        </>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-background/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-[.2em] text-foreground/50 bg-white/80 backdrop-blur-md px-3 py-1.5 border border-black/10 rounded-full shadow-lg">
          Canlı Önizleme
        </span>
      </div>
    </div>
  )
}

// ── Modal ────────────────────────────────────────────────────────
function DemoModal({ demo, onClose }: { demo: DemoSector; onClose: () => void }) {
  const [srcdoc] = useState(() => demo.path ? null : demoHtmlUret(demo))
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-xl flex items-center justify-center animate-[fadeIn_0.25s_ease]"
      onClick={onClose}
    >
      <div
        className="w-[92vw] h-[88vh] bg-background rounded-2xl overflow-hidden flex flex-col animate-[modalIn_0.3s_ease] border border-border/30 shadow-2xl shadow-ink/50"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-border/20 bg-card/50">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-bold px-3 py-1 rounded-full border"
              style={{ background: `${demo.accent}15`, color: demo.accent, borderColor: `${demo.accent}30` }}
            >
              {KATEGORILER[demo.kategori].ad}
            </span>
            <span className="font-syne font-bold text-foreground text-sm">{demo.ad}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/onboarding?sektor=${demo.id}`}
              className="bg-rust hover:bg-rust/90 text-foreground px-5 py-2 rounded-xl text-xs font-bold transition-colors"
            >
              Bu Sektörü Seç →
            </Link>
            <button
              className="w-9 h-9 rounded-xl border border-border/30 bg-transparent text-foreground/70 hover:bg-warm/20 hover:text-foreground text-sm cursor-pointer transition-all"
              onClick={onClose}
            >✕</button>
          </div>
        </div>
        {/* iframe */}
        <div className="flex-1 bg-white">
          {demo.path ? (
            <iframe src={demo.path} className="w-full h-full border-0" />
          ) : (
            <iframe srcDoc={srcdoc || ''} sandbox="allow-same-origin allow-scripts" className="w-full h-full border-0 bg-white" />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Card ─────────────────────────────────────────────────────────
function DemoCard({ demo, onPreview, index }: { demo: DemoSector; onPreview: (d: DemoSector) => void; index: number }) {
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
    <div
      ref={ref}
      onClick={() => onPreview(demo)}
      className="group bg-card border border-border/30 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rust/5 hover:border-rust/30 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all .6s cubic-bezier(.4,0,.2,1) ${(index % 6) * 80}ms`,
      }}
    >
      <LazyIframe demo={demo} />

      <div className="p-5">
        {/* Category Badge */}
        <span
          className="inline-block text-[10px] font-bold px-3 py-1 rounded-full border mb-3"
          style={{ background: `${demo.accent}10`, color: demo.accent, borderColor: `${demo.accent}25` }}
        >
          {KATEGORILER[demo.kategori].ad}
        </span>

        <h3 className="font-syne font-extrabold text-foreground text-lg mb-1 tracking-tight">{demo.ad}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">
          {demo.heroBaslik} — {demo.heroAlt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-gold text-xs">★★★★★</span>
            <span className="text-muted-foreground/40 text-[10px] ml-1">Hazır</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPreview(demo)}
              className="px-4 py-2 rounded-xl border border-border/40 bg-warm/10 text-foreground/80 text-xs font-semibold cursor-pointer transition-all hover:bg-warm/20 hover:text-foreground"
            >
              Önizle
            </button>
            <Link
              href={`/onboarding?sektor=${demo.id}`}
              className="px-4 py-2 rounded-xl bg-rust hover:bg-rust/90 text-foreground text-xs font-bold transition-colors"
            >
              Seç →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────
export default function VitrinPage() {
  const [kat, setKat] = useState<'tumu' | DemoKategori>('tumu')
  const [q, setQ] = useState('')
  const [qd, setQd] = useState('')
  const [sort, setSort] = useState<'default' | 'az' | 'kat'>('default')
  const [modal, setModal] = useState<DemoSector | null>(null)

  useEffect(() => { const t = setTimeout(() => setQd(q), 200); return () => clearTimeout(t) }, [q])
  const close = useCallback(() => setModal(null), [])

  let list = DEMOLAR.filter(d => {
    if (kat !== 'tumu' && d.kategori !== kat) return false
    if (qd) { const s = qd.toLowerCase(); return d.ad.toLowerCase().includes(s) || d.heroBaslik.toLowerCase().includes(s) }
    return true
  })
  if (sort === 'az') list = [...list].sort((a, b) => a.ad.localeCompare(b.ad, 'tr'))
  if (sort === 'kat') list = [...list].sort((a, b) => a.kategori.localeCompare(b.kategori))

  const counts: Record<string, number> = { tumu: DEMOLAR.length }
  Object.keys(KATEGORILER).forEach(k => { counts[k] = DEMOLAR.filter(d => d.kategori === k).length })

  return (
    <>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes modalIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
      `}</style>

      <div className="min-h-screen bg-background text-foreground font-lora">

        {/* ═══ HEADER ═══ */}
        <header className="sticky top-0 z-50 px-6 md:px-10 h-16 flex items-center justify-between bg-background/80 backdrop-blur-2xl border-b border-border/10">
          <Link href="/" className="font-syne font-black text-xl text-foreground tracking-tight">
            <span className="text-rust">K</span>EPENK<span className="text-rust text-sm font-normal">.ai</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <span className="bg-rust/10 border border-rust/20 text-rust text-[11px] font-bold px-4 py-1.5 rounded-full">
              ✨ {DEMOLAR.length} Hazır Şablon
            </span>
            <Link href="/fiyatlar" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              Fiyatlar
            </Link>
          </div>
          <Link
            href="/onboarding"
            className="bg-rust hover:bg-rust/90 text-foreground px-5 py-2.5 rounded-xl text-sm font-bold font-syne transition-colors shadow-lg shadow-rust/20"
          >
            Hemen Başla
          </Link>
        </header>

        {/* ═══ HERO ═══ */}
        <section className="text-center pt-20 pb-12 px-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-rust/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-[-60px] right-[20%] w-[300px] h-[300px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

          <h1 className="font-syne font-black text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] tracking-tight mb-6 relative">
            Sektörünüzü Seçin,<br />
            <span className="bg-gradient-to-r from-rust via-gold to-rust bg-clip-text text-transparent">
              Sitenizi Görün
            </span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10">
            {DEMOLAR.length} farklı sektör için profesyonel web sitesi şablonu. Beğendiğinizi seçin, AI dakikalar içinde sitenizi oluştursun.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Sektör ara… (restoran, avukat, kuaför)"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="w-full pl-11 pr-5 py-4 bg-card border border-border/30 rounded-2xl text-foreground text-sm outline-none focus:border-rust/50 focus:ring-2 focus:ring-rust/20 transition-all placeholder:text-muted-foreground/30"
            />
          </div>

          {/* Category Filters */}
          <div className="flex justify-center gap-2 flex-wrap max-w-3xl mx-auto">
            <button
              onClick={() => setKat('tumu')}
              className={`px-5 py-2 rounded-full text-xs font-bold font-syne transition-all ${
                kat === 'tumu'
                  ? 'bg-rust text-foreground shadow-md shadow-rust/20'
                  : 'bg-warm/10 text-muted-foreground/50 border border-border/20 hover:text-foreground/70 hover:border-border/40'
              }`}
            >
              Tümü ({counts.tumu})
            </button>
            {(Object.entries(KATEGORILER) as [DemoKategori, { ad: string; sayi: number }][]).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setKat(k)}
                className={`px-5 py-2 rounded-full text-xs font-bold font-syne transition-all ${
                  kat === k
                    ? 'bg-rust text-foreground shadow-md shadow-rust/20'
                    : 'bg-warm/10 text-muted-foreground/50 border border-border/20 hover:text-foreground/70 hover:border-border/40'
                }`}
              >
                {v.ad} ({counts[k]})
              </button>
            ))}
          </div>
        </section>

        {/* ═══ SORT ═══ */}
        <div className="flex justify-between items-center max-w-[1380px] mx-auto px-6 mb-5">
          <p className="text-muted-foreground/40 text-xs font-bold uppercase tracking-widest">
            {list.length} sonuç
          </p>
          <select
            className="bg-card border border-border/20 text-foreground/70 px-3 py-2 rounded-xl text-xs outline-none cursor-pointer focus:border-rust/30"
            value={sort}
            onChange={e => setSort(e.target.value as typeof sort)}
          >
            <option value="default">Varsayılan</option>
            <option value="az">A-Z</option>
            <option value="kat">Kategoriye Göre</option>
          </select>
        </div>

        {/* ═══ GRID ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-[1380px] mx-auto px-6 pb-24">
          {list.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-muted-foreground/30 text-sm font-syne">Bu sektör yakında ekleniyor</p>
            </div>
          ) : list.map((d, i) => <DemoCard key={d.id} demo={d} index={i} onPreview={setModal} />)}
        </div>

        {/* ═══ CTA BANNER ═══ */}
        <section className="bg-card border-t border-border/10 py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-foreground mb-4">
              Beğendiğiniz Şablonu Seçin,<br />
              <span className="text-rust">AI Sitenizi Kursun</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Onboarding sürecinde sektörünüzü seçin, birkaç soruyu yanıtlayın — yapay zeka dakikalar içinde sitenizi oluştursun.
            </p>
            <Link
              href="/onboarding"
              className="inline-block bg-rust hover:bg-rust/90 text-foreground px-8 py-4 rounded-2xl font-syne font-bold text-lg transition-colors shadow-xl shadow-rust/20"
            >
              Hemen Başla — Ücretsiz Dene 🚀
            </Link>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="text-center py-8 border-t border-border/10">
          <p className="text-muted-foreground/30 text-xs">
            © 2025 <span className="text-rust/50 font-bold">kepenk.ai</span> · Tüm demolar gerçek siteler gibi çalışır
          </p>
        </footer>
      </div>

      {modal && <DemoModal demo={modal} onClose={close} />}
    </>
  )
}
