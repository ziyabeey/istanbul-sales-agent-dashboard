export const sablonAjansPremiumHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SEO_BASLIK}}</title>
  <meta name="description" content="{{SEO_ACIKLAMA}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@500;700;800;900&family={{FONT_METIN}}:wght@300;400;500;600&display=swap" rel="stylesheet">
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
      --blob-color-1: rgba(var(--renk-vurgu-rgb, 100,50,250), 0.4);
      --blob-color-2: rgba(var(--renk-hover-rgb, 50,150,250), 0.4);
    }
    body {
      margin: 0;
      font-family: var(--font-metin);
      background-color: var(--renk-arkaplan);
      color: var(--renk-metin);
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4, .text-gradient { font-family: var(--font-baslik); margin: 0; }
    a { color: inherit; text-decoration: none; }
    * { box-sizing: border-box; }
    
    /* Creative Agency Specific Styles */
    .bg-mesh {
      background-color: var(--renk-arkaplan);
      background-image: 
        radial-gradient(at 40% 20%, var(--blob-color-1) 0px, transparent 50%),
        radial-gradient(at 80% 0%, var(--blob-color-2) 0px, transparent 50%),
        radial-gradient(at 0% 50%, var(--blob-color-2) 0px, transparent 50%),
        radial-gradient(at 80% 100%, var(--blob-color-1) 0px, transparent 50%);
    }
    .text-gradient {
      background: linear-gradient(135deg, var(--renk-vurgu) 0%, #a88bec 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .glass-nav {
      background: rgba(var(--renk-arkaplan-rgb, 10,10,10), 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .glass-card {
      background: rgba(255,255,255,0.02);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 24px;
      transition: all 0.4s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .glass-card:hover {
      transform: translateY(-8px);
      background: rgba(255,255,255,0.04);
      border-color: rgba(255,255,255,0.1);
      box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 0 20px rgba(var(--renk-vurgu-rgb, 100,50,250), 0.2);
    }
    
    .btn-gradient {
      background: linear-gradient(135deg, var(--renk-vurgu) 0%, var(--renk-hover) 100%);
      color: #fff;
      border: none;
      padding: 16px 36px;
      border-radius: 100px;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 10px 20px rgba(var(--renk-vurgu-rgb, 100,50,250), 0.3);
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .btn-gradient::after {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
      opacity: 0; transition: opacity 0.3s;
    }
    .btn-gradient:hover::after { opacity: 1; }
    .btn-gradient:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 30px rgba(var(--renk-vurgu-rgb, 100,50,250), 0.4);
    }
    
    .btn-outline {
      background: transparent;
      color: var(--renk-metin);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 15px 35px;
      border-radius: 100px;
      font-weight: 600;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-outline:hover {
      border-color: var(--renk-metin);
      background: rgba(255,255,255,0.05);
    }

    /* Marquee */
    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      background: rgba(255,255,255,0.02);
      padding: 20px 0;
      border-top: 1px solid rgba(255,255,255,0.05);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .marquee-content {
      display: inline-block;
      animation: marquee 30s linear infinite;
    }
    .marquee-item {
      display: inline-block;
      font-family: var(--font-baslik);
      font-size: 2rem;
      font-weight: 900;
      margin: 0 40px;
      color: rgba(255,255,255,0.2);
      text-transform: uppercase;
      letter-spacing: 2px;
      -webkit-text-stroke: 1px rgba(255,255,255,0.3);
      color: transparent;
      transition: all 0.3s;
    }
    .marquee-container:hover .marquee-item { -webkit-text-stroke: 1px rgba(255,255,255,0.6); }
    .marquee-container:hover .marquee-content { animation-play-state: paused; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    /* Animations */
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    .d-1 { animation-delay: 0.1s; }
    .d-2 { animation-delay: 0.3s; }
    .d-3 { animation-delay: 0.5s; }
  </style>
</head>
<body class="bg-mesh">

  <!-- Floating Nav -->
  <header class="glass-nav" style="position:fixed; top:0; width:100%; z-index:100; padding:15px 20px; transition:all 0.4s;">
    <div style="max-width:1400px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
      <a href="#" style="font-family:var(--font-baslik); font-size:1.8rem; font-weight:900; letter-spacing:-1px;">
        {{ISLETME_ADI}}<span style="color:var(--renk-vurgu);">.</span>
      </a>
      <div style="display:none; md:display:flex; background:rgba(255,255,255,0.05); padding:8px 24px; border-radius:100px; gap:30px; font-weight:500; font-size:0.95rem; border:1px solid rgba(255,255,255,0.05);">
        <a href="#uzmanlik" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Uzmanlık</a>
        <a href="#isler" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">İşler</a>
        <a href="#hizmetler" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Hizmetler</a>
      </div>
      <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="btn-gradient" style="padding:10px 24px; font-size:0.95rem;">
        Projeyi Konuşalım
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section style="min-height:100vh; display:flex; align-items:center; justify-content:center; padding:120px 20px 80px; text-align:center; position:relative; overflow:hidden;">
    <div style="max-width:1000px; z-index:2; position:relative;">
      <div class="animate-in d-1" style="display:inline-block; padding:8px 20px; border-radius:100px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.02); font-size:0.9rem; font-weight:600; margin-bottom:30px; box-shadow:0 4px 20px rgba(0,0,0,0.2);">
        <span style="color:var(--renk-vurgu);">✨ Geleceğin</span> Dijital Deneyimleri
      </div>
      <h1 class="animate-in d-2" style="font-size:clamp(3.5rem, 8vw, 6.5rem); line-height:1.05; margin-bottom:30px; letter-spacing:-2px;">
        <span class="text-gradient">{{HERO_BASLIK}}</span>
      </h1>
      <p class="animate-in d-3" style="font-size:1.4rem; color:var(--renk-alt); margin:0 auto 50px; max-width:700px; line-height:1.7; font-weight:300;">{{HERO_SLOGAN}}</p>
      
      <div class="animate-in d-3" style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
        <a href="#isler" class="btn-gradient">
          {{HERO_CTA_BIRINCIL}}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
        <a href="tel:{{TELEFON}}" class="btn-outline">Sizi Arayalım</a>
      </div>
      
      <!-- Agency Stats Mini -->
      <div class="animate-in d-3" style="margin-top:80px; display:flex; justify-content:center; gap:60px; border-top:1px solid rgba(255,255,255,0.05); padding-top:40px;">
        <div style="text-align:left;">
          <div style="font-family:var(--font-baslik); font-size:2.5rem; font-weight:900; line-height:1;">100+</div>
          <div style="color:var(--renk-alt); font-size:0.9rem;">Tamamlanan Proje</div>
        </div>
        <div style="text-align:left;">
          <div style="font-family:var(--font-baslik); font-size:2.5rem; font-weight:900; line-height:1;">98%</div>
          <div style="color:var(--renk-alt); font-size:0.9rem;">Müşteri Memnuniyeti</div>
        </div>
        <div style="text-align:left; display:none; sm:display:block;">
          <div style="font-family:var(--font-baslik); font-size:2.5rem; font-weight:900; line-height:1;">10+</div>
          <div style="color:var(--renk-alt); font-size:0.9rem;">Ödüllü Tasarım</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Marquee -->
  <div class="marquee-container">
    <div class="marquee-content" id="marquee-text">
      <!-- Populated by JS -->
    </div>
    <script>
      var words = ["Kreatif Tasarım", "Web Geliştirme", "UI/UX Optimizasyonu", "Marka Kimliği", "Dijital Pazarlama", "SEO"];
      var html = '';
      for(var i=0; i<3; i++) {
        words.forEach(function(w){ html += '<span class="marquee-item">' + w + '</span> * '; });
      }
      document.getElementById('marquee-text').innerHTML = html;
    </script>
  </div>

  <!-- Hizmetlerimiz (Services / Capabilities) -->
  <section id="uzmanlik" style="padding:120px 20px; position:relative; z-index:2;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="margin-bottom:80px; max-width:600px;">
        <span style="color:var(--renk-vurgu); font-weight:700; text-transform:uppercase; letter-spacing:2px; font-size:0.85rem; display:block; margin-bottom:15px;">UZMANLIK ALANLARIMIZ</span>
        <h2 style="font-size:clamp(2.5rem, 5vw, 4rem); line-height:1.1;">Biz Neler Yapıyoruz?</h2>
      </div>
      
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:30px;" id="hizmet-grid">
        {{HIZMETLER_HTML}}
      </div>
      <script>
        document.querySelectorAll('#hizmet-grid > div').forEach(function(el, i){
          el.className = 'glass-card';
          el.style.padding = '50px 40px';
          var h3 = el.querySelector('h3');
          if(h3) { h3.style.fontSize = '1.8rem'; h3.style.marginBottom = '20px'; }
          var p = el.querySelector('p');
          if(p) { p.style.color = 'var(--renk-alt)'; p.style.fontSize = '1.1rem'; p.style.lineHeight='1.8'; }
          
          var num = document.createElement('div');
          num.innerHTML = '0' + (i+1);
          num.style.fontFamily = 'var(--font-baslik)';
          num.style.fontSize = '3rem';
          num.style.fontWeight = '900';
          num.style.color = 'rgba(255,255,255,0.05)';
          num.style.position = 'absolute';
          num.style.top = '20px';
          num.style.right = '30px';
          el.style.position = 'relative';
          el.appendChild(num);
        });
      </script>
    </div>
  </section>

  <!-- Modül: Proje Portföyü -->
  <div id="isler">
    {{MODUL_PROJE_PORTFOY}}
  </div>

  <!-- Modül: Fiyat Listesi / Paketler -->
  <div id="hizmetler">
    {{MODUL_UYELIK_PAKETLERI}}
  </div>

  <!-- Neden Biz -->
  <section style="padding:120px 20px; position:relative; z-index:2;">
    <div style="max-width:1400px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;">
      <div>
        <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin-bottom:30px; line-height:1.1;">Dijital dünyada <span class="text-gradient">fark yaratmaya</span> hazır mısınız?</h2>
        <p style="color:var(--renk-alt); font-size:1.2rem; margin-bottom:40px;">Sıradan olanı reddediyoruz. Markanızın potansiyelini en üst düzeye çıkarmak için tasarım ve teknolojiyi kusursuz bir şekilde birleştiriyoruz.</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;" id="neden-grid">
          {{NEDEN_BIZ_HTML}}
        </div>
      </div>
      <div style="position:relative;">
        <div style="width:100%; aspect-ratio:4/5; border-radius:30px; overflow:hidden; position:relative; z-index:2;">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Agency Team">
        </div>
        <!-- Decorative blob behind image -->
        <div style="position:absolute; top:-10%; right:-10%; width:80%; height:80%; background:var(--renk-vurgu); filter:blur(100px); opacity:0.3; z-index:1; border-radius:50%;"></div>
      </div>
    </div>
    <script>
      document.querySelectorAll('#neden-grid > div').forEach(function(el){
        var h3 = el.querySelector('h3');
        var p = el.querySelector('p');
        if(h3) { h3.style.fontSize='1.2rem'; h3.style.marginBottom='10px'; }
        if(p) { p.style.color='var(--renk-alt)'; p.style.fontSize='0.95rem'; }
      });
    </script>
    <style> @media(max-width:900px){ section > div { grid-template-columns: 1fr!important; gap:40px; } } </style>
  </section>

  <!-- Modül: Teklif / İletişim Formu -->
  {{MODUL_TEKLIF_FORMU}}

  <!-- Footer -->
  <footer style="padding:100px 20px 40px; border-top:1px solid rgba(255,255,255,0.05); position:relative; z-index:2;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:60px; margin-bottom:100px;">
        <div>
          <h2 style="font-family:var(--font-baslik); font-size:3rem; font-weight:900; margin-bottom:30px; letter-spacing:-1px;">{{ISLETME_ADI}}<span style="color:var(--renk-vurgu);">.</span></h2>
          <p style="color:var(--renk-alt); font-size:1.1rem; max-width:400px; margin-bottom:40px;">Yenilikçi dijital çözümler üreten yeni nesil kreatif kreatif ajans.</p>
          <div style="display:flex; gap:20px;">
            <a href="{{INSTAGRAM_URL}}" target="_blank" style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'; this.style.borderColor='transparent';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.1)';">IG</a>
            <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'; this.style.borderColor='transparent';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.1)';">WA</a>
            <a href="{{FACEBOOK_URL}}" target="_blank" style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'; this.style.borderColor='transparent';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.1)';">FB</a>
          </div>
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:30px; color:#fff;">Ajans</h3>
          <ul style="list-style:none; padding:0; margin:0; line-height:2.5;">
            <li><a href="#uzmanlik" style="color:var(--renk-alt); transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Hizmetlerimiz</a></li>
            <li><a href="#isler" style="color:var(--renk-alt); transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Portföyümüz</a></li>
            <li><a href="#" style="color:var(--renk-alt); transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Hakkımızda</a></li>
            <li><a href="#" style="color:var(--renk-alt); transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">İletişim</a></li>
          </ul>
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:30px; color:#fff;">İletişim</h3>
          <ul style="list-style:none; padding:0; margin:0; line-height:2.5; color:var(--renk-alt);">
            <li>{{ADRES_METNI}}</li>
            <li><a href="tel:{{TELEFON}}" style="transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">{{TELEFON_GOSTERIM}}</a></li>
            <li>info@{{ISLETME_KISAADI}}.com</li>
          </ul>
        </div>
      </div>
      
      <div style="font-family:var(--font-baslik); font-size:clamp(4rem, 15vw, 12rem); font-weight:900; line-height:0.8; opacity:0.03; text-align:center; overflow:hidden; white-space:nowrap; margin-bottom:40px; pointer-events:none;">
        {{ISLETME_ADI}}
      </div>
      
      <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; font-size:0.9rem; color:var(--renk-alt);">
        <div>&copy; ${new Date().getFullYear()} {{ISLETME_ADI}}. Tüm Hakları Saklıdır.</div>
        <div>Powered by <a href="https://kepenk.ai" target="_blank" style="color:#fff; font-weight:600;">kepenk.ai</a></div>
      </div>
    </div>
    <style> @media(max-width:900px){ footer > div > div:first-child { grid-template-columns: 1fr; gap:40px; } } </style>
  </footer>
</body>
</html>`
