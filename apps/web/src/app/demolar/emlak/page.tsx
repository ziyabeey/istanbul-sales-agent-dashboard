'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold: 0.1 }); obs.observe(el); return () => obs.disconnect() }, [])
  return { ref, visible: v }
}
function Reveal({ children, delay = 0, className = '', direction }: { children: React.ReactNode; delay?: number; className?: string; direction?: string }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: `all 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms` }}>{children}</div>
}

const EMLAK_DATA = [
  { id: 1, ad: 'The Bosphorus Yalı', lokasyon: 'Bebek, İstanbul', fiyat: '₺185.000.000', yatak: 6, banyo: 4, alan: '850m²', tag: 'Özel Satış', img: '🌊' },
  { id: 2, ad: 'Skyline Penthouse', lokasyon: 'Levazım, Beşiktaş', fiyat: '₺45.500.000', yatak: 4, banyo: 3, alan: '320m²', tag: 'Yeni Eklenen', img: '🌆' },
  { id: 3, ad: 'Azure Villa', lokasyon: 'Yalıkavak, Bodrum', fiyat: '₺68.000.000', yatak: 5, banyo: 5, alan: '600m²', tag: 'Deniz Manzaralı', img: '🌴' },
  { id: 4, ad: 'Forest Retreat', lokasyon: 'Zekeriyaköy, Sarıyer', fiyat: '₺32.000.000', yatak: 4, banyo: 3, alan: '450m²', tag: 'Doğa İçinde', img: '🌲' },
]

