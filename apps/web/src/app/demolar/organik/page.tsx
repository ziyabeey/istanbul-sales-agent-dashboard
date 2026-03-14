'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold: 0.15 }); obs.observe(el); return () => obs.disconnect() }, [])
  return { ref, visible: v }
}
function Reveal({ children, delay = 0, className = '', direction }: { children: React.ReactNode; delay?: number; className?: string; direction?: string }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px) scale(0.98)', transition: `all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${delay}ms` }}>{children}</div>
}

const ORGANIK_URUNLER = [
  { id: 1, ad: 'Siyez Unlu Ekşi Maya', desc: '12 yıllık özel mayamızdan, taş fırında.', fiyat: 140, img: '🍞', etiket: 'Çok Satan', bg: '#fef3c7' },
  { id: 2, ad: 'Datça Badem Ezmesi', desc: 'Şekersiz, sadece Datça bademi ve bal.', fiyat: 320, img: '🍯', etiket: null, bg: '#ffedd5' },
  { id: 3, ad: 'Organik Köy Yumurtası', desc: 'Serbest gezen tavuklarımızdan, 15li paket.', fiyat: 95, img: '🥚', etiket: 'Taze Taze', bg: '#f3f4f6' },
  { id: 4, ad: 'Sızma Zeytinyağı 1L', desc: 'Edremit körfezinden, soğuk sıkım erken hasat.', fiyat: 650, img: '🫒', etiket: 'Ödüllü', bg: '#ecfccb' },
  { id: 5, ad: 'Aydın Dağ İnciri', desc: 'Güneşte kurutulmuş, iri boy ve doğal.', fiyat: 280, img: '🌿', etiket: null, bg: '#fee2e2' },
  { id: 6, ad: 'Toprak Çömlek Yoğurt', desc: 'Jersey inek sütüyle, geleneksel maya.', fiyat: 110, img: '🥛', etiket: null, bg: '#e0f2fe' },
]

interface CartItem { id: number, ad: string, fiyat: number, qty: number, img: string, bg: string }

