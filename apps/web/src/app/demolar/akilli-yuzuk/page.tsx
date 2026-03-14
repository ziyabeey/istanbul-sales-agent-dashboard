'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Scroll Reveal ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible: v }
}
function Reveal({ children, delay = 0, className = '', direction }: { children: React.ReactNode; delay?: number; className?: string; direction?: string }) {
  const { ref, visible } = useReveal()
  return (<div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>{children}</div>)
}

/* ── Data ── */
const STATS = [
  { num: '99.6%', label: 'SpO2 Doğruluğu' },
  { num: '7 Gün', label: 'Pil Ömrü' },
  { num: '2.8g', label: 'Titanyum Gövde' },
  { num: '100m', label: 'Suya Dayanıklılık' },
]

interface CartItem { name: string; price: number; qty: number; color?: string }

export default function AkilliYuzukDemo() {
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [toast, setToast] = useState('')
  const [activeColor, setActiveColor] = useState('Titanium')

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const addToCart = (name: string, price: number, color?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name && i.color === color)
      if (existing) return prev.map(i => i.name === name && i.color === color ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { name, price, qty: 1, color }]
    })
    showToast(`${name} sepete eklendi!`)
    setCartOpen(true)
  }

  const removeFromCart = (name: string, color?: string) => setCart(prev => prev.filter(i => !(i.name === name && i.color === color)))
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .ay-d * { margin:0; padding:0; box-sizing:border-box; }
        .ay-d { font-family: 'Inter', system-ui, sans-serif; background: #000; color: #f5f5f7; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .ay-d a { text-decoration: none; color: inherit; }
        .ay-d img { max-width: 100%; display: block; }
        .ay-glass { background: rgba(20,20,22,0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.08); }

        /* BUY BAR (Top) */
        .ay-buy-bar {
          position: fixed; top: 0; left: 0; right: 0; height: 50px; background: #1a1a1c; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between; padding: 0 5%;
          border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem;
        }
        .ay-bb-left { color: #86868b; }
        .ay-bb-left strong { color: #f5f5f7; margin-left: 6px; }
        .ay-bb-right a { color: #2997ff; cursor: pointer; transition: 0.2s; }
        .ay-bb-right a:hover { opacity: 0.8; }

        /* NAV */
        .ay-nav {
          position: fixed; top: 50px; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%; height: 60px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          background: rgba(0,0,0,0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
        }
        .ay-nav.scrolled { border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.8); }
        .ay-logo { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.02em; }
        .ay-logo span { color: #2997ff; }
        .ay-links { display: flex; gap: 32px; }
        .ay-links a { font-size: 0.85rem; font-weight: 400; color: #d2d2d7; transition: 0.2s; }
        .ay-links a:hover { color: #fff; }
        .ay-btn-wrap { display: flex; align-items: center; gap: 16px; }
        .ay-mini-cart { position: relative; cursor: pointer; color: #d2d2d7; }
        .ay-mini-cart:hover { color: #fff; }
        .ay-badge { position: absolute; top: -6px; right: -8px; background: #2997ff; color: #fff; font-size: 0.65rem; font-weight: 700; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }

        /* HERO */
        .ay-hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; overflow: hidden; padding-top: 110px; }
        .ay-glow-bg { position: absolute; top: 50%; left: 50%; width: 60vw; height: 60vw; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(41,151,255,0.15) 0%, rgba(0,0,0,0) 70%); z-index: 0; pointer-events: none; }
        .ay-hero-content { position: relative; z-index: 2; max-width: 800px; padding: 0 24px; }
        .ay-eyebrow { font-size: 0.9rem; font-weight: 600; color: #2997ff; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
        .ay-title { font-size: clamp(3.5rem, 8vw, 6.5rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 24px; background: linear-gradient(180deg, #fff 0%, #86868b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ay-desc { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 400; color: #86868b; line-height: 1.4; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .ay-cta { display: inline-flex; background: #f5f5f7; color: #000; padding: 14px 32px; border-radius: 99px; font-size: 1rem; font-weight: 500; transition: 0.3s; cursor: pointer; border: none; font-family: inherit; }
        .ay-cta:hover { background: #fff; transform: scale(1.03); }

        /* PRODUCT VISUAL */
        .ay-ring-viz { position: relative; width: 320px; height: 320px; margin: 0 auto 40px; z-index: 2; }
        .ay-ring-outer { position: absolute; inset: 20px; border-radius: 50%; border: 24px solid; box-shadow: 0 0 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.5); transition: border-color 0.5s; }
        .color-Titanium { border-color: #d0d0d5; } .color-Stealth { border-color: #2c2c2e; } .color-Gold { border-color: #e3c498; }
        .ay-ring-inner { position: absolute; inset: 40px; border-radius: 50%; box-shadow: inset 0 0 20px rgba(0,0,0,0.8); }

        /* COLOR PICKER */
        .ay-colors { display: flex; gap: 16px; justify-content: center; position: relative; z-index: 2; margin-bottom: 60px; }
        .ay-color-btn { width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: 0.2s; padding: 2px; background-clip: content-box; }
        .ay-color-btn.active { border-color: #2997ff; transform: scale(1.1); }

        /* STATS BAR */
        .ay-stats { display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; margin-top: 40px; }
        .ay-stat-item { text-align: center; }
        .ay-stat-num { font-size: 1.8rem; font-weight: 600; color: #f5f5f7; }
        .ay-stat-label { font-size: 0.8rem; color: #86868b; margin-top: 4px; font-weight: 500; }

        /* FEATURES (GLASSMOSPHISM CARDS) */
        .ay-features { padding: 120px 5%; max-width: 1200px; margin: 0 auto; }
        .ay-section-header { text-align: center; margin-bottom: 80px; }
        .ay-f-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .ay-f-card { border-radius: 32px; padding: 40px 32px; display: flex; flex-direction: column; position: relative; overflow: hidden; min-height: 380px; }
        .ay-f-icon { font-size: 2.5rem; margin-bottom: 24px; filter: drop-shadow(0 0 12px rgba(255,255,255,0.2)); }
        .ay-f-card h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 12px; }
        .ay-f-card p { font-size: 0.95rem; line-height: 1.6; color: #a1a1a6; }
        .ay-f-bg { position: absolute; right: -20%; bottom: -20%; width: 70%; height: 70%; border-radius: 50%; filter: blur(60px); opacity: 0.15; z-index: -1; }

        /* DEEP DIVE SECTIONS */
        .ay-deep-section { padding: 120px 5%; max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; border-top: 1px solid rgba(255,255,255,0.05); }
        .ay-split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .ay-split.reverse { direction: rtl; } .ay-split.reverse > * { direction: ltr; }
        .ay-split-img { background: #111113; border-radius: 40px; aspect-ratio: 1; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
        
        /* SLEEP CHART MOCKUP */
        .ay-chart-grid { width: 80%; height: 60%; display: flex; flex-direction: column; gap: 4px; justify-content: flex-end; }
        .ay-chart-row { display: flex; gap: 4px; align-items: stretch; height: 100%; border-radius: 8px; overflow: hidden; }
        .ay-c-bar { flex: 1; border-radius: 4px; background: rgba(255,255,255,0.05); position: relative; }
        .ay-c-fill { position: absolute; bottom: 0; left: 0; right: 0; border-radius: 4px; }
        .bg-rem { background: #2997ff; } .bg-light { background: #5e5ce6; } .bg-deep { background: #32ade6; }

        /* ACTIVITY MOCKUP */
        .ay-ring-charts { display: flex; gap: 24px; position: relative; }
        .ay-activity-ring { width: 120px; height: 120px; border-radius: 50%; border: 12px solid rgba(255,45,85,0.2); border-top-color: #ff2d55; border-right-color: #ff2d55; transform: rotate(45deg); }
        .ay-activity-ring-inner { position: absolute; top: 20px; left: 20px; width: 80px; height: 80px; border-radius: 50%; border: 12px solid rgba(52,199,89,0.2); border-top-color: #34c759; transform: rotate(-30deg); }

        /* PURCHASING */
        .ay-purchase { padding: 120px 5%; text-align: center; background: #0a0a0c; border-top: 1px solid rgba(255,255,255,0.05); position: relative; overflow: hidden; }
        .ay-glow-bot { position: absolute; bottom: 0; left: 50%; width: 100vw; height: 30vh; transform: translateX(-50%); background: radial-gradient(ellipse at bottom, rgba(41,151,255,0.1) 0%, transparent 70%); }
        .ay-p-card { max-width: 480px; margin: 0 auto; border-radius: 32px; padding: 48px; text-align: left; position: relative; z-index: 2; }
        .ay-p-card h3 { font-size: 2rem; font-weight: 600; margin-bottom: 8px; }
        .ay-p-card p { color: #86868b; margin-bottom: 32px; font-size: 1rem; line-height: 1.5; }
        .ay-price { font-size: 3.5rem; font-weight: 700; margin-bottom: 32px; display: flex; align-items: baseline; gap: 8px; letter-spacing: -0.04em; }
        .ay-price span { font-size: 1.2rem; color: #86868b; font-weight: 400; }
        .ay-p-btn { width: 100%; background: #fff; color: #000; border: none; padding: 20px; border-radius: 16px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: 0.2s; font-family: inherit; }
        .ay-p-btn:hover { background: #f5f5f7; transform: scale(1.02); }

        /* FOOTER */
        .ay-ft { padding: 60px 5%; background: #000; border-top: 1px solid rgba(255,255,255,0.1); color: #86868b; font-size: 0.8rem; }
        .ay-ft-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; max-width: 1200px; margin: 0 auto 40px; }
        .ay-ft-col h4 { color: #f5f5f7; font-size: 0.8rem; font-weight: 600; margin-bottom: 16px; }
        .ay-ft-col ul { list-style: none; }
        .ay-ft-col li { margin-bottom: 10px; }
        .ay-ft-col a { transition: 0.2s; } .ay-ft-col a:hover { color: #f5f5f7; }

        /* WINDOWS / OVERLAYS */
        .ay-cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); z-index: 2000; opacity: 0; pointer-events: none; transition: 0.3s; }
        .ay-cart-overlay.open { opacity: 1; pointer-events: all; }
        .ay-cart-drawer { position: fixed; top: 0; right: -420px; width: 400px; max-width: 100vw; height: 100vh; z-index: 2001; transition: 0.4s cubic-bezier(0.16,1,0.3,1); padding: 32px; display: flex; flex-direction: column; border-left: 1px solid rgba(255,255,255,0.1); }
        .ay-cart-drawer.open { right: 0; }
        .ay-c-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .ay-c-head h3 { font-size: 1.5rem; font-weight: 600; }
        .ay-c-close { background: none; border: none; font-size: 1.2rem; color: #86868b; cursor: pointer; transition: 0.2s; }
        .ay-c-close:hover { color: #fff; }
        .ay-c-items { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; padding-bottom: 24px; }
        .ay-c-item { display: flex; justify-content: space-between; align-items: flex-start; }
        .ay-c-info h4 { font-size: 1.05rem; font-weight: 500; margin-bottom: 4px; }
        .ay-c-info p { font-size: 0.85rem; color: #86868b; display: flex; gap: 8px; margin-bottom: 8px; }
        .ay-c-color-dot { display: inline-block; width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); }
        .ay-c-remove { background: none; border: none; color: #ff3b30; cursor: pointer; font-size: 0.8rem; font-weight: 500; }
        .ay-c-price { font-weight: 500; font-size: 1.1rem; }
        .ay-c-foot { margin-top: auto; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
        .ay-c-total { display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 600; margin-bottom: 24px; }

        .ay-toast { position: fixed; bottom: 32px; left: 50%; transform: translate(-50%, 100px); border-radius: 99px; padding: 14px 28px; font-size: 0.9rem; font-weight: 500; z-index: 3000; transition: 0.4s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 4px 24px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
        .ay-toast.show { transform: translate(-50%, 0); margin-bottom: env(safe-area-inset-bottom, 0); }

        @media(max-width: 768px) {
          .ay-title { font-size: 3rem; }
          .ay-split, .ay-split.reverse { grid-template-columns: 1fr; gap: 40px; }
          .ay-links { display: none; }
          .ay-stats { gap: 20px; flex-direction: column; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px; }
          .ay-p-card { padding: 32px 24px; }
        }
      `}</style>
      <div className="ay-d">
        {/* BUY BAR */}
        <div className="ay-buy-bar">
          <div className="ay-bb-left">Demo Mağaza: <strong>kepenk.ai Akıllı Yüzük Modülü</strong></div>
          <div className="ay-bb-right"><Link href="/onboarding">Kendi Mağazanızı Açın →</Link></div>
        </div>

        {/* NAV */}
        <nav className={`ay-nav${scrolled ? ' scrolled' : ''}`}>
          <div className="ay-logo">HAL<span>kay</span> Pro</div>
          <div className="ay-links">
            <a href="#genel">Genel Bakış</a>
            <a href="#saglik">Sağlık İzleme</a>
            <a href="#derin">Derin Analiz</a>
            <a href="#satin-al">Satın Al</a>
          </div>
          <div className="ay-btn-wrap">
            <div className="ay-mini-cart" onClick={() => setCartOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span className="ay-badge">{cartCount}</span>}
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="ay-hero" id="genel">
          <div className="ay-glow-bg" />
          <div className="ay-hero-content">
            <Reveal><div className="ay-eyebrow">Yeni Nesil Sağlık Takibi</div></Reveal>
            <Reveal delay={100}><h1 className="ay-title">Görünmez teknoloji.<br/>Görünür sonuçlar.</h1></Reveal>
            <Reveal delay={200}><p className="ay-desc">Klinik düzeyde hassasiyet, ultra hafif titanyum gövde. Vücudunuzu daha önce hiç olmadığı kadar net bir şekilde anlayın.</p></Reveal>

            <Reveal delay={300}>
              <div className="ay-ring-viz">
                <div className={`ay-ring-outer color-${activeColor}`} />
                <div className="ay-ring-inner" />
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="ay-colors">
                {['Titanium', 'Stealth', 'Gold'].map(c => (
                  <button key={c} className={`ay-color-btn ${activeColor === c ? 'active' : ''}`} style={{ backgroundColor: c === 'Titanium' ? '#d0d0d5' : c === 'Stealth' ? '#1c1c1e' : '#e3c498' }} onClick={() => setActiveColor(c)} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={500}><button className="ay-cta" onClick={() => document.getElementById('satin-al')?.scrollIntoView({ behavior: 'smooth' })}>Fiyatlandırmayı İncele</button></Reveal>
            
            <div className="ay-stats">
              {STATS.map((s, i) => (
                <Reveal key={i} delay={600 + i * 100}>
                  <div className="ay-stat-item">
                    <div className="ay-stat-num">{s.num}</div><div className="ay-stat-label">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="ay-features" id="saglik">
          <Reveal>
            <div className="ay-section-header">
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '16px', letterSpacing: '-0.02em' }}>Sağlığınız, her saniye<br/>kontrol altında.</h2>
              <p style={{ color: '#86868b', fontSize: '1.2rem' }}>Laboratuvar hassasiyetinde 6 eksenli sensör mimarisi.</p>
            </div>
          </Reveal>
          <div className="ay-f-grid">
            {[
              { i: '🤍', t: 'Nabız ve HRV Analizi', d: 'Optik sensör kümeleri ile 7/24 kesintisiz kalp ritmi ve kalp atış hızı değişkenliği (HRV) izleme. Stres seviyenizi anlık görün.', color: '#ff2d55' },
              { i: '🌡️', t: 'Hassas Sıcaklık', d: 'Uyku boyunca cilt sıcaklığı sapmalarını milimetrik hassasiyetle ölçer. Hastalık belirtilerini önceden tahmin edin.', color: '#ff9500' },
              { i: '🩸', t: 'SpO2 Oksijen', d: 'Gelişmiş kırmızı ve kızılötesi LED dizilimi ile gece boyunca kan oksijen doygunluğunu kesintisiz takip edin.', color: '#34c759' },
              { i: '🔋', t: 'Optimum Verimlilik', d: 'Kompakt pil teknolojisi sayesinde tek şarjla tam 1 hafta boyunca kesintisiz sensör takibi ve analiz yeteneği.', color: '#2997ff' }
            ].map((f, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="ay-f-card ay-glass">
                  <div className="ay-f-bg" style={{ background: f.color }} />
                  <div className="ay-f-icon">{f.i}</div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* DEEP DIVES */}
        <section className="ay-deep-section" id="derin">
          <div className="ay-split">
            <Reveal direction="left">
              <div className="ay-split-img">
                <div className="ay-chart-grid">
                  {[40, 60, 80, 50, 90, 70, 85].map((h, i) => (
                    <div key={i} className="ay-c-bar">
                      <div className={`ay-c-fill ${i % 3 === 0 ? 'bg-deep' : i % 2 === 0 ? 'bg-rem' : 'bg-light'}`} style={{ height: `${h}%`, transition: '1s ease', animation: `grow 1.5s ease ${i*0.1}s forwards` }}/>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '24px', letterSpacing: '-0.02em' }}>Uykunuzu baştan aşağı yorumlayın.</h2>
                <p style={{ color: '#86868b', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px' }}>REM, derin ve hafif uyku evrelerinizi klinik doğrulukla ayrıştırın. Sabahları güne ne kadar hazır olduğunuzu gösteren "Kapsamlı Uyku Skoru" ile uyanın.</p>
                <ul style={{ color: '#d2d2d7', listStyle: 'none', lineHeight: '2' }}>
                  <li>✓ Gelişmiş evre tespiti ve uyanıklık takibi</li>
                  <li>✓ Uykuda solunum analizi ve oksijen satürasyonu</li>
                  <li>✓ Sirkadiyen ritim hizalaması hedefleri</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="ay-split reverse">
            <Reveal direction="right">
              <div className="ay-split-img" style={{ background: 'linear-gradient(45deg, #111113, #1c1c1e)' }}>
                <div className="ay-ring-charts">
                  <div className="ay-activity-ring" />
                  <div className="ay-activity-ring-inner" />
                </div>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '24px', letterSpacing: '-0.02em' }}>Aktivite ve Toparlanma.</h2>
                <p style={{ color: '#86868b', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px' }}>Bugün antrenmanda sınırlarınızı zorlamalı mısınız, yoksa dinlenmeye mi ağırlık vermelisiniz? Halkay Pro, vücudunuzun biyometrik verilerini analiz ederek size günlük "Hazırlık Skoru" sunar.</p>
                <button className="ay-cta" style={{ background: '#2997ff', color: '#fff' }} onClick={() => document.getElementById('satin-al')?.scrollIntoView({ behavior: 'smooth' })}>Yüzüğünüzü Seçin</button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PURCHASE FORM */}
        <section className="ay-purchase" id="satin-al">
          <div className="ay-glow-bot" />
          <Reveal>
            <div className="ay-p-card ay-glass">
              <h3>Halkay Pro Yüzük</h3>
              <p>Ömür boyu gelişmiş analitik üyeliği dahildir. Ekstra hiçbir aylık ücret ödemeyin.</p>
              
              <div style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ paddingBottom: '20px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#86868b', marginBottom: '16px', fontWeight: '500' }}>Renk Kaplaması</div>
                  <div className="ay-colors" style={{ justifyContent: 'flex-start', margin: 0, gap: '20px' }}>
                    {['Titanium', 'Stealth', 'Gold'].map(c => (
                      <button key={c} className={`ay-color-btn ${activeColor === c ? 'active' : ''}`} style={{ width: '40px', height: '40px', backgroundColor: c === 'Titanium' ? '#d0d0d5' : c === 'Stealth' ? '#1c1c1e' : '#e3c498' }} onClick={() => setActiveColor(c)} title={c} />
                    ))}
                  </div>
                  <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#f5f5f7' }}>Seçilen kaplama: <strong style={{ color: '#2997ff' }}>{activeColor} Finish</strong></div>
                </div>
              </div>

              <div className="ay-price"><span>₺</span> {activeColor === 'Gold' ? '8.999' : '7.499'}</div>
              <button className="ay-p-btn" onClick={() => addToCart(`Halkay Pro`, activeColor === 'Gold' ? 8999 : 7499, activeColor)}>Sepete Ekle</button>
              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#86868b' }}>Aynı gün ücretsiz ve sigortalı teslimat.</div>
            </div>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="ay-ft">
          <div className="ay-ft-grid">
            <div className="ay-ft-col"><h4>Halkay</h4><ul><li><a href="#">Hakkımızda</a></li><li><a href="#">Teknoloji Ekibi</a></li><li><a href="#">Kariyer Fırsatları</a></li><li><a href="#">Basın Odası</a></li></ul></div>
            <div className="ay-ft-col"><h4>Destek</h4><ul><li><a href="#">Yardım Merkezi</a></li><li><a href="#">İade ve Değişim</a></li><li><a href="#">Garanti Belgesi</a></li><li><a href="#">Sürdürülebilirlik</a></li></ul></div>
            <div className="ay-ft-col"><h4>Yasal</h4><ul><li><a href="#">Gizlilik Politikası</a></li><li><a href="#">Kullanım Şartları</a></li><li><a href="#">KVKK Metni</a></li><li><a href="#">Çerez Politikası</a></li></ul></div>
          </div>
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span>© 2026 Halkay Technology Inc. Tüm hakları saklıdır.</span>
            <span style={{ fontSize: '0.75rem', color: '#555' }}>Design system powered by kepenk.ai E-Commerce Engine</span>
          </div>
        </footer>

        {/* OVERLAYS */}
        <div className={`ay-toast ay-glass${toast ? ' show' : ''}`}>{toast}</div>
        
        <div className={`ay-cart-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
        <div className={`ay-cart-drawer ay-glass${cartOpen ? ' open' : ''}`}>
          <div className="ay-c-head">
            <h3>Sepetiniz</h3>
            <button className="ay-c-close" onClick={() => setCartOpen(false)}>✕</button>
          </div>
          {cart.length === 0 ? <p style={{ color: '#86868b', textAlign: 'center', marginTop: '60px' }}>Sepetiniz boş.</p> : (
            <>
              <div className="ay-c-items">
                {cart.map(i => (
                  <div key={i.name+i.color} className="ay-c-item">
                    <div>
                      <h4 className="ay-c-info">{i.name}</h4>
                      <p className="ay-c-info" style={{ alignItems: 'center' }}>
                        <span className="ay-c-color-dot" style={{ background: i.color === 'Titanium' ? '#d0d0d5' : i.color === 'Stealth' ? '#1c1c1e' : '#e3c498' }} /> {i.color} 
                        <span style={{ margin: '0 4px' }}>·</span> Adet: {i.qty}
                      </p>
                      <button className="ay-c-remove" onClick={() => removeFromCart(i.name, i.color)}>Kaldır</button>
                    </div>
                    <div className="ay-c-price">{(i.price * i.qty).toLocaleString('tr-TR')} ₺</div>
                  </div>
                ))}
              </div>
              <div className="ay-c-foot">
                <div className="ay-c-total"><span>Ara Toplam</span><span style={{ color: '#f5f5f7' }}>{cartTotal.toLocaleString('tr-TR')} ₺</span></div>
                <button className="ay-p-btn" style={{ background: '#fff', color: '#000' }} onClick={() => { showToast('💯 Siparişiniz alındı!'); setCart([]); setCartOpen(false) }}>Güvenli Ödeme</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