export default function EmlakDemoPage() {
  const [scrolled, setScrolled] = useState(false)
  const [leadForm, setLeadForm] = useState(false)
  const [toast, setToast] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    setLeadForm(false)
    setToast('Temsilcimiz sizinle en kısa sürede iletişime geçecektir.')
    setTimeout(() => setToast(''), 4000)
  }

  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -400, behavior: 'smooth' })
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 400, behavior: 'smooth' })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
        
        .em-d * { margin:0; padding:0; box-sizing:border-box; }
        .em-d { font-family: 'Jost', sans-serif; background: #faf9f5; color: #1a1a1a; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .em-d a { text-decoration: none; color: inherit; }
        .em-serif { font-family: 'Playfair Display', serif; }
        
        /* HEADER */
        .em-nav { position: fixed; top: 0; left: 0; width: 100%; padding: 24px 5%; display: flex; justify-content: space-between; align-items: center; z-index: 1000; transition: 0.4s; background: transparent; }
        .em-nav.scrolled { background: rgba(250,249,245,0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 16px 5%; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .em-logo { font-size: 1.5rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #1a1a1a; }
        .em-nav-links { display: flex; gap: 40px; }
        .em-nav-links a { font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; transition: 0.2s; position: relative; }
        .em-nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0%; height: 1px; background: #1a1a1a; transition: 0.3s; }
        .em-nav-links a:hover::after { width: 100%; }
        .em-contact-btn { background: #1a1a1a; color: #faf9f5; padding: 12px 28px; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer; transition: 0.3s; }
        .em-contact-btn:hover { background: #c2a672; }

        /* HERO */
        .em-hero { height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .em-hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat; filter: brightness(0.85); transform: scale(1.05); animation: kenburns 20s ease-out forwards; }
        @keyframes kenburns { to { transform: scale(1); } }
        .em-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%); }
        .em-hero-content { position: relative; z-index: 2; text-align: center; color: #fff; max-width: 1000px; padding: 0 5%; }
        .em-h-eyebrow { font-size: 0.9rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 24px; color: #c2a672; }
        .em-h-title { font-size: clamp(4rem, 8vw, 7rem); line-height: 1; letter-spacing: -0.02em; margin-bottom: 32px; font-weight: 400; text-shadow: 0 4px 24px rgba(0,0,0,0.2); }
        .em-search-box { background: #fff; padding: 8px; border-radius: 0; display: flex; max-width: 600px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .em-search-box input { flex: 1; border: none; padding: 16px 24px; font-size: 1rem; font-family: inherit; outline: none; background: transparent; color: #1a1a1a; }
        .em-search-btn { background: #c2a672; color: #fff; border: none; padding: 0 40px; font-weight: 500; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: 0.2s; }
        .em-search-btn:hover { background: #1a1a1a; }

        /* INTRO */
        .em-intro { padding: 120px 5%; text-align: center; max-width: 900px; margin: 0 auto; }
        .em-intro p { font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.4; color: #333; }
        .em-intro p strong { color: #c2a672; font-weight: 400; font-style: italic; }

        /* HORIZONTAL SCROLL EXPERIENCES */
        .em-horizontal { padding: 80px 0 120px 5%; overflow: hidden; position: relative; }
        .em-sec-head { margin-bottom: 60px; padding-right: 5%; display: flex; justify-content: space-between; align-items: flex-end; }
        .em-sec-title { font-size: 3rem; font-weight: 400; line-height: 1.1; color: #1a1a1a; }
        .em-controls { display: flex; gap: 16px; }
        .em-ctrl-btn { width: 56px; height: 56px; border-radius: 50%; border: 1px solid #1a1a1a; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; color: #1a1a1a; }
        .em-ctrl-btn:hover { background: #1a1a1a; color: #faf9f5; }
        
        .em-scroller { display: flex; gap: 40px; overflow-x: auto; padding-right: 5%; scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none; }
        .em-scroller::-webkit-scrollbar { display: none; }
        
        .em-card { flex: 0 0 400px; position: relative; cursor: pointer; group; }
        .em-c-img { height: 500px; background: #e0ddd5; overflow: hidden; margin-bottom: 24px; position: relative; }
        .em-c-img-inner { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 6rem; transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .em-card:hover .em-c-img-inner { transform: scale(1.05); }
        .em-c-tag { position: absolute; top: 20px; left: 20px; background: #fff; padding: 6px 12px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #1a1a1a; z-index: 2; }
        .em-c-price { font-size: 1.5rem; color: #c2a672; margin-bottom: 8px; }
        .em-c-title { font-size: 1.8rem; margin-bottom: 12px; line-height: 1.2; }
        .em-c-loc { font-size: 0.9rem; color: #666; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; }
        .em-c-specs { display: flex; gap: 24px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 16px; }
        .em-spec { font-size: 0.85rem; color: #333; font-weight: 500; }

        /* SPLIT SECTION */
        .em-split { display: grid; grid-template-columns: 1fr 1fr; background: #1a1a1a; color: #faf9f5; }
        .em-split-txt { padding: 120px 10%; display: flex; flex-direction: column; justify-content: center; }
        .em-split-txt h2 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 32px; color: #c2a672; }
        .em-split-txt p { font-size: 1.1rem; line-height: 1.8; color: #ccc; margin-bottom: 40px; }
        .em-spl-btn { color: #faf9f5; text-decoration: none; border-bottom: 1px solid #c2a672; padding-bottom: 4px; display: inline-flex; width: fit-content; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.85rem; transition: 0.2s; }
        .em-spl-btn:hover { color: #c2a672; }
        .em-split-img { background: #2a2a2a; position: relative; overflow: hidden; min-height: 600px; display: flex; align-items: center; justify-content: center; font-size: 10rem; }

        /* STATS / EXPERTISE */
        .em-stats { padding: 120px 5%; border-top: 1px solid rgba(0,0,0,0.05); }
        .em-s-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; max-width: 1200px; margin: 0 auto; text-align: center; }
        .em-stat-num { font-size: 4rem; color: #c2a672; line-height: 1; margin-bottom: 16px; font-variant-numeric: tabular-nums; }
        .em-stat-lbl { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #666; }

        /* FOOTER */
        .em-footer { padding: 80px 5% 40px; background: #faf9f5; border-top: 1px solid rgba(0,0,0,0.1); }
        .em-f-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; max-width: 1400px; margin: 0 auto 60px; }
        .em-f-brand h3 { font-size: 2rem; margin-bottom: 24px; color: #1a1a1a; }
        .em-f-brand p { color: #666; font-size: 0.9rem; line-height: 1.6; max-width: 300px; }
        .em-f-col h4 { font-family: 'Jost', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; color: #1a1a1a; }
        .em-f-col ul { list-style: none; }
        .em-f-col li { margin-bottom: 16px; }
        .em-f-col a { color: #666; font-size: 0.9rem; transition: 0.2s; }
        .em-f-col a:hover { color: #c2a672; }
        .em-f-bot { border-top: 1px solid rgba(0,0,0,0.05); padding-top: 32px; display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; max-width: 1400px; margin: 0 auto; }

        /* MODAL */
        .em-modal-ov { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 2000; opacity: 0; pointer-events: none; transition: 0.3s; display: flex; align-items: center; justify-content: center; }
        .em-modal-ov.open { opacity: 1; pointer-events: all; }
        .em-modal { background: #faf9f5; width: 100%; max-width: 500px; padding: 48px; position: relative; transform: translateY(40px); transition: 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .em-modal-ov.open .em-modal { transform: translateY(0); }
        .em-m-close { position: absolute; top: 24px; right: 24px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #1a1a1a; }
        .em-m-inp { width: 100%; padding: 16px 0; border: none; border-bottom: 1px solid rgba(0,0,0,0.2); background: transparent; font-size: 1rem; font-family: inherit; margin-bottom: 24px; outline: none; transition: 0.3s; }
        .em-m-inp:focus { border-bottom-color: #c2a672; }
        .em-m-btn { width: 100%; background: #1a1a1a; color: #faf9f5; border: none; padding: 18px; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; margin-top: 16px; transition: 0.3s; }
        .em-m-btn:hover { background: #c2a672; }

        .em-toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(100px); background: #1a1a1a; color: #fff; padding: 16px 32px; font-size: 0.9rem; z-index: 3000; transition: 0.4s; }
        .em-toast.show { transform: translateX(-50%) translateY(0); }

        @media(max-width: 1024px) {
          .em-nav-links { display: none; }
          .em-split { grid-template-columns: 1fr; }
          .em-split-txt { padding: 80px 5%; }
          .em-split-img { min-height: 400px; }
          .em-s-grid { grid-template-columns: 1fr 1fr; gap: 60px; }
          .em-f-grid { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width: 768px) {
          .em-h-title { font-size: 3.5rem; }
          .em-search-box { flex-direction: column; background: transparent; box-shadow: none; gap: 16px; }
          .em-search-box input { background: #fff; border-radius: 4px; }
          .em-search-btn { padding: 16px; border-radius: 4px; }
          .em-s-grid { grid-template-columns: 1fr; gap: 40px; }
          .em-f-grid { grid-template-columns: 1fr; }
          .em-f-bot { flex-direction: column; gap: 16px; text-align: center; }
          .em-card { flex: 0 0 85vw; }
          .em-controls { display: none; }
          .em-sec-title { font-size: 2.2rem; }
        }
      `}</style>

      <div className="em-d">
        <nav className={`em-nav${scrolled ? ' scrolled' : ''}`}>
          <div className="em-logo">LUXE <span style={{ color: '#c2a672' }}>ESTATE</span></div>
          <div className="em-nav-links">
            <a href="#">Satılık</a>
            <a href="#">Kiralık</a>
            <a href="#">Projeler</a>
            <a href="#">Hakkımızda</a>
          </div>
          <button className="em-contact-btn" onClick={() => setLeadForm(true)}>Bize Ulaşın</button>
        </nav>

        {/* HERO */}
        <section className="em-hero">
          <div className="em-hero-bg" />
          <div className="em-hero-overlay" />
          <div className="em-hero-content">
            <Reveal><div className="em-h-eyebrow">Ayrıcalıklı Yaşam Alanları</div></Reveal>
            <Reveal delay={100}><h1 className="em-h-title em-serif">Hayalinizdeki<br/>Evi Keşfedin.</h1></Reveal>
            <Reveal delay={200}>
              <div className="em-search-box">
                <input type="text" placeholder="Bölge, şehir veya proje adı..." />
                <button className="em-search-btn">Portföyü Ara</button>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div style={{ marginTop: '32px', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>
                Demo Modeli • kepenk.ai Emlak Modülü
              </div>
            </Reveal>
          </div>
        </section>

        {/* INTRO */}
        <section className="em-intro">
          <Reveal>
            <p className="em-serif">
              "Sadece <strong>en seçkin</strong> konumları ve eşsiz mimari eserleri titizlikle seçiyor, size mükemmel yaşamın kapılarını aralıyoruz."
            </p>
          </Reveal>
        </section>

        {/* HORIZONTAL SCROLL - PROPERTIES */}
        <section className="em-horizontal">
          <Reveal>
            <div className="em-sec-head">
              <h2 className="em-sec-title em-serif">Öne Çıkan<br/>Portföy</h2>
              <div className="em-controls">
                <button className="em-ctrl-btn" onClick={scrollLeft}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg></button>
                <button className="em-ctrl-btn" onClick={scrollRight}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg></button>
              </div>
            </div>
          </Reveal>

          <div className="em-scroller" ref={scrollContainerRef}>
            {EMLAK_DATA.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} className="em-card">
                <div onClick={() => setLeadForm(true)}>
                  <div className="em-c-img">
                    {p.tag && <div className="em-c-tag">{p.tag}</div>}
                    <div className="em-c-img-inner">{p.img}</div>
                  </div>
                  <div className="em-c-price em-serif">{p.fiyat}</div>
                  <h3 className="em-c-title em-serif">{p.ad}</h3>
                  <div className="em-c-loc">{p.lokasyon}</div>
                  <div className="em-c-specs">
                    <div className="em-spec">🛏️ {p.yatak} Yatak</div>
                    <div className="em-spec">🛁 {p.banyo} Banyo</div>
                    <div className="em-spec">📐 {p.alan}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SPLIT SECTION */}
        <section className="em-split">
          <Reveal direction="left" className="em-split-txt">
            <h2 className="em-serif">Miras Değerindeki Mülklerinizi Değerlendiriyoruz.</h2>
            <p>Gayrimenkulünüzü uluslararası çapraz ağımız ve ayrıcalıklı müşteri portföyümüzle en doğru alıcıyla buluşturuyoruz. Sürecin her adımında kişiye özel gizlilik esaslı danışmanlık hizmeti sunuyoruz.</p>
            <div>
              <a href="#" className="em-spl-btn" onClick={(e) => { e.preventDefault(); setLeadForm(true) }}>Ücretsiz Değerleme Talep Et</a>
            </div>
          </Reveal>
          <Reveal direction="right" className="em-split-img">
            🏛️
          </Reveal>
        </section>

        {/* STATS */}
        <section className="em-stats">
          <Reveal>
            <div className="em-s-grid">
              <div><div className="em-stat-num em-serif">25+</div><div className="em-stat-lbl">Yıllık Deneyim</div></div>
              <div><div className="em-stat-num em-serif">₺8.4B</div><div className="em-stat-lbl">Yıllık İşlem Hacmi</div></div>
              <div><div className="em-stat-num em-serif">14</div><div className="em-stat-lbl">Küresel Ofis</div></div>
              <div><div className="em-stat-num em-serif">450+</div><div className="em-stat-lbl">Özel Portföy</div></div>
            </div>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="em-footer">
          <div className="em-f-grid">
            <div className="em-f-brand">
              <h3 className="em-serif">LUXE ESTATE</h3>
              <p>Türkiye'nin en seçkin lokasyonlarında, yüksek vizyonlu müşterilerimize ultra lüks yaşam standartları sunuyoruz.</p>
            </div>
            <div className="em-f-col"><h4>Hizmetler</h4><ul><li><a href="#">Satış Danışmanlığı</a></li><li><a href="#">Kiralama Hizmetleri</a></li><li><a href="#">Proje Geliştirme</a></li><li><a href="#">Mülk Yönetimi</a></li></ul></div>
            <div className="em-f-col"><h4>Keşfet</h4><ul><li><a href="#">İstanbul Yalılar</a></li><li><a href="#">Bodrum Villalar</a></li><li><a href="#">Yeni Projeler</a></li><li><a href="#">Piyasa Raporları</a></li></ul></div>
            <div className="em-f-col"><h4>İletişim</h4><ul><li><a href="#">Bebek, İstanbul</a></li><li><a href="#">+90 212 555 0101</a></li><li><a href="#">info@luxeestate.com.tr</a></li><li><a href="#">Instagram</a></li></ul></div>
          </div>
          <div className="em-f-bot">
            <span>© 2026 Luxe Estate Turkey. Tüm hakları saklıdır.</span>
            <span>Design system powered by kepenk.ai Emlak Engine</span>
          </div>
        </footer>

        {/* MODAL / TOAST */}
        <div className={`em-modal-ov${leadForm ? ' open' : ''}`} onClick={() => setLeadForm(false)}>
          <div className="em-modal" onClick={e => e.stopPropagation()}>
            <button className="em-m-close" onClick={() => setLeadForm(false)}>✕</button>
            <h3 className="em-serif" style={{ fontSize: '2rem', marginBottom: '8px', color: '#c2a672' }}>Ayrıcalığı Keşfedin</h3>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '32px', lineHeight: '1.5' }}>İlgilendiğiniz gayrimenkul veya danışmanlık hizmetlerimiz için bilgilerinizi bırakın, lüks konut uzmanımız sizi arasın.</p>
            <form onSubmit={handleContact}>
              <input type="text" className="em-m-inp" placeholder="Adınız Soyadınız" required />
              <input type="tel" className="em-m-inp" placeholder="Telefon Numaranız" required />
              <input type="email" className="em-m-inp" placeholder="E-posta Adresiniz" />
              <button type="submit" className="em-m-btn">Gönder</button>
            </form>
          </div>
        </div>

        <div className={`em-toast${toast ? ' show' : ''}`}>{toast}</div>
      </div>
    </>
  )
}
