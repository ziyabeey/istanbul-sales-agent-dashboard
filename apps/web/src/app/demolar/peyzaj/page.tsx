'use client'
import React, { useState, useEffect, useRef } from 'react'
import './lavandula.css'

/* ── Scroll Reveal ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible: v }
}
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return (<div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(36px)', transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>{children}</div>)
}

/* ── Counter Hook ── */
function useCounter(target: number, suffix = '') {
  const ref = useRef<HTMLSpanElement>(null)
  const counted = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !counted.current) {
        counted.current = true
        let current = 0; const step = target / 60
        const timer = setInterval(() => {
          current += step
          if (current >= target) { current = target; clearInterval(timer) }
          el.textContent = Math.floor(current) + suffix
        }, 16)
      }
    }, { threshold: 0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [target, suffix])
  return ref
}

/* ── Data ── */
const PRODUCTS = [
  { name: 'Güneş Enerjili Bahçe Aydınlatması (8\'li)', price: 29.99, tag: 'Aydınlatma' },
  { name: 'Genişleyebilir Bahçe Hortumu (15m)', price: 34.95, tag: 'Bahçe' },
  { name: 'Ağır Hizmet Bahçe Diz Minderi', price: 39.99, tag: 'Aksesuar' },
  { name: 'Organik Çok Amaçlı Bitki Gübresi', price: 14.50, tag: 'Gübre' },
  { name: 'Yükseltilmiş Bahçe Yatağı Kiti', price: 69.00, tag: 'Bahçe' },
  { name: 'Premium Budama Makası', price: 19.99, tag: 'Alet' },
]
const SERVICES = [
  { icon: '🌳', title: 'AĞAÇ & ÇALI BAKIMI', desc: 'Uzman budama, dikim ve hastalık önleme ile yeşil alanınızı koruyun.' },
  { icon: '🍂', title: 'MEVSİMSEL TEMİZLİK', desc: 'Bahçenizi her mevsime malç, temizlik ve bakımla hazırlayın.' },
  { icon: '🌿', title: 'ÇİM BAKIMI', desc: 'Çiminizi yıl boyunca yeşil, sağlıklı ve mükemmel biçilmiş tutun.' },
  { icon: '📐', title: 'BAHÇE TASARIMI', desc: 'Stilinize, alanınıza ve bütçenize göre özel bahçe düzeni tasarımları.' },
  { icon: '💧', title: 'SULAMA SİSTEMLERİ', desc: 'Akıllı sulama ve düzenli bakımla bitki sağlığını optimize edin.' },
  { icon: '🌸', title: 'EKİM & ÇİÇEK TARHLARI', desc: 'Uzman ekimi ve özel çiçek tarhleriyle bahçenizi güzelleştirin.' },
]
const TESTIMONIALS = [
  { name: 'Olivia Green', role: 'İç Mimar', text: 'Bahçe düzenlemelerindeki hassasiyetleri olağanüstü; açık alanları büyüleyici peyzajlara dönüştürüyorlar.' },
  { name: 'Robert Hayes', role: 'Otel Müdürü', text: 'Ekip, otelimizin açık alanlarını yaratıcı biçimde dönüştürdü ve misafirlerimizi detaylara verdikleri özenle etkiledi.' },
  { name: 'Thomas Wilson', role: 'Emekli', text: 'Dönüştürülmüş bahçemden her gün hissettiğim sevinç ve huzur gerçekten olağanüstü.' },
]
const FAQS = [
  { q: 'Toprak testi hizmeti sunuyor musunuz?', a: 'Evet, besin düzeylerini ve pH dengesini analiz etmek için toprak testi hizmetleri sunarak bitkilerinizin sağlığı için bilinçli kararlar almanıza yardımcı oluyoruz.' },
  { q: 'Sulama sistemi kuruyor musunuz?', a: 'Evet, suyu korurken bitkilerinizin doğru miktarda nem almasını sağlayan verimli sulama sistemleri kurma konusunda uzmanız.' },
  { q: 'Hangi zararlı kontrolü hizmetlerini sunuyorsunuz?', a: 'Denetim, tedavi ve önleme stratejileri dahil kapsamlı zararlı kontrolü sunarak bahçenizi zararlı böceklerden koruyoruz.' },
  { q: 'Hizmet sırasında evde olmam gerekiyor mu?', a: 'Hayır, gerekli değil. Ancak tercihlerinizi tam olarak anlamamız için ilk ziyarette hazır bulunmanızı öneriyoruz.' },
  { q: 'Yıl boyu bakım sunuyor musunuz?', a: 'Evet, dört mevsimi kapsayan yıllık planlar sunarak bahçenizin mevsimsel ihtiyaçlara uyum sağlayarak tüm yıl boyunca bakımlı kalmasını sağlıyoruz.' },
  { q: 'Peyzaj gerçekten mülk değerini artırır mı?', a: 'Evet. Profesyonel olarak bakımlı bir bahçe sadece görsel çekiciliği artırmakla kalmaz, aynı zamanda hava kalitesini iyileştirir ve mülk değerini önemli ölçüde artırır.' },
  { q: 'Sıfırdan bahçe tasarlayabilir misiniz?', a: 'Kesinlikle. Bahçe Tasarım hizmetimiz, stilinize, mevcut alanınıza ve bütçenize göre vizyonunuzu yansıtan benzersiz düzenler sunar.' },
]
const BLOG_POSTS = [
  { tag: 'Mevsimsel İpuçları', title: 'Dış Mekanda Estetik & İşlevselliği Nasıl Birleştirirsiniz?', desc: 'Uzman tasarım stratejileriyle dış mekanlarınızda güzellik ve pratikliği nasıl birleştireceğinizi keşfedin.' },
  { tag: 'Bahçecilik', title: '2025\'te Kaçınılması Gereken Peyzaj Hataları', desc: 'Daha sürdürülebilir ve görsel olarak çekici bir bahçe için bu yıl peyzajınızda kaçınmanız gereken temel hatalar.' },
  { tag: 'Doğa', title: 'Yerel Bitkileri Peyzajınıza Dahil Etme', desc: 'Yerel bitkilerin biyoçeşitliliği teşvik etmedeki rolünü ve bunları peyzaj çalışmalarınıza nasıl dahil edeceğinizi anlayın.' },
]

