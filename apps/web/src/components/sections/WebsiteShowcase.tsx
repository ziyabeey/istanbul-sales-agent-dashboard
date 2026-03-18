'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Lock, Globe, Code2, Layers, Cuboid, ArrowRight, Sparkles } from 'lucide-react'

interface PaketData {
  id: string
  ad: string
  fiyat: string
  accentColor: string
  accentBg: string
  accentBorder: string
  aciklama: string
  teknoloji: string
  teknolojiIkon: React.ReactNode
  moduller: { ad: string; ikon: React.ReactNode; kilitli?: boolean }[]
  siteOnizleme: {
    baslik: string
    kategori: string
    sayfalar: string[]
  }
}

const PAKETLER: PaketData[] = [
  {
    id: 'TEMEL',
    ad: 'Temel',
    fiyat: '₺999',
    accentColor: 'text-slate-600',
    accentBg: 'bg-slate-100',
    accentBorder: 'border-slate-200',
    aciklama: 'Dijital varlık başlangıcı',
    teknoloji: 'Statik HTML',
    teknolojiIkon: <Code2 className="w-4 h-4" />,
    moduller: [
      { ad: 'İletişim Formu', ikon: <Check className="w-4 h-4 text-sage" /> },
      { ad: 'Harita & Yol Tarifi', ikon: <Check className="w-4 h-4 text-sage" /> },
      { ad: 'Çalışma Saatleri', ikon: <Check className="w-4 h-4 text-sage" /> },
      { ad: 'WhatsApp Canlı Chat', ikon: <Check className="w-4 h-4 text-sage" /> },
      { ad: 'Sosyal Medya', ikon: <Check className="w-4 h-4 text-sage" /> },
      { ad: 'Duyuru Bandı', ikon: <Check className="w-4 h-4 text-sage" /> },
      { ad: 'KVKK & Gizlilik', ikon: <Check className="w-4 h-4 text-sage" /> },
      { ad: 'Popüler Hizmetler', ikon: <Check className="w-4 h-4 text-sage" /> },
      { ad: 'Google Yorumlar', ikon: <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />, kilitli: true },
      { ad: 'Randevu Sistemi', ikon: <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />, kilitli: true },
    ],
    siteOnizleme: {
      baslik: 'Elektrikçi Mehmet Usta', kategori: 'ELEKTRİKÇİ',
      sayfalar: ['Ana Sayfa', 'Hizmetler', 'Konum', 'İletişim'],
    },
  },
  {
    id: 'STANDART',
    ad: 'Standart',
    fiyat: '₺1.799',
    accentColor: 'text-sky-600',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    aciklama: 'Müşteri güveni & dönüşüm',
    teknoloji: 'Statik HTML+',
    teknolojiIkon: <Code2 className="w-4 h-4" />,
    moduller: [
      { ad: 'Temel tüm modüller', ikon: <Check className="w-4 h-4 text-sky-500" /> },
      { ad: 'Google Yorumlar', ikon: <Check className="w-4 h-4 text-sky-500" /> },
      { ad: 'Müşteri Referansları', ikon: <Check className="w-4 h-4 text-sky-500" /> },
      { ad: 'Kampanya Afişi', ikon: <Check className="w-4 h-4 text-sky-500" /> },
      { ad: 'Teklif Formu', ikon: <Check className="w-4 h-4 text-sky-500" /> },
      { ad: 'Hakkımızda Hikaye', ikon: <Check className="w-4 h-4 text-sky-500" /> },
      { ad: 'Rakamlarla Biz', ikon: <Check className="w-4 h-4 text-sky-500" /> },
      { ad: 'Video Tanıtım', ikon: <Check className="w-4 h-4 text-sky-500" /> },
      { ad: 'Randevu Sistemi', ikon: <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />, kilitli: true },
      { ad: 'Şantiye Günlüğü', ikon: <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />, kilitli: true },
    ],
    siteOnizleme: {
      baslik: 'Berber Salonu Kadıköy', kategori: 'BERBER',
      sayfalar: ['Ana Sayfa', 'Yorumlar', 'Kampanya', 'Randevu'],
    },
  },
  {
    id: 'BUYUME',
    ad: 'Büyüme',
    fiyat: '₺2.999',
    accentColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    aciklama: 'SEO & içerik büyütme',
    teknoloji: 'Next.js Dinamik',
    teknolojiIkon: <Layers className="w-4 h-4" />,
    moduller: [
      { ad: 'Standart tüm modüller', ikon: <Check className="w-4 h-4 text-emerald-500" /> },
      { ad: 'Blog & Makaleler', ikon: <Check className="w-4 h-4 text-emerald-500" /> },
      { ad: 'E-posta Bülteni', ikon: <Check className="w-4 h-4 text-emerald-500" /> },
      { ad: 'Sertifika & Belgeler', ikon: <Check className="w-4 h-4 text-emerald-500" /> },
      { ad: 'Ekibimiz', ikon: <Check className="w-4 h-4 text-emerald-500" /> },
      { ad: 'Önce/Sonra Slider', ikon: <Check className="w-4 h-4 text-emerald-500" /> },
      { ad: 'Randevu Sistemi', ikon: <Check className="w-4 h-4 text-emerald-500" /> },
      { ad: 'Hizmet Bölgeleri', ikon: <Check className="w-4 h-4 text-emerald-500" /> },
      { ad: 'Kariyer İlanları', ikon: <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />, kilitli: true },
      { ad: 'Şantiye Günlüğü', ikon: <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />, kilitli: true },
    ],
    siteOnizleme: {
      baslik: 'Mimar Stüdyo İstanbul', kategori: 'MİMAR',
      sayfalar: ['Ana Sayfa', 'Blog', 'Sertifikalar', 'Ekip'],
    },
  },
  {
    id: 'PREMIUM',
    ad: 'Premium',
    fiyat: '₺4.999',
    accentColor: 'text-amber-600',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    aciklama: 'Tam dijital güç',
    teknoloji: '3D & Parallax',
    teknolojiIkon: <Cuboid className="w-4 h-4" />,
    moduller: [
      { ad: 'Büyüme tüm modüller', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Randevu Sistemi (API)', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Şantiye Günlüğü', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Online Danışma', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Kariyer İlanları', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Menü & QR Sistem', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Fiyat Hesaplayıcı', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Nöbet Takvimi', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Tüm 57 Modül', ikon: <Check className="w-4 h-4 text-amber-500" /> },
      { ad: 'Ücretsiz .com.tr Domain', ikon: <Check className="w-4 h-4 text-amber-500" /> },
    ],
    siteOnizleme: {
      baslik: 'Randevu & Güzellik Merkezi', kategori: 'GÜZELLİK MERKEZİ',
      sayfalar: ['Randevu', 'Hizmetler', 'Yorumlar', 'Kariyer'],
    },
  },
]

