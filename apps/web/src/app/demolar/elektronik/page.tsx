'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold: 0.1 }); obs.observe(el); return () => obs.disconnect() }, [])
  return { ref, visible: v }
}
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: `all 0.5s ease-out ${delay}ms` }}>{children}</div>
}

const KATEGORILER = ['Tümü', 'Kulaklık & Ses', 'Klavye & Mouse', 'Kamera & Web', 'Şarj & Güç', 'Hub & Adaptör']

const URUNLER = [
  { ad: 'Bluetooth Kulaklık Pro X9', fiyat: 79900, indirimli: 59900, gorsel: '🎧', kat: 'Kulaklık & Ses', stok: 34, puan: 4.9, satilan: 847, badge: 'En Çok Satan', specs: ['ANC', '30sa Pil', 'IPX4'] },
  { ad: 'Mekanik Klavye RGB K7', fiyat: 189900, indirimli: null, gorsel: '⌨️', kat: 'Klavye & Mouse', stok: 45, puan: 4.7, satilan: 312, badge: null, specs: ['Cherry MX Red', 'RGB', '%60 Layout'] },
  { ad: '4K Webcam Pro WC4', fiyat: 119900, indirimli: 89900, gorsel: '📷', kat: 'Kamera & Web', stok: 22, puan: 4.8, satilan: 521, badge: 'Yeni Eklenen', specs: ['4K/60fps', 'Otofokus'] },
  { ad: 'USB-C Hub 7-in-1', fiyat: 44900, indirimli: null, gorsel: '🔗', kat: 'Hub & Adaptör', stok: 67, puan: 4.6, satilan: 1205, badge: null, specs: ['HDMI', '100W PD', 'SD Kart'] },
  { ad: 'Kablosuz Şarj Stand 3ü1', fiyat: 29900, indirimli: 22900, gorsel: '🔋', kat: 'Şarj & Güç', stok: 89, puan: 4.5, satilan: 634, badge: 'Fırsat', specs: ['15W Hızlı', 'Qi Uyumlu'] },
  { ad: 'iPhone 16 Pro Kılıf', fiyat: 14990, indirimli: null, gorsel: '📱', kat: 'Hub & Adaptör', stok: 5, puan: 4.4, satilan: 2100, badge: 'Son Ürünler', specs: ['MagSafe', 'Şeffaf'] },
  { ad: 'Oyuncu Faresi 16K DPI', fiyat: 89900, indirimli: 64900, gorsel: '🖱️', kat: 'Klavye & Mouse', stok: 120, puan: 4.6, satilan: 938, badge: 'Flaş', specs: ['1ms', 'Hafif', 'RGB'] },
  { ad: 'Stüdyo Mikrofonu USB', fiyat: 149900, indirimli: null, gorsel: '🎙️', kat: 'Kulaklık & Ses', stok: 18, puan: 4.8, satilan: 215, badge: 'Pro', specs: ['Kardioid', 'Sıfır Gecikme'] },
]

const SPECS_COMPARE = [
  { ozellik: 'Ses Kalitesi (Db)', k9: '110 dB', k8: '105 dB', k7: '98 dB' },
  { ozellik: 'Pil Ömrü', k9: '30 Saat', k8: '22 Saat', k7: '15 Saat' },
  { ozellik: 'ANC (Aktif Gürültü)', k9: 'Çift Mikrofon Pro', k8: 'Tek Mikrofon', k7: 'Pasif İzolasyon' },
  { ozellik: 'Bağlantı Türü', k9: 'Bluetooth 5.3', k8: 'Bluetooth 5.1', k7: 'Bluetooth 5.0' },
  { ozellik: 'Fiyat', k9: '5.990 ₺', k8: '3.990 ₺', k7: '1.990 ₺' },
]

interface CartItem { ad: string; fiyat: number; qty: number }

