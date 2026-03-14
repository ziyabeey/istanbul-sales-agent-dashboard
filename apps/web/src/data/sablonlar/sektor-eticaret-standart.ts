export const sablonEticaretStandartHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SEO_BASLIK}}</title>
  <meta name="description" content="{{SEO_ACIKLAMA}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@400;600;700;900&family={{FONT_METIN}}:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --renk-arkaplan: {{CSS_ARKAPLAN}};
      --renk-kart: {{CSS_KART}};
      --renk-vurgu: {{CSS_VURGU}};
      --renk-hover: {{CSS_HOVER}};
      --renk-metin: {{CSS_METIN}};
      --renk-alt: {{CSS_ALT}};
      --font-baslik: '{{FONT_BASLIK}}', sans-serif;
      --font-metin: '{{FONT_METIN}}', sans-serif;
    }
    body {
      margin: 0;
      font-family: var(--font-metin);
      background-color: var(--renk-arkaplan);
      color: var(--renk-metin);
      line-height: 1.6;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 { font-family: var(--font-baslik); margin: 0; }
    a { color: inherit; text-decoration: none; }
    * { box-sizing: border-box; }
    
    /* E-Commerce Specific Styles */
    .hero-slider {
      background-image: var(--renk-gradient, linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))), url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80');
      background-size: cover;
      background-position: center;
    }
    .product-card {
      background: var(--renk-kart);
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      border: 1px solid rgba(0,0,0,0.05); /* Assuming light theme mostly for E-com */
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.08);
    }
    .btn-cart { background: var(--renk-metin); color: var(--renk-arkaplan); border: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.3s; width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px; }
    .btn-cart:hover { background: var(--renk-vurgu); color: #fff; }
    
    /* Header Announce */
    .top-bar { background: var(--renk-metin); color: var(--renk-arkaplan); font-size: 0.85rem; padding: 10px 20px; text-align: center; font-weight: 600; letter-spacing: 0.05em; }
    
    /* Animations */
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
    .d-1 { animation-delay: 0.1s; }
    .d-2 { animation-delay: 0.2s; }
  </style>
</head>
<body>

  <!-- Top Announcement -->
  <div class="top-bar">🔥 TÜM SİPARİŞLERDE ÜCRETSİZ KARGO | %20 İNDİRİM KODU: HOŞGELDİN20</div>

  <!-- Header -->
  <header style="background:var(--renk-arkaplan); padding:20px; border-bottom:1px solid rgba(0,0,0,0.05); position:sticky; top:0; z-index:100;">
    <div style="max-width:1400px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
      <a href="#" style="font-family:var(--font-baslik); font-size:2rem; font-weight:900; letter-spacing:-1px;">{{ISLETME_ADI}}</a>
      <div style="display:none; md:display:flex; gap:30px; font-weight:600; font-size:1.05rem;">
        <a href="#yeni" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Yeni Gelenler</a>
        <a href="#katalog" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Koleksiyonlar</a>
        <a href="#iletisim" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">İletişim</a>
      </div>
      <div style="display:flex; gap:16px;">
        <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="width:45px; height:45px; border-radius:50%; background:rgba(0,0,0,0.05); display:flex; align-items:center; justify-content:center; transition:background 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'; this.style.color='#fff';" onmouseout="this.style.background='rgba(0,0,0,0.05)'; this.style.color='inherit';">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>
        <div style="width:45px; height:45px; border-radius:50%; background:var(--renk-metin); color:var(--renk-arkaplan); display:flex; align-items:center; justify-content:center; position:relative; cursor:pointer;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span style="position:absolute; top:-5px; right:-5px; background:var(--renk-vurgu); color:#fff; font-size:11px; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">0</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-slider" style="height:85vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:20px; color:#fff;">
    <div style="max-width:800px; z-index:2;">
      <span class="animate-in d-1" style="display:block; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:20px; font-size:1rem; opacity:0.9;">YENİ SEZON KOLEKSİYONU</span>
      <h1 class="animate-in d-2" style="font-size:clamp(3rem, 7vw, 5rem); line-height:1.1; margin-bottom:30px;">{{HERO_BASLIK}}</h1>
      <p class="animate-in d-2" style="font-size:1.3rem; margin-bottom:40px; opacity:0.9;">{{HERO_SLOGAN}}</p>
      <div class="animate-in d-2">
        <a href="#katalog" style="display:inline-block; background:#fff; color:#000; padding:20px 40px; font-family:var(--font-baslik); font-weight:800; font-size:1.1rem; border-radius:4px; text-transform:uppercase; transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='none'">{{HERO_CTA_BIRINCIL}}</a>
      </div>
    </div>
  </section>

  <!-- Featured Categories -->
  <section style="padding:80px 20px; background:var(--renk-arkaplan);">
    <div style="max-width:1400px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px;">
      <div style="position:relative; height:400px; border-radius:16px; overflow:hidden; cursor:pointer;" onmouseover="this.querySelector('img').style.transform='scale(1.1)'" onmouseout="this.querySelector('img').style.transform='none'">
        <img src="https://images.unsplash.com/photo-1434389670869-bac8e22eee08?w=600&q=80" style="width:100%; height:100%; object-fit:cover; transition:transform 0.6s;" alt="Kategori"/>
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.6), transparent); display:flex; align-items:flex-end; padding:30px;">
          <h3 style="color:#fff; font-size:1.8rem;">Giyim</h3>
        </div>
      </div>
      <div style="position:relative; height:400px; border-radius:16px; overflow:hidden; cursor:pointer;" onmouseover="this.querySelector('img').style.transform='scale(1.1)'" onmouseout="this.querySelector('img').style.transform='none'">
        <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80" style="width:100%; height:100%; object-fit:cover; transition:transform 0.6s;" alt="Kategori"/>
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.6), transparent); display:flex; align-items:flex-end; padding:30px;">
          <h3 style="color:#fff; font-size:1.8rem;">Ayakkabı</h3>
        </div>
      </div>
      <div style="position:relative; height:400px; border-radius:16px; overflow:hidden; cursor:pointer;" onmouseover="this.querySelector('img').style.transform='scale(1.1)'" onmouseout="this.querySelector('img').style.transform='none'">
        <img src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80" style="width:100%; height:100%; object-fit:cover; transition:transform 0.6s;" alt="Kategori"/>
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.6), transparent); display:flex; align-items:flex-end; padding:30px;">
          <h3 style="color:#fff; font-size:1.8rem;">Aksesuar</h3>
        </div>
      </div>
    </div>
  </section>

  <!-- Modül: Katalog (Products) -->
  {{MODUL_KATALOG}}

  <!-- Trust Indicators -->
  <section style="padding:60px 20px; border-top:1px solid rgba(0,0,0,0.05); border-bottom:1px solid rgba(0,0,0,0.05); background:var(--renk-kart);">
    <div style="max-width:1400px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:40px; text-align:center;">
      <div>
        <div style="font-size:2rem; margin-bottom:16px;">🚚</div>
        <h4 style="font-size:1.1rem; margin-bottom:8px;">Hızlı Kargo</h4>
        <p style="color:var(--renk-alt); font-size:0.9rem;">Tüm siparişlerde ücretsiz ve hızlı teslimat.</p>
      </div>
      <div>
        <div style="font-size:2rem; margin-bottom:16px;">💳</div>
        <h4 style="font-size:1.1rem; margin-bottom:8px;">Güvenli Ödeme</h4>
        <p style="color:var(--renk-alt); font-size:0.9rem;">256-bit SSL sertifikası ile %100 güvenli alışveriş.</p>
      </div>
      <div>
        <div style="font-size:2rem; margin-bottom:16px;">↩️</div>
        <h4 style="font-size:1.1rem; margin-bottom:8px;">Kolay İade</h4>
        <p style="color:var(--renk-alt); font-size:0.9rem;">14 gün içinde koşulsuz şartsız iade garantisi.</p>
      </div>
      <div>
        <div style="font-size:2rem; margin-bottom:16px;">📞</div>
        <h4 style="font-size:1.1rem; margin-bottom:8px;">7/24 Destek</h4>
        <p style="color:var(--renk-alt); font-size:0.9rem;">Müşteri hizmetlerimiz her zaman yanınızda.</p>
      </div>
    </div>
  </section>

  <!-- CTA / Geleneksel Modüller -->
  {{MODUL_SIPARIS_LINKI}}
  {{MODUL_SSS_GENIS}}

  <!-- Footer -->
  <footer style="background:var(--renk-metin); color:var(--renk-arkaplan); padding:80px 20px 40px; margin-top:0;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:60px; margin-bottom:60px;">
        <div>
          <h2 style="font-family:var(--font-baslik); font-size:2rem; font-weight:900; margin-bottom:24px;">{{ISLETME_ADI}}</h2>
          <p style="opacity:0.7; font-size:0.95rem; line-height:1.8; margin-bottom:24px;">En yeni trendler ve en kaliteli ürünler ile tarzınızı yansıtın.</p>
          <div style="display:flex; gap:16px;">
            <!-- Social Icons would go here -->
            <a href="{{INSTAGRAM_URL}}" target="_blank" style="opacity:0.7; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">Instagram</a>
            <a href="{{FACEBOOK_URL}}" target="_blank" style="opacity:0.7; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">Facebook</a>
          </div>
        </div>
        <div>
          <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:24px; text-transform:uppercase; letter-spacing:0.05em;">Bağlantılar</h3>
          <ul style="list-style:none; padding:0; margin:0; opacity:0.7; line-height:2.5; font-size:0.95rem;">
            <li><a href="#katalog">Koleksiyon</a></li>
            <li><a href="#sss">Sıkça Sorulan Sorular</a></li>
            <li><a href="#">Kargo ve İade</a></li>
            <li><a href="#">Gizlilik Politikası</a></li>
          </ul>
        </div>
        <div>
          <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:24px; text-transform:uppercase; letter-spacing:0.05em;">İletişim</h3>
          <ul style="list-style:none; padding:0; margin:0; opacity:0.7; line-height:2.5; font-size:0.95rem;">
            <li>📍 {{ADRES_METNI}}</li>
            <li>📞 {{TELEFON_GOSTERIM}}</li>
            <li>✉️ info@{{ISLETME_KISAADI}}.com</li>
            <li style="margin-top:10px;"><a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="display:inline-block; border-bottom:1px solid currentColor;">WhatsApp Destek</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; opacity:0.5; font-size:0.9rem;">
        <div>&copy; ${new Date().getFullYear()} {{ISLETME_ADI}}. Tüm Hakları Saklıdır.</div>
        <div>Powered by kepenk.ai</div>
      </div>
    </div>
  </footer>
</body>
</html>`