interface CartItem { name: string; price: number; qty: number }

export default function PeyzajDemo() {
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }
  const addToCart = (name: string, price: number) => {
    setCart(prev => {
      const ex = prev.find(i => i.name === name)
      if (ex) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { name, price, qty: 1 }]
    })
    showToast(`${name} sepete eklendi!`)
    setCartOpen(true)
  }
  const removeFromCart = (name: string) => setCart(prev => prev.filter(i => i.name !== name))
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const c1 = useCounter(12, '+')
  const c2 = useCounter(540, '+')
  const c3 = useCounter(98, '%')
  const c4 = useCounter(100, '%')

  // CSS gradient placeholders — no external images needed
  const galleryGradients = [
    'linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #6b9e6a 100%)',
    'linear-gradient(135deg, #4a7c59 0%, #7ab648 50%, #a8d5a2 100%)',
    'linear-gradient(135deg, #1a3d22 0%, #2d5a27 50%, #4a7c59 100%)',
    'linear-gradient(135deg, #3d6b2e 0%, #5a8c42 50%, #7ab648 100%)',
    'linear-gradient(135deg, #6b4c2a 0%, #8c6a42 50%, #a8845a 100%)',
    'linear-gradient(135deg, #2a5c3f 0%, #3d8c5e 50%, #5ab077 100%)',
  ]

  return (
    <div className="lv">
      {/* TOAST */}
      <div className={`lv-toast${toast ? ' show' : ''}`}>{toast}</div>
      {/* LIGHTBOX */}
      <div className={`lv-lightbox${lightbox ? ' active' : ''}`} onClick={() => setLightbox(null)}>
        <button className="lv-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
        {lightbox && <div style={{ width: '80vw', height: '60vh', background: lightbox, borderRadius: 16, display: 'flex', alignItems:'center', justifyContent:'center', fontSize: '8rem' }}>🌿</div>}
      </div>
      {/* CART */}
      <div className={`lv-cart-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`lv-cart-drawer${cartOpen ? ' open' : ''}`}>
        <div className="lv-cart-header">
          <h3>Sepetim ({cartCount})</h3>
          <button className="lv-cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        {cart.length === 0 ? <p style={{ color: '#888', textAlign: 'center', marginTop: 60 }}>Sepetiniz boş</p> : (
          <>
            {cart.map(item => (
              <div key={item.name} className="lv-cart-item">
                <div><h4>{item.name}</h4><p>{item.qty} adet × ${item.price.toFixed(2)}</p></div>
                <button className="lv-cart-remove" onClick={() => removeFromCart(item.name)}>Kaldır</button>
              </div>
            ))}
            <div className="lv-cart-total"><span>Toplam</span><span>${cartTotal.toFixed(2)}</span></div>
            <button className="lv-cart-checkout" onClick={() => { showToast('Sipariş alındı! 🎉'); setCart([]); setCartOpen(false) }}>Satın Al</button>
          </>
        )}
      </div>

      {/* NAVBAR */}
      <nav className={`lv-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="lv-nav-logo"><span className="icon">✳</span> Lavandula</div>
        <div className="lv-nav-links">
          <a href="#urunler">Ürünler</a><a href="#hizmetler">Hizmetler</a><a href="#galeri">Galeri</a><a href="#blog">Blog</a><a href="#iletisim">İletişim</a>
        </div>
        <div className="lv-nav-right">
          <button className="lv-btn-nav" onClick={() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })}>Ücretsiz Teklif Al</button>
          <span className="lv-cart-link" onClick={() => setCartOpen(true)}>Sepet <span className="lv-cart-badge">{cartCount}</span></span>
        </div>
      </nav>

      {/* HERO */}
      <section className="lv-hero">
        <div className="lv-hero-bg" style={{ background: 'linear-gradient(160deg, #1a3d22 0%, #2d5a27 30%, #4a7c59 65%, #6b9e6a 100%)' }} />
        <div className="lv-hero-overlay" />
        <div className="lv-hero-content">
          <div className="lv-hero-badge">★★★★☆ 4.7 Puan — 3.200 Müşteri Yorumundan</div>
          <h1>Peyzaj & Bahçecilik</h1>
          <p className="lv-hero-subtitle">ürün ve hizmetleri</p>
          <div className="lv-hero-cta">
            <button className="lv-btn-outline" onClick={() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })}>Ücretsiz Teklif Al</button>
            <button className="lv-btn-solid" onClick={() => document.getElementById('urunler')?.scrollIntoView({ behavior: 'smooth' })}>Ürünleri İncele</button>
          </div>
        </div>
        <div className="lv-scroll-hint">↓</div>
      </section>

      {/* PRODUCTS */}
      <section className="lv-products" id="urunler">
        <Reveal><h2 className="lv-section-title">Öne Çıkan Ürünler</h2></Reveal>
        <div className="lv-pgrid">
          {PRODUCTS.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="lv-pcard" onClick={() => addToCart(p.name, p.price)}>
                <div className="lv-pcard-img" style={{ background: `linear-gradient(135deg, hsl(${120 + i * 25}, 45%, 35%), hsl(${140 + i * 20}, 55%, 55%))`, display:'flex', alignItems:'center', justifyContent:'center', fontSize: '3rem' }}>
                  {['🌻','🪴','🌿','🌱','🌾','✂️'][i % 6]}
                </div>
                <h3>{p.name}</h3>
                <div className="price">${p.price.toFixed(2)}</div>
                <span className="lv-pcard-link">ÜRÜNÜ İNCELE →</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="lv-products-footer">
            <p>Başka bir şey mi arıyorsunuz?</p>
            <button className="lv-btn-outline-dark">Tüm Ürünleri Keşfet</button>
            <button className="lv-btn-solid" onClick={() => document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' })}>Hizmetlere İhtiyacım Var</button>
          </div>
        </Reveal>
      </section>

      {/* SERVICES INTRO */}
      <Reveal>
        <section className="lv-services-intro" id="hizmetler">
          <div>
            <h2>Bahçenizi yenilemek size rahatlama ve bağlantı getirecek</h2>
            <p>İyi tasarlanmış bir dış mekan, hava kalitesini iyileştirir, zihinsel sağlığı destekler ve mülk değerini artırır. Bahçeniz güzel olmanın ötesinde — daha sağlıklı, daha tatmin edici bir yaşam tarzını desteklemelidir.</p>
            <a className="lv-text-link" onClick={() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })}>ÜCRETSİZ TEKLİF AL →</a>
          </div>
          <div className="lv-services-img" style={{ background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 60%, #7ab648 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8rem', borderRadius:'inherit' }}>🧑‍🌾</div>
        </section>
      </Reveal>

      {/* STATS */}
      <div className="lv-stats">
        <div className="lv-stats-inner">
          <div className="lv-stat"><h2><span ref={c1}>0</span></h2><p>Yıllık peyzaj deneyimi</p></div>
          <div className="lv-stat"><h2><span ref={c2}>0</span></h2><p>Tamamlanan proje</p></div>
          <div className="lv-stat"><h2><span ref={c3}>0</span></h2><p>Müşteri memnuniyeti</p></div>
          <div className="lv-stat"><h2><span ref={c4}>0</span></h2><p>Çevre dostu uygulamalar</p></div>
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="lv-our-services">
        <Reveal><h2>Peyzaj & Bahçecilik Hizmetlerimiz</h2></Reveal>
        <div className="lv-sgrid">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="lv-scard">
                <span className="lv-scard-icon">{s.icon}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <Reveal>
        <section className="lv-why">
          <div className="lv-why-img" style={{ background: 'linear-gradient(135deg, #1a3d22 0%, #4a7c59 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8rem', borderRadius:20 }}>🌳</div>
          <div>
            <h2>Neden Bizi Seçmelisiniz</h2>
            {[
              { t: 'KİŞİSELLEŞTİRİLMİŞ HİZMET', d: 'Dinliyor, planlıyor ve ihtiyaçlarınıza uygun çözümler üretiyoruz.' },
              { t: 'ÇEVRE DOSTU UYGULAMALAR', d: 'Her adımda sürdürülebilir yöntemler ve çevre dostu malzemeler kullanıyoruz.' },
              { t: 'DENEYİMLİ PROFESYONELLER', d: 'Ekibimiz, her projede mükemmel sonuçlar için on yılı aşkın uzmanlık sunuyor.' },
            ].map((w, i) => (
              <div key={i} className="lv-why-item">
                <div className="lv-why-check">✓</div>
                <div><h4>{w.t}</h4><p>{w.d}</p></div>
              </div>
            ))}
            <button className="lv-btn-solid" onClick={() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })}>Ücretsiz Teklif Al</button>
          </div>
        </section>
      </Reveal>

      {/* GALLERY */}
      <section className="lv-gallery" id="galeri">
        <Reveal><h2>Müşteri Çalışma Galerisi</h2><p>Görsellere tıklayarak büyütebilirsiniz</p></Reveal>
        <Reveal>
          <div className="lv-gallery-grid">
            {galleryGradients.map((grad, i) => (
              <div
                key={i}
                className="lv-gallery-item"
                style={{ background: grad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3.5rem', cursor:'pointer' }}
                onClick={() => setLightbox(grad)}
              >
                {['🌿','🌸','🌳','🍃','🌺','🌱'][i]}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="lv-process">
        <Reveal><h2>Dış Mekanınızı Nasıl Dönüştürüyoruz</h2></Reveal>
        <div className="lv-process-grid">
          {[
            { num: '1.', title: 'İLK DANIŞMA', desc: 'Uzman budama, dikim ve hastalık önleme. Bahçenizin ihtiyaç duyduğu temel hizmet.' },
            { num: '2.', title: 'ÖZELLEŞTİRİLMİŞ PLAN', desc: 'Bahçenizi her mevsime malç, temizlik ve özenli bakımla hazırlama.' },
            { num: '3.', title: 'UYGULAMA & BAKIM', desc: 'Çiminizi yıl boyunca yeşil, sağlıklı ve mükemmel biçilmiş tutma.' },
            { num: '4.', title: 'SÜREGELEN DESTEK', desc: 'Her bütçeye uygun özel bahçe düzeni ve sürekli bakım desteği.' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 100}><div className="lv-step"><span className="lv-step-num">{s.num}</span><h4>{s.title}</h4><p>{s.desc}</p></div></Reveal>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE */}
      <Reveal>
        <section className="lv-subscribe">
          <div className="lv-subscribe-img" style={{ background: 'linear-gradient(135deg, #3d6b2e, #7ab648)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8rem', borderRadius:'inherit' }}>🌾</div>
          <div className="lv-subscribe-content">
            <small>ABONE OLUN</small>
            <h2>%15 İndirim ve ücretsiz yerinde değerlendirme kazanın</h2>
            <form className="lv-sub-form" onSubmit={(e) => { e.preventDefault(); showToast('Başarıyla abone oldunuz! 🌿') }}>
              <input type="email" placeholder="E-posta adresiniz" required />
              <button type="submit">Abone Ol</button>
            </form>
            <small className="policy">Abone olarak Gizlilik Politikamızı kabul etmiş olursunuz.</small>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS */}
      <section className="lv-testimonials">
        <Reveal><small>REFERANSLAR</small><h2>Müşterilerimiz ne diyor</h2></Reveal>
        <div className="lv-tgrid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="lv-tcard">
                <div className="lv-tcard-quote">&ldquo;</div>
                <p>{t.text}</p>
                <hr />
                <div className="lv-tcard-author">
                  <div className="lv-tcard-avatar">{t.name[0]}</div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="lv-blog" id="blog">
        <Reveal>
          <div className="lv-blog-header">
            <h2>Bahçecilik Haberleri</h2>
            <a className="lv-text-link">TÜM BLOG YAZILARINI KEŞFEDİN →</a>
          </div>
        </Reveal>
        {BLOG_POSTS.map((b, i) => (
          <Reveal key={i}>
            <article className={`lv-blog-post${i % 2 === 1 ? ' reverse' : ''}`}>
              <div className="lv-blog-post-img" style={{ background: galleryGradients[i], display:'flex', alignItems:'center', justifyContent:'center', fontSize:'5rem' }}>
                {['🌿','🌸','🌳'][i]}
              </div>
              <div>
                <span className="lv-blog-tag">{b.tag}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <a className="lv-read-more">YAZININ TAMAMINI OKU →</a>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* FAQ */}
      <section className="lv-faq">
        <Reveal><h2>Sıkça Sorulan Sorular</h2></Reveal>
        <div>
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className={`lv-faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="lv-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}<span className="lv-faq-icon">+</span>
                </button>
                <div className="lv-faq-a"><p>{f.a}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="lv-contact" id="iletisim">
        <Reveal>
          <div>
            <h2>Peyzaj projenize başlamaya hazır mısınız?</h2>
            <div className="lv-contact-item"><div className="ci-icon">✉</div><div><strong>E-posta Gönderin</strong><a href="mailto:contact@greenscaping.com">contact@greenscaping.com</a></div></div>
            <div className="lv-contact-item"><div className="ci-icon">📞</div><div><strong>Bizi Arayın</strong><p>(307) 555-1948</p></div></div>
            <div className="lv-contact-item"><div className="ci-icon">📍</div><div><strong>Bizi Ziyaret Edin</strong><p>128 Prairie Loop Rd, Buffalo | WY 82834, ABD</p></div></div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <form className="lv-form" onSubmit={(e) => { e.preventDefault(); showToast('Mesajınız gönderildi! Teşekkürler 🌱') }}>
            <div className="lv-form-row"><input placeholder="Adınız" required /><input placeholder="Soyadınız" required /></div>
            <input type="email" placeholder="E-posta adresiniz" required />
            <textarea placeholder="Mesajınız..." rows={6} />
            <button type="submit" className="lv-btn-solid" style={{ width: '100%', textAlign: 'center' }}>Mesaj Gönder</button>
            <small>İletişime geçerek Gizlilik Politikamızı kabul etmiş olursunuz.</small>
          </form>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="lv-footer">
        <div className="lv-footer-logo">✳ Lavandula</div>
        <p className="lv-footer-tag">Yeşil alanınız için her şey dahil bahçecilik & peyzaj hizmeti</p>
        <div className="lv-footer-links">
          <a href="#">Gizlilik Politikası</a><a href="#">Lisanslama</a><a href="#">Değişiklik Günlüğü</a>
        </div>
        <small>♥ ile yapıldı — Powered by kepenk.ai</small>
      </footer>
    </div>
  )
}
