import { ortakNav, ortakFooter } from './ortak'

export const sablonOtelPremiumHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{{SEO_ACIKLAMA}}">
<title>{{SEO_BASLIK}}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --renk-arkaplan: #0c0c0c;
  --renk-kart: #161616;
  --renk-vurgu: #b8860b;
  --renk-hover: #9a7209;
  --renk-metin: #f5f0e8;
  --renk-alt: #8a8070;
  --font-baslik: 'Cormorant Garamond', serif;
  --font-metin: 'Inter', sans-serif;
  --nav-height: 70px;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:var(--font-metin); background:var(--renk-arkaplan); color:var(--renk-metin); }
nav { position:fixed; top:0; left:0; right:0; height:var(--nav-height); background:rgba(12,12,12,0.85); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.06); z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 5%; }
nav .logo { font-family:var(--font-baslik); font-size:1.6rem; font-weight:700; color:var(--renk-vurgu); letter-spacing:1px; }
nav .links { display:flex; gap:24px; }
nav .links a { color:var(--renk-alt); text-decoration:none; font-size:0.85rem; font-weight:500; transition:color 0.3s; }
nav .links a:hover { color:var(--renk-vurgu); }
.hero { height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; position:relative; overflow:hidden; }
.hero::before { content:''; position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80') center/cover; }
.hero::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom, rgba(12,12,12,0.4) 0%, rgba(12,12,12,0.7) 70%, var(--renk-arkaplan) 100%); }
.hero-content { position:relative; z-index:2; max-width:700px; padding:0 20px; }
.hero h1 { font-family:var(--font-baslik); font-size:clamp(2.8rem,6vw,4.5rem); font-weight:700; line-height:1.15; margin-bottom:20px; color:#fff; }
.hero p { font-size:1.1rem; color:rgba(255,255,255,0.8); line-height:1.7; margin-bottom:32px; }
.btn-gold { display:inline-flex; align-items:center; gap:8px; background:var(--renk-vurgu); color:#fff; padding:14px 36px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.95rem; transition:all 0.3s; border:none; cursor:pointer; }
.btn-gold:hover { background:var(--renk-hover); transform:translateY(-2px); }
.btn-outline { display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(255,255,255,0.2); color:#fff; padding:14px 36px; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.95rem; transition:all 0.3s; }
.btn-outline:hover { border-color:var(--renk-vurgu); color:var(--renk-vurgu); }
section { padding:100px 20px; }
.container { max-width:1100px; margin:0 auto; }
.sec-title { font-family:var(--font-baslik); font-size:clamp(2rem,4vw,3rem); text-align:center; margin-bottom:16px; }
.sec-sub { color:var(--renk-alt); text-align:center; font-size:1rem; max-width:550px; margin:0 auto 50px; line-height:1.7; }
.room-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:24px; }
.room-card { background:var(--renk-kart); border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.04); transition:all 0.4s; }
.room-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(184,134,11,0.15); }
.room-card img { width:100%; height:220px; object-fit:cover; }
.room-card .info { padding:24px; }
.room-card h3 { font-family:var(--font-baslik); font-size:1.4rem; margin-bottom:8px; }
.room-card .price { color:var(--renk-vurgu); font-size:1.3rem; font-weight:800; margin-bottom:12px; }
.room-card .price small { color:var(--renk-alt); font-size:0.75rem; font-weight:400; }
.room-card .features { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
.room-card .feat { font-size:0.75rem; color:var(--renk-alt); background:rgba(255,255,255,0.04); padding:4px 10px; border-radius:6px; }
.amenities { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:24px; }
.amenity { text-align:center; padding:32px 20px; background:var(--renk-kart); border-radius:16px; border:1px solid rgba(255,255,255,0.04); }
.amenity .icon { font-size:2.5rem; margin-bottom:14px; }
.amenity h4 { font-family:var(--font-baslik); font-size:1.15rem; margin-bottom:6px; }
.amenity p { color:var(--renk-alt); font-size:0.8rem; line-height:1.6; }
.cta-section { background:linear-gradient(135deg, rgba(184,134,11,0.15), rgba(184,134,11,0.05)); border-radius:32px; padding:60px 40px; text-align:center; border:1px solid rgba(184,134,11,0.2); }
footer { padding:60px 20px 30px; border-top:1px solid rgba(255,255,255,0.06); text-align:center; }
footer p { color:var(--renk-alt); font-size:0.8rem; }
@media (max-width:768px) { nav .links { display:none; } .room-grid { grid-template-columns:1fr; } }
</style>
</head>
<body>

<nav>
  <div class="logo">🏨 {{ISLETME_ADI}}</div>
  <div class="links">
    <a href="#odalar">Odalar</a>
    <a href="#olanaklar">Olanaklar</a>
    <a href="#galeri">Galeri</a>
    <a href="#iletisim">İletişim</a>
  </div>
</nav>

{{MODUL_DUYURU_BANDI}}

<section class="hero">
  <div class="hero-content">
    <p style="color:var(--renk-vurgu);font-weight:600;font-size:0.9rem;letter-spacing:3px;margin-bottom:16px">✦ LUXURY EXPERIENCE</p>
    <h1>{{HERO_BASLIK}}</h1>
    <p>{{HERO_SLOGAN}}</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="btn-gold">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}" class="btn-outline" target="_blank">💬 {{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<section id="odalar">
  <div class="container">
    <h2 class="sec-title">Odalarımız & Süitler</h2>
    <p class="sec-sub">Her detayı titizlikle tasarlanmış odalarımızda lüks tatil deneyimini yaşayın.</p>
    <div class="room-grid">
      <div class="room-card">
        <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" alt="Standart Oda">
        <div class="info">
          <h3>Deluxe Oda</h3>
          <div class="price">₺2.400 <small>/ gece</small></div>
          <div class="features"><span class="feat">🛏️ Çift Kişilik</span><span class="feat">🌊 Deniz Manzarası</span><span class="feat">28m²</span></div>
          <a href="https://wa.me/{{WHATSAPP}}?text=Deluxe%20oda%20rezervasyon" class="btn-gold" style="width:100%;justify-content:center;padding:12px" target="_blank">Rezervasyon Yap</a>
        </div>
      </div>
      <div class="room-card">
        <img src="https://images.unsplash.com/photo-1590490360182-c33d955bc29b?w=600&q=80" alt="Süit">
        <div class="info">
          <h3>Junior Süit</h3>
          <div class="price">₺3.800 <small>/ gece</small></div>
          <div class="features"><span class="feat">🛏️ King Size</span><span class="feat">🏔️ Panoramik</span><span class="feat">45m²</span></div>
          <a href="https://wa.me/{{WHATSAPP}}?text=Junior%20Süit%20rezervasyon" class="btn-gold" style="width:100%;justify-content:center;padding:12px" target="_blank">Rezervasyon Yap</a>
        </div>
      </div>
      <div class="room-card">
        <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80" alt="Kral Dairesi">
        <div class="info">
          <h3>Kral Dairesi</h3>
          <div class="price">₺6.200 <small>/ gece</small></div>
          <div class="features"><span class="feat">🛏️ Ekstra Geniş</span><span class="feat">🌅 Teras</span><span class="feat">72m²</span></div>
          <a href="https://wa.me/{{WHATSAPP}}?text=Kral%20Dairesi%20rezervasyon" class="btn-gold" style="width:100%;justify-content:center;padding:12px" target="_blank">Rezervasyon Yap</a>
        </div>
      </div>
    </div>
  </div>
