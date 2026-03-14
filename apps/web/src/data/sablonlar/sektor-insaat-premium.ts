import { ortakNav, ortakFooter } from './ortak'

export const sablonInsaatPremiumHtml = `<!DOCTYPE html>
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
    --renk-arkaplan:#0f1115;
    --renk-kart:#1a1d24;
    --renk-vurgu:#ffbe0b;
    --renk-hover:#e5aa0a;
    --renk-metin:#f8f9fa;
    --renk-alt:#adb5bd;
    --renk-gradient:linear-gradient(135deg, #181b21 0%, #0f1115 100%);
    --font-baslik:'Oswald',sans-serif;
    --font-metin:'Roboto',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden}
  h1,h2,h3{font-family:var(--font-baslik);text-transform:uppercase}
  .kart{background:var(--renk-kart);padding:32px;transition:all 0.3s;border-left:4px solid transparent}
  .kart:hover{transform:translateX(8px);border-left-color:var(--renk-vurgu);background:#1e222a}
  .buton-birincil{display:inline-flex;align-items:center;justify-content:center;gap:12px;background:var(--renk-vurgu);color:#000;padding:18px 36px;text-decoration:none;font-weight:900;font-size:1.1rem;transition:all 0.2s;text-transform:uppercase;letter-spacing:1px}
  .buton-birincil:hover{background:var(--renk-hover);transform:translateY(-2px)}
  .buton-ikincil{display:inline-flex;align-items:center;justify-content:center;gap:12px;background:transparent;color:var(--renk-metin);padding:18px 36px;text-decoration:none;font-weight:700;font-size:1rem;transition:all 0.2s;text-transform:uppercase;letter-spacing:1px;border:2px solid rgba(255,255,255,0.2)}
  .buton-ikincil:hover{border-color:var(--renk-vurgu);color:var(--renk-vurgu)}
  .bolum-baslik{margin-bottom:60px;position:relative;padding-left:24px}
  .bolum-baslik::before{content:'';position:absolute;left:0;top:0;bottom:0;width:8px;background:var(--renk-vurgu)}
  .bolum-baslik h2{font-size:clamp(2rem,5vw,3.5rem);font-weight:700;color:var(--renk-metin);margin-bottom:16px;line-height:1}
  .bolum-baslik p{color:var(--renk-alt);font-size:1.1rem;max-width:700px;line-height:1.6}
  section{padding:100px 20px;border-bottom:1px solid rgba(255,255,255,0.05)}
  .container{max-width:900px;margin:0 auto}
  .container-lg{max-width:1200px;margin:0 auto}
  
  .hero-hard{min-height:100vh;display:flex;align-items:center;padding:120px 20px;background:var(--renk-gradient);position:relative;overflow:hidden}
  .hero-hard-bg{position:absolute;right:0;top:0;bottom:0;width:50%;background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.02) 10px,rgba(255,255,255,0.02) 20px);z-index:1}
  .hero-hard-icerik{position:relative;z-index:2;max-width:800px;margin:0 auto;width:100%}
  
  .hizmet-grid-hard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:30px}
  
  @media(max-width:900px){.hero-hard-bg{width:100%;opacity:0.3}}
  @media(max-width:768px){section{padding:60px 20px}.buton-birincil,.buton-ikincil{padding:16px 24px;font-size:1rem;width:100%}.hero-hard{align-items:flex-start;padding-top:140px}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Roboto:wght@300;400;700;900&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}

<nav id="nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(15,17,21,0.95);border-bottom:2px solid var(--renk-vurgu);transition:all 0.3s;padding:20px;display:flex;justify-content:space-between;align-items:center">
  <a href="#" style="font-family:var(--font-baslik);font-weight:700;font-size:1.6rem;color:#fff;text-decoration:none;text-transform:uppercase;letter-spacing:2px">{{ISLETME_KISAADI}}</a>
  <div id="nav-linkler" style="display:flex;gap:30px;align-items:center">
    <a href="#hizmetler" style="color:#fff;text-decoration:none;font-weight:700;text-transform:uppercase;font-family:var(--font-baslik);letter-spacing:1px">Hizmetler</a>
    <a href="#projeler" style="color:#fff;text-decoration:none;font-weight:700;text-transform:uppercase;font-family:var(--font-baslik);letter-spacing:1px">Projeler</a>
    <a href="tel:{{TELEFON}}" style="background:var(--renk-vurgu);color:#000;text-decoration:none;padding:12px 24px;font-weight:900;text-transform:uppercase;font-family:var(--font-baslik)">Hemen Ara</a>
  </div>
</nav>

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-hard parallax-bg overlay-dark animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1541888081198-b57095304724?auto=format&fit=crop&w=1600&q=80');">
  <div class="hero-hard-bg"></div>
  <div class="hero-hard-icerik overlay-content">
    <div style="display:inline-flex;align-items:center;background:rgba(255,190,11,0.1);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:8px 20px;margin-bottom:30px;border-left:4px solid var(--renk-vurgu);box-shadow:0 4px 15px rgba(0,0,0,0.5)">
      <span style="color:var(--renk-vurgu);font-weight:900;text-transform:uppercase;letter-spacing:2px;font-family:var(--font-baslik);font-size:1.1rem;text-shadow:0 2px 4px rgba(0,0,0,0.8)">Uzman {{SEKTOR}}</span>
    </div>
    <h1 style="font-size:clamp(3rem,8vw,5.5rem);font-weight:700;color:#fff;line-height:0.95;margin-bottom:30px;letter-spacing:-1px;text-shadow:0 4px 20px rgba(0,0,0,0.9)">{{HERO_BASLIK}}</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.2rem;line-height:1.6;margin-bottom:50px;max-width:600px;font-weight:400;text-shadow:0 2px 10px rgba(0,0,0,0.8)">{{HERO_SLOGAN}}</p>
    <div style="display:flex;gap:20px;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-birincil hover-pulse shadow-lg">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="#iletisim" class="buton-ikincil glass-panel-light" style="color:#fff;border-color:rgba(255,255,255,0.4)">📐 Ücretsiz Kesif</a>
    </div>
    <div class="glass-panel" style="margin-top:60px;display:inline-flex;gap:40px;align-items:center;padding:24px 40px;border-radius:20px;border:1px solid rgba(255,255,255,0.1)">
      <div>
        <div style="color:var(--renk-vurgu);font-size:2rem;font-weight:900;font-family:var(--font-baslik);text-shadow:0 0 10px rgba(255,190,11,0.3)">10+</div>
        <div style="color:#e2e8f0;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;font-weight:700">Yıllık Tecrübe</div>
      </div>
      <div>
        <div style="color:var(--renk-vurgu);font-size:2rem;font-weight:900;font-family:var(--font-baslik);text-shadow:0 0 10px rgba(255,190,11,0.3)">100%</div>
        <div style="color:#e2e8f0;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;font-weight:700">Müşteri Memnuniyeti</div>
      </div>
      <div>
        <div style="color:var(--renk-vurgu);font-size:2rem;font-weight:900;font-family:var(--font-baslik);text-shadow:0 0 10px rgba(255,190,11,0.3)">7/24</div>
        <div style="color:#e2e8f0;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;font-weight:700">Hızlı Destek</div>
      </div>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER ─────────────────────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. HİZMETLER ─────────────────────────────────────────── -->
<section id="hizmetler">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Profesyonel Hizmetlerimiz</h2>
      <p>Projelerinizi hayata geçirmek için endüstri standartlarında çözümler sunuyoruz.</p>
    </div>
    <div class="hizmet-grid-hard">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. SÜRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 4b. ŞANTİYE GÜNLÜĞÜ ────────────────────────────────── -->
{{MODUL_SANTIYE_GUNLUGU}}

<!-- ── 5. PROJELER / REFERANSLAR ────────────────────────────── -->
<section id="projeler" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80');">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik" style="margin-bottom:40px">
      <h2 style="color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.8)">Güçlü Referanslarımız</h2>
      <p style="color:rgba(255,255,255,0.9);text-shadow:0 2px 10px rgba(0,0,0,0.6)">Başarıyla tamamladığımız projeler, iş ahlakımızın kanıtıdır.</p>
    </div>
    <div class="glass-panel" style="padding:40px; border-radius:20px; border:1px solid rgba(255,255,255,0.1)">
      {{MODUL_MUSTERI_REFERANSLARI}}
      {{MODUL_URUN_LISTESI}}
    </div>
  </div>
</section>

<!-- ── 6. VİDEO TANITIM ─────────────────────────────────────── -->
{{MODUL_VIDEO_TANITIM}}

<!-- ── 7. NEDEN BİZ ─────────────────────────────────────────── -->
<section id="neden-biz">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Neden Bizi Seçmelisiniz?</h2>
      <p>Sektördeki tecrübemiz ve kaliteden ödün vermeyen yapımızla yanınızdayız.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:30px">
      {{NEDEN_BIZ_HTML}}
    </div>
  </div>
</section>

<!-- ── 8. SERTİFİKALAR ──────────────────────────────────────── -->
{{MODUL_SERTIFIKA_BELGELER}}

<!-- ── 9. YORUMLAR ──────────────────────────────────────────── -->
<section id="yorumlar" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1516594798522-6b99015ccee3?auto=format&fit=crop&w=1600&q=80');">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <h2 style="color:#fff;">Müşteri Yorumları</h2>
      <p style="color:rgba(255,255,255,0.8);">Bizimle çalışan binlerce kişinin ortak noktası: Başarı</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:30px">{{YORUMLAR_HTML}}</div>
  </div>
  <style>
    #yorumlar .kart { background:rgba(0,0,0,0.65); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.1); border-left:4px solid var(--renk-vurgu); }
    #yorumlar .kart p { color:#e2e8f0; font-style:italic; }
    #yorumlar .kart h3 { color:#fff; }
  </style>
</section>

<!-- ── 10. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_ANKET_FORM}}

<!-- ── 11. BLOG ─────────────────────────────────────────────── -->
{{MODUL_BLOG_MAKALELER}}

<!-- ── 12. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" style="background:var(--renk-kart)">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Ücretsiz Keşif & İletişim</h2>
      <p>Size en uygun çözümleri sunabilmek için projenizi konuşalım.</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px">
      <div>
        <div style="background:#0f1115;padding:40px;border-left:4px solid var(--renk-vurgu);margin-bottom:30px;box-shadow:0 20px 40px rgba(0,0,0,0.5)">
          <h3 style="font-size:1.5rem;margin-bottom:20px;color:#fff">Ofisimiz</h3>
          <p style="color:var(--renk-alt);font-size:1.1rem;line-height:1.6;margin-bottom:20px">{{ADRES_METNI}}</p>
          <div style="display:grid;gap:16px">
            <a href="tel:{{TELEFON}}" class="buton-birincil" style="width:100%">📞 {{TELEFON_GOSTERIM}}</a>
            <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-ikincil" style="width:100%;border-color:#25d366;color:#25d366">💬 WhatsApp'tan Yazın</a>
          </div>
        </div>
        {{MODUL_CALISMA_SAATLERI}}
        {{MODUL_SOSYAL_MEDYA}}
      </div>
      <div>
        <div style="height:100%;min-height:500px;background:#000;border-left:4px solid var(--renk-vurgu);box-shadow:0 20px 40px rgba(0,0,0,0.5)">
          <iframe src="{{HARITA_URL}}" width="100%" height="100%" style="border:none" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── 13. YASAL + BÜLTEN ────────────────────────────────────── -->
{{MODUL_TEKLIF_FORMU}}
{{MODUL_EPOSTA_BULTENI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#0a0b0e;padding:80px 20px 40px;border-top:1px solid rgba(255,255,255,0.05)">
  <div class="container-lg">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:60px;margin-bottom:60px">
      <div>
        <h2 style="font-family:var(--font-baslik);font-size:2.5rem;margin-bottom:20px;color:#fff">{{ISLETME_ADI}}</h2>
        <p style="color:var(--renk-alt);line-height:1.6">{{HERO_SLOGAN}}</p>
      </div>
      <div>
        <h3 style="color:#fff;margin-bottom:20px;font-size:1.2rem">Hızlı Erişim</h3>
        <style> .footer-link{display:block;color:var(--renk-alt);text-decoration:none;margin-bottom:12px;font-weight:700;text-transform:uppercase;font-size:0.9rem;letter-spacing:1px;transition:color 0.2s} .footer-link:hover{color:var(--renk-vurgu)}</style>
        <a href="#hizmetler" class="footer-link">👉 Hizmetler</a>
        <a href="#projeler" class="footer-link">👉 Projeler / Referanslar</a>
        <a href="#iletisim" class="footer-link">👉 İletişim</a>
      </div>
      <div>
        <h3 style="color:#fff;margin-bottom:20px;font-size:1.2rem">İletişim</h3>
        <p style="color:var(--renk-alt);margin-bottom:12px">📍 {{ADRES_METNI}}</p>
        <p style="color:var(--renk-alt);margin-bottom:12px">📞 {{TELEFON_GOSTERIM}}</p>
        <p style="color:var(--renk-alt)">📱 {{WHATSAPP}}</p>
      </div>
    </div>
    <div style="text-align:center;padding-top:40px;border-top:1px solid rgba(255,255,255,0.05);color:var(--renk-alt);font-size:0.9rem">
      &copy; 2026 {{ISLETME_ADI}}. Tüm Hakları Saklıdır. | Powered by <a href="https://kepenk.ai" style="color:var(--renk-vurgu);text-decoration:none;font-weight:700">kepenk.ai</a>
    </div>
  </div>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`
