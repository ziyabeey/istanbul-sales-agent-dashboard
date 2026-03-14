'use client'

import { useState, useEffect, useRef } from 'react'
import { MODULLER } from '@/data/moduller'
import type { Modul } from '@/data/moduller'
import Link from 'next/link'

const PAKET_SIRASI = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'] as const
const PAKET_RENK: Record<string, string> = {
  TEMEL: '#64748b',
  STANDART: '#0ea5e9',
  BUYUME: '#10b981',
  PREMIUM: '#f59e0b',
  PREMIUMPLUS: '#a855f7',
}
const PAKET_ETIKET: Record<string, string> = {
  TEMEL: 'Temel',
  STANDART: 'Standart',
  BUYUME: 'Büyüme',
  PREMIUM: 'Premium',
  PREMIUMPLUS: 'Premium+',
}

const KATEGORI_IKONU: Record<string, string> = {
  iletisim: '📬', konum: '🗺️', takvim: '⏰', sosyal: '📱', buton: '🔘',
  yasal: '🛡️', hizmet: '⭐', guven: '💬', yorum: '⭐', kampanya: '📢',
  form: '📩', hikaye: '🏠', istatistik: '📊', video: '🎥', sertifika: '🏅',
  duyuru: '📣', bulten: '✉️', kvkk: '🛡️', cerez: '🍪', blog: '📝',
  kariyer: '🚀', odeme: '💳', anket: '📊', sayac: '⏱️', urun: '🛒',
  kupon: '🎟️', surec: '🗺️', randevu: '📅', menu: '📋', galeri: '🖼️',
}

function modulKategori(m: Modul): string {
  const id = m.id
  if (id.includes('randevu')) return 'Randevu'
  if (id.includes('galeri') || id.includes('oncesi')) return 'Medya'
  if (id.includes('menu') || id.includes('siparis') || id.includes('qr')) return 'Yemek'
  if (id.includes('iletisim') || id.includes('canli-destek') || id.includes('whatsapp')) return 'İletişim'
  if (id.includes('harita') || id.includes('bolge')) return 'Konum'
  if (id.includes('kampanya') || id.includes('indirim') || id.includes('kupon')) return 'Kampanya'
  if (id.includes('yorum') || id.includes('referans') || id.includes('anket')) return 'Güven'
  if (id.includes('blog') || id.includes('video') || id.includes('hakkimizda')) return 'İçerik'
  if (id.includes('kvkk') || id.includes('cerez') || id.includes('gizlilik')) return 'Yasal'
  if (id.includes('paket') || id.includes('uyelik') || id.includes('odeme')) return 'Ödeme'
  if (id.includes('santiye') || id.includes('proje') || id.includes('portfoy')) return 'Proje'
  if (id.includes('form') || id.includes('teklif') || id.includes('kayit')) return 'Form'
  if (id.includes('surec') || id.includes('haritasi') || id.includes('ekip')) return 'İşletme'
  return 'Diğer'
}

const TUM_KATEGORILER = ['Tümü', 'İletişim', 'Güven', 'Kampanya', 'İçerik', 'Konum', 'Form', 'Medya', 'Yasal', 'Ödeme', 'Randevu', 'İşletme', 'Yemek', 'Proje', 'Diğer']
const TUM_PAKETLER = ['Tümü', 'TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS']

