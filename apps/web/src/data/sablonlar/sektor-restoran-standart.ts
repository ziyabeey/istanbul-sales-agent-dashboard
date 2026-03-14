import { ortakCSS, ortakNav, ortakFooter } from './ortak'

export const sablonRestoranStandartHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{{SEO_ACIKLAMA}}">
<meta property="og:title" content="{{SEO_BASLIK}}">
<meta property="og:description" content="{{SEO_ACIKLAMA}}">
<meta property="og:url" content="{{OG_URL}}">
<meta property="og:type" content="website">
<title>{{SEO_BASLIK}}</title>
\${ortakCSS}
<style>
  .hero-food{min-height:95vh;display:flex;align-items:center;padding:calc(var(--nav-height) + var(--space-8)) var(--space-3) var(--space-8);background:var(--renk-gradient);position:relative;text-align:center}
  .hero-food::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at center,transparent 20%,rgba(0,0,0,0.8) 100%);pointer-events:none}
  .hero-food-icerik{position:relative;z-index:2;max-width:800px;margin:0 auto;width:100%}
  
  .menu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--space-3)}
  .neden-grid-r{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:var(--space-3)}
  .yorum-grid-r{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-3)}
  
  .sub-label{display:block;color:var(--renk-vurgu);font-size:var(--fs-sm);font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:var(--space-2)}
  
  @media(max-width:768px){
    .iletisim-grid{grid-template-columns:1fr!important}
  }
</style>
</head>
<body>

{{MODUL_DUYURU_BANDI}}
\${ortakNav}

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-food parallax-bg overlay-dark animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80');">
  <div class="hero-food-icerik overlay-content">
    <div class="glass-panel" style="display:inline-block;padding:var(--space-1) var(--space-3);border-radius:30px;border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:var(--fs-sm);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:var(--space-4);background:rgba(0,0,0,0.4);font-family:var(--font-baslik)">
      {{ILCE}} / {{SEHIR}}
    </div>
    <h1 style="font-size:var(--fs-5xl);font-weight:700;color:#f8f9fa;line-height:1.1;margin-bottom:var(--space-3);text-shadow:0 4px 20px rgba(0,0,0,0.8)">{{HERO_BASLIK}}</h1>
    <p style="color:#e9ecef;font-size:var(--fs-lg);line-height:1.7;margin-bottom:var(--space-5);max-width:var(--content-width);margin-left:auto;margin-right:auto;text-shadow:0 2px 10px rgba(0,0,0,0.6)">{{HERO_SLOGAN}}</p>
    <div style="display:flex;gap:var(--space-2);justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="#menu" class="buton-ikincil glass-panel" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.3)">🍽️ Menüyü İncele</a>
    </div>
  </div>
  <a href="#menu" class="scroll-down-ok" aria-label="Aşağı kaydır">↓</a>
</section>

<!-- ── 2. İSTATİSTİKLER ─────────────────────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<hr class="section-divider">

<!-- ── 3. HİZMETLER / MENÜ ─────────────────────────────────── -->
<section id="menu">
  <div class="container-lg">
    <div class="bolum-baslik">
      <span class="sub-label">Lezzet & Deneyim</span>
      <h2>Öne Çıkan Lezzetlerimiz</h2>
    </div>
    <div class="menu-grid">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<hr class="section-divider">

<!-- ── 4. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_CALISMA_SAATLERI}}
{{MODUL_RANDEVU}}

<!-- ── 5. NEDEN BİZ ─────────────────────────────────────────── -->
<section id="hakkimizda" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80');">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <span class="sub-label" style="text-shadow:0 2px 5px rgba(0,0,0,0.8)">Bizim Farkımız</span>
      <h2 style="color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.8)">Neden {{ISLETME_ADI}}?</h2>
    </div>
    <div class="neden-grid-r">
      {{NEDEN_BIZ_HTML}}
      <style> 
        #hakkimizda .kart{background:rgba(0,0,0,0.6);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);color:#e9ecef;box-shadow:0 10px 30px rgba(0,0,0,0.5)} 
        #hakkimizda .kart h3{color:#fff;font-size:var(--fs-lg);margin-bottom:var(--space-2)}
        #hakkimizda .kart:hover{border-color:var(--renk-vurgu);transform:translateY(-6px)}
      </style>
    </div>
  </div>
</section>

<!-- ── 6. HİKAYE ───────────────────────────────────────────── -->
{{MODUL_HAKKIMIZDA_HIKAYE}}

<hr class="section-divider">

<!-- ── 7. YORUMLAR ──────────────────────────────────────────── -->
<section id="yorumlar" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1600&q=80');">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <span class="sub-label" style="text-shadow:0 2px 5px rgba(0,0,0,0.8)">Müşteri Deneyimleri</span>
      <h2 style="color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.8)">Misafirlerimiz Ne Diyor?</h2>
    </div>
    <div class="yorum-grid-r">{{YORUMLAR_HTML}}</div>
    <style>
      #yorumlar .kart{background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);color:#e9ecef;box-shadow:0 10px 30px rgba(0,0,0,0.3)}
      #yorumlar .kart h3{color:var(--renk-vurgu)}
      #yorumlar .kart p{font-style:italic}
      #yorumlar .kart:hover{border-color:var(--renk-vurgu)}
    </style>
  </div>
</section>

<!-- ── 8. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_MUSTERI_REFERANSLARI}}

<!-- ── 9. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" class="section-alt">
  <div class="container-lg">
    <div class="iletisim-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5);align-items:center">
      <div>
        <div class="bolum-baslik" style="text-align:left;margin-bottom:var(--space-4)">
          <span class="sub-label">Size Bekliyoruz</span>
          <h2>İletişim & Konum</h2>
        </div>
        <p style="color:var(--renk-alt);font-size:var(--fs-lg);line-height:1.7;margin-bottom:var(--space-3)">{{ADRES_METNI}}</p>
        <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-4);flex-wrap:wrap">
          <a href="tel:{{TELEFON}}" class="buton-birincil">📞 Hemen Arayın</a>
          <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-birincil" style="background:#25d366">💬 WhatsApp</a>
        </div>
        {{MODUL_SOSYAL_MEDYA}}
      </div>
      <div style="border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1)">
        <iframe src="{{HARITA_URL}}" width="100%" height="400" style="border:none" loading="lazy" title="Konum haritası"></iframe>
        {{MODUL_HARITA_YOL_TARIFI}}
      </div>
    </div>
  </div>
</section>

<!-- ── 10. YASAL + MODÜLLER ─────────────────────────────────── -->
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}
{{MODUL_EPOSTA_BULTENI}}
\${ortakFooter}

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`