export default function OrganikDemo() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3000) }

  const addToCart = (u: typeof ORGANIK_URUNLER[0]) => {
    setCart(p => { const ex = p.find(i => i.id === u.id); if (ex) return p.map(i => i.id === u.id ? { ...i, qty: i.qty + 1 } : i); return [...p, { id: u.id, ad: u.ad, fiyat: u.fiyat, img: u.img, bg: u.bg, qty: 1 }] })
    showToast(`Sepete usulca bırakıldı: ${u.ad} 🌱`)
    setCartOpen(true)
  }

  const rmCart = (id: number) => setCart(p => p.filter(i => i.id !== id))
  const cartTot = cart.reduce((s, i) => s + i.fiyat * i.qty, 0)
  const cartCnt = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Quicksand:wght@400;500;600;700&display=swap');
        .org-d * { margin:0; padding:0; box-sizing:border-box; }
        .org-d { font-family: 'Quicksand', sans-serif; background: #fdfbf7; color: #4a3b32; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .org-serif { font-family: 'Fraunces', serif; }
        .org-d a { text-decoration: none; color: inherit; }
        .org-btn { cursor: pointer; border: none; font-family: inherit; font-weight: 700; transition: 0.3s; outline: none; }
        
        /* BLOBS & SHAPES */
        .org-blob-1 { position: absolute; top: -10vw; right: -10vw; width: 50vw; height: 50vw; background: #e8f3e5; border-radius: 43% 57% 55% 45% / 37% 50% 50% 63%; z-index: 0; filter: blur(40px); animation: morph 12s infinite alternate ease-in-out; }
        .org-blob-2 { position: absolute; bottom: 10vw; left: -15vw; width: 60vw; height: 40vw; background: #fef0db; border-radius: 65% 35% 37% 63% / 54% 43% 57% 46%; z-index: 0; filter: blur(60px); animation: morph 15s infinite alternate-reverse ease-in-out; }
        @keyframes morph { 0% { border-radius: 43% 57% 55% 45% / 37% 50% 50% 63%; transform: scale(1); } 50% { border-radius: 65% 35% 37% 63% / 54% 43% 57% 46%; transform: scale(1.05); } 100% { border-radius: 35% 65% 46% 54% / 46% 54% 46% 54%; transform: scale(0.95) rotate(10deg); } }

        /* HEADER */
        .org-nav { position: relative; z-index: 100; padding: 24px 5%; display: flex; justify-content: space-between; align-items: center; }
        .org-logo { font-size: 2rem; font-weight: 700; color: #37533c; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px; }
        .org-logo-icon { background: #8fbc8f; width: 40px; height: 40px; border-radius: 50% 50% 50% 50% / 60% 40% 60% 40%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.2rem; }
        .org-menu { display: flex; gap: 40px; }
        .org-menu a { font-size: 1.1rem; font-weight: 600; color: #6b5c51; transition: 0.2s; }
        .org-menu a:hover { color: #d2691e; }
        .org-cart-btn { background: #fff; border: 2px solid #8fbc8f; color: #37533c; padding: 10px 24px; border-radius: 99px; font-size: 1.1rem; box-shadow: 0 4px 12px rgba(143,188,143,0.15); }
        .org-cart-btn:hover { background: #8fbc8f; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(143,188,143,0.25); }

        /* HERO */
        .org-hero { position: relative; min-height: 85vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 5%; z-index: 2; }
        .org-pill { background: #fff; border: 1px solid #e2dcd3; color: #d2691e; padding: 8px 20px; border-radius: 99px; font-size: 1rem; font-weight: 700; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
        .org-hero h1 { font-size: clamp(3.5rem, 8vw, 6rem); line-height: 1.1; color: #2d452b; margin-bottom: 32px; max-width: 900px; text-shadow: 0 4px 24px rgba(253,251,247,0.8); }
        .org-hero p { font-size: clamp(1.2rem, 3vw, 1.5rem); color: #6b5c51; max-width: 600px; margin-bottom: 48px; line-height: 1.6; font-weight: 500; }
        .org-cta { background: #d2691e; color: #fff; font-size: 1.2rem; padding: 18px 40px; border-radius: 50px 50px 50px 50px / 60% 40% 60% 40%; box-shadow: 0 10px 24px rgba(210,105,30,0.3); }
        .org-cta:hover { background: #b85718; transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 32px rgba(210,105,30,0.4); }

        /* STORY SECTION */
        .org-story { padding: 120px 5%; background: #e8f3e5; position: relative; z-index: 2; border-radius: 60px 60px 0 0; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .org-s-img { background: #8fbc8f; border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 10rem; position: relative; }
        .org-s-img::after { content: '🚜'; position: absolute; bottom: 20px; right: 20px; font-size: 5rem; background: #fff; border-radius: 50%; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .org-s-txt h2 { font-size: 3.5rem; color: #2d452b; margin-bottom: 24px; line-height: 1.1; }
        .org-s-txt p { font-size: 1.2rem; color: #4a3b32; line-height: 1.8; margin-bottom: 24px; }

        /* PRODUCTS */
        .org-shop { padding: 120px 5%; background: #fdfbf7; position: relative; z-index: 2; }
        .org-sec-head { text-align: center; margin-bottom: 80px; }
        .org-sec-head h2 { font-size: 3.5rem; color: #2d452b; margin-bottom: 16px; }
        .org-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; max-width: 1300px; margin: 0 auto; }
        .org-card { background: #fff; padding: 16px; border-radius: 40px; box-shadow: 0 10px 30px rgba(74,59,50,0.05); transition: 0.4s cubic-bezier(0.16,1,0.3,1); position: relative; text-align: center; }
        .org-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(74,59,50,0.1); }
        .org-c-img-wrap { background: #fef3c7; height: 260px; border-radius: 32px; display: flex; align-items: center; justify-content: center; font-size: 6rem; margin-bottom: 24px; transition: 0.4s; }
        .org-card:hover .org-c-img-wrap { transform: scale(0.95); border-radius: 40px; }
        .org-c-tag { position: absolute; top: 32px; left: 32px; background: #fff; color: #d2691e; padding: 6px 16px; border-radius: 99px; font-size: 0.9rem; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.05); z-index: 2; }
        .org-c-tit { font-size: 1.5rem; color: #2d452b; margin-bottom: 8px; }
        .org-c-desc { font-size: 1.05rem; color: #8e8071; margin-bottom: 24px; line-height: 1.4; padding: 0 16px; }
        .org-c-pri { font-size: 1.8rem; font-weight: 700; color: #d2691e; }
        .org-c-bot { display: flex; justify-content: space-between; align-items: center; padding: 0 16px 16px; }
        .org-add { background: #fdfbf7; border: 2px solid #e2dcd3; color: #4a3b32; width: 48px; height: 48px; border-radius: 50%; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; }
        .org-add:hover { background: #8fbc8f; border-color: #8fbc8f; color: #fff; transform: rotate(90deg); }

        /* FOOTER */
        .org-foot { background: #2d452b; color: #e8f3e5; padding: 80px 5% 40px; border-radius: 60px 60px 0 0; }
        .org-f-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; max-width: 1300px; margin: 0 auto 60px; }
        .org-f-logo { font-size: 2.5rem; font-weight: 700; margin-bottom: 24px; color: #fff; }
        .org-f-txt { font-size: 1.1rem; line-height: 1.6; opacity: 0.8; max-width: 300px; }
        .org-f-col h4 { font-size: 1.2rem; font-family: 'Fraunces', serif; margin-bottom: 24px; color: #8fbc8f; letter-spacing: 0.05em; }
        .org-f-col ul { list-style: none; }
        .org-f-col li { margin-bottom: 16px; }
        .org-f-col a { transition: 0.2s; font-size: 1.1rem; }
        .org-f-col a:hover { color: #fff; padding-left: 8px; }
        .org-f-bot { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; text-align: center; font-size: 1rem; opacity: 0.6; }

        /* CART FLOATING SIDEBAR (BLOBBY) */
        .org-cart-ov { position: fixed; inset: 0; background: rgba(74,59,50,0.4); backdrop-filter: blur(4px); z-index: 2000; opacity: 0; pointer-events: none; transition: 0.4s; }
        .org-cart-ov.open { opacity: 1; pointer-events: all; }
        .org-cart { position: fixed; top: 16px; right: -420px; width: 400px; max-width: calc(100vw - 32px); height: calc(100vh - 32px); background: #fdfbf7; z-index: 2001; transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; flex-direction: column; border-radius: 40px; box-shadow: -10px 10px 40px rgba(0,0,0,0.1); overflow: hidden; }
        .org-cart.open { right: 16px; }
        .org-c-head { padding: 32px; background: #e8f3e5; display: flex; justify-content: space-between; align-items: center; border-radius: 40px 40px 0 0; }
        .org-c-head h3 { font-size: 2rem; color: #2d452b; }
        .org-c-close { background: #fff; width: 40px; height: 40px; border-radius: 50%; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; color: #4a3b32; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .org-c-close:hover { background: #fef0db; color: #d2691e; }
        .org-c-items { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
        .org-c-item { display: flex; gap: 16px; align-items: center; background: #fff; padding: 16px; border-radius: 24px; box-shadow: 0 4px 12px rgba(74,59,50,0.05); }
        .org-c-i-img { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
        .org-c-i-info { flex: 1; }
        .org-c-i-info h4 { font-size: 1.1rem; color: #2d452b; margin-bottom: 4px; }
        .org-c-i-info p { font-size: 0.95rem; color: #8e8071; }
        .org-c-i-pri { font-size: 1.1rem; font-weight: 700; color: #d2691e; }
        .org-c-del { font-size: 1.2rem; color: #ccc; cursor: pointer; padding: 8px; }
        .org-c-del:hover { color: #ef4444; background: #fee2e2; border-radius: 50%; }
        .org-c-foot { padding: 32px; background: #fff; border-top: 2px dashed #e2dcd3; border-radius: 0 0 40px 40px; }
        .org-c-tot { display: flex; justify-content: space-between; font-size: 1.5rem; font-family: 'Fraunces', serif; color: #2d452b; margin-bottom: 24px; }
        .org-c-btn { width: 100%; background: #8fbc8f; color: #fff; font-size: 1.2rem; padding: 20px; border-radius: 99px; box-shadow: 0 10px 24px rgba(143,188,143,0.3); }
        .org-c-btn:hover { background: #2d452b; box-shadow: 0 10px 24px rgba(45,69,43,0.3); transform: translateY(-2px); }

        .org-toast { position: fixed; top: 32px; left: 50%; transform: translate(-50%, -100px); background: #fef0db; color: #d2691e; font-weight: 700; font-size: 1.1rem; padding: 16px 32px; border-radius: 99px; box-shadow: 0 10px 30px rgba(210,105,30,0.15); z-index: 3000; transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); border: 2px solid #fae4c3; }
        .org-toast.show { transform: translate(-50%, 0); }

        @media(max-width: 900px) {
          .org-story { grid-template-columns: 1fr; border-radius: 40px 40px 0 0; text-align: center; gap: 40px; }
          .org-hero h1, .org-s-txt h2, .org-sec-head h2 { font-size: 3rem; }
          .org-f-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .org-f-txt { margin: 0 auto; }
          .org-menu { display: none; }
          .org-logo span { display: none; }
        }
      `}</style>
      <div className="org-d">
        <div className="org-blob-1" />
        <div className="org-blob-2" />

        <nav className="org-nav">
          <div className="org-logo">
            <div className="org-logo-icon">🌿</div>
            <span className="org-serif">Bizim Çiftlik</span>
          </div>
          <div className="org-menu">
            <a href="#">Taze Ürünler</a>
            <a href="#">Kilerimiz</a>
            <a href="#">Hikayemiz</a>
          </div>
          <button className="org-btn org-cart-btn" onClick={() => setCartOpen(true)}>
            Sepetim 🧺 <span style={{ background: '#fef0db', color: '#d2691e', padding: '2px 8px', borderRadius: '12px', marginLeft: '6px' }}>{cartCnt}</span>
          </button>
        </nav>

        <section className="org-hero">
          <Reveal><div className="org-pill">Doğadan Kapınıza • Ücretsiz Teslimat</div></Reveal>
          <Reveal delay={100}><h1 className="org-serif">Toprağın şifası,<br/>sofranızın neşesi.</h1></Reveal>
          <Reveal delay={200}><p>Kimyasal ilaç kullanmadan, ata tohumlarıyla yetiştirdiğimiz ürünlerimizi en taze haliyle, doğrudan tarladan kapınıza getiriyoruz.</p></Reveal>
          <Reveal delay={300}><button className="org-btn org-cta" onClick={() => document.getElementById('dukkan')?.scrollIntoView({ behavior: 'smooth' })}>Dükkanı Gez 🛒</button></Reveal>
        </section>

        <section className="org-story">
          <Reveal direction="left" className="org-s-img">🌾</Reveal>
          <Reveal direction="right" className="org-s-txt">
            <h2 className="org-serif">Dalından koptuğu gibi taptaze.</h2>
            <p>Her sabah gün doğumuyla beraber tarlamıza iniyor, sadece o gün olgunlaşan sebze ve meyveleri topluyoruz. Hiçbir ürünü depolamıyor, doğrudan size yolluyoruz.</p>
            <p>Toptancı yok, komisyoncu yok, beklemek yok. Sadece gerçek, lezzetli ve besleyici gıda var.</p>
          </Reveal>
        </section>

        <section className="org-shop" id="dukkan">
          <Reveal>
            <div className="org-sec-head">
              <h2 className="org-serif">Bu Haftanın Tazeleri</h2>
              <p style={{ fontSize: '1.2rem', color: '#6b5c51' }}>Sınırlı hasat, gerçek lezzet.</p>
            </div>
          </Reveal>
          
          <div className="org-grid">
            {ORGANIK_URUNLER.map((u, i) => (
              <Reveal key={u.id} delay={i * 100} className="org-card">
                {u.etiket && <div className="org-c-tag">{u.etiket}</div>}
                <div className="org-c-img-wrap" style={{ background: u.bg }}>{u.img}</div>
                <h3 className="org-c-tit org-serif">{u.ad}</h3>
                <p className="org-c-desc">{u.desc}</p>
                <div className="org-c-bot">
                  <div className="org-c-pri">{u.fiyat} ₺</div>
                  <button className="org-btn org-add" onClick={() => addToCart(u)}>+</button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <footer className="org-foot">
          <div className="org-f-grid">
            <div>
              <div className="org-f-logo org-serif">🌿 Bizim Çiftlik</div>
              <p className="org-f-txt">Gelecek nesillere bereketli topraklar bırakmak için onarıcı tarım yapıyoruz.</p>
            </div>
            <div className="org-f-col"><h4>Çiftlik</h4><ul><li><a href="#">Hasat Takvimi</a></li><li><a href="#">Tarlamızı Ziyaret Et</a></li><li><a href="#">Ata Tohumu Projesi</a></li><li><a href="#">Blog</a></li></ul></div>
            <div className="org-f-col"><h4>Müşteri</h4><ul><li><a href="#">Teslimat Bölgeleri</a></li><li><a href="#">Sık Sorulanlar</a></li><li><a href="#">İade Şartları</a></li><li><a href="#">İletişim</a></li></ul></div>
            <div className="org-f-col"><h4>Üyelikler</h4><ul><li><a href="#">Haftalık Kutu Aboneliği</a></li><li><a href="#">İndirim Kulübü</a></li><li><a href="#">Kurumsal Hediye</a></li></ul></div>
          </div>
          <div className="org-f-bot">
            <p>Demo Sistemi • kepenk.ai Organik Tarım Modülü © 2026</p>
          </div>
        </footer>

        {/* CART DRAW */}
        <div className={`org-cart-ov${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
        <div className={`org-cart${cartOpen ? ' open' : ''}`}>
          <div className="org-c-head">
            <h3 className="org-serif">Sepetiniz</h3>
            <button className="org-btn org-c-close" onClick={() => setCartOpen(false)}>✕</button>
          </div>
          <div className="org-c-items">
            {cart.length === 0 ? <div style={{ textAlign: 'center', marginTop: '40px', color: '#8e8071', fontSize: '1.2rem' }}>Sepetiniz maalesef boş. 🍂</div> : cart.map((i, idx) => (
              <div key={idx} className="org-c-item">
                <div className="org-c-i-img" style={{ background: i.bg }}>{i.img}</div>
                <div className="org-c-i-info">
                  <h4 className="org-serif">{i.ad}</h4>
                  <p>{i.qty} Adet</p>
                </div>
                <div className="org-c-i-pri">{i.fiyat * i.qty} ₺</div>
                <div className="org-c-del" onClick={() => rmCart(i.id)}>✕</div>
              </div>
            ))}
          </div>
          <div className="org-c-foot">
            <div className="org-c-tot">
              <span>Toplam</span>
              <span>{cartTot} ₺</span>
            </div>
            <button className="org-btn org-c-btn" onClick={() => { if(cart.length>0){showToast('🌿 Siparişiniz yola çıkmaya hazırlanıyor!'); setCart([]); setCartOpen(false)} }}>Siparişi Tamamla</button>
          </div>
        </div>

        <div className={`org-toast${toast ? ' show' : ''}`}>{toast}</div>
      </div>
    </>
  )
}
