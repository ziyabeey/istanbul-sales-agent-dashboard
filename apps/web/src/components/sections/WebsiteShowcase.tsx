'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface PaketData {
  id: string
  ad: string
  fiyat: string
  renk: string
  parlakRenk: string
  gradient: string
  aciklama: string
  moduller: { ad: string; ikon: string; kilitli?: boolean }[]
  siteOnizleme: {
    bg: string
    accent: string
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
    renk: '#64748b',
    parlakRenk: '#94a3b8',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    aciklama: 'Dijital varlık başlangıcı',
    moduller: [
      { ad: 'İletişim Formu', ikon: '📬' },
      { ad: 'Harita & Yol Tarifi', ikon: '🗺️' },
      { ad: 'Çalışma Saatleri', ikon: '⏰' },
      { ad: 'WhatsApp Canlı Chat', ikon: '💬' },
      { ad: 'Sosyal Medya', ikon: '📱' },
      { ad: 'Duyuru Bandı', ikon: '📣' },
      { ad: 'KVKK & Gizlilik', ikon: '🛡️' },
      { ad: 'Popüler Hizmetler', ikon: '⭐' },
      { ad: 'Google Yorumlar', ikon: '⭐', kilitli: true },
      { ad: 'Randevu Sistemi', ikon: '📅', kilitli: true },
    ],
    siteOnizleme: {
      bg: '#1e293b', accent: '#64748b',
      baslik: 'Elektrikçi Mehmet Usta', kategori: 'Elektrikçi',
      sayfalar: ['🏠 Ana Sayfa', '📋 Hizmetler', '📍 Konum', '📞 İletişim'],
    },
  },
  {
    id: 'STANDART',
    ad: 'Standart',
    fiyat: '₺1.799',
    renk: '#0ea5e9',
    parlakRenk: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0c1a2e 0%, #0f3460 100%)',
    aciklama: 'Müşteri güveni & dönüşüm',
    moduller: [
      { ad: 'Temel tüm modüller', ikon: '✅' },
      { ad: 'Google Yorumlar', ikon: '⭐' },
      { ad: 'Müşteri Referansları', ikon: '💬' },
      { ad: 'Kampanya Afişi', ikon: '📢' },
      { ad: 'Teklif Formu', ikon: '📩' },
      { ad: 'Hakkımızda Hikaye', ikon: '🏠' },
      { ad: 'Rakamlarla Biz', ikon: '📊' },
      { ad: 'Video Tanıtım', ikon: '🎥' },
      { ad: 'Randevu Sistemi', ikon: '📅', kilitli: true },
      { ad: 'Şantiye Günlüğü', ikon: '🏗️', kilitli: true },
    ],
    siteOnizleme: {
      bg: '#0c1a2e', accent: '#0ea5e9',
      baslik: 'Berber Salonu Kadıköy', kategori: 'Berber',
      sayfalar: ['🏠 Ana Sayfa', '💬 Yorumlar', '📢 Kampanya', '📅 Randevu'],
    },
  },
  {
    id: 'BUYUME',
    ad: 'Büyüme',
    fiyat: '₺2.999',
    renk: '#10b981',
    parlakRenk: '#34d399',
    gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
    aciklama: 'SEO & içerik büyütme',
    moduller: [
      { ad: 'Standart tüm modüller', ikon: '✅' },
      { ad: 'Blog & Makaleler', ikon: '📝' },
      { ad: 'E-posta Bülteni', ikon: '✉️' },
      { ad: 'Sertifika & Belgeler', ikon: '🏅' },
      { ad: 'Ekibimiz', ikon: '👥' },
      { ad: 'Önce/Sonra Slider', ikon: '🔄' },
      { ad: 'Randevu Sistemi', ikon: '📅' },
      { ad: 'Hizmet Bölgeleri', ikon: '📍' },
      { ad: 'Kariyer İlanları', ikon: '🚀', kilitli: true },
      { ad: 'Şantiye Günlüğü', ikon: '🏗️', kilitli: true },
    ],
    siteOnizleme: {
      bg: '#052e16', accent: '#10b981',
      baslik: 'Mimar Stüdyo İstanbul', kategori: 'Mimar',
      sayfalar: ['🏠 Ana Sayfa', '📝 Blog', '🏅 Sertifikalar', '👥 Ekip'],
    },
  },
  {
    id: 'PREMIUM',
    ad: 'Premium',
    fiyat: '₺4.999',
    renk: '#f59e0b',
    parlakRenk: '#fbbf24',
    gradient: 'linear-gradient(135deg, #1c1200 0%, #3d2a00 100%)',
    aciklama: 'Tam dijital güç',
    moduller: [
      { ad: 'Büyüme tüm modüller', ikon: '✅' },
      { ad: 'Randevu Sistemi (API)', ikon: '📅' },
      { ad: 'Şantiye Günlüğü', ikon: '🏗️' },
      { ad: 'Online Danışma', ikon: '💻' },
      { ad: 'Kariyer İlanları', ikon: '🚀' },
      { ad: 'Menü & QR Sistem', ikon: '📋' },
      { ad: 'Fiyat Hesaplayıcı', ikon: '🧮' },
      { ad: 'Nöbet Takvimi', ikon: '📆' },
      { ad: 'Tüm 57 Modül', ikon: '🧩' },
      { ad: 'Ücretsiz .com.tr Domain', ikon: '🌐' },
    ],
    siteOnizleme: {
      bg: '#1c1200', accent: '#f59e0b',
      baslik: 'Randevu & Güzellik Merkezi', kategori: 'Güzellik Merkezi',
      sayfalar: ['📅 Randevu', '🛍️ Hizmetler', '💬 Yorumlar', '🚀 Kariyer'],
    },
  },
]

