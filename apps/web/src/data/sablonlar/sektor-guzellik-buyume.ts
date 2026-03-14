import { ortakNav, ortakFooter } from './ortak'

export const sablonGuzellikBuyumeHtml = `<!DOCTYPE html>
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
    --renk-arkaplan:#fffafa;
    --renk-kart:#ffffff;
    --renk-vurgu:#d4a373;
    --renk-hover:#ba8b5d;
    --renk-metin:#333333;
    --renk-alt:#666666;
    --renk-gradient:linear-gradient(135deg, #fefae0 0%, #faedcd 100%);
    --font-baslik:'Playfair Display',serif;
    --font-metin:'Lato',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden}
  h1,h2,h3{font-family:var(--font-baslik)}
  .kart{background:var(--renk-kart);border-radius:24px;padding:32px;transition:all 0.4s ease;border:1px solid rgba(212,163,115,0.1)}
  .kart:hover{transform:translateY(-8px);box-shadow:0 20px 40px rgba(212,163,115,0.08)}
  .buton-birincil{display:inline-flex;align-items:center;gap:8px;background:var(--renk-vurgu);color:#fff;padding:16px 32px;border-radius:30px;text-decoration:none;font-weight:600;font-size:1rem;transition:all 0.3s;border:none}
  .buton-birincil:hover{background:var(--renk-hover);transform:scale(1.02);box-shadow:0 10px 20px rgba(212,163,115,0.2)}
  .buton-ikincil{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--renk-metin);padding:16px 32px;border-radius:30px;text-decoration:none;font-weight:600;font-size:1rem;transition:all 0.3s;border:1px solid var(--renk-vurgu)}
  .buton-ikincil:hover{background:rgba(212,163,115,0.05)}
  .bolum-baslik{text-align:center;margin-bottom:48px}
  .bolum-baslik h2{font-size:clamp(1.8rem,4vw,2.5rem);font-weight:700;color:var(--renk-metin);margin-bottom:12px;font-style:italic}
  .bolum-baslik p{color:var(--renk-alt);font-size:1rem;max-width:600px;margin:0 auto;line-height:1.8}
  section{padding:80px 20px}
  .container{max-width:800px;margin:0 auto}
  .container-lg{max-width:1100px;margin:0 auto}
  
  .hero-soft{min-height:90vh;display:flex;align-items:center;padding:120px 20px 80px;background:var(--renk-gradient);position:relative}
  .hero-soft::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34h-58.34l-.83-.83V0h58.34zM27 27h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h-2zm-6 0h-2v2h2v-2zm36 0h-2v2h2v-2zm6 0h-2v2h2v-2zm6 0h-2v2h2v-2zm6 0h-2v2h2v-2zm-36 6h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h-2zm36 0h-2v2h2v-2zm6 0h-2v2h2v-2zm6 0h-2v2h2v-2zm6 0h-2v2h2v-2zm-36 6h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h-2zm36 0h-2v2h2v-2zm6 0h-2v2h2v-2zm6 0h-2v2h2v-2zm6 0h-2v2h2v-2zm-36 6h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm-6 0h-2v2h-2zm36 0h-2v2h2v-2zm6 0h-2v2h2v-2zm6 0h-2v2h2v-2zm6 0h-2v2h2v-2z' fill='%23d4a373' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");opacity:0.6}
  .hero-soft-icerik{position:relative;z-index:2;max-width:700px;margin:0 auto;text-align:center}
  
  .hizmet-grid-soft{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
  .neden-soft{display:flex;gap:20px;align-items:flex-start;padding:24px;background:#fff;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.03)}
  
  @media(max-width:768px){section{padding:60px 16px}.buton-birincil,.buton-ikincil{padding:14px 24px}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}

<nav id="nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.9);backdrop-filter:blur(10px);transition:all 0.3s;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,0.05)">
  <a href="#" style="font-family:var(--font-baslik);font-weight:700;font-size:1.4rem;color:var(--renk-metin);text-decoration:none">{{ISLETME_KISAADI}}</a>
  <div id="nav-linkler" style="display:flex;gap:24px;align-items:center">
    <a href="#hizmetler" style="color:var(--renk-alt);text-decoration:none;font-size:0.9rem;font-weight:400">Hizmetler</a>
    <a href="#hakkimizda" style="color:var(--renk-alt);text-decoration:none;font-size:0.9rem;font-weight:400">Hakkımızda</a>
    <a href="tel:{{TELEFON}}" style="background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:10px 20px;border-radius:24px;font-size:0.85rem;font-weight:600">Randevu Al</a>
  </div>
</nav>

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-soft parallax-bg overlay-light animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80');">
  <div class="hero-soft-icerik overlay-content">
    <div class="glass-panel" style="display:inline-block;padding:8px 24px;border-radius:30px;border:1px solid rgba(212,163,115,0.3);color:var(--renk-vurgu);font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:30px;background:rgba(255,255,255,0.6)">
      {{ILCE}} / {{SEHIR}}
    </div>
    <div class="glass-panel" style="padding:40px; border-radius:24px; background:rgba(255,255,255,0.7); box-shadow:0 10px 40px rgba(0,0,0,0.05); margin-bottom:48px;">
      <h1 style="font-size:clamp(2.5rem,7vw,4.5rem);font-weight:700;color:var(--renk-metin);line-height:1.1;margin-bottom:24px;font-style:italic;text-shadow:0 2px 10px rgba(255,255,255,0.5)">{{HERO_BASLIK}}</h1>
      <p style="color:var(--renk-alt);font-size:1.15rem;line-height:1.8;max-width:540px;margin-left:auto;margin-right:auto;font-weight:400">{{HERO_SLOGAN}}</p>
    </div>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse" style="box-shadow:0 8px 25px rgba(212,163,115,0.3)">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-ikincil glass-panel-light" style="border-color:var(--renk-vurgu);color:var(--renk-vurgu)">💬 {{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER ─────────────────────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. HİZMETLER ─────────────────────────────────────────── -->
<section id="hizmetler">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Zarif Dokunuşlar</h2>
      <p>Kendinizi özel hissettirecek profesyonel hizmetlerimizle tanışın.</p>
    </div>
    <div class="hizmet-grid-soft">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. SÜRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 5. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_RANDEVU}}

<!-- ── 6. HİKAYE & NEDEN BİZ ────────────────────────────────── -->
<section id="hakkimizda" class="parallax-bg overlay-light" style="background-image: url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="glass-panel" style="background:rgba(255,255,255,0.85); padding:60px; border-radius:32px; box-shadow:0 15px 50px rgba(0,0,0,0.05);">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
        <div>
          <h2 style="font-family:var(--font-baslik);font-size:clamp(2rem,4vw,2.5rem);font-weight:700;margin-bottom:24px;font-style:italic;color:var(--renk-vurgu)">Bizim Hikayemiz</h2>
          <div style="color:var(--renk-alt);line-height:1.8;font-size:1.05rem;font-weight:300;margin-bottom:32px">{{MODUL_HAKKIMIZDA_HIKAYE}}</div>
        </div>
        <div>
          <div style="display:grid;gap:20px">{{NEDEN_BIZ_HTML}}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── 7. SERTİFİKALAR ──────────────────────────────────────── -->
{{MODUL_SERTIFIKA_BELGELER}}

<!-- ── 8. VİDEO ────────────────────────────────────────────── -->
{{MODUL_VIDEO_TANITIM}}

<!-- ── 9. YORUMLAR ──────────────────────────────────────────── -->
<section id="yorumlar" class="parallax-bg overlay-light" style="background-image: url('https://images.unsplash.com/photo-1521590832167-7bfc1748d565?auto=format&fit=crop&w=1600&q=80');">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <h2 style="color:var(--renk-metin);">Mutlu Danışanlarımız</h2>
      <p style="color:var(--renk-alt);">Bizim için en büyük mutluluk sizin gülümsemeniz.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">{{YORUMLAR_HTML}}</div>
  </div>
  <style>
    #yorumlar .kart { background:rgba(255,255,255,0.8); backdrop-filter:blur(12px); border:1px solid #fff; box-shadow:0 10px 30px rgba(212,163,115,0.08); border-radius:30px; }
  </style>
</section>

<!-- ── 10. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_MUSTERI_REFERANSLARI}}
{{MODUL_ANKET_FORM}}

<!-- ── 11. BLOG ─────────────────────────────────────────────── -->
{{MODUL_BLOG_MAKALELER}}

<!-- ── 12. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Size Ulaşalım</h2>
      <p>{{ADRES_METNI}}</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:40px">
      <div style="background:#fff;padding:40px;border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.04)">
        <div style="display:grid;gap:16px;margin-bottom:32px">
          <a href="tel:{{TELEFON}}" class="buton-birincil" style="justify-content:center">📞 {{TELEFON_GOSTERIM}}</a>
          <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-ikincil" style="justify-content:center;border-color:#25d366;color:#25d366">💬 WhatsApp İletişim</a>
          {{MODUL_ONLINE_ODEME}}
        </div>
        {{MODUL_CALISMA_SAATLERI}}
        {{MODUL_SOSYAL_MEDYA}}
      </div>
      <div style="border-radius:24px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.04)">
        <iframe src="{{HARITA_URL}}" width="100%" height="100%" style="border:none;min-height:400px" loading="lazy"></iframe>
      </div>
    </div>
  </div>
</section>

<!-- ── 13. YASAL + BÜLTEN ────────────────────────────────────── -->
{{MODUL_EPOSTA_BULTENI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#1a1a1a;padding:60px 20px 40px;text-align:center;color:#fff">
  <h2 style="font-family:var(--font-baslik);font-size:2rem;margin-bottom:16px;font-style:italic">{{ISLETME_ADI}}</h2>
  <p style="color:rgba(255,255,255,0.5);font-size:0.9rem;margin:0 0 32px;font-weight:300">{{SEKTOR}} · {{ILCE}}, {{SEHIR}}</p>
  <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:32px">
    <a href="tel:{{TELEFON}}" style="color:rgba(255,255,255,0.7);text-decoration:none">📞 {{TELEFON_GOSTERIM}}</a>
    <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="color:rgba(255,255,255,0.7);text-decoration:none">💬 WhatsApp</a>
    <a href="#kvkk" style="color:rgba(255,255,255,0.4);text-decoration:none">Gizlilik Politikası</a>
  </div>
  <p style="color:rgba(255,255,255,0.2);font-size:0.75rem;margin:0">Powered by <a href="https://kepenk.ai" style="color:rgba(255,255,255,0.4);text-decoration:none">kepenk.ai</a></p>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`
