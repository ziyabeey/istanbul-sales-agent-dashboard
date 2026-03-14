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
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>{children}</div>
}

const KATALOG = [
  { id: 1, ad: 'OVERSIZED BLAZER', fiyat: 4950, resim: '🧥', beden: ['S', 'M', 'L'] },
  { id: 2, ad: 'CARGO PANTS', fiyat: 3200, resim: '👖', beden: ['M', 'L', 'XL'] },
  { id: 3, ad: 'CHUNKY BOOTS', fiyat: 6800, resim: '👢', beden: ['40', '41', '42', '43'] },
  { id: 4, ad: 'LEATHER TOTE', fiyat: 5400, resim: '👜', beden: ['ONE SIZE'] },
  { id: 5, ad: 'SILK SHIRT', fiyat: 2800, resim: '👔', beden: ['S', 'M'] },
  { id: 6, ad: 'HEAVYWEIGHT TEE', fiyat: 1200, resim: '👕', beden: ['S', 'M', 'L', 'XL'] },
]

interface CartItem { id: number, ad: string, fiyat: number, beden: string, qty: number }

export default function ETicaretDemo() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [viewedItem, setViewedItem] = useState<(typeof KATALOG)[0] | null>(null)
  const [selBeden, setSelBeden] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }

  const openV = (item: (typeof KATALOG)[0]) => { setViewedItem(item); setSelBeden(item.beden[0]) }

  const addToCart = () => {
    if (!viewedItem) return
    setCart(p => {
      const e = p.find(i => i.id === viewedItem.id && i.beden === selBeden)
      if (e) return p.map(i => i.id === viewedItem.id && i.beden === selBeden ? { ...i, qty: i.qty + 1 } : i)
      return [...p, { id: viewedItem.id, ad: viewedItem.ad, fiyat: viewedItem.fiyat, beden: selBeden, qty: 1 }]
    })
    setViewedItem(null)
    setCartOpen(true)
    showToast(`${viewedItem.ad} (${selBeden}) ADDED TO CART`)
  }

  const removeCart = (id: number, beden: string) => setCart(p => p.filter(i => !(i.id === id && i.beden === beden)))
  const cartTot = cart.reduce((s, i) => s + i.fiyat * i.qty, 0)
  const cartCnt = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .fw-d * { margin:0; padding:0; box-sizing:border-box; }
        .fw-d { font-family: 'Space Grotesk', sans-serif; background: #e5e5e5; color: #000; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .fw-d a { text-decoration: none; color: inherit; }
        .fw-btn { cursor: pointer; border: 2px solid #000; background: transparent; font-family: inherit; font-weight: 700; text-transform: uppercase; transition: transform 0.1s, background 0.3s, color 0.3s; }
        .fw-btn:hover { background: #000; color: #e5e5e5; }
        .fw-btn:active { transform: translateY(2px); }

        /* MARQUEE TOP */
        .fw-marq { width: 100%; overflow: hidden; background: #000; color: #fff; padding: 10px 0; border-bottom: 2px solid #000; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.1em; display: flex; white-space: nowrap; }
        .fw-m-track { display: flex; animation: scrollX 20s linear infinite; }
        .fw-m-item { padding: 0 40px; }
        @keyframes scrollX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* HEADER */
        .fw-head { border-bottom: 4px solid #000; padding: 24px; display: flex; justify-content: space-between; align-items: center; background: #e5e5e5; position: sticky; top: 0; z-index: 100; }
        .fw-logo { font-size: 3rem; font-weight: 700; letter-spacing: -0.05em; line-height: 0.8; }
        .fw-logo span { border: 2px solid #000; padding: 0 4px; display: inline-block; transform: rotate(-2deg); background: #fff; }
        .fw-cart-t { font-size: 1.25rem; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .fw-cart-t span { background: #000; color: #fff; font-size: 0.8rem; padding: 2px 8px; border-radius: 99px; }

        /* HERO */
        .fw-hero { min-height: 80vh; display: grid; grid-template-columns: 1fr 1fr; border-bottom: 4px solid #000; }
        .fw-h-txt { padding: 48px; display: flex; flex-direction: column; justify-content: center; border-right: 4px solid #000; }
        .fw-h-txt h1 { font-size: clamp(4rem, 10vw, 8rem); line-height: 0.9; text-transform: uppercase; letter-spacing: -0.04em; margin-bottom: 40px; }
        .fw-h-txt p { font-size: 1.25rem; max-width: 400px; font-weight: 500; border-left: 4px solid #000; padding-left: 24px; margin-bottom: 40px; }
        .fw-h-btn { font-size: 1.5rem; padding: 24px 48px; border-radius: 0; width: fit-content; box-shadow: 8px 8px 0 #000; }
        .fw-h-btn:hover { transform: translate(4px, 4px); box-shadow: 4px 4px 0 #000; background: transparent; color: #000; }
        .fw-h-btn:active { transform: translate(8px, 8px); box-shadow: 0 0 0; }
        .fw-h-img { background: #d4d4d4; display: flex; align-items: center; justify-content: center; font-size: 15vw; position: relative; overflow: hidden; }
        .fw-h-img::after { content: 'NEW SEASON'; position: absolute; bottom: 24px; right: 24px; font-size: 2rem; font-weight: 700; mix-blend-mode: difference; color: #fff; }

        /* CATALOG (MASONRY-LIKE GRID) */
        .fw-sec-tit { padding: 40px 24px; font-size: 3rem; text-transform: uppercase; border-bottom: 4px solid #000; background: #fff; }
        .fw-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); border-bottom: 4px solid #000; }
        .fw-card { border-right: 4px solid #000; border-bottom: 4px solid #000; transition: background 0.3s; position: relative; display: flex; flex-direction: column; }
        .fw-card:nth-child(even) { border-right: none; }
        @media(min-width: 1024px) { .fw-card:nth-child(even) { border-right: 4px solid #000; } .fw-card:nth-child(3n) { border-right: none; } }
        .fw-card:hover { background: #fff; }
        .fw-c-img { height: 400px; display: flex; align-items: center; justify-content: center; font-size: 6rem; border-bottom: 4px solid #000; background: #f0f0f0; transition: 0.5s; cursor: pointer; }
        .fw-card:hover .fw-c-img { font-size: 7rem; }
        .fw-c-info { padding: 24px; display: flex; justify-content: space-between; align-items: flex-end; flex: 1; }
        .fw-c-ad { font-size: 1.5rem; font-weight: 700; text-transform: uppercase; line-height: 1.1; max-width: 70%; }
        .fw-c-pri { font-size: 1.25rem; font-weight: 600; }
        .fw-c-buy { position: absolute; top: 24px; right: 24px; border: 2px solid #000; background: #000; color: #fff; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; cursor: pointer; opacity: 0; transform: scale(0.5); transition: 0.3s; }
        .fw-card:hover .fw-c-buy { opacity: 1; transform: scale(1); }
        .fw-c-buy:hover { background: #fff; color: #000; }

        /* FOOTER */
        .fw-foot { background: #000; color: #e5e5e5; padding: 64px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .fw-f-tit { font-size: 5rem; font-weight: 700; line-height: 0.9; letter-spacing: -0.04em; margin-bottom: 40px; }
        .fw-f-links { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 1.2rem; text-transform: uppercase; }
        .fw-f-links a:hover { text-decoration: line-through; }
        .fw-newsletter { border: 2px solid #e5e5e5; display: flex; margin-top: 40px; }
        .fw-newsletter input { flex: 1; background: transparent; border: none; padding: 16px; color: #fff; font-size: 1.1rem; outline: none; font-family: inherit; }
        .fw-newsletter button { background: #e5e5e5; color: #000; border: none; padding: 0 32px; font-weight: 700; font-family: inherit; font-size: 1.1rem; cursor: pointer; text-transform: uppercase; }

        /* VIEW MODAL (FULL SCREEN) */
        .fw-v-modal { position: fixed; inset: 0; background: #e5e5e5; z-index: 2000; display: flex; transform: translateY(100%); transition: transform 0.6s cubic-bezier(0.8,0,0.2,1); }
        .fw-v-modal.open { transform: translateY(0); }
        .fw-vm-close { position: absolute; top: 24px; right: 24px; font-size: 2rem; background: transparent; border: none; cursor: pointer; z-index: 2001; }
        .fw-vm-img { flex: 1; border-right: 4px solid #000; display: flex; align-items: center; justify-content: center; font-size: 15vw; background: #fff; }
        .fw-vm-info { flex: 1; padding: 64px; display: flex; flex-direction: column; justify-content: center; }
        .fw-vm-ad { font-size: 4rem; font-weight: 700; line-height: 1; text-transform: uppercase; margin-bottom: 24px; }
        .fw-vm-pri { font-size: 2.5rem; font-weight: 500; margin-bottom: 64px; }
        .fw-size-tit { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; }
        .fw-sizes { display: flex; gap: 16px; margin-bottom: 48px; }
        .fw-size-btn { border: 2px solid #000; background: transparent; padding: 16px 24px; font-size: 1.25rem; font-weight: 700; cursor: pointer; font-family: inherit; }
        .fw-size-btn.active { background: #000; color: #fff; box-shadow: -4px 4px 0 #000; transform: translate(4px, -4px); }
        .fw-add-btn { background: #000; color: #fff; border: 2px solid #000; padding: 24px; font-size: 1.5rem; font-weight: 700; font-family: inherit; text-transform: uppercase; cursor: pointer; transition: 0.2s; }
        .fw-add-btn:hover { background: #fff; color: #000; }

        /* CART SLIDER */
        .fw-cart-ov { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 3000; opacity: 0; pointer-events: none; transition: 0.4s; }
        .fw-cart-ov.open { opacity: 1; pointer-events: all; }
        .fw-cart { position: fixed; top: 0; right: 0; width: 500px; max-width: 100vw; height: 100vh; background: #fff; border-left: 4px solid #000; z-index: 3001; transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; }
        .fw-cart.open { transform: translateX(0); }
        .fw-c-head { padding: 32px; border-bottom: 4px solid #000; display: flex; justify-content: space-between; align-items: center; }
        .fw-c-head h2 { font-size: 2.5rem; font-weight: 700; text-transform: uppercase; }
        .fw-c-list { flex: 1; overflow-y: auto; }
        .fw-c-item { display: flex; padding: 24px; border-bottom: 2px solid #000; justify-content: space-between; align-items: center; }
        .fw-c-item h4 { font-size: 1.25rem; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
        .fw-c-item p { font-weight: 500; font-size: 1rem; margin-bottom: 8px; }
        .fw-c-rem { color: #f00; font-weight: 700; text-decoration: underline; cursor: pointer; font-size: 0.9rem; }
        .fw-c-tot { padding: 32px; border-top: 4px solid #000; display: flex; justify-content: space-between; font-size: 2rem; font-weight: 700; }
        .fw-c-ck { width: 100%; border: none; background: #000; color: #fff; padding: 24px; font-size: 1.5rem; font-weight: 700; font-family: inherit; text-transform: uppercase; cursor: pointer; }
        .fw-c-ck:hover { background: #fff; color: #000; border-top: 4px solid #000; }

        .fw-toast { position: fixed; bottom: 40px; left: 40px; background: #000; color: #fff; padding: 24px; border: 4px solid #000; font-size: 1.25rem; font-weight: 700; text-transform: uppercase; z-index: 4000; opacity: 0; transform: translateY(40px); transition: 0.4s; box-shadow: 8px 8px 0 rgba(0,0,0,0.2); pointer-events: none; }
        .fw-toast.show { opacity: 1; transform: translateY(0); }

        @media(max-width: 900px) {
          .fw-hero, .fw-v-modal { grid-template-columns: 1fr; display: flex; flex-direction: column; }
          .fw-h-txt, .fw-vm-info { border-right: none; padding: 24px; }
          .fw-h-img { height: 400px; border-top: 4px solid #000; }
          .fw-vm-img { height: 40vh; border-right: none; border-bottom: 4px solid #000; }
          .fw-foot { grid-template-columns: 1fr; }
          .fw-f-tit { font-size: 3.5rem; }
        }
      `}</style>
      <div className="fw-d">
        <div className="fw-marq">
          <div className="fw-m-track">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="fw-m-item">FREE WORLDWIDE SHIPPING ON ORDERS OVER ₺10.000 // AWWWARDS STYLE DEMO // POWERED BY KEPENK.AI // </span>
            ))}
          </div>
        </div>

        <header className="fw-head">
          <div className="fw-logo">RAW<span>STUDIOS</span></div>
          <div className="fw-cart-t" onClick={() => setCartOpen(true)}>
            CART <span>{cartCnt}</span>
          </div>
        </header>

        <section className="fw-hero">
          <div className="fw-h-txt">
            <Reveal><h1>Redefining<br/>Basics.</h1></Reveal>
            <Reveal delay={150}><p>SS26 COLLECTION. UNCOMPROMISING QUALITY FOR THE ARCHITECTURAL WARDROBE.</p></Reveal>
            <Reveal delay={300}><button className="fw-btn fw-h-btn" onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}>SHOP COLLECTION</button></Reveal>
          </div>
          <div className="fw-h-img">
            <span>🪨</span>
          </div>
        </section>

        <section id="shop">
          <div className="fw-sec-tit">Collection 001</div>
          <div className="fw-grid">
            {KATALOG.map((k, i) => (
              <Reveal key={k.id} delay={i * 100} className="fw-card">
                <div onClick={() => openV(k)}>
                  <div className="fw-c-img">{k.resim}</div>
                  <div className="fw-c-info">
                    <div className="fw-c-ad">{k.ad}</div>
                    <div className="fw-c-pri">₺{k.fiyat.toLocaleString()}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <footer className="fw-foot">
          <div>
            <div className="fw-f-tit">JOIN THE RAW ARCHIVE</div>
            <div className="fw-newsletter">
              <input type="email" placeholder="EMAIL ADDRESS" />
              <button>SUBSCRIBE</button>
            </div>
          </div>
          <div className="fw-f-links">
            <a href="#">Shop</a><a href="#">Instagram</a>
            <a href="#">About</a><a href="#">Twitter</a>
            <a href="#">Journal</a><a href="#">Spotify</a>
            <a href="#">Contact</a><a href="#">FAQ</a>
          </div>
        </footer>

        {/* ITEM MODAL */}
        <div className={`fw-v-modal${viewedItem ? ' open' : ''}`}>
          <button className="fw-vm-close" onClick={() => setViewedItem(null)}>✕</button>
          <div className="fw-vm-img">{viewedItem?.resim}</div>
          <div className="fw-vm-info">
            <h2 className="fw-vm-ad">{viewedItem?.ad}</h2>
            <div className="fw-vm-pri">₺{viewedItem?.fiyat.toLocaleString()}</div>
            <div className="fw-size-tit">SELECT SIZE</div>
            <div className="fw-sizes">
              {viewedItem?.beden.map(b => (
                <button key={b} className={`fw-size-btn ${selBeden === b ? 'active' : ''}`} onClick={() => setSelBeden(b)}>{b}</button>
              ))}
            </div>
            <button className="fw-add-btn" onClick={addToCart}>ADD TO CART</button>
          </div>
        </div>

        {/* CART */}
        <div className={`fw-cart-ov${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
        <div className={`fw-cart${cartOpen ? ' open' : ''}`}>
          <div className="fw-c-head">
            <h2>SHOPPING CART</h2>
            <button className="fw-btn" style={{ padding: '8px 16px' }} onClick={() => setCartOpen(false)}>✕</button>
          </div>
          <div className="fw-c-list">
            {cart.length === 0 ? <p style={{ padding: '40px 32px', fontSize: '1.25rem', fontWeight: 500 }}>YOUR CART IS EMPTY.</p> : cart.map((i, idx) => (
              <div key={idx} className="fw-c-item">
                <div>
                  <h4>{i.ad}</h4>
                  <p>SIZE: {i.beden} // QTY: {i.qty}</p>
                  <span className="fw-c-rem" onClick={() => removeCart(i.id, i.beden)}>REMOVE</span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>₺{(i.fiyat * i.qty).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="fw-c-tot">
            <span>TOTAL</span>
            <span>₺{cartTot.toLocaleString()}</span>
          </div>
          <button className="fw-c-ck" onClick={() => { if(cart.length>0) {showToast('PROCEEDING TO CHECKOUT'); setCart([]); setCartOpen(false)} }}>CHECKOUT VIA KEPENK.AI</button>
        </div>

        <div className={`fw-toast${toast ? ' show' : ''}`}>{toast}</div>
      </div>
    </>
  )
}