export default function ElektronikDemoPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [activeKat, setActiveKat] = useState('Tümü')
  const [seconds, setSeconds] = useState(14823)

  useEffect(() => { const t = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000); return () => clearInterval(t) }, [])

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }
  const addToCart = (ad: string, fiyat: number) => {
    setCart(prev => { const ex = prev.find(i => i.ad === ad); if (ex) return prev.map(i => i.ad === ad ? { ...i, qty: i.qty + 1 } : i); return [...prev, { ad, fiyat, qty: 1 }] })
    showToast(`${ad} sepete eklendi.`); setCartOpen(true)
  }
  const removeFromCart = (ad: string) => setCart(prev => prev.filter(i => i.ad !== ad))
  const cartTotal = cart.reduce((s, i) => s + (i.fiyat / 100) * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const fmt = (v: number) => (v / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺'
  
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  
  const filteredUrunler = activeKat === 'Tümü' ? URUNLER : URUNLER.filter(u => u.kat === activeKat)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .e-d * { margin:0; padding:0; box-sizing:border-box; }
        .e-d { font-family: 'Inter', system-ui, sans-serif; background: #f8fafc; color: #0f172a; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .e-d a { text-decoration: none; color: inherit; }
        .e-d img { max-width: 100%; display: block; }
        .e-d-btn { cursor: pointer; border: none; font-family: inherit; transition: 0.2s; outline: none; }
        
        /* HEADER & TOP BAR */
        .e-topbar { background: #2563eb; color: #fff; text-align: center; padding: 6px 16px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .e-topbar a { text-decoration: underline; text-underline-offset: 2px; }
        .e-header { background: #fff; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 100; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .e-logo { font-size: 1.25rem; font-weight: 900; letter-spacing: -0.04em; display: flex; align-items: center; gap: 6px; }
        .e-logo span { color: #2563eb; }
        .e-search { flex: 1; max-width: 500px; margin: 0 40px; position: relative; }
        .e-search input { width: 100%; padding: 10px 16px 10px 40px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; background: #f1f5f9; outline: none; transition: 0.2s; }
        .e-search input:focus { background: #fff; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .e-search svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #64748b; }
        .e-nav-actions { display: flex; gap: 16px; align-items: center; }
        .e-act-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 0.7rem; font-weight: 600; color: #64748b; cursor: pointer; position: relative; }
        .e-act-btn:hover { color: #0f172a; }
        .e-cart-badge { position: absolute; top: -4px; right: -4px; background: #ea580c; color: #fff; font-size: 0.6rem; font-weight: 800; padding: 2px 5px; border-radius: 99px; }

        /* HERO BENTO GRID */
        .e-bento { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; padding: 24px; max-width: 1400px; margin: 0 auto; }
        .e-bento-main { background: #0f172a; color: #fff; border-radius: 12px; padding: 48px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
        .e-b-tit { font-size: 2.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 12px; letter-spacing: -0.03em; }
        .e-b-desc { color: #94a3b8; font-size: 1.1rem; margin-bottom: 24px; max-width: 80%; }
        .e-b-pill { background: #ea580c; color: #fff; font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; display: inline-flex; width: fit-content; margin-bottom: 16px; text-transform: uppercase; }
        .e-bento-side { display: flex; flex-direction: column; gap: 16px; }
        .e-b-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; justify-content: center; flex: 1; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
        .e-flash-timer { display: flex; gap: 8px; margin-top: 12px; }
        .e-time-box { background: #fefce8; border: 1px solid #fef08a; padding: 8px; border-radius: 6px; text-align: center; color: #b45309; min-width: 50px; }
        .e-time-val { font-size: 1.25rem; font-weight: 800; line-height: 1; }
        .e-time-lbl { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; margin-top: 4px; }

        /* MAIN CONTENT GRID */
        .e-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 24px; max-width: 1400px; margin: 0 auto; }
        
        /* SIDEBAR FILTERS */
        .e-sidebar { background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; height: fit-content; position: sticky; top: 90px; }
        .e-sb-tit { font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
        .e-sb-cat { display: block; width: 100%; text-align: left; padding: 8px 12px; border-radius: 6px; font-size: 0.9rem; font-weight: 500; color: #334155; margin-bottom: 4px; transition: 0.2s; background: transparent; }
        .e-sb-cat:hover { background: #f1f5f9; }
        .e-sb-cat.active { background: #eff6ff; color: #2563eb; font-weight: 700; }
        .e-sb-chk { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-size: 0.85rem; color: #475569; cursor: pointer; }
        .e-sb-chk input { width: 16px; height: 16px; cursor: pointer; accent-color: #2563eb; }

        /* PRODUCTS */
        .e-prods-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; background: #fff; padding: 16px 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .e-prods-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .e-p-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; transition: 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.02); position: relative; }
        .e-p-card:hover { border-color: #cbd5e1; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); transform: translateY(-2px); }
        .e-p-img { background: #f8fafc; height: 180px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 4rem; margin-bottom: 16px; }
        .e-p-badge { position: absolute; top: 24px; left: 24px; background: #ef4444; color: #fff; font-size: 0.65rem; font-weight: 800; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; z-index: 2; }
        .e-p-cat { font-size: 0.75rem; color: #64748b; font-weight: 600; margin-bottom: 4px; }
        .e-p-tit { font-size: 1rem; font-weight: 700; line-height: 1.3; margin-bottom: 8px; flex: 1; }
        .e-p-specs { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }
        .e-p-spec { background: #f1f5f9; color: #475569; font-size: 0.65rem; padding: 3px 6px; border-radius: 4px; font-weight: 600; }
        .e-p-price-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; }
        .e-p-price { font-size: 1.25rem; font-weight: 800; color: #0f172a; }
        .e-p-old { font-size: 0.8rem; color: #94a3b8; text-decoration: line-through; display: block; margin-bottom: 2px; }
        .e-p-add { width: 100%; background: #fff; border: 1px solid #2563eb; color: #2563eb; padding: 10px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; }
        .e-p-add:hover { background: #2563eb; color: #fff; }

        /* TABLE */
        .e-table-wrap { padding: 24px; max-width: 1400px; margin: 0 auto; }
        .e-table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; font-size: 0.9rem; }
        .e-table th { background: #f8fafc; padding: 16px; text-align: left; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; }
        .e-table td { padding: 16px; border-bottom: 1px solid #e2e8f0; color: #334155; }
        .e-table td:first-child { font-weight: 600; color: #0f172a; background: #f8fafc; width: 25%; }
        .e-table tr:last-child td { border-bottom: none; }
        .e-table th:nth-child(2), .e-table td:nth-child(2) { background: #eff6ff; } /* Highlight col */

        /* FOOTER */
        .e-foot { background: #fff; border-top: 1px solid #e2e8f0; padding: 48px 24px 24px; margin-top: 60px; }
        .e-f-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; max-width: 1400px; margin: 0 auto 48px; }
        .e-f-col h4 { font-size: 0.9rem; font-weight: 800; margin-bottom: 16px; color: #0f172a; }
        .e-f-col ul { list-style: none; }
        .e-f-col li { margin-bottom: 12px; font-size: 0.85rem; color: #64748b; }
        .e-f-col a:hover { color: #2563eb; text-decoration: underline; }
        .e-f-bot { border-top: 1px solid #e2e8f0; padding-top: 24px; max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #94a3b8; }

        /* CART & TOAST */
        .e-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.4); z-index: 2000; opacity: 0; pointer-events: none; transition: 0.2s; }
        .e-overlay.open { opacity: 1; pointer-events: all; }
        .e-drawer { position: fixed; top: 0; right: -400px; width: 400px; max-width: 100vw; height: 100vh; background: #fff; z-index: 2001; transition: 0.3s; padding: 24px; display: flex; flex-direction: column; box-shadow: -4px 0 24px rgba(0,0,0,0.1); }
        .e-drawer.open { right: 0; }
        .e-c-head { display: flex; justify-content: space-between; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
        .e-c-tit { font-size: 1.25rem; font-weight: 800; }
        .e-c-close { background: #f1f5f9; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #64748b; font-weight: 700; cursor: pointer; }
        .e-c-close:hover { background: #e2e8f0; color: #0f172a; }
        .e-c-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
        .e-c-item { display: flex; justify-content: space-between; align-items: flex-start; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; }
        .e-c-info h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 4px; }
        .e-c-info p { font-size: 0.8rem; color: #64748b; }
        .e-c-price { font-weight: 800; color: #0f172a; font-size: 1rem; margin-top: 4px; display: block; }
        .e-c-remove { color: #ef4444; font-size: 0.75rem; font-weight: 600; margin-top: 8px; display: inline-block; cursor: pointer; }
        .e-c-foot { padding-top: 24px; border-top: 1px solid #e2e8f0; }
        .e-c-tot { display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800; margin-bottom: 16px; }
        .e-c-btn { width: 100%; background: #2563eb; color: #fff; border-radius: 8px; padding: 14px; font-weight: 700; font-size: 1rem; cursor: pointer; border: none; }
        .e-c-btn:hover { background: #1d4ed8; }

        .e-toast { position: fixed; bottom: 24px; right: 24px; background: #fff; color: #0f172a; padding: 16px 24px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; border-left: 4px solid #22c55e; z-index: 3000; transform: translateY(150%); transition: 0.3s; }
        .e-toast.show { transform: translateY(0); }

        @media(max-width: 900px) {
          .e-bento { grid-template-columns: 1fr; }
          .e-layout { grid-template-columns: 1fr; }
          .e-sidebar { position: static; margin-bottom: 24px; }
          .e-search { display: none; }
          .e-table-wrap { overflow-x: auto; }
        }
      `}</style>

      <div className="e-d">
        <div className="e-topbar">
          Demo Modu: Bu mağaza <a href="/onboarding">kepenk.ai Teknoloji Şablonu</a> kullanılarak oluşturulmuştur.
        </div>

        <header className="e-header">
          <div className="e-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            TECH<span>ZONE</span>
          </div>
          <div className="e-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Ürün, marka veya kategori ara..." />
          </div>
          <div className="e-nav-actions">
            <div className="e-act-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Giriş Yap
            </div>
            <div className="e-act-btn" onClick={() => setCartOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Sepet
              {cartCount > 0 && <span className="e-cart-badge">{cartCount}</span>}
            </div>
          </div>
        </header>

        {/* HERO BENTO */}
        <section className="e-bento">
          <div className="e-bento-main">
            <div className="e-b-pill">Günün Fırsatı • Sınırlı Stok</div>
            <h1 className="e-b-tit">MacBook Pro M3 Max<br/>Şimdi Stoklarda.</h1>
            <p className="e-b-desc">14 çekirdekli CPU, 30 çekirdekli GPU, 36GB Birleşik Bellek. Üstün performans, sınırları aşan teknoloji.</p>
            <button className="e-d-btn" style={{ background: '#2563eb', color: '#fff', padding: '14px 24px', borderRadius: '8px', fontWeight: 700, width: 'fit-content' }}>İncele ve Satın Al →</button>
            <div style={{ position: 'absolute', right: -40, bottom: -40, fontSize: '18rem', opacity: 0.1, transform: 'rotate(-15deg)', pointerEvents: 'none' }}>💻</div>
          </div>
          <div className="e-bento-side">
            <div className="e-b-card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>Fırsat Ürünleri</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>Seçili kulaklıklarda %40'a varan indirimler.</p>
              <div className="e-flash-timer">
                <div className="e-time-box"><div className="e-time-val">{h}</div><div className="e-time-lbl">Saat</div></div>
                <div className="e-time-box"><div className="e-time-val">{m}</div><div className="e-time-lbl">Dakika</div></div>
                <div className="e-time-box"><div className="e-time-val">{s}</div><div className="e-time-lbl">Saniye</div></div>
              </div>
            </div>
            <div className="e-b-card" style={{ background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '4px' }}>Yeni Gelenler</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Klavye & Mouse</p>
                </div>
                <div style={{ fontSize: '3rem' }}>🖱️</div>
              </div>
            </div>
          </div>
        </section>

        {/* LAYOUT */}
        <section className="e-layout">
          <aside className="e-sidebar">
            <div className="e-sb-tit">Kategoriler</div>
            {KATEGORILER.map(k => (
              <button key={k} className={`e-d-btn e-sb-cat ${activeKat === k ? 'active' : ''}`} onClick={() => setActiveKat(k)}>
                {k} <span style={{ float: 'right', fontSize: '0.75rem', color: activeKat === k ? '#2563eb' : '#94a3b8' }}>{k === 'Tümü' ? URUNLER.length : URUNLER.filter(u=>u.kat===k).length}</span>
              </button>
            ))}

            <div className="e-sb-tit" style={{ marginTop: '24px' }}>Markalar</div>
            {['Apple', 'Logitech', 'Sony', 'Anker', 'Razer'].map(m => (
              <label key={m} className="e-sb-chk">
                <input type="checkbox" /> {m}
              </label>
            ))}

            <div className="e-sb-tit" style={{ marginTop: '24px' }}>Fiyat Aralığı</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="number" placeholder="Min" style={{ width: '45%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.8rem', outline: 'none' }} />
              <span style={{ color: '#94a3b8' }}>-</span>
              <input type="number" placeholder="Max" style={{ width: '45%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.8rem', outline: 'none' }} />
            </div>
          </aside>

          <main>
            <div className="e-prods-head">
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{activeKat}</h2>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{filteredUrunler.length} ürün listeleniyor</span>
              </div>
              <select style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc' }}>
                <option>En Çok Satanlar</option>
                <option>Fiyat: Düşükten Yükseğe</option>
                <option>Fiyat: Yüksekten Düşüğe</option>
                <option>Yeni Eklenenler</option>
              </select>
            </div>

            <div className="e-prods-grid">
              {filteredUrunler.map((u, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="e-p-card">
                    <div className="e-p-img">
                      {u.badge && <div className="e-p-badge" style={{ background: u.badge.includes('Fırsat') || u.badge.includes('Flaş') ? '#f59e0b' : '#2563eb' }}>{u.badge}</div>}
                      {u.gorsel}
                    </div>
                    <div className="e-p-cat">{u.kat}</div>
                    <h3 className="e-p-tit">{u.ad}</h3>
                    <div className="e-p-specs">
                      {u.specs.map(sp => <span key={sp} className="e-p-spec">{sp}</span>)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#eab308', fontWeight: 700, marginBottom: '12px' }}>⭐ {u.puan} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({u.satilan} Değerlendirme)</span></div>
                    <div className="e-p-price-row">
                      <div>
                        {u.indirimli ? (
                          <>
                            <span className="e-p-old">{fmt(u.fiyat)}</span>
                            <span className="e-p-price" style={{ color: '#dc2626' }}>{fmt(u.indirimli)}</span>
                          </>
                        ) : (
                          <span className="e-p-price">{fmt(u.fiyat)}</span>
                        )}
                      </div>
                    </div>
                    <button className="e-d-btn e-p-add" onClick={() => addToCart(u.ad, u.indirimli || u.fiyat)}>Sepete Ekle</button>
                  </div>
                </Reveal>
              ))}
            </div>
          </main>
        </section>

        {/* COMPARISON TABLE */}
        <section className="e-table-wrap">
          <Reveal>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Ürün Karşılaştırma Tablosu</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>Pro X9 Serisi kulaklık özelliklerini detaylı inceleyin.</p>
          </Reveal>
          <Reveal delay={100}>
            <table className="e-table">
              <thead>
                <tr>
                  <th>Donanım Özellikleri</th>
                  <th>Pro X9 Serisi (Önerilen)</th>
                  <th>Mid X8 Serisi</th>
                  <th>Starter X7 Serisi</th>
                </tr>
              </thead>
              <tbody>
                {SPECS_COMPARE.map(row => (
                  <tr key={row.ozellik}>
                    <td>{row.ozellik}</td>
                    <td><strong style={{ color: '#2563eb' }}>{row.k9}</strong></td>
                    <td>{row.k8}</td>
                    <td>{row.k7}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="e-foot">
          <div className="e-f-grid">
            <div className="e-f-col">
              <div className="e-logo" style={{ marginBottom: '16px' }}>TECH<span>ZONE</span></div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>En yeni teknoloji ürünlerini en uygun fiyatlar ve güvenilir alışveriş deneyimiyle kapınıza getiriyoruz.</p>
            </div>
            <div className="e-f-col"><h4>Hızlı Menü</h4><ul><li><a href="#">Günün Fırsatları</a></li><li><a href="#">Yeni Eklenenler</a></li><li><a href="#">Çok Satanlar</a></li><li><a href="#">Kampanyalar</a></li></ul></div>
            <div className="e-f-col"><h4>Müşteri Hizmetleri</h4><ul><li><a href="#">Sipariş Takibi</a></li><li><a href="#">İade ve İptal</a></li><li><a href="#">Garanti Şartları</a></li><li><a href="#">Sıkça Sorulan Sorular</a></li></ul></div>
            <div className="e-f-col"><h4>Kurumsal</h4><ul><li><a href="#">Hakkımızda</a></li><li><a href="#">İletişim</a></li><li><a href="#">Gizlilik Sözleşmesi</a></li><li><a href="#">KVKK Metni</a></li></ul></div>
          </div>
          <div className="e-f-bot">
            <span>© 2026 TechZone Elektronik. Tüm hakları saklıdır.</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>Visa</span>
              <span style={{ border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>Mastercard</span>
              <span style={{ border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>TROY</span>
            </div>
          </div>
        </footer>

        {/* OVERLAYS */}
        <div className={`e-toast${toast ? ' show' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {toast}
          </div>
        </div>

        <div className={`e-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
        <div className={`e-drawer${cartOpen ? ' open' : ''}`}>
          <div className="e-c-head">
            <h3 className="e-c-tit">Sepetim ({cartCount})</h3>
            <button className="e-d-btn e-c-close" onClick={() => setCartOpen(false)}>✕</button>
          </div>
          <div className="e-c-list">
            {cart.length === 0 ? <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '40px' }}>Sepetiniz boş.</p> : cart.map((i, idx) => (
              <div key={idx} className="e-c-item">
                <div className="e-c-info">
                  <h4>{i.ad}</h4>
                  <p>Adet: {i.qty}</p>
                  <span className="e-c-remove" onClick={() => removeFromCart(i.ad)}>Sil</span>
                </div>
                <div className="e-c-price">{fmt(i.fiyat * i.qty)}</div>
              </div>
            ))}
          </div>
          <div className="e-c-foot">
            <div className="e-c-tot"><span>Ara Toplam</span><span style={{ color: '#2563eb' }}>{fmt(cartTotal * 100)}</span></div>
            <button className="e-d-btn e-c-btn" onClick={() => { showToast('Güvenli ödeme adımına yönlendiriliyorsunuz...'); setCart([]); setCartOpen(false) }}>Ödemeye Geç (İyzico)</button>
          </div>
        </div>

      </div>
    </>
  )
}
