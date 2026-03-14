export const sablonSaglikPremiumHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SEO_BASLIK}}</title>
  <meta name="description" content="{{SEO_ACIKLAMA}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@400;600;800;900&family={{FONT_METIN}}:wght@400;500;600&display=swap" rel="stylesheet">
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
    
    /* Global classes - Premium Health Variant */
    .hero-bg {
      background-image: linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
    .glass-panel {
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.05);
      border: 1px solid rgba(255,255,255,0.5);
    }
    .hover-lift { transition: transform 0.3s, box-shadow 0.3s; }
    .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.08); }
    .btn-primary { background: var(--renk-vurgu); color: #fff; border: none; padding: 18px 36px; border-radius: 50px; font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 20px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.2); }
    .btn-primary:hover { background: var(--renk-hover); transform: translateY(-3px); box-shadow: 0 15px 30px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.3); }
    
    /* Animations */
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
    .d-1 { animation-delay: 0.1s; }
    .d-2 { animation-delay: 0.3s; }
    .d-3 { animation-delay: 0.5s; }
  </style>
</head>
<body>

  <!-- Sticky Header -->
  <header style="position:fixed; top:0; width:100%; z-index:100; transition:all 0.4s;" id="main-header">
    <div style="background:var(--renk-vurgu); color:#fff; font-size:0.9rem; padding:8px 0; font-weight:600;">
      <div style="max-width:1200px; margin:0 auto; padding:0 20px; display:flex; justify-content:space-between; align-items:center;">
        <span style="display:flex; align-items:center; gap:8px;">📍 {{ILCE}}, {{SEHIR}}</span>
        <div style="display:flex; gap:16px;">
          <a href="tel:{{TELEFON}}" style="display:flex; align-items:center; gap:8px;">📞 {{TELEFON_GOSTERIM}}</a>
        </div>
      </div>
    </div>
    <div class="glass-panel" style="padding:15px 0;">
      <div style="max-width:1200px; margin:0 auto; padding:0 20px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:40px; height:40px; background:var(--renk-vurgu); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; font-size:1.5rem;">+</div>
          <a href="#" style="font-family:var(--font-baslik); font-size:1.8rem; font-weight:800; color:var(--renk-metin); letter-spacing:-0.5px;">{{ISLETME_ADI}}</a>
        </div>
        <a href="#randevu" class="btn-primary" style="padding:12px 24px; font-size:1rem;">Hemen Randevu Al</a>
      </div>
    </div>
  </header>
  <script>
    window.addEventListener('scroll', function(){
      var hdr = document.getElementById('main-header');
      if(window.scrollY > 50){ hdr.style.transform = 'translateY(-38px)'; }
      else { hdr.style.transform = 'translateY(0)'; }
    });
  </script>

  <!-- Hero Section -->
  <section class="hero-bg" style="min-height:90vh; display:flex; align-items:center; padding:150px 20px 80px; position:relative;">
    <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1.2fr 1fr; gap:60px; align-items:center; z-index:2;">
      <div>
        <div class="animate-in d-1" style="display:inline-block; background:rgba(var(--renk-vurgu-rgb, 0,100,200), 0.1); color:var(--renk-vurgu); padding:8px 20px; border-radius:30px; font-weight:800; font-size:0.9rem; margin-bottom:24px; letter-spacing:0.05em; text-transform:uppercase;">SAĞLIĞINIZ BİZE EMANET</div>
        <h1 class="animate-in d-2" style="font-size:clamp(3rem, 6vw, 4.5rem); line-height:1.1; margin-bottom:24px; color:var(--renk-metin);">{{HERO_BASLIK}}</h1>
        <p class="animate-in d-3" style="font-size:1.3rem; color:var(--renk-alt); margin-bottom:40px; max-width:600px; line-height:1.7;">{{HERO_SLOGAN}}</p>
        <div class="animate-in d-3" style="display:flex; gap:20px; flex-wrap:wrap;">
          <a href="tel:{{TELEFON}}" class="btn-primary">{{HERO_CTA_BIRINCIL}}</a>
          <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="btn-primary" style="background:#fff; color:var(--renk-metin); border:2px solid rgba(0,0,0,0.1); box-shadow:none;">Whatsapp'tan Yazın</a>
        </div>
        
        <div class="animate-in d-3" style="margin-top:50px; display:flex; gap:30px; align-items:center;">
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:2rem; font-weight:900; color:var(--renk-metin); font-family:var(--font-baslik);">10+</span>
            <span style="font-size:0.9rem; color:var(--renk-alt); font-weight:600;">Yıllık Tecrübe</span>
          </div>
          <div style="width:1px; height:40px; background:rgba(0,0,0,0.1);"></div>
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:2rem; font-weight:900; color:var(--renk-metin); font-family:var(--font-baslik);">5K+</span>
            <span style="font-size:0.9rem; color:var(--renk-alt); font-weight:600;">Mutlu Hasta</span>
          </div>
        </div>
      </div>
      
      <div class="animate-in d-2" style="position:relative;">
        <div style="border-radius:40px; overflow:hidden; box-shadow:0 30px 60px rgba(0,0,0,0.1); position:relative; aspect-ratio:4/5;">
          <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=800&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Klinik Görseli" />
        </div>
        <!-- Floating Badges -->
        <div class="glass-panel" style="position:absolute; bottom:40px; left:-30px; padding:20px 30px; border-radius:24px; display:flex; align-items:center; gap:16px;">
          <div style="width:50px; height:50px; background:var(--renk-vurgu); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div>
            <div style="font-family:var(--font-baslik); font-weight:800; font-size:1.2rem; color:var(--renk-metin);">Uzman Kadro</div>
            <div style="font-size:0.9rem; color:var(--renk-alt);">Alanında en iyiler</div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      @media (max-width: 900px) { section.hero-bg > div { grid-template-columns: 1fr; } section.hero-bg > div > div:last-child { display:none; } }
    </style>
  </section>

  <!-- Hizmetler -->
  <section style="padding:100px 20px; background:var(--renk-kart);">
    <div style="max-width:1200px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:60px;">
        <span style="color:var(--renk-vurgu); font-weight:800; text-transform:uppercase; letter-spacing:0.1em;">TIBBİ BİRİMLERİMİZ</span>
        <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin-top:12px; color:var(--renk-metin);">Uzmanlık Alanlarımız</h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:30px;" id="hizmet-grid">
        {{HIZMETLER_HTML}}
      </div>
      <script>
        document.querySelectorAll('#hizmet-grid > div').forEach(function(el){
          el.className = 'glass-panel hover-lift';
          el.style.padding = '40px 30px';
          el.style.borderRadius = '24px';
          var h3 = el.querySelector('h3');
          if(h3) { h3.style.fontSize = '1.6rem'; h3.style.marginBottom = '16px'; h3.style.color = 'var(--renk-vurgu)'; }
          var p = el.querySelector('p');
          if(p) { p.style.color = 'var(--renk-alt)'; p.style.fontSize = '1.05rem'; }
        });
      </script>
    </div>
  </section>

  <!-- Neden Biz (Trust Section) -->
  <section style="padding:100px 20px; background:var(--renk-arkaplan);">
    <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center;">
      <div style="border-radius:32px; overflow:hidden; aspect-ratio:1; position:relative;">
        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Klinik Ortamı"/>
      </div>
      <div>
        <span style="color:var(--renk-vurgu); font-weight:800; text-transform:uppercase; letter-spacing:0.1em;">BİZİ TANIYIN</span>
        <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin:12px 0 30px; color:var(--renk-metin);">Neden {{ISLETME_KISAADI}}?</h2>
        <div style="display:grid; gap:24px;" id="neden-grid">
          {{NEDEN_BIZ_HTML}}
        </div>
        <script>
          document.querySelectorAll('#neden-grid > div').forEach(function(el){
            el.style.display = 'flex';
            el.style.gap = '20px';
            el.style.alignItems = 'flex-start';
            var txtDiv = document.createElement('div');
            var h3 = el.querySelector('h3');
            var p = el.querySelector('p');
            if(h3) { h3.style.fontSize='1.3rem'; h3.style.marginBottom='8px'; txtDiv.appendChild(h3); }
            if(p) { p.style.color='var(--renk-alt)'; p.style.margin='0'; txtDiv.appendChild(p); }
            el.innerHTML = '<div style="width:48px; height:48px; border-radius:12px; background:rgba(var(--renk-vurgu-rgb, 0,100,200), 0.1); color:var(--renk-vurgu); flex-shrink:0; display:flex; align-items:center; justify-content:center;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg></div>';
            el.appendChild(txtDiv);
          });
        </script>
      </div>
    </div>
    <style>
      @media (max-width: 900px) { section > div { grid-template-columns: 1fr !important; } }
    </style>
  </section>

  <!-- Modüller Alanı -->
  {{MODUL_RANDEVU}}
  {{MODUL_EKIP_UYELERI}}
  {{MODUL_ONLINE_DANISMA}}
  {{MODUL_SSS_GENIS}}
  {{MODUL_YOL_TARIFI}}

  <!-- Fotoğraf Galerisi / Tesisimiz -->
  <section style="padding:100px 20px; background:var(--renk-kart);">
    <div style="max-width:1200px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:50px;">
        <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin-bottom:16px; color:var(--renk-metin);">Klinik Ortamımız</h2>
        <p style="color:var(--renk-alt); font-size:1.15rem;">Modern, hijyenik ve huzurlu bir ortam.</p>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:20px;">
        <img src="https://images.unsplash.com/photo-1538108149393-cebb92afe674?w=500&q=80" style="width:100%; height:300px; object-fit:cover; border-radius:24px;" alt="Tesis"/>
        <img src="https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=500&q=80" style="width:100%; height:300px; object-fit:cover; border-radius:24px;" alt="Tesis"/>
        <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500&q=80" style="width:100%; height:300px; object-fit:cover; border-radius:24px;" alt="Tesis"/>
        <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80" style="width:100%; height:300px; object-fit:cover; border-radius:24px;" alt="Tesis"/>
      </div>
    </div>
  </section>

  <!-- Yorumlar -->
  <section style="padding:100px 20px; background:var(--renk-arkaplan);">
    <div style="max-width:1200px; margin:0 auto; text-align:center;">
      <span style="color:var(--renk-vurgu); font-weight:800; text-transform:uppercase; letter-spacing:0.1em;">HASTA YORUMLARI</span>
      <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin:12px 0 50px; color:var(--renk-metin);">Memnuniyetiniz Önceliğimiz</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;" id="yorum-grid">
        {{YORUMLAR_HTML}}
      </div>
      <script>
        document.querySelectorAll('#yorum-grid > div').forEach(function(el){
          el.className = 'glass-panel hover-lift';
          el.style.padding = '40px 30px';
          el.style.borderRadius = '24px';
          el.style.textAlign = 'left';
          var p = el.querySelector('p');
          if(p) { p.style.fontSize = '1.1rem'; p.style.fontStyle = 'italic'; p.style.marginBottom = '24px'; p.style.lineHeight = '1.8'; p.style.color='var(--renk-metin)'; }
          var sp = el.querySelector('span');
          if(sp){ sp.style.fontWeight = '800'; sp.style.color = 'var(--renk-vurgu)'; }
          
          var stars = document.createElement('div');
          stars.innerHTML = '⭐⭐⭐⭐⭐';
          stars.style.marginBottom = '16px';
          el.insertBefore(stars, el.firstChild);
        });
      </script>
    </div>
  </section>

  {{MODUL_ACIL_BUTON}}
  {{MODUL_CANLI_DESTEK}}

  <!-- Footer -->
  <footer style="background:#111; color:#fff; padding:80px 20px 40px;">
    <div style="max-width:1200px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:50px; margin-bottom:60px;">
        <div>
          <h2 style="font-size:2rem; margin-bottom:20px;">{{ISLETME_ADI}}</h2>
          <p style="opacity:0.6; margin-bottom:24px;">Sağlıklı ve mutlu bir yaşam için profesyonel tıbbi hizmetler sunuyoruz.</p>
          <div style="display:flex; gap:16px;">
            <a href="{{INSTAGRAM_URL}}" target="_blank" style="width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">IG</a>
            <a href="{{FACEBOOK_URL}}" target="_blank" style="width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">FB</a>
          </div>
        </div>
        <div>
          <h3 style="font-size:1.2rem; margin-bottom:20px;">İletişim</h3>
          <p style="opacity:0.8; margin-bottom:12px;">📞 <a href="tel:{{TELEFON}}">{{TELEFON_GOSTERIM}}</a></p>
          <p style="opacity:0.8; margin-bottom:12px;">💬 <a href="https://wa.me/{{WHATSAPP}}" target="_blank">WhatsApp Destek</a></p>
          <p style="opacity:0.8; margin-bottom:12px;">📍 {{ADRES_METNI}}</p>
        </div>
        <div>
          <h3 style="font-size:1.2rem; margin-bottom:20px;">Hızlı Linkler</h3>
          <p style="opacity:0.8; margin-bottom:12px;"><a href="#randevu">Randevu Al</a></p>
          <p style="opacity:0.8; margin-bottom:12px;"><a href="#hizmet-grid">Tıbbi Birimler</a></p>
          <p style="opacity:0.8; margin-bottom:12px;"><a href="{{GMB_LINK}}">Haritada Bulun</a></p>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
        <div style="opacity:0.5; font-size:0.9rem;">&copy; ${new Date().getFullYear()} {{ISLETME_ADI}}. Tüm hakları saklıdır.</div>
        <div style="opacity:0.3; font-size:0.8rem;">Powered by kepenk.ai</div>
      </div>
    </div>
  </footer>
</body>
</html>`