function BrowserMockup({ paket, active }: { paket: PaketData; active: boolean }) {
  return (
    <div
      style={{
        transform: active ? 'perspective(800px) rotateY(-8deg) rotateX(3deg) scale(1)' : 'perspective(800px) rotateY(-12deg) rotateX(6deg) scale(0.92)',
        transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
        opacity: active ? 1 : 0.6,
        transformOrigin: 'center center',
        filter: active ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' : 'none',
      }}
      className="w-full max-w-sm mx-auto"
    >
      {/* Browser chrome */}
      <div style={{ background: '#1a1a1a', borderRadius: '12px 12px 0 0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ flex: 1, background: '#2a2a2a', borderRadius: 6, padding: '4px 10px', fontSize: 10, color: '#666', textAlign: 'center', fontFamily: 'monospace' }}>
          {paket.siteOnizleme.baslik.toLowerCase().replace(/\s+/g, '')}.kepenk.ai
        </div>
      </div>

      {/* Site preview */}
      <div style={{ background: paket.siteOnizleme.bg, borderRadius: '0 0 12px 12px', overflow: 'hidden', minHeight: 340 }}>
        {/* Nav */}
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${paket.siteOnizleme.accent}30` }}>
          <span style={{ color: paket.siteOnizleme.accent, fontWeight: 700, fontSize: 11 }}>
            {paket.siteOnizleme.kategori.toUpperCase()}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {paket.siteOnizleme.sayfalar.slice(0, 3).map((s, i) => (
              <span key={i} style={{ color: '#aaa', fontSize: 8 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div style={{ padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: paket.siteOnizleme.accent, opacity: 0.2, margin: '0 auto 8px' }} />
          <div style={{ fontWeight: 800, color: '#fff', fontSize: 13, marginBottom: 4 }}>{paket.siteOnizleme.baslik}</div>
          <div style={{ color: '#888', fontSize: 9, marginBottom: 16 }}>📍 İstanbul • 7/24 Hizmet</div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
            <div style={{ background: paket.siteOnizleme.accent, color: '#000', padding: '4px 10px', borderRadius: 6, fontSize: 8, fontWeight: 700 }}>📞 Ara</div>
            <div style={{ background: '#25d366', color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 8, fontWeight: 700 }}>💬 WhatsApp</div>
          </div>
        </div>

        {/* Fake module sections */}
        <div style={{ padding: '0 12px 16px', display: 'grid', gap: 6 }}>
          {[
            { label: paket.moduller[0].ad, h: 28 },
            { label: paket.moduller[1].ad, h: 20 },
          ].map((block, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '6px 10px', borderLeft: `2px solid ${paket.siteOnizleme.accent}` }}>
              <div style={{ fontSize: 7, color: paket.siteOnizleme.accent, fontWeight: 700 }}>{block.label}</div>
              <div style={{ height: block.h, background: 'rgba(255,255,255,0.04)', borderRadius: 3, marginTop: 4 }} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 16px', textAlign: 'center' }}>
          <span style={{ color: '#444', fontSize: 7 }}>powered by kepenk.ai</span>
        </div>
      </div>
    </div>
  )
}

export default function WebsiteShowcase() {
  const [aktifIndex, setAktifIndex] = useState(2) // Premium varsayılan
  const [gorunur, setGorunur] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setGorunur(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const aktif = PAKETLER[aktifIndex]

  return (
    <section ref={ref} className="py-24 bg-background overflow-hidden" id="website-ornekleri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık */}
        <div
          className="text-center mb-16"
          style={{ opacity: gorunur ? 1 : 0, transform: gorunur ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Canlı Önizleme</p>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Paketinize Göre <span className="text-rust">Web Siteniz</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Her paket farklı modüller içerir. Aşağıdan paket seçin ve sitenizin nasıl görüneceğini keşfedin.
          </p>
        </div>

        {/* Paket seçici tablar */}
        <div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          style={{ opacity: gorunur ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}
        >
          {PAKETLER.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setAktifIndex(i)}
              style={{
                background: aktifIndex === i ? p.parlakRenk : 'rgba(255,255,255,0.05)',
                color: aktifIndex === i ? (p.id === 'PREMIUM' ? '#000' : '#fff') : '#888',
                border: `1px solid ${aktifIndex === i ? p.parlakRenk : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.3s ease',
                transform: aktifIndex === i ? 'scale(1.05)' : 'scale(1)',
              }}
              className="px-4 py-2 rounded-full text-sm font-bold cursor-pointer"
            >
              {p.ad}
            </button>
          ))}
        </div>

        {/* Ana içerik: 3D browserlar + modül listesi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Sol: 3D stacked browser views */}
          <div
            style={{ opacity: gorunur ? 1 : 0, transform: gorunur ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 0.8s ease 0.3s' }}
            className="relative"
          >
            {/* Arka plandaki sahte katmanlar */}
            <div style={{
              position: 'absolute', inset: 0,
              transform: 'perspective(800px) rotateY(-12deg) rotateX(6deg) scale(0.82) translateY(60px) translateX(20px)',
              transformOrigin: 'center center',
              opacity: 0.25, borderRadius: 12,
              background: PAKETLER[(aktifIndex + 1) % PAKETLER.length].gradient,
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              transform: 'perspective(800px) rotateY(-10deg) rotateX(4deg) scale(0.9) translateY(30px) translateX(10px)',
              transformOrigin: 'center center',
              opacity: 0.4, borderRadius: 12,
              background: aktif.gradient,
              zIndex: 1,
            }} />

            {/* Aktif browser */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <BrowserMockup paket={aktif} active={true} />
            </div>

            {/* Glow efekti */}
            <div style={{
              position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
              width: 200, height: 80,
              background: aktif.parlakRenk,
              filter: 'blur(60px)',
              opacity: 0.2,
              borderRadius: '50%',
              zIndex: 0,
            }} />
          </div>

          {/* Sağ: Modül listesi + paket bilgisi */}
          <div
            style={{ opacity: gorunur ? 1 : 0, transform: gorunur ? 'translateX(0)' : 'translateX(50px)', transition: 'all 0.8s ease 0.4s' }}
          >
            {/* Paket badge */}
            <div className="flex items-center gap-3 mb-4">
              <span style={{ background: aktif.parlakRenk, color: aktif.id === 'PREMIUM' ? '#000' : '#fff' }}
                className="text-xs font-bold px-3 py-1 rounded-full">
                {aktif.ad} Paketi
              </span>
              <span style={{ color: aktif.parlakRenk }} className="text-2xl font-extrabold font-syne">
                {aktif.fiyat}<span className="text-sm text-muted-foreground font-normal">/ay</span>
              </span>
            </div>

            <p className="text-muted-foreground mb-6 text-sm">{aktif.aciklama}</p>

            {/* Modül listesi */}
            <div className="space-y-2 mb-8">
              <p className="text-foreground text-sm font-bold mb-3">Bu pakette dahil modüller:</p>
              <div className="grid grid-cols-1 gap-1.5">
                {aktif.moduller.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      background: m.kilitli ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${m.kilitli ? 'rgba(255,255,255,0.05)' : aktif.parlakRenk + '30'}`,
                      opacity: m.kilitli ? 0.4 : 1,
                      transition: 'all 0.2s ease',
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                  >
                    <span className="text-base">{m.ikon}</span>
                    <span className={`text-xs font-medium ${m.kilitli ? 'text-muted-foreground/60 line-through' : 'text-foreground'}`}>{m.ad}</span>
                    {m.kilitli && (
                      <span className="ml-auto text-xs text-muted-foreground/40">🔒 Üst Paket</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/onboarding"
              style={{ background: aktif.parlakRenk, color: aktif.id === 'PREMIUM' ? '#000' : '#fff' }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
            >
              {aktif.ad} Paketiyle Başla →
            </Link>
          </div>
        </div>

        {/* Alt bilgi */}
        <p className="text-center text-muted-foreground/50 text-xs mt-12">
          Tüm paketlerde 57 modülden seçim yapabilirsiniz. Sektörünüze göre önerilir.
        </p>
      </div>
    </section>
  )
}