function ModulKarti({ modul, onClick }: { modul: Modul; onClick: () => void }) {
  const renk = PAKET_RENK[modul.minPaket] || '#666'
  return (
    <div
      onClick={onClick}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseOver={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = 'rgba(255,255,255,0.07)'
        el.style.borderColor = renk + '60'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseOut={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = 'rgba(255,255,255,0.04)'
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Glow accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: renk, opacity: 0.6, borderRadius: '16px 16px 0 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: renk + '20',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          {modulKategori(modul) === 'İletişim' ? '📬' :
            modulKategori(modul) === 'Güven' ? '💬' :
            modulKategori(modul) === 'Kampanya' ? '📢' :
            modulKategori(modul) === 'İçerik' ? '📝' :
            modulKategori(modul) === 'Konum' ? '🗺️' :
            modulKategori(modul) === 'Form' ? '📋' :
            modulKategori(modul) === 'Medya' ? '🖼️' :
            modulKategori(modul) === 'Yasal' ? '🛡️' :
            modulKategori(modul) === 'Ödeme' ? '💳' :
            modulKategori(modul) === 'Randevu' ? '📅' :
            modulKategori(modul) === 'İşletme' ? '🏢' :
            modulKategori(modul) === 'Yemek' ? '🍽️' :
            modulKategori(modul) === 'Proje' ? '🏗️' : '🧩'}
        </div>
        <span style={{
          background: renk + '20',
          color: renk,
          padding: '3px 8px',
          borderRadius: 8,
          fontSize: 10,
          fontWeight: 700,
        }}>
          {PAKET_ETIKET[modul.minPaket]}
        </span>
      </div>

      <h3 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 6px' }}>{modul.ad}</h3>
      <p style={{ color: '#888', fontSize: '0.75rem', margin: '0 0 12px', lineHeight: 1.5 }}>{modul.aciklama}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#555', fontSize: '0.7rem' }}>{modulKategori(modul)}</span>
        <span style={{ color: renk, fontSize: '0.75rem', fontWeight: 600 }}>
          {modul.htmlSablon ? '✨ Hazır şablon' : '🤖 AI üretir'}
        </span>
      </div>
    </div>
  )
}

function ModulModal({ modul, onKapat }: { modul: Modul; onKapat: () => void }) {
  const renk = PAKET_RENK[modul.minPaket] || '#666'
  const demoHtml = modul.htmlSablon
    ? modul.htmlSablon
        .replace(/:root\{[^}]*\}/g, '')
        .replace(/ISLETME_ADI/g, 'Örnek İşletme')
        .replace(/WHATSAPP_NUMARA/g, '5551234567')
        .replace(/ESNAF_ID/g, 'ornek')
        .replace(/KEPENK_API_URL/g, 'https://kepenk.ai')
        .replace(/TELEFON/g, '5551234567')
        .replace(/ADRES_METNI/g, 'Kadıköy, İstanbul')
        .replace(/HARITA_QUERY/g, 'Kadıköy+İstanbul')
        .replace(/GMB_LINK/g, '#')
        .replace(/INSTAGRAM_URL/g, '#')
        .replace(/FACEBOOK_URL/g, '#')
        .replace(/YOUTUBE_URL/g, '#')
        .replace(/TIKTOK_URL/g, '#')
        .replace(/TWITTER_URL/g, '#')
        .replace(/KURULUS_YILI/g, '2015')
        .replace(/KURUCU_ADI/g, 'Ahmet Yılmaz')
        .replace(/ODEME_LINK/g, '#')
        .replace(/BASVURU_LINK/g, '#')
        .replace(/DUYURU_LINK/g, '#')
        .replace(/DUYURU_METNI/g, '🎉 Yeni hizmetlerimiz yayında!')
        .replace(/SAATLER_JSON/g, '[{"gun":"Pazartesi","acilis":"09:00","kapanis":"18:00"},{"gun":"Salı","acilis":"09:00","kapanis":"18:00"},{"gun":"Çarşamba","acilis":"09:00","kapanis":"18:00"},{"gun":"Perşembe","acilis":"09:00","kapanis":"18:00"},{"gun":"Cuma","acilis":"09:00","kapanis":"18:00"},{"gun":"Cumartesi","acilis":"10:00","kapanis":"16:00"},{"gun":"Pazar","acilis":null,"kapanis":null}]')
        .replace(/YORUMLAR_JSON/g, '[{"ad":"Ahmet K.","yildiz":5,"yorum":"Harika hizmet, kesinlikle tavsiye ederim!","sure":"1 hafta önce"},{"ad":"Ayşe M.","yildiz":5,"yorum":"Çok memnun kaldım, tekrar geleceğim.","sure":"2 hafta önce"},{"ad":"Mehmet Y.","yildiz":4,"yorum":"Hızlı ve profesyonel hizmet.","sure":"1 ay önce"}]')
        .replace(/REFERANSLAR_JSON/g, '[{"ad":"Fatma S.","konum":"Kadıköy","yorum":"Yıllardır kullanıyorum, her zaman memnun kaldım.","hizmet":"Temel Hizmet"},{"ad":"Ali D.","konum":"Üsküdar","yorum":"Fiyat/performans açısından mükemmel.","hizmet":"Premium Hizmet"}]')
        .replace(/ISTATISTIKLER_JSON/g, '[{"deger":500,"etiket":"Mutlu Müşteri","ikon":"👥"},{"deger":15,"etiket":"Yıl Tecrübe","ikon":"🏆"},{"deger":1200,"etiket":"Tamamlanan Proje","ikon":"✅"},{"deger":98,"etiket":"Memnuniyet %","ikon":"⭐"}]')
        .replace(/SERTIFIKALAR_JSON/g, '[{"baslik":"ISO 9001 Kalite Belgesi","kurum":"TSE","yil":"2023","ikon":"🏅"},{"baslik":"Mesleki Yeterlilik","kurum":"MYK","yil":"2022","ikon":"📜"}]')
        .replace(/MAKALELER_JSON/g, '[{"baslik":"Doğru Seçim Nasıl Yapılır?","ozet":"Müşterilerimizin en çok sorduğu soruları cevaplıyoruz.","tarih":"10 Mart 2026","etiket":"Rehber","ikon":"📖"},{"baslik":"2026 Yılının Trendleri","ozet":"Sektördeki en güncel gelişmeleri takip edin.","tarih":"5 Mart 2026","etiket":"Haber","ikon":"📰"}]')
        .replace(/HIZMETLER_JSON/g, '[{"ad":"Temel Hizmet","ikon":"🔧","aciklama":"Hızlı ve güvenilir"},{"ad":"Premium Hizmet","ikon":"⭐","aciklama":"En üst düzey kalite"},{"ad":"Acil Servis","ikon":"🚨","aciklama":"7/24 hizmetinizdeyiz"},{"ad":"Danışmanlık","ikon":"💬","aciklama":"Uzman görüşü"}]')
        .replace(/KAMPANYA_BASLIK/g, 'Bahar İndirimi')
        .replace(/KAMPANYA_ACIKLAMA/g, 'Tüm hizmetlerde geçerli özel indirim fırsatı!')
        .replace(/INDIRIM_YUZDESI/g, '30')
        .replace(/BITIS_TARIHI/g, new Date(Date.now() + 7 * 24 * 3600000).toISOString().split('T')[0])
        .replace(/KUPON_KODU/g, 'KEPENK30')
        .replace(/INDIRIM_MIKTARI/g, '%30')
        .replace(/KUPON_SART/g, '500₺ üzeri alışverişlerde geçerlidir')
        .replace(/KUPON_BITIS/g, new Date(Date.now() + 14 * 24 * 3600000).toISOString().split('T')[0])
        .replace(/BULTEN_BASLIK/g, 'Haberlere Abone Olun')
        .replace(/BULTEN_ACIKLAMA/g, 'Kampanya ve yeniliklerden ilk siz haberdar olun.')
        .replace(/HIKAYE_METNI/g, 'Yıllar önce küçük bir atölyede başladık. Müşterilerimizin güveni ve destekli ile bugün sektörün öncü firmalarından biri haline geldik.')
        .replace(/MISYON_METNI/g, 'Müşteri memnuniyetini her şeyin üzerinde tutuyoruz.')
        .replace(/KURULUS_YILI/g, '2010')
        .replace(/URUNLER_JSON/g, '[{"ad":"Temel Paket","fiyat":"150₺","aciklama":"Başlangıç seviyesi hizmet","stok":true,"ikon":"📦"},{"ad":"Pro Paket","fiyat":"350₺","aciklama":"Profesyonel hizmet paketi","stok":true,"ikon":"🎯"},{"ad":"VIP Hizmet","fiyat":"750₺","aciklama":"En kapsamlı seçenek","stok":false,"ikon":"👑"}]')
        .replace(/ANKET_SORULARI_JSON/g, '[{"id":"genel","soru":"Genel hizmet kalitemizi nasıl değerlendirirsiniz?"},{"id":"hiz","soru":"Hız ve zamanında teslimat?","id2":""},{"id":"fiyat","soru":"Fiyat/performans oranı?"}]')
        .replace(/ETKINLIK_ADI/g, 'Yıl Sonu Kampanyası')
        .replace(/ETKINLIK_ACIKLAMA/g, 'Büyük indirimler ve sürpriz hediyeler sizi bekliyor!')
        .replace(/ETKINLIK_TARIHI/g, new Date(Date.now() + 3 * 24 * 3600000).toISOString())
        .replace(/ADIMLAR_JSON/g, '[{"numara":1,"baslik":"İletişim","aciklama":"Bize ulaşın, ihtiyaçlarınızı anlatalım.","ikon":"📞"},{"numara":2,"baslik":"Keşif ve Teklif","aciklama":"Ücretsiz keşif yapıyor, şeffaf fiyat sunuyoruz.","ikon":"🔍"},{"numara":3,"baslik":"Uygulama","aciklama":"Deneyimli ekibimiz işe başlar.","ikon":"🔧"},{"numara":4,"baslik":"Teslim","aciklama":"Kaliteli işi zamanında teslim ederiz.","ikon":"✅"}]')
        .replace(/ILANLAR_JSON/g, '[{"pozisyon":"Teknik Uzman","tur":"Tam Zamanlı","konum":"İstanbul","aciklama":"Deneyimli teknik uzman arıyoruz."},{"pozisyon":"Müşteri Temsilcisi","tur":"Part-time","konum":"Uzaktan","aciklama":"İletişim becerisi yüksek personel."}]')
        .replace(/BASVURU_LINK/g, '#')
        .replace(/VIDEO_BASLIK/g, 'Bizi Tanıyın')
        .replace(/VIDEO_ACIKLAMA/g, 'Hizmetlerimizi ve çalışma sürecimizi keşfedin.')
        .replace(/VIDEO_URL/g, 'https://www.youtube.com/embed/dQw4w9WgXcQ')
        .replace(/HIZMET_OPTIONS/g, '<option>Temel Hizmet</option><option>Premium Hizmet</option><option>Danışmanlık</option>')
        .replace(/HIZMET_DROPDOWN/g, '<option>Temel Hizmet</option><option>Premium Hizmet</option>')
        .replace(/FORM_INPUT_STYLE/g, 'width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.07);color:#fff;font-size:0.9rem;outline:none')
        .replace(/GMB_LINK/g, '#')
    : null

  const previewHtml = demoHtml ? `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --renk-arkaplan: #111;
    --renk-kart: #1e1e1e;
    --renk-metin: #f0f0f0;
    --renk-alt: #aaa;
    --renk-vurgu: #c9541e;
    --font-baslik: 'Inter', sans-serif;
    position: fixed;
    bottom: 0;
  }
  body { font-family: 'Inter', system-ui, sans-serif; background: #111; color: #f0f0f0; }
</style>
</head>
<body>${demoHtml}</body>
</html>` : null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', backdropFilter: 'blur(8px)',
      }}
      onClick={onKapat}
    >
      <div
        style={{
          background: '#161616', borderRadius: 20,
          width: '100%', maxWidth: 760, maxHeight: '90vh',
          overflow: 'hidden', border: `1px solid ${renk}30`,
          display: 'flex', flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal başlık */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800 }}>{modul.ad}</h2>
              <span style={{ background: renk + '20', color: renk, padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
                {PAKET_ETIKET[modul.minPaket]} +
              </span>
            </div>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: 4 }}>{modul.aciklama}</p>
          </div>
          <button onClick={onKapat} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: '#888', width: 36, height: 36, borderRadius: 10, cursor: 'pointer', fontSize: 18 }}>×</button>
        </div>

        {/* İçerik */}
        <div style={{ display: 'flex', gap: 0, flex: 1, overflow: 'hidden' }}>
          {/* Sol: canlı önizleme */}
          <div style={{ flex: 1, overflow: 'auto', padding: '0', background: '#0a0a0a' }}>
            {previewHtml ? (
              <iframe
                srcDoc={previewHtml}
                style={{ width: '100%', height: '100%', minHeight: 400, border: 'none' }}
                sandbox="allow-scripts"
                title={modul.ad}
              />
            ) : (
              <div style={{ padding: 24, color: '#666', textAlign: 'center', paddingTop: 60 }}>
                <p style={{ fontSize: '2rem' }}>🤖</p>
                <p style={{ marginTop: 8 }}>Bu modül Gemini tarafından sektörel olarak üretilir</p>
              </div>
            )}
          </div>

          {/* Sağ: detaylar */}
          <div style={{ width: 240, padding: 20, borderLeft: '1px solid rgba(255,255,255,0.06)', overflow: 'auto', flexShrink: 0 }}>
            <p style={{ color: '#666', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Detaylar</p>

            <div style={{ display: 'grid', gap: 10 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px' }}>
                <p style={{ color: '#555', fontSize: '0.65rem', marginBottom: 4 }}>KATEGORİ</p>
                <p style={{ color: '#ddd', fontSize: '0.85rem', fontWeight: 600 }}>{modulKategori(modul)}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px' }}>
                <p style={{ color: '#555', fontSize: '0.65rem', marginBottom: 4 }}>MİN. PAKET</p>
                <p style={{ color: renk, fontSize: '0.85rem', fontWeight: 700 }}>{PAKET_ETIKET[modul.minPaket]}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px' }}>
                <p style={{ color: '#555', fontSize: '0.65rem', marginBottom: 4 }}>ŞABLON</p>
                <p style={{ color: modul.htmlSablon ? '#00c853' : '#888', fontSize: '0.85rem', fontWeight: 600 }}>
                  {modul.htmlSablon ? '✅ Hazır' : '🤖 AI üretir'}
                </p>
              </div>
            </div>

            <div style={{ marginTop: 16, padding: '12px', background: renk + '10', borderRadius: 10, border: `1px solid ${renk}20` }}>
              <p style={{ color: '#555', fontSize: '0.65rem', fontWeight: 700, marginBottom: 6 }}>GEMİNİ TALİMAT</p>
              <p style={{ color: '#888', fontSize: '0.7rem', lineHeight: 1.5 }}>{modul.geminiTalimat.substring(0, 120)}...</p>
            </div>

            <Link
              href="/onboarding"
              style={{
                display: 'block', marginTop: 16,
                background: renk, color: modul.minPaket === 'PREMIUM' ? '#000' : '#fff',
                textDecoration: 'none', padding: '10px', borderRadius: 10,
                fontWeight: 700, fontSize: '0.85rem', textAlign: 'center',
              }}
            >
              Bu Modülle Başla →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ModulMarket() {
  const [arama, setArama] = useState('')
  const [aktifPaket, setAktifPaket] = useState('Tümü')
  const [aktifKategori, setAktifKategori] = useState('Tümü')
  const [seciliModul, setSeciliModul] = useState<Modul | null>(null)
  const [gorunur, setGorunur] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGorunur(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const filtrelenmis = MODULLER.filter(m => {
    const aranan = arama.toLowerCase()
    const aramaBul = !aranan || m.ad.toLowerCase().includes(aranan) || m.aciklama.toLowerCase().includes(aranan)
    const paketBul = aktifPaket === 'Tümü' || m.minPaket === aktifPaket
    const kategoriBul = aktifKategori === 'Tümü' || modulKategori(m) === aktifKategori
    return aramaBul && paketBul && kategoriBul
  })

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: '#0a0a0a', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        padding: '80px 20px 40px',
        textAlign: 'center',
        opacity: gorunur ? 1 : 0,
        transform: gorunur ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.7s ease',
      }}>
        <p style={{ color: '#c9541e', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, marginBottom: 12 }}>
          Kepenk Modül Marketi
        </p>
        <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1 }}>
          {MODULLER.length} Modül,<br />
          <span style={{ color: '#c9541e' }}>Sonsuz Olasılık</span>
        </h1>
        <p style={{ color: '#888', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6 }}>
          Web sitenize ekleyebileceğiniz tüm modülleri keşfedin. Her modül sektörünüze özel Gemini tarafından içerikle doldurulur.
        </p>

        {/* Arama */}
        <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input
            type="text"
            placeholder="Modül ara... (randevu, galeri, harita...)"
            value={arama}
            onChange={e => setArama(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px 12px 42px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12, color: '#fff', fontSize: '0.9rem',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Filtreler */}
      <div style={{
        padding: '0 20px 24px',
        opacity: gorunur ? 1 : 0, transition: 'opacity 0.7s ease 0.2s',
        maxWidth: 1200, margin: '0 auto',
      }}>
        {/* Paket filtreleri */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <span style={{ color: '#555', fontSize: '0.75rem', alignSelf: 'center', marginRight: 4 }}>Paket:</span>
          {TUM_PAKETLER.map(p => (
            <button
              key={p}
              onClick={() => setAktifPaket(p)}
              style={{
                padding: '5px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700,
                border: `1px solid ${aktifPaket === p ? (PAKET_RENK[p] || '#c9541e') : 'rgba(255,255,255,0.1)'}`,
                background: aktifPaket === p ? (PAKET_RENK[p] || '#c9541e') + '20' : 'transparent',
                color: aktifPaket === p ? (PAKET_RENK[p] || '#c9541e') : '#666',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {p === 'Tümü' ? 'Tümü' : PAKET_ETIKET[p]}
            </button>
          ))}
        </div>

        {/* Kategori filtreleri */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ color: '#555', fontSize: '0.75rem', alignSelf: 'center', marginRight: 4 }}>Kategori:</span>
          {TUM_KATEGORILER.map(k => (
            <button
              key={k}
              onClick={() => setAktifKategori(k)}
              style={{
                padding: '4px 10px', borderRadius: 16, fontSize: '0.7rem', fontWeight: 600,
                border: `1px solid ${aktifKategori === k ? '#c9541e' : 'rgba(255,255,255,0.08)'}`,
                background: aktifKategori === k ? '#c9541e20' : 'transparent',
                color: aktifKategori === k ? '#c9541e' : '#555',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Sonuç sayısı */}
      <div style={{ padding: '0 20px 16px', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ color: '#555', fontSize: '0.8rem' }}>
          {filtrelenmis.length} modül gösteriliyor
          {arama && ` — "${arama}" için`}
        </p>
      </div>

      {/* Modül grid */}
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '14px',
        opacity: gorunur ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
      }}>
        {filtrelenmis.map(m => (
          <ModulKarti key={m.id} modul={m} onClick={() => setSeciliModul(m)} />
        ))}
        {filtrelenmis.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: '#555' }}>
            <p style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</p>
            <p>Bu kriterlere uygun modül bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {seciliModul && <ModulModal modul={seciliModul} onKapat={() => setSeciliModul(null)} />}
    </div>
  )
}
