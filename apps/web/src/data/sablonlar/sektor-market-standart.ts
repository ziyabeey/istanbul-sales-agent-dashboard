import { ortakNav, ortakFooter } from './ortak'

export const sablonMarketStandartHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{{SEO_ACIKLAMA}}">
<title>{{SEO_BASLIK}}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root {
  --renk-arkaplan: #fafaf7;
  --renk-kart: #ffffff;
  --renk-vurgu: #16a34a;
  --renk-hover: #15803d;
  --renk-metin: #1a1a1a;
  --renk-alt: #6b7280;
  --font-baslik: 'Outfit', sans-serif;
  --font-metin: 'Outfit', sans-serif;
  --nav-height: 64px;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:var(--font-metin); background:var(--renk-arkaplan); color:var(--renk-metin); }
nav { position:fixed; top:0; left:0; right:0; height:var(--nav-height); background:rgba(255,255,255,0.92); backdrop-filter:blur(16px); border-bottom:1px solid rgba(0,0,0,0.06); z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 5%; }
nav .logo { font-size:1.3rem; font-weight:800; color:var(--renk-vurgu); }
nav .links { display:flex; gap:20px; }
nav .links a { color:var(--renk-alt); text-decoration:none; font-size:0.85rem; font-weight:500; transition:color 0.3s; }
nav .links a:hover { color:var(--renk-vurgu); }
.hero { padding:calc(var(--nav-height) + 40px) 20px 60px; background:linear-gradient(135deg, #dcfce7 0%, #fafaf7 50%, #fef3c7 100%); text-align:center; }
.hero h1 { font-size:clamp(2rem,5vw,3.5rem); font-weight:800; line-height:1.2; margin-bottom:16px; }
.hero h1 span { color:var(--renk-vurgu); }
.hero p { font-size:1rem; color:var(--renk-alt); max-width:500px; margin:0 auto 28px; line-height:1.7; }
.btn-green { display:inline-flex; align-items:center; gap:8px; background:var(--renk-vurgu); color:#fff; padding:12px 28px; border-radius:12px; text-decoration:none; font-weight:700; font-size:0.9rem; transition:all 0.3s; border:none; cursor:pointer; }
.btn-green:hover { background:var(--renk-hover); transform:translateY(-2px); }
section { padding:80px 20px; }
.container { max-width:1100px; margin:0 auto; }
.sec-title { font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:800; text-align:center; margin-bottom:12px; }
.sec-sub { color:var(--renk-alt); text-align:center; font-size:0.95rem; max-width:500px; margin:0 auto 40px; }
.cats-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:16px; margin-bottom:40px; }
.cat-card { background:var(--renk-kart); border-radius:16px; padding:24px 16px; text-align:center; border:1px solid rgba(0,0,0,0.06); transition:all 0.3s; cursor:pointer; }
.cat-card:hover { transform:translateY(-4px); border-color:var(--renk-vurgu); box-shadow:0 12px 30px rgba(22,163,74,0.1); }
.cat-card .icon { font-size:2.5rem; margin-bottom:10px; }
.cat-card h4 { font-size:0.9rem; font-weight:700; }
.promo { background:var(--renk-vurgu); border-radius:24px; padding:48px 32px; text-align:center; color:#fff; position:relative; overflow:hidden; }
.promo::before { content:''; position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80') center/cover; opacity:0.15; }
.promo * { position:relative; z-index:2; }
.promo h2 { font-size:2rem; font-weight:800; margin-bottom:12px; }
.promo p { font-size:1rem; opacity:0.9; margin-bottom:24px; }
.features { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
.feat-card { background:var(--renk-kart); border-radius:16px; padding:28px; border:1px solid rgba(0,0,0,0.06); }
.feat-card .icon { font-size:1.8rem; margin-bottom:12px; }
.feat-card h4 { font-size:1rem; font-weight:700; margin-bottom:6px; }
.feat-card p { color:var(--renk-alt); font-size:0.82rem; line-height:1.6; }
footer { padding:48px 20px 24px; text-align:center; border-top:1px solid rgba(0,0,0,0.06); }
footer p { color:var(--renk-alt); font-size:0.8rem; }
@media (max-width:768px) { nav .links { display:none; } }
</style>
</head>
<body>

<nav>
  <div class="logo">🛒 {{ISLETME_ADI}}</div>
  <div class="links">
    <a href="#kategoriler">Kategoriler</a>
    <a href="#vitrin">Ürünler</a>
    <a href="#kampanya">Kampanya</a>
    <a href="#iletisim">İletişim</a>
  </div>
</nav>

{{MODUL_DUYURU_BANDI}}

<section class="hero">
  <p style="color:var(--renk-vurgu);font-weight:700;font-size:0.85rem;letter-spacing:2px;margin-bottom:12px">🛒 ONLINE MARKET</p>
  <h1>{{HERO_BASLIK}}</h1>
  <p>{{HERO_SLOGAN}}</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <a href="#vitrin" class="btn-green">🛍️ Ürünleri Keşfet</a>
    <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;border:2px solid var(--renk-vurgu);color:var(--renk-vurgu);padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:700;font-size:0.9rem">💬 WhatsApp Sipariş</a>
  </div>
</section>

<section id="kategoriler" style="background:#fff">
  <div class="container">
    <h2 class="sec-title">Kategoriler</h2>
    <p class="sec-sub">İhtiyacınıza uygun kategoriye tıklayarak ürünlere ulaşın</p>
    <div class="cats-grid">
      <div class="cat-card"><div class="icon">🥬</div><h4>Meyve & Sebze</h4></div>
      <div class="cat-card"><div class="icon">🥛</div><h4>Süt & Kahvaltı</h4></div>
      <div class="cat-card"><div class="icon">🍞</div><h4>Fırın & Unlu</h4></div>
      <div class="cat-card"><div class="icon">🥩</div><h4>Et & Şarküteri</h4></div>
      <div class="cat-card"><div class="icon">🧴</div><h4>Temizlik</h4></div>
      <div class="cat-card"><div class="icon">🍫</div><h4>Atıştırmalık</h4></div>
    </div>
  </div>
</section>

<!-- E-Ticaret Vitrin Modülü -->
<section id="vitrin">
{{MODUL_ETICARET_VITRIN}}
</section>

<section id="kampanya">
  <div class="container">
    <div class="promo">
      <h2>🎉 Haftalık İndirim</h2>
      <p>Seçili ürünlerde %30'a varan indirim fırsatını kaçırmayın!</p>
      <a href="https://wa.me/{{WHATSAPP}}?text=Kampanyalı+ürünler+hakkında+bilgi+almak+istiyorum" class="btn-green" style="background:#fff;color:var(--renk-vurgu)" target="_blank">📞 Detaylar İçin Arayın</a>
    </div>
  </div>
</section>

{{MODUL_KAMPANYA_AFISI}}
{{MODUL_GUNUN_OZEL}}

<section style="background:#fff">
  <div class="container">
    <h2 class="sec-title">Neden Bizi Tercih Etmelisiniz?</h2>
    <p class="sec-sub">Mahallenizin güvenilir marketinden alışveriş yapmanın avantajları</p>
    <div class="features">
      <div class="feat-card"><div class="icon">🚚</div><h4>Ücretsiz Teslimat</h4><p>150₺ üzeri siparişlerinizde ücretsiz eve teslimat hizmeti.</p></div>
      <div class="feat-card"><div class="icon">🌿</div><h4>Taze Ürünler</h4><p>Her gün halden taze gelen meyve ve sebze garantisi.</p></div>
      <div class="feat-card"><div class="icon">💰</div><h4>Uygun Fiyat</h4><p>Zincir market fiyatlarıyla rekabet eden özel fırsatlar.</p></div>
      <div class="feat-card"><div class="icon">📱</div><h4>WhatsApp Sipariş</h4><p>Listeyi gönderin, biz kapınıza getirelim.</p></div>
    </div>
  </div>
</section>

{{MODUL_CALISMA_SAATLERI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer>
  <p style="font-size:1.2rem;font-weight:800;color:var(--renk-vurgu);margin-bottom:10px">🛒 {{ISLETME_ADI}}</p>
  <p>{{ADRES_METNI}} · {{TELEFON_GOSTERIM}}</p>
  <p style="margin-top:16px">© 2024 {{ISLETME_ADI}} — Tüm hakları saklıdır.</p>
</footer>

{{MODUL_WHATSAPP_CANLI}}

</body>
</html>`