function BrowserMockup({ paket, isActive }: { paket: PaketData; isActive: boolean }) {
  return (
    <motion.div
      animate={{
        rotateY: isActive ? -6 : -10,
        rotateX: isActive ? 2 : 5,
        scale: isActive ? 1 : 0.92,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="w-full max-w-[380px] mx-auto"
    >
      {/* Browser chrome - light theme */}
      <div className="bg-white rounded-t-2xl border border-b-0 border-foreground/10 px-4 py-3 flex items-center gap-2.5 shadow-sm">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-foreground/5 rounded-lg px-3 py-1 flex items-center gap-1.5">
          <Globe className="w-3 h-3 text-muted-foreground/50" />
          <span className="text-[10px] text-muted-foreground/60 font-mono truncate">
            {paket.siteOnizleme.baslik.toLowerCase().replace(/\s+/g, '').replace(/[ıİşŞçÇğĞüÜöÖ]/g, c => {
              const map: Record<string, string> = { 'ı':'i', 'İ':'i', 'ş':'s', 'Ş':'s', 'ç':'c', 'Ç':'c', 'ğ':'g', 'Ğ':'g', 'ü':'u', 'Ü':'u', 'ö':'o', 'Ö':'o' }
              return map[c] || c
            })}.kepenk.ai
          </span>
        </div>
      </div>

      {/* Site preview - light with accent */}
      <div className="bg-gradient-to-b from-white to-cream border border-t-0 border-foreground/10 rounded-b-2xl overflow-hidden shadow-lg">
        {/* Nav bar */}
        <div className="px-4 py-2.5 flex justify-between items-center border-b border-foreground/5">
          <span className={`font-bold text-[10px] tracking-widest ${paket.accentColor}`}>
            {paket.siteOnizleme.kategori}
          </span>
          <div className="flex gap-3">
            {paket.siteOnizleme.sayfalar.slice(0, 3).map((s, i) => (
              <span key={i} className="text-[8px] text-muted-foreground/50 font-medium">{s}</span>
            ))}
          </div>
        </div>

        {/* Hero area */}
        <div className="px-5 py-6 text-center">
          <div className={`w-10 h-10 rounded-full ${paket.accentBg} mx-auto mb-2.5 flex items-center justify-center`}>
            {paket.teknolojiIkon}
          </div>
          <div className="font-bold text-foreground text-[13px] mb-1">{paket.siteOnizleme.baslik}</div>
          <div className="text-muted-foreground/60 text-[9px] mb-4">📍 İstanbul • 7/24 Hizmet</div>
          <div className="flex gap-2 justify-center">
            <div className={`${paket.accentBg} ${paket.accentColor} px-3 py-1 rounded-lg text-[8px] font-bold`}>📞 Ara</div>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[8px] font-bold">💬 WhatsApp</div>
          </div>
        </div>

        {/* Module preview blocks */}
        <div className="px-3 pb-3 space-y-1.5">
          {paket.moduller.slice(0, 2).map((m, i) => (
            <div
              key={i}
              className={`rounded-lg px-3 py-2 ${paket.accentBg} border ${paket.accentBorder}`}
            >
              <div className={`text-[7px] ${paket.accentColor} font-bold`}>{m.ad}</div>
              <div className="h-4 bg-foreground/5 rounded mt-1" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-foreground/5 px-4 py-2 text-center">
          <span className="text-muted-foreground/30 text-[7px] tracking-wide">powered by KPNK</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function WebsiteShowcase() {
  const [aktifIndex, setAktifIndex] = useState(2) // Büyüme varsayılan
  const aktif = PAKETLER[aktifIndex]

  return (
    <section className="py-24 bg-background overflow-hidden" id="website-ornekleri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-3">Canlı Önizleme</p>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Paketinize Göre <span className="text-primary">Web Siteniz</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Her paket farklı modüller içerir. Aşağıdan paket seçin ve sitenizin nasıl görüneceğini keşfedin.
          </p>
        </motion.div>

        {/* Paket seçici tablar — light theme */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-2 mb-14 flex-wrap"
        >
          {PAKETLER.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setAktifIndex(i)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-bold font-syne transition-all duration-300 border ${
                aktifIndex === i
                  ? `${p.accentBg} ${p.accentColor} ${p.accentBorder} shadow-sm scale-105`
                  : 'bg-white text-muted-foreground border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5'
              }`}
            >
              {aktifIndex === i && (
                <motion.div
                  layoutId="showcase-tab"
                  className={`absolute inset-0 ${p.accentBg} rounded-full ${p.accentBorder} border`}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{p.ad}</span>
            </button>
          ))}
        </motion.div>

        {/* Ana içerik: 3D browser + modül listesi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Sol: 3D browser mockup */}
          <div className="relative">
            {/* Shadow layers behind */}
            <div
              className="absolute inset-0 bg-foreground/5 rounded-3xl blur-2xl scale-95 translate-y-8"
              style={{ zIndex: 0 }}
            />
            <div
              className="absolute inset-0 bg-foreground/3 rounded-3xl blur-xl scale-90 translate-y-12"
              style={{ zIndex: 0 }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={aktif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <BrowserMockup paket={aktif} isActive={true} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sağ: Paket bilgisi + modüller */}
          <AnimatePresence mode="wait">
            <motion.div
              key={aktif.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* Paket badge + fiyat */}
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-bold font-syne px-3 py-1.5 rounded-full ${aktif.accentBg} ${aktif.accentColor} ${aktif.accentBorder} border`}>
                  {aktif.ad} Paketi
                </span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-extrabold font-syne ${aktif.accentColor}`}>
                    {aktif.fiyat}
                  </span>
                  <span className="text-sm text-muted-foreground">/ay</span>
                </div>
              </div>

              {/* Teknoloji badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${aktif.accentBg} ${aktif.accentBorder} border`}>
                  {aktif.teknolojiIkon}
                  <span className={`text-xs font-bold ${aktif.accentColor}`}>{aktif.teknoloji}</span>
                </div>
                <p className="text-muted-foreground text-sm">{aktif.aciklama}</p>
              </div>

              {/* Modül listesi */}
              <div className="mb-8">
                <p className="text-foreground text-sm font-bold font-syne mb-4">Bu pakette dahil modüller:</p>
                <div className="grid grid-cols-1 gap-1">
                  {aktif.moduller.map((m, i) => (
                    <motion.div
                      key={`${aktif.id}-${i}`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-colors ${
                        m.kilitli
                          ? 'bg-foreground/[0.02] border-foreground/5 opacity-50'
                          : `bg-white ${aktif.accentBorder} hover:shadow-sm`
                      }`}
                    >
                      <span className="shrink-0">{m.ikon}</span>
                      <span className={`text-sm font-medium ${
                        m.kilitli ? 'text-muted-foreground/60 line-through' : 'text-foreground'
                      }`}>
                        {m.ad}
                      </span>
                      {m.kilitli && (
                        <span className="ml-auto text-xs text-muted-foreground/40 font-medium">Üst Paket</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/onboarding"
                className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold font-syne text-sm transition-all hover:scale-105 shadow-lg ${
                  aktif.id === 'PREMIUM'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-foreground shadow-amber-500/20'
                    : aktif.id === 'BUYUME'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/20'
                    : aktif.id === 'STANDART'
                    ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-sky-500/20'
                    : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-slate-600/20'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {aktif.ad} Paketiyle Başla
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Alt bilgi */}
        <p className="text-center text-muted-foreground/50 text-xs mt-16">
          Tüm paketlerde 57 modülden seçim yapabilirsiniz. Sektörünüze göre önerilir.
        </p>
      </div>
    </section>
  )
}
