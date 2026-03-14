import { ortakNav, ortakFooter } from './ortak'

export const sablonSporPremiumHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{{SEO_ACIKLAMA}}">
<meta property="og:title" content="{{SEO_BASLIK}}">
<meta property="og:description" content="{{SEO_ACIKLAMA}}">
<meta property="og:url" content="{{OG_URL}}">
<title>{{SEO_BASLIK}}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    --renk-arkaplan:#09090b;
    --renk-kart:#18181b;
    --renk-vurgu:#d9f95d; /* Fosforlu Neon Yeşil / Sarı */
    --renk-hover:#bce835;
    --renk-metin:#fafafa;
    --renk-alt:#a1a1aa;
    --renk-gradient:linear-gradient(135deg, #18181b 0%, #09090b 100%);
    --font-baslik:'Teko',sans-serif;
    --font-metin:'Roboto Condensed',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden}
  h1,h2,h3{font-family:var(--font-baslik);text-transform:uppercase;line-height:1}
  
  .kart{background:var(--renk-kart);padding:32px;transition:all 0.3s;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.05)}
  .kart::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;background:var(--renk-vurgu);transform:scaleX(0);transform-origin:left;transition:transform 0.4s cubic-bezier(0.86,0,0.07,1)}
  .kart:hover::before{transform:scaleX(1)}
  .kart:hover{background:#27272a;transform:translateY(-4px)}
  
  .buton-birincil{display:inline-flex;align-items:center;justify-content:center;background:var(--renk-vurgu);color:#09090b;padding:16px 36px;font-family:var(--font-baslik);text-decoration:none;font-weight:600;font-size:1.5rem;transition:all 0.2s;text-transform:uppercase;letter-spacing:1px;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)}
  .buton-birincil:hover{background:var(--renk-hover);transform:scale(1.05)}
  .buton-ikincil{display:inline-flex;align-items:center;justify-content:center;background:transparent;color:var(--renk-metin);padding:16px 36px;font-family:var(--font-baslik);text-decoration:none;font-weight:600;font-size:1.5rem;transition:all 0.2s;text-transform:uppercase;letter-spacing:1px;border:2px solid var(--renk-vurgu);clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)}
  .buton-ikincil:hover{background:rgba(217,249,93,0.1);color:var(--renk-vurgu)}
  
  .bolum-baslik{margin-bottom:60px;display:flex;flex-direction:column;align-items:flex-start}
  .bolum-baslik .outline-text{font-size:clamp(3rem,8vw,5rem);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.15);position:absolute;z-index:0;transform:translateY(-40%);pointer-events:none}
  .bolum-baslik h2{font-size:clamp(2.5rem,5vw,4rem);font-weight:600;color:var(--renk-metin);position:relative;z-index:1;display:inline-block;padding-left:24px}
  .bolum-baslik h2::before{content:'';position:absolute;left:0;top:-10px;bottom:-10px;width:8px;background:var(--renk-vurgu);transform:skewX(-15deg)}
  
  section{padding:120px 20px;position:relative}
  .container{max-width:900px;margin:0 auto}
  .container-lg{max-width:1200px;margin:0 auto}
  
  .hero-dark{min-height:100vh;display:flex;align-items:center;padding:100px 20px;background:#000;position:relative;overflow:hidden}
  .hero-dark-icerik{position:relative;z-index:2;max-width:900px;margin:0 auto;width:100%}
  .hero-dark-bg{position:absolute;inset:0;background:radial-gradient(circle at right,rgba(217,249,93,0.15),transparent 50%);z-index:1}
  .hero-dark-grid{background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:40px 40px;position:absolute;inset:0;z-index:0;opacity:0.5}
  
  .grid-sport{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
  
  @media(max-width:768px){section{padding:70px 20px}.buton-birincil,.buton-ikincil{padding:14px 24px;font-size:1.3rem;width:100%}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;1,400&family=Teko:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}

<nav id="nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(9,9,11,0.9);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.05);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;text-transform:uppercase">
  <div style="font-family:var(--font-baslik);font-size:2rem;font-weight:600;color:var(--renk-vurgu);line-height:1">{{ISLETME_KISAADI}}</div>
  <div id="nav-linkler" style="display:flex;gap:32px;align-items:center">
    <a href="#hizmetler" style="color:var(--renk-metin);text-decoration:none;font-family:var(--font-baslik);font-size:1.3rem;letter-spacing:1px">Hizmetler</a>
    <a href="#hakkimizda" style="color:var(--renk-metin);text-decoration:none;font-family:var(--font-baslik);font-size:1.3rem;letter-spacing:1px">Hakkında</a>
    <a href="tel:{{TELEFON}}" style="background:var(--renk-vurgu);color:#09090b;text-decoration:none;padding:8px 20px;font-family:var(--font-baslik);font-size:1.2rem;font-weight:600;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)">Hemen Ara</a>
  </div>
</nav>

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-dark parallax-bg overlay-dark animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80'); padding-top:140px;">
  <div class="hero-dark-bg" style="background:radial-gradient(circle at right, rgba(217,249,93,0.3), transparent 60%);"></div>
  <div class="hero-dark-grid"></div>
  <div class="hero-dark-icerik overlay-content">
    <div style="font-family:var(--font-baslik);font-size:2rem;color:var(--renk-vurgu);margin-bottom:12px;letter-spacing:2px;text-shadow:0 0 15px rgba(217,249,93,0.6)">{{ILCE}} / {{SEHIR}}</div>
    <div class="glass-panel" style="display:inline-block;padding:30px 40px; border-radius:12px; border-left:8px solid var(--renk-vurgu); background:rgba(0,0,0,0.6); box-shadow:0 20px 50px rgba(0,0,0,0.8); margin-bottom:40px">
      <h1 style="font-size:clamp(4rem,10vw,8rem);font-weight:700;color:var(--renk-metin);margin-bottom:20px;letter-spacing:-1px;line-height:0.9;text-transform:uppercase;text-shadow:4px 4px 0 rgba(217,249,93,0.4)">{{HERO_BASLIK}}</h1>
      <p style="color:rgba(255,255,255,0.9);font-size:1.4rem;line-height:1.6;max-width:700px;font-weight:400;border-left:2px solid rgba(255,255,255,0.2);padding-left:16px;text-transform:uppercase">{{HERO_SLOGAN}}</p>
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-birincil hover-pulse shadow-lg" style="box-shadow:0 0 20px rgba(217,249,93,0.4)">{{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-ikincil glass-panel-light hover-pulse" style="background:rgba(255,255,255,0.05)">{{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER (Güç/Rakamlar) ──────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. HİZMETLER / ANTRENMANLAR ──────────────────────────── -->
<section id="hizmetler" style="background:var(--renk-arkaplan)">
  <div class="container-lg">
    <div class="bolum-baslik">
      <div class="outline-text">HİZMETLER</div>
      <h2>Programlarımız & Hizmetlerimiz</h2>
    </div>
    <div class="grid-sport">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. SÜRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 5. NEDEN BİZ (Disiplin/Felsefe) ──────────────────────── -->
<section id="hakkimizda" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80'); border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
      <div class="glass-panel" style="background:rgba(0,0,0,0.8);padding:40px;border-left:4px solid var(--renk-vurgu);box-shadow:0 20px 50px rgba(0,0,0,0.8)">
        <h2 style="font-family:var(--font-baslik);font-size:clamp(3rem,6vw,4.5rem);font-weight:600;margin-bottom:24px;color:var(--renk-metin);line-height:0.9;text-shadow:2px 2px 0 rgba(217,249,93,0.3)">{{ISLETME_ADI}} Farkı</h2>
        <div style="color:var(--renk-alt);line-height:1.8;font-size:1.1rem;margin-bottom:24px">{{MODUL_HAKKIMIZDA_HIKAYE}}</div>
      </div>
      <div>
        <div style="background:rgba(24,24,27,0.9);backdrop-filter:blur(10px);padding:40px;position:relative;border:1px solid rgba(217,249,93,0.3);box-shadow:0 15px 40px rgba(0,0,0,0.6)">
          <div style="position:absolute;top:-20px;left:40px;background:var(--renk-vurgu);color:#000;font-family:var(--font-baslik);font-size:1.5rem;font-weight:600;padding:4px 16px;letter-spacing:1px;box-shadow:0 0 15px rgba(217,249,93,0.4)">NEDEN BİZ?</div>
          <div style="display:grid;gap:20px;margin-top:20px">{{NEDEN_BIZ_HTML}}</div>
          <style>
             #hakkimizda .kart {background:transparent; border:none; border-left:2px solid rgba(255,255,255,0.1); padding:16px;}
             #hakkimizda .kart h3 {color:var(--renk-vurgu); margin-bottom:8px;}
             #hakkimizda .kart:hover {background:rgba(255,255,255,0.03); border-left-color:var(--renk-vurgu);}
          </style>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── 6. VİDEO TANITIM (Motivasyon) ────────────────────────── -->
{{MODUL_VIDEO_TANITIM}}

<!-- ── 7. BAŞARI HİKAYELERİ / YORUMLAR ──────────────────────── -->
<section id="yorumlar" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <div class="outline-text" style="opacity:0.3">TOPLULUK</div>
      <h2 style="text-shadow:2px 2px 0 rgba(217,249,93,0.3)">Üye Yorumları</h2>
    </div>
    <div class="grid-sport">{{YORUMLAR_HTML}}</div>
    <style>
      #yorumlar .kart {background:rgba(0,0,0,0.7); backdrop-filter:blur(12px); border-top:2px solid var(--renk-vurgu); box-shadow:0 15px 30px rgba(0,0,0,0.5);}
    </style>
  </div>
</section>

<!-- ── 8. SERTİFİKALAR / ANTRENÖRLER ────────────────────────── -->
{{MODUL_SERTIFIKA_BELGELER}}
{{MODUL_MUSTERI_REFERANSLARI}}

<!-- ── 9. RANDEVU / KAYIT ───────────────────────────────────── -->
{{MODUL_RANDEVU}}

<!-- ── 10. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <div class="outline-text" style="opacity:0.3">İLETİŞİM</div>
      <h2 style="text-shadow:2px 2px 0 rgba(217,249,93,0.3)">Bize Ulaşın</h2>
    </div>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px">
      <div>
        <div class="glass-panel" style="background:rgba(24,24,27,0.8); backdrop-filter:blur(10px); padding:40px; border-left:4px solid var(--renk-vurgu); margin-bottom:24px; box-shadow:0 20px 40px rgba(0,0,0,0.6); border-right:1px solid rgba(255,255,255,0.05)">
          <p style="color:#e4e4e7;font-size:1.1rem;line-height:1.6;margin-bottom:32px">{{ADRES_METNI}}</p>
          <div style="display:grid;gap:16px">
            <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse" style="width:100%;box-shadow:0 0 15px rgba(217,249,93,0.3)">📞 {{TELEFON_GOSTERIM}}</a>
            <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-ikincil glass-panel-light hover-pulse" style="width:100%;color:#25d366;border-color:#25d366;background:rgba(255,255,255,0.05)">💬 WhatsApp'tan Yazın</a>
          </div>
        </div>
        {{MODUL_CALISMA_SAATLERI}}
        {{MODUL_SOSYAL_MEDYA}}
      </div>
      <div style="border:1px solid rgba(255,255,255,0.1);padding:4px;background:rgba(24,24,27,0.8);backdrop-filter:blur(10px);box-shadow:0 20px 40px rgba(0,0,0,0.6)">
        <iframe src="{{HARITA_URL}}" width="100%" height="100%" style="border:none;min-height:500px;filter:invert(90%) hue-rotate(180deg)" loading="lazy"></iframe>
      </div>
    </div>
  </div>
</section>

<!-- ── 11. YASAL + MODÜLLER ─────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_BLOG_MAKALELER}}
{{MODUL_TEKLIF_FORMU}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#000;padding:80px 20px 40px;border-top:1px solid rgba(217,249,93,0.2)">
  <div class="container-lg" style="text-align:center">
    <h2 style="font-family:var(--font-baslik);font-size:4rem;margin-bottom:16px;color:#fff;line-height:1">{{ISLETME_ADI}}</h2>
    <p style="color:var(--renk-alt);font-size:1.2rem;margin-bottom:40px;text-transform:uppercase;letter-spacing:2px">{{SEKTOR}} - {{ILCE}}</p>
    <div style="display:flex;gap:32px;justify-content:center;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,0.1);padding-top:40px;margin-bottom:32px">
      <a href="tel:{{TELEFON}}" style="color:#fff;text-decoration:none;font-weight:700;font-size:1.1rem;text-transform:uppercase">📞 {{TELEFON_GOSTERIM}}</a>
      <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="color:var(--renk-vurgu);text-decoration:none;font-weight:700;font-size:1.1rem;text-transform:uppercase">💬 WhatsApp'tan Ulaşın</a>
    </div>
    <p style="color:#52525b;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px">&copy; 2026 Tüm Hakları Saklıdır. Powered by <a href="https://kepenk.ai" style="color:#fff;text-decoration:none;font-weight:700">kepenk.ai</a></p>
  </div>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`