</section>

{{MODUL_RAKAMLARLA_BIZ}}

<section id="olanaklar" style="background:var(--renk-kart)">
  <div class="container">
    <h2 class="sec-title">Otel Olanakları</h2>
    <p class="sec-sub">Konaklamanızı benzersiz kılacak premium hizmetlerimiz</p>
    <div class="amenities">
      <div class="amenity"><div class="icon">🏊</div><h4>Infinity Havuz</h4><p>Deniz manzaralı ısıtmalı açık yüzme havuzu</p></div>
      <div class="amenity"><div class="icon">💆</div><h4>SPA & Wellness</h4><p>Sauna, hamam, masaj ve aromaterapi</p></div>
      <div class="amenity"><div class="icon">🍽️</div><h4>Fine Dining</h4><p>A la carte restoran ve açık büfe kahvaltı</p></div>
      <div class="amenity"><div class="icon">🏋️</div><h4>Fitness Center</h4><p>24 saat açık modern spor salonu</p></div>
      <div class="amenity"><div class="icon">🅿️</div><h4>Valet Parking</h4><p>Ücretsiz vale ve kapalı otopark</p></div>
      <div class="amenity"><div class="icon">🌐</div><h4>Hızlı WiFi</h4><p>Tüm alanlarda ücretsiz fiber internet</p></div>
    </div>
  </div>
</section>

{{MODUL_GOOGLE_YORUMLAR}}

<section>
  <div class="container">
    <div class="cta-section">
      <h2 class="sec-title" style="margin-bottom:16px">Unutulmaz Bir Konaklama İçin</h2>
      <p style="color:var(--renk-alt);margin-bottom:28px;font-size:1rem">Hemen rezervasyon yapın, erken kayıt indirimimizden yararlanın</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
        <a href="tel:{{TELEFON}}" class="btn-gold">📞 Hemen Arayın</a>
        <a href="https://wa.me/{{WHATSAPP}}?text=Rezervasyon%20yapmak%20istiyorum" class="btn-outline" target="_blank">💬 WhatsApp Rezervasyon</a>
      </div>
    </div>
  </div>
</section>

{{MODUL_HARITA_YOL_TARIFI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer>
  <p style="font-family:var(--font-baslik);font-size:1.3rem;color:var(--renk-vurgu);margin-bottom:12px">{{ISLETME_ADI}}</p>
  <p>{{ADRES_METNI}} · {{TELEFON_GOSTERIM}}</p>
  <p style="margin-top:20px">© 2024 {{ISLETME_ADI}} — Tüm hakları saklıdır.</p>
</footer>

{{MODUL_WHATSAPP_CANLI}}

</body>
</html>`
