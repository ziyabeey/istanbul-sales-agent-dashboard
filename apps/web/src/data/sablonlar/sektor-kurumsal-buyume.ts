import { ortakNav, ortakFooter } from './ortak'

export const sablonKurumsalBuyumeHtml = `<!DOCTYPE html>
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
    --renk-arkaplan:#f4f7f6;
    --renk-kart:#ffffff;
    --renk-vurgu:#0d3b66; /* Kurumsal Lacivert */
    --renk-hover:#0a2c4e;
    --renk-metin:#1d2d44;
    --renk-alt:#5c6b73;
    --renk-gradient:linear-gradient(135deg, #fdfdfd 0%, #f4f7f6 100%);
    --font-baslik:'Geist',sans-serif;
    --font-metin:'Inter',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden}
  h1,h2,h3{font-family:var(--font-baslik);letter-spacing:-0.03em}
  
  .kart{background:var(--renk-kart);border-radius:8px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05),0 2px 4px -1px rgba(0,0,0,0.03);transition:transform 0.2s,box-shadow 0.2s;border:1px solid #e2e8f0;display:flex;flex-direction:column;gap:12px}
  .kart:hover{transform:translateY(-2px);box-shadow:0 10px 15px -3px rgba(0,0,0,0.05),0 4px 6px -2px rgba(0,0,0,0.02);border-color:#cbd5e1}
  
  .buton-birincil{display:inline-flex;align-items:center;justify-content:center;background:var(--renk-vurgu);color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:0.95rem;transition:all 0.2s;border:none}
  .buton-birincil:hover{background:var(--renk-hover)}
  .buton-ikincil{display:inline-flex;align-items:center;justify-content:center;background:#fff;color:var(--renk-vurgu);padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:0.95rem;transition:all 0.2s;border:1px solid #d1d5db}
  .buton-ikincil:hover{background:#f3f4f6;border-color:#9ca3af}
  
  .bolum-baslik{max-width:800px;margin-bottom:60px}
  .bolum-baslik h2{font-size:clamp(1.8rem,4vw,2.5rem);font-weight:700;color:var(--renk-metin);margin-bottom:16px}
  .bolum-baslik p{color:var(--renk-alt);font-size:1.1rem;line-height:1.6}
  
  section{padding:100px 20px}
  .container{max-width:1000px;margin:0 auto}
  .container-lg{max-width:1200px;margin:0 auto}
  
  .hero-corp{min-height:90vh;display:flex;align-items:center;padding:120px 20px;background:var(--renk-gradient);position:relative;border-bottom:1px solid #e2e8f0}
  .hero-corp-bg{position:absolute;right:0;top:0;bottom:0;width:40%;background:linear-gradient(220deg,rgba(13,59,102,0.03) 0%,transparent 100%);pointer-events:none}
  .hero-corp-icerik{position:relative;z-index:2;max-width:850px;margin:0 auto;text-align:center}
  
  .grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
  
  @media(max-width:900px){.grid-2{grid-template-columns:1fr;gap:40px}}
  @media(max-width:768px){section{padding:70px 20px}.buton-birincil,.buton-ikincil{width:100%}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<!-- Geist font substitution for unsupported environments: falling back to system-ui/Inter -->
<style> :root{ --font-baslik: 'Geist', 'Inter', system-ui, sans-serif; } </style>
</head>
<body>

{{MODUL_DUYURU_BANDI}}

<nav id="nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);border-bottom:1px solid #e2e8f0;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;transition:background 0.3s">
  <a href="#" style="font-family:var(--font-baslik);font-weight:700;font-size:1.4rem;color:var(--renk-vurgu);text-decoration:none">{{ISLETME_KISAADI}}</a>
  <div id="nav-linkler" style="display:flex;gap:32px;align-items:center">
    <a href="#uzmanliklar" style="color:var(--renk-alt);text-decoration:none;font-weight:500;font-size:0.9rem">Uzmanlık Alanları</a>
    <a href="#hakkimizda" style="color:var(--renk-alt);text-decoration:none;font-weight:500;font-size:0.9rem">Hakkımızda</a>
    <a href="tel:{{TELEFON}}" style="background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:10px 24px;border-radius:6px;font-size:0.85rem;font-weight:600">İletişime Geçin</a>
  </div>
</nav>

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-corp parallax-bg overlay-dark animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'); border-bottom:1px solid rgba(255,255,255,0.1);">
  <div class="hero-corp-bg" style="background:linear-gradient(220deg,rgba(13,59,102,0.8) 0%,rgba(0,0,0,0.4) 100%); width:100%; top:0; left:0; right:0; bottom:0;"></div>
  <div class="hero-corp-icerik overlay-content">
    <div class="glass-panel" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);padding:8px 20px;border-radius:30px;margin-bottom:24px;border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">
      <span style="display:block;width:8px;height:8px;background:#4ade80;border-radius:50%;box-shadow:0 0 10px #4ade80"></span>
      Kurumsal Çözüm Ortağınız
    </div>
    <div class="glass-panel" style="padding:40px; border-radius:24px; background:rgba(13,59,102,0.6); box-shadow:0 15px 50px rgba(0,0,0,0.3); margin-bottom:48px; border:1px solid rgba(255,255,255,0.15)">
      <h1 style="font-size:clamp(2.5rem,6vw,4.5rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:24px;text-shadow:0 4px 15px rgba(0,0,0,0.5)">{{HERO_BASLIK}}</h1>
      <p style="color:rgba(255,255,255,0.9);font-size:1.15rem;line-height:1.7;max-width:640px;margin-left:auto;margin-right:auto;text-shadow:0 2px 8px rgba(0,0,0,0.4)">{{HERO_SLOGAN}}</p>
    </div>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse" style="background:#fff;color:var(--renk-vurgu);border:1px solid #fff">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-ikincil glass-panel" style="background:rgba(255,255,255,0.1);color:#fff;border-color:rgba(255,255,255,0.3)">💬 {{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER (Güven Odaklı) ──────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. HİZMETLER / UZMANLIK ALANLARI ──────────────────────── -->
<section id="uzmanliklar" style="background:#fff">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Uzmanlık Alanlarımız</h2>
      <p>{{SEKTOR}} alanında profesyonel ekibimizle yenilikçi ve güvenilir hizmet sunuyoruz.</p>
    </div>
    <div class="grid-3">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. SÜRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 5. NEDEN BİZ (Kurumsal Değerler) ─────────────────────── -->
<section id="hakkimizda" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="grid-2">
      <div class="glass-panel" style="background:rgba(13,59,102,0.85);padding:40px;border-radius:24px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 15px 40px rgba(0,0,0,0.3)">
        <h2 style="font-family:var(--font-baslik);font-size:clamp(1.8rem,4vw,2.5rem);font-weight:700;margin-bottom:24px;color:#fff;text-shadow:0 2px 5px rgba(0,0,0,0.5)">Şeffaflık. Güven. Profesyonellik.</h2>
        <div style="color:rgba(255,255,255,0.9);line-height:1.7;font-size:1.05rem">{{MODUL_HAKKIMIZDA_HIKAYE}}</div>
      </div>
      <div>
        <p style="color:#60a5fa;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;text-shadow:0 2px 4px rgba(0,0,0,0.8)">Neden Bizi Seçmelisiniz?</p>
        <div style="display:grid;gap:16px">{{NEDEN_BIZ_HTML}}</div>
        <style>
          #hakkimizda .kart {background:rgba(255,255,255,0.95);border-radius:12px;padding:24px;border:none;box-shadow:0 10px 20px rgba(0,0,0,0.2)}
          #hakkimizda .kart h3 {color:var(--renk-vurgu)}
        </style>
      </div>
    </div>
  </div>
</section>

<!-- ── 6. SERTİFİKALAR ──────────────────────────────────────── -->
{{MODUL_SERTIFIKA_BELGELER}}
{{MODUL_MUSTERI_REFERANSLARI}}

<!-- ── 7. RANDEVU / DANIŞMANLIK ─────────────────────────────── -->
{{MODUL_RANDEVU}}
{{MODUL_TEKLIF_FORMU}}

<!-- ── 8. YORUMLAR (Referanslar) ────────────────────────────── -->
<section id="referanslar" class="parallax-bg overlay-light" style="background-image: url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik glass-panel" style="background:rgba(255,255,255,0.9);padding:32px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.05);border:1px solid rgba(255,255,255,0.5)">
      <h2 style="color:var(--renk-vurgu)">İş Ortaklarımızın Gözünden</h2>
      <p style="color:var(--renk-metin)">Birlikte büyüdüğümüz yüzlerce mutlu kurumdan bazıları.</p>
    </div>
    <div class="grid-3">{{YORUMLAR_HTML}}</div>
    <style>
      #referanslar .kart {background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.05);box-shadow:0 10px 25px rgba(0,0,0,0.05)}
    </style>
  </div>
</section>

<!-- ── 9. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_BLOG_MAKALELER}}
{{MODUL_KARIYER_ILANLARI}}

<!-- ── 10. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="grid-2">
      <div class="glass-panel" style="background:rgba(15,23,42,0.85);padding:40px;border-radius:24px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 50px rgba(0,0,0,0.5)">
        <h2 style="font-family:var(--font-baslik);font-size:2.5rem;font-weight:700;margin-bottom:16px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.5)">İletişime Geçin</h2>
        <p style="color:#94a3b8;font-size:1.1rem;line-height:1.6;margin-bottom:40px">İhtiyaçlarınızı dinlemek ve size en uygun çözümleri sunmak için hazırız.</p>
        
        <div style="background:rgba(255,255,255,0.05);padding:32px;border-radius:16px;border:1px solid rgba(255,255,255,0.1);margin-bottom:32px">
          <p style="color:#e2e8f0;margin-bottom:24px;font-size:1.05rem">📍 {{ADRES_METNI}}</p>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse" style="background:#fff;color:var(--renk-vurgu)">📞 {{TELEFON_GOSTERIM}}</a>
            <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-ikincil glass-panel shadow-lg hover-pulse" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.3);color:#fff">💬 WhatsApp İletişim</a>
          </div>
        </div>
        {{MODUL_CALISMA_SAATLERI}}
      </div>
      <div style="height:100%;min-height:500px;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.2)">
        <iframe src="{{HARITA_URL}}" width="100%" height="100%" style="border:none" loading="lazy"></iframe>
      </div>
    </div>
  </div>
</section>

<!-- ── 11. YASAL + BÜLTEN ────────────────────────────────────── -->
{{MODUL_EPOSTA_BULTENI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#0f172a;padding:80px 20px 40px;color:#94a3b8">
  <div class="container-lg">
    <div class="grid-3" style="margin-bottom:60px;padding-bottom:60px;border-bottom:1px solid rgba(255,255,255,0.05)">
      <div>
        <h2 style="font-family:var(--font-baslik);font-size:1.8rem;margin-bottom:16px;color:#fff;font-weight:700">{{ISLETME_ADI}}</h2>
        <p style="line-height:1.6">{{SEKTOR}} alanında uzman kadromuzla yanınızdayız.</p>
      </div>
      <div>
        <h3 style="color:#fff;font-size:1.1rem;margin-bottom:20px;font-weight:600">İletişim</h3>
        <p style="margin-bottom:12px">📍 {{ILCE}}, {{SEHIR}}</p>
        <p style="margin-bottom:12px">📞 {{TELEFON_GOSTERIM}}</p>
      </div>
      <div>
        {{MODUL_SOSYAL_MEDYA}}
      </div>
    </div>
    <div style="text-align:center;font-size:0.85rem">
      &copy; 2026 {{ISLETME_ADI}}. Tüm Hakları Saklıdır. Powered by <a href="https://kepenk.ai" style="color:var(--renk-vurgu);text-decoration:none">kepenk.ai</a>
    </div>
  </div>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`
