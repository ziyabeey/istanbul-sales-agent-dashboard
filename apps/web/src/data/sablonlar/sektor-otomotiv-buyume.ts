export const sablonOtomotivBuyumeHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SEO_BASLIK}}</title>
  <meta name="description" content="{{SEO_ACIKLAMA}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@500;700;900&family={{FONT_METIN}}:wght@300;400;600&display=swap" rel="stylesheet">
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
    
    /* Automotive Specific Styles */
    .hero-bg {
      background-image: linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&q=80');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
    .neon-border {
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }
    .btn-primary { 
      background: var(--renk-vurgu); 
      color: #fff; 
      border: none; 
      padding: 16px 32px; 
      border-radius: 4px; 
      font-weight: 700; 
      font-size: 1.1rem; 
      cursor: pointer; 
      transition: all 0.3s; 
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .btn-primary:hover { 
      background: var(--renk-hover); 
      box-shadow: 0 0 20px rgba(var(--renk-vurgu-rgb, 200,50,0), 0.5);
    }
    .car-card {
      background: var(--renk-kart);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.05);
      transition: transform 0.3s;
    }
    .car-card:hover {
      transform: translateY(-10px);
      border-color: var(--renk-vurgu);
    }
    
    /* Specs table */
    .specs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.85rem; padding: 15px 20px; border-top: 1px solid rgba(255,255,255,0.05); }
    .spec-item { display: flex; align-items: center; gap: 6px; color: var(--renk-alt); }
    
    /* Animations */
    @keyframes slideRight { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
    .animate-right { animation: slideRight 0.8s ease-out forwards; opacity: 0; }
    .d-1 { animation-delay: 0.1s; }
    .d-2 { animation-delay: 0.3s; }
    .d-3 { animation-delay: 0.5s; }
  </style>
</head>
<body style="background:#0a0a0a;">

  <!-- Minimal Header -->
  <header style="position:absolute; top:0; width:100%; z-index:100; padding:30px 20px; background:linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);">
    <div style="max-width:1400px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
      <a href="#" style="font-family:var(--font-baslik); font-size:2rem; font-weight:900; color:#fff; letter-spacing:1px; text-transform:uppercase;">
        {{ISLETME_ADI}} <span style="color:var(--renk-vurgu);">.</span>
      </a>
      <div style="display:none; md:display:flex; gap:40px; color:#fff; font-weight:600; font-size:0.95rem; text-transform:uppercase; letter-spacing:1px;">
        <a href="#filo" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Filomuz</a>
        <a href="#hizmetler" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Hizmetler</a>
        <a href="#iletisim" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">İletişim</a>
      </div>
      <a href="tel:{{TELEFON}}" style="display:flex; align-items:center; gap:10px; color:#fff; font-weight:700;">
        <div style="width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center;">📞</div>
        <span style="display:none; sm:display:inline;">{{TELEFON_GOSTERIM}}</span>
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-bg" style="min-height:100vh; display:flex; align-items:center; padding:120px 20px 0; color:#fff;">
    <div style="max-width:1400px; margin:0 auto; width:100%;">
      <div style="max-width:700px;">
        <h1 class="animate-right d-1" style="font-size:clamp(3.5rem, 8vw, 6rem); line-height:1; margin-bottom:20px; text-transform:uppercase; letter-spacing:-2px;">{{HERO_BASLIK}}</h1>
        <p class="animate-right d-2" style="font-size:1.4rem; color:rgba(255,255,255,0.7); margin-bottom:40px; max-width:500px; font-weight:300;">{{HERO_SLOGAN}}</p>
        <div class="animate-right d-3" style="display:flex; gap:20px; flex-wrap:wrap;">
          <a href="#filo" class="btn-primary">{{HERO_CTA_BIRINCIL}}</a>
          <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="btn-primary" style="background:transparent; border:1px solid #fff; box-shadow:none;">WhatsApp</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Araç Sorgulama Modülü -->
  <div style="transform:translateY(-50%); position:relative; z-index:10;">
    {{MODUL_ARAC_SORGULAMA}}
  </div>

  <!-- Hizmetlerimiz -->
  <section id="hizmetler" style="padding:100px 20px 60px; background:#0a0a0a; color:#fff;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:60px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:30px;">
        <div>
          <span style="color:var(--renk-vurgu); font-weight:700; letter-spacing:2px; text-transform:uppercase; font-size:0.85rem;">PREMIUM HİZMETLER</span>
          <h2 style="font-size:3rem; margin-top:10px; text-transform:uppercase;">Size Özel Çözümler</h2>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;" id="hizmet-grid">
        {{HIZMETLER_HTML}}
      </div>
      <script>
        document.querySelectorAll('#hizmet-grid > div').forEach(function(el){
          el.className = 'neon-border';
          el.style.background = '#111';
          el.style.padding = '40px';
          el.style.borderRadius = '8px';
          var h3 = el.querySelector('h3');
          if(h3) { h3.style.fontSize = '1.5rem'; h3.style.marginBottom = '15px'; h3.style.textTransform = 'uppercase'; }
          var p = el.querySelector('p');
          if(p) { p.style.color = 'var(--renk-alt)'; }
        });
      </script>
    </div>
  </section>

  <!-- Modül: Katalog (Araçlar / Filo) -->
  <div id="filo">
    {{MODUL_KATALOG}}
  </div>

  <!-- Neden Biz (Dark Version) -->
  <section style="padding:100px 20px; background:#111; color:#fff;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:80px;">
        <h2 style="font-size:3rem; text-transform:uppercase; letter-spacing:1px;">Neden {{ISLETME_KISAADI}}</h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:40px;" id="neden-grid">
        {{NEDEN_BIZ_HTML}}
      </div>
      <script>
        document.querySelectorAll('#neden-grid > div').forEach(function(el, i){
          var num = (i+1).toString().padStart(2, '0');
          el.innerHTML = '<div style="font-family:var(--font-baslik); font-size:4rem; font-weight:900; color:rgba(255,255,255,0.05); line-height:1; margin-bottom:-20px;">' + num + '</div>' + el.innerHTML;
          var h3 = el.querySelector('h3');
          var p = el.querySelector('p');
          if(h3) { h3.style.fontSize='1.4rem'; h3.style.marginBottom='10px'; h3.style.position='relative'; h3.style.zIndex='2'; }
          if(p) { p.style.color='var(--renk-alt)'; p.style.position='relative'; p.style.zIndex='2'; }
        });
      </script>
    </div>
  </section>

  <!-- İletişim / Rezervasyon Paneli -->
  {{MODUL_ONLINE_REZERVASYON}}
  {{MODUL_YOL_TARIFI}}

  <!-- Fotoğraf / Video Galeri -->
  {{MODUL_GALERI}}

  <!-- Yorumlar -->
  <section style="padding:100px 20px; background:#0a0a0a; color:#fff;">
    <div style="max-width:1400px; margin:0 auto;">
      <h2 style="font-size:3rem; text-transform:uppercase; margin-bottom:50px; text-align:center;">Müşteri Deneyimleri</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;" id="yorum-grid">
        {{YORUMLAR_HTML}}
      </div>
      <script>
        document.querySelectorAll('#yorum-grid > div').forEach(function(el){
          el.style.background = '#161616';
          el.style.padding = '40px';
          el.style.borderRadius = '8px';
          el.style.borderLeft = '4px solid var(--renk-vurgu)';
          var p = el.querySelector('p');
          if(p) { p.style.fontSize = '1.1rem'; p.style.fontStyle = 'italic'; p.style.marginBottom = '20px'; p.style.color='rgba(255,255,255,0.8)'; }
          var sp = el.querySelector('span');
          if(sp){ sp.style.fontWeight = '700'; sp.style.textTransform = 'uppercase'; sp.style.letterSpacing = '1px'; sp.style.fontSize = '0.9rem'; }
        });
      </script>
    </div>
  </section>

  {{MODUL_WHATSAPP_SABIT}}

  <!-- Footer -->
  <footer id="iletisim" style="background:#000; color:#fff; padding:100px 20px 40px; border-top:1px solid rgba(255,255,255,0.05);">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:60px; margin-bottom:80px;">
        <div>
          <h2 style="font-family:var(--font-baslik); font-size:2.5rem; font-weight:900; margin-bottom:20px; letter-spacing:1px; text-transform:uppercase;">{{ISLETME_ADI}}<span style="color:var(--renk-vurgu);">.</span></h2>
          <p style="color:var(--renk-alt); font-size:1rem; line-height:1.8; margin-bottom:30px;">Premium araç kiralama ve otomotiv çözümleri.</p>
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:30px; text-transform:uppercase; letter-spacing:1px; color:#fff;">İletişim Bilgileri</h3>
          <ul style="list-style:none; padding:0; margin:0; color:var(--renk-alt); line-height:2.5;">
            <li><strong style="color:#fff;">A:</strong> {{ADRES_METNI}}</li>
            <li><strong style="color:#fff;">T:</strong> <a href="tel:{{TELEFON}}">{{TELEFON_GOSTERIM}}</a></li>
            <li><strong style="color:#fff;">W:</strong> <a href="https://wa.me/{{WHATSAPP}}" target="_blank">WhatsApp'tan Ulaşın</a></li>
          </ul>
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:30px; text-transform:uppercase; letter-spacing:1px; color:#fff;">Çalışma Saatleri</h3>
          <ul style="list-style:none; padding:0; margin:0; color:var(--renk-alt); line-height:2.5;" id="saat-listesi">
            <!-- Populated by JS -->
          </ul>
          <script>
            var saatler = {{SAATLER_JSON}};
            var ul = document.getElementById('saat-listesi');
            if(saatler && saatler.length > 0) {
              saatler.forEach(function(s) {
                ul.innerHTML += '<li style="display:flex; justify-content:space-between;"><span style="color:#fff;">' + s.gun + '</span> <span>' + s.saat + '</span></li>';
              });
            } else {
              ul.innerHTML = '<li>7/24 Hizmetinizdeyiz</li>';
            }
          </script>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; font-size:0.85rem; color:var(--renk-alt);">
        <div>&copy; ${new Date().getFullYear()} {{ISLETME_ADI}}. Tüm Hakları Saklıdır.</div>
        <div style="display:flex; gap:20px;">
          <a href="{{INSTAGRAM_URL}}" target="_blank" style="transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Instagram</a>
          <a href="{{FACEBOOK_URL}}" target="_blank" style="transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Facebook</a>
        </div>
        <div>Altyapı: <a href="https://kepenk.ai" target="_blank" style="color:#fff;">kepenk.ai</a></div>
      </div>
    </div>
  </footer>
</body>
</html>`
