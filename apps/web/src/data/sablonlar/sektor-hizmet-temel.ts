import { ortakNav, ortakFooter } from './ortak'

export const sablonHizmetTemelHtml = `<!DOCTYPE html>
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
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    --renk-arkaplan:#ffffff;
    --renk-kart:#f8f9fa;
    --renk-vurgu:#e53935; /* Acil kırmızı tonu */
    --renk-hover:#c62828;
    --renk-metin:#212529;
    --renk-alt:#6c757d;
    --renk-gradient:linear-gradient(135deg, #e53935 0%, #b71c1c 100%);
    --font-baslik:'Barlow',sans-serif;
    --font-metin:'Inter',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden}
  h1,h2,h3{font-family:var(--font-baslik);font-weight:800}
  
  .kart{background:var(--renk-kart);border-radius:12px;padding:24px;border:2px solid #e9ecef}
  .kart h3{color:var(--renk-vurgu);font-size:1.4rem;margin-bottom:12px}
  .kart p{color:var(--renk-metin);font-weight:500;line-height:1.5}
  
  .buton-dev{display:block;width:100%;text-align:center;background:var(--renk-vurgu);color:#fff;padding:24px;border-radius:16px;text-decoration:none;font-weight:900;font-size:1.5rem;text-transform:uppercase;letter-spacing:1px;box-shadow:0 10px 30px rgba(229,57,53,0.3);border:none;margin-bottom:16px;transition:all 0.2s}
  .buton-dev:active{transform:scale(0.98);box-shadow:0 5px 15px rgba(229,57,53,0.2)}
  .buton-dev-wp{background:#25d366;box-shadow:0 10px 30px rgba(37,211,102,0.3)}
  
  .bolum-baslik{text-align:center;margin-bottom:32px}
  .bolum-baslik h2{font-size:clamp(1.8rem,6vw,2.5rem);color:var(--renk-metin);line-height:1.1;text-transform:uppercase}
  
  section{padding:60px 20px}
  .container{max-width:600px;margin:0 auto}
  
  .hero-fast{padding:40px 20px;background:#f8f9fa;text-align:center;border-bottom:4px solid var(--renk-vurgu)}
  .badge-acil{display:inline-block;background:var(--renk-vurgu);color:#fff;padding:6px 16px;border-radius:8px;font-weight:800;text-transform:uppercase;font-size:0.9rem;letter-spacing:1px;margin-bottom:20px;animation:pulse 2s infinite}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(229,57,53,0.4)}70%{box-shadow:0 0 0 10px rgba(229,57,53,0)}100%{box-shadow:0 0 0 0 rgba(229,57,53,0)}}
  
  .hizmet-listesi{display:grid;gap:16px}
  .neden-liste{list-style:none;padding:0}
  .neden-liste li{padding:16px;background:#fff;border:2px solid #dee2e6;border-radius:12px;margin-bottom:12px;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:12px}
  .neden-liste li::before{content:'✓';background:var(--renk-vurgu);color:#fff;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:1.2rem}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@700;800;900&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}

<!-- Çok basit, sadece logo/isim olan navbar -->
<div style="background:var(--renk-metin);padding:16px;text-align:center">
  <h1 style="color:#fff;font-size:1.8rem;text-transform:uppercase;letter-spacing:1px;margin:0">{{ISLETME_KISAADI}}</h1>
</div>

<!-- ── 1. HERO (Hemen Ara) ─────────────────────────────────── -->
<section class="hero-fast parallax-bg overlay-dark animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80'); border-bottom:4px solid var(--renk-vurgu); padding:100px 20px;">
  <div class="container overlay-content">
    <div class="glass-panel" style="padding:40px; border-radius:16px; border:1px solid rgba(255,255,255,0.1)">
      <div class="badge-acil" style="box-shadow:0 0 15px rgba(229,57,53,0.5)">🟢 Hemen Hizmetinizdeyiz</div>
      <h1 style="font-size:clamp(2.5rem,8vw,3.5rem);line-height:1;margin-bottom:16px;color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.8)">{{HERO_BASLIK}}</h1>
      <p style="font-size:1.2rem;color:rgba(255,255,255,0.9);font-weight:500;margin-bottom:32px;text-shadow:0 2px 10px rgba(0,0,0,0.6)">{{HERO_SLOGAN}}</p>
      
      <!-- DEV CTA BUTONLARI -->
      <a href="tel:{{TELEFON}}" class="buton-dev hover-pulse">📞 ŞİMDİ ARA</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-dev buton-dev-wp hover-pulse">💬 WHATSAPP'TAN YAZ</a>
      
      <div style="margin-top:24px;font-weight:700;color:#e2e8f0;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px">
        📍 {{ILCE}}, {{SEHIR}} - 7/24 Hizmet
      </div>
    </div>
  </div>
</section>

<!-- ── 2. HİZMETLER (Kısa Liste) ────────────────────────────── -->
<section id="hizmetler" style="background:#fff">
  <div class="container">
    <div class="bolum-baslik">
      <h2>Hizmetlerimiz</h2>
    </div>
    <div class="hizmet-listesi">
      {{HIZMETLER_HTML}}
      <style> #hizmetler .kart{background:#fff} #hizmetler .kart h3{color:var(--renk-metin);font-size:1.2rem;margin-bottom:8px} #hizmetler .kart p{color:var(--renk-alt);font-size:0.95rem;font-weight:400} </style>
    </div>
  </div>
</section>

<!-- ── 3. NEDEN BİZ (Checkbox Liste) ────────────────────────── -->
<section id="neden" class="parallax-bg overlay-light" style="background-image: url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80'); padding:80px 20px;">
  <div class="container overlay-content">
    <div class="bolum-baslik">
      <h2 style="color:var(--renk-metin);">Neden Biz?</h2>
    </div>
    <div class="glass-panel" style="background:rgba(255,255,255,0.85);padding:32px;border-radius:24px;box-shadow:0 15px 40px rgba(0,0,0,0.08);border:1px solid rgba(255,255,255,0.5)">
      <div style="display:grid;gap:16px">
        {{NEDEN_BIZ_HTML}}
        <!-- Neden biz HTML'inin icine mudahale edelim style ile -->
        <style> #neden .kart{padding:20px;border-radius:16px;border:1px solid rgba(0,0,0,0.05);background:#fff;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 15px rgba(0,0,0,0.02);transition:all 0.3s;} #neden .kart:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(229,57,53,0.1);border-color:rgba(229,57,53,0.2)} #neden .kart h3{margin:0;font-size:1.15rem;color:var(--renk-metin)} #neden .kart p{margin:0;font-size:0.95rem;color:var(--renk-alt)} </style>
      </div>
    </div>
  </div>
</section>

<!-- ── 4. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_CALISMA_SAATLERI}}
{{MODUL_WHATSAPP_TEKLIF}}

<!-- ── 5. YORUMLAR (Opsiyonel) ──────────────────────────────── -->
<section id="yorumlar" style="background:#fff">
  <div class="container">
    <div class="bolum-baslik">
      <h2>Müşteri Yorumları</h2>
    </div>
    <!-- Cok basit 1 kolonlu yorum gridi -->
    <div style="display:grid;grid-template-columns:1fr;gap:16px">
      {{YORUMLAR_HTML}}
      <style> #yorumlar .kart{background:var(--renk-kart);border:none;padding:24px;border-radius:16px} #yorumlar .kart p{font-size:1.1rem;font-style:italic;color:var(--renk-metin)} #yorumlar .kart span{display:block;margin-top:16px;font-weight:700;color:var(--renk-vurgu)}</style>
    </div>
  </div>
</section>

<!-- ── 6. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container overlay-content" style="text-align:center">
    <h2 style="font-size:2rem;margin-bottom:24px;color:#fff;text-transform:uppercase">Bize Ulaşın</h2>
    
    <div class="glass-panel" style="background:rgba(255,255,255,0.1);padding:32px;border-radius:24px;margin-bottom:32px;border:1px solid rgba(255,255,255,0.2)">
      <div style="font-size:1.2rem;font-weight:700;margin-bottom:12px;color:rgba(255,255,255,0.7)">Adresimiz:</div>
      <p style="color:#fff;font-size:1.1rem;line-height:1.6">{{ADRES_METNI}}</p>
    </div>
    
    <a href="tel:{{TELEFON}}" class="buton-dev shadow-lg hover-pulse" style="margin-bottom:16px">📞 {{TELEFON_GOSTERIM}}</a>
    <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-dev buton-dev-wp shadow-lg hover-pulse">💬 WHATSAPP</a>
    
    <div style="margin-top:40px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.2);box-shadow:0 10px 30px rgba(0,0,0,0.3)">
      <iframe src="{{HARITA_URL}}" width="100%" height="300" style="border:none" loading="lazy"></iframe>
    </div>
  </div>
</section>

<!-- ── 7. YASAL VE ALT BİLGİ ─────────────────────────────────── -->
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#000;padding:40px 20px;text-align:center;color:#6c757d">
  <h3 style="color:#fff;font-size:1.5rem;margin-bottom:12px;text-transform:uppercase">{{ISLETME_ADI}}</h3>
  <p style="font-size:0.9rem;margin-bottom:24px">{{SEKTOR}} - {{ILCE}}</p>
  <p style="font-size:0.8rem">Powered by <a href="https://kepenk.ai" style="color:#fff;text-decoration:none">kepenk.ai</a></p>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
{{MODUL_SOSYAL_MEDYA}}
</body>
</html>`
