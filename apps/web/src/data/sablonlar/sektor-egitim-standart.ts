import { ortakNav, ortakFooter } from './ortak'

export const sablonEgitimStandartHtml = `<!DOCTYPE html>
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
    --renk-arkaplan:#fffdfa;
    --renk-kart:#ffffff;
    --renk-vurgu:#ff6b35; /* Enerjik Turuncu */
    --renk-hover:#e85822;
    --renk-metin:#2b2d42;
    --renk-alt:#6c757d;
    --renk-gradient:linear-gradient(135deg, #fff2eb 0%, #ffe3d3 100%);
    --font-baslik:'Merriweather',serif;
    --font-metin:'Nunito',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden}
  h1,h2,h3{font-family:var(--font-baslik);color:#14213d;line-height:1.2}
  
  .kart{background:var(--renk-kart);border-radius:16px;padding:32px;box-shadow:0 12px 24px rgba(255,107,53,0.04);transition:transform 0.3s;border-top:4px solid transparent;display:flex;flex-direction:column;gap:16px}
  .kart:hover{transform:translateY(-6px);border-top-color:var(--renk-vurgu);box-shadow:0 20px 40px rgba(255,107,53,0.08)}
  
  .buton-birincil{display:inline-flex;align-items:center;justify-content:center;background:var(--renk-vurgu);color:#fff;padding:16px 32px;border-radius:12px;text-decoration:none;font-weight:800;font-size:1.05rem;transition:all 0.3s;border:none}
  .buton-birincil:hover{background:var(--renk-hover);transform:scale(1.05);box-shadow:0 8px 20px rgba(255,107,53,0.3)}
  .buton-ikincil{display:inline-flex;align-items:center;justify-content:center;background:#fff;color:var(--renk-vurgu);padding:16px 32px;border-radius:12px;text-decoration:none;font-weight:800;font-size:1.05rem;transition:all 0.3s;border:2px solid var(--renk-vurgu)}
  .buton-ikincil:hover{background:var(--renk-vurgu);color:#fff}
  
  .bolum-baslik{text-align:center;margin-bottom:50px}
  .bolum-baslik h2{font-size:clamp(2rem,4.5vw,2.8rem);font-weight:900;margin-bottom:16px}
  .bolum-baslik p{color:var(--renk-alt);font-size:1.15rem;max-width:700px;margin:0 auto;line-height:1.7}
  
  section{padding:90px 20px}
  .container{max-width:900px;margin:0 auto}
  .container-lg{max-width:1150px;margin:0 auto}
  
  .hero-edu{min-height:95vh;display:flex;align-items:center;padding:140px 20px 80px;background:var(--renk-gradient);position:relative;overflow:hidden;text-align:center}
  .hero-edu::after{content:'';position:absolute;left:-10%;top:10%;width:400px;height:400px;background:radial-gradient(circle,rgba(255,107,53,0.1),transparent 60%);border-radius:50%;pointer-events:none}
  .hero-edu-icerik{position:relative;z-index:2;max-width:850px;margin:0 auto;width:100%}
  
  .ozellik-badge{display:inline-flex;align-items:center;gap:8px;background:#fff;padding:8px 20px;border-radius:30px;font-weight:700;color:var(--renk-metin);font-size:0.9rem;box-shadow:0 4px 10px rgba(0,0,0,0.05);margin:0 8px 16px}
  .grid-ders{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
  
  @media(max-width:768px){section{padding:60px 20px}.buton-birincil,.buton-ikincil{width:100%}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}

<nav id="nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:#ffffff;box-shadow:0 2px 10px rgba(0,0,0,0.05);padding:18px 20px;display:flex;justify-content:space-between;align-items:center;transition:transform 0.3s">
  <a href="#" style="font-family:var(--font-baslik);font-weight:900;font-size:1.5rem;color:var(--renk-vurgu);text-decoration:none">{{ISLETME_KISAADI}}</a>
  <div id="nav-linkler" style="display:flex;gap:30px;align-items:center">
    <a href="#programlar" style="color:var(--renk-metin);text-decoration:none;font-weight:700;font-size:0.95rem">Programlar</a>
    <a href="#hakkimizda" style="color:var(--renk-metin);text-decoration:none;font-weight:700;font-size:0.95rem">Neden Biz?</a>
    <a href="tel:{{TELEFON}}" style="background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:10px 24px;border-radius:10px;font-size:0.9rem;font-weight:800">Kayıt Ol</a>
  </div>
</nav>

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-edu parallax-bg overlay-dark animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80');">
  <div class="hero-edu-icerik overlay-content">
    <div style="margin-bottom:40px">
      <div class="ozellik-badge glass-panel" style="background:rgba(255,107,53,0.9);color:#fff;border:none;box-shadow:0 4px 15px rgba(255,107,53,0.4)">✨ Uzman Kadro</div>
      <div class="ozellik-badge glass-panel" style="background:rgba(255,255,255,0.9);border:1px solid rgba(255,255,255,0.5)">🎓 Kanıtlanmış Başarı</div>
      <div class="ozellik-badge glass-panel" style="background:rgba(255,255,255,0.9);border:1px solid rgba(255,255,255,0.5)">📍 {{ILCE}}</div>
    </div>
    <div class="glass-panel" style="padding:40px; border-radius:30px; background:rgba(20,33,61,0.7); box-shadow:0 20px 50px rgba(0,0,0,0.4); margin-bottom:48px; border:1px solid rgba(255,255,255,0.1)">
      <h1 style="font-size:clamp(2.8rem,7vw,4.5rem);font-weight:900;color:#fff;margin-bottom:24px;text-shadow:0 4px 15px rgba(0,0,0,0.6)">{{HERO_BASLIK}}</h1>
      <p style="color:rgba(255,255,255,0.9);font-size:1.25rem;line-height:1.7;max-width:680px;margin-left:auto;margin-right:auto;font-weight:600;text-shadow:0 2px 10px rgba(0,0,0,0.5)">{{HERO_SLOGAN}}</p>
    </div>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-ikincil glass-panel hover-pulse" style="background:rgba(255,255,255,0.1);color:#fff;border-color:rgba(255,255,255,0.3)">💬 {{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER (Öğrenci sayıları vb.) ──────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. PROGRAMLAR / EĞİTİMLER ────────────────────────────── -->
<section id="programlar" style="background:#fff">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2 style="color:var(--renk-vurgu)">Eğitim Programlarımız</h2>
      <p>Öğrencilerimizin potansiyellerini en üst düzeye çıkarmak için tasarlandı.</p>
    </div>
    <div class="grid-ders">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. NEDEN BİZ (Hakkımızda) ────────────────────────────── -->
<section id="hakkimizda" class="parallax-bg overlay-light" style="background-image: url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
      <div class="glass-panel" style="background:rgba(255,255,255,0.9);padding:40px;border-radius:24px;box-shadow:0 15px 40px rgba(0,0,0,0.05);border:1px solid rgba(255,255,255,0.5)">
        <p style="color:var(--renk-vurgu);font-weight:800;font-size:0.95rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Eğitimde Farkımız</p>
        <h2 style="font-family:var(--font-baslik);font-size:clamp(1.8rem,4vw,2.4rem);font-weight:900;margin-bottom:24px;color:#14213d">{{ISLETME_ADI}} Ayrıcalığı</h2>
        <div style="display:grid;gap:16px">{{NEDEN_BIZ_HTML}}</div>
      </div>
      <div>
        <div class="glass-panel" style="background:rgba(255,255,255,0.95);padding:40px;border-radius:24px;box-shadow:0 20px 50px rgba(0,0,0,0.1)">
          <h3 style="font-family:var(--font-baslik);font-size:1.5rem;color:#14213d;margin-bottom:20px">Kayıt Süreci</h3>
          <div style="color:var(--renk-alt);line-height:1.8;font-size:1.05rem;font-weight:600">{{MODUL_HAKKIMIZDA_HIKAYE}}</div>
          <div style="margin-top:24px">
            <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse" style="width:100%">📞 Bilgi Alın</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── 5. SERTİFİKALAR / BAŞARILAR ──────────────────────────── -->
{{MODUL_SERTIFIKA_BELGELER}}
{{MODUL_MUSTERI_REFERANSLARI}}

<!-- ── 6. VİDEO TANITIM ─────────────────────────────────────── -->
{{MODUL_VIDEO_TANITIM}}

<!-- ── 7. ÖĞRENCİ YORUMLARI ─────────────────────────────────── -->
<section id="yorumlar" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <h2 style="color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.5)">Öğrencilerimiz Ne Diyor?</h2>
      <p style="color:rgba(255,255,255,0.9);text-shadow:0 2px 10px rgba(0,0,0,0.5)">Başarı hikayelerimiz ve mutlu ailelerimizin yorumları.</p>
    </div>
    <div class="grid-ders">{{YORUMLAR_HTML}}</div>
    <style>
      #yorumlar .kart {background:rgba(255,255,255,0.95);box-shadow:0 10px 30px rgba(0,0,0,0.15)}
    </style>
  </div>
</section>

<!-- ── 8. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_BLOG_MAKALELER}}

<!-- ── 9. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik glass-panel" style="background:rgba(20,33,61,0.85);padding:32px;border-radius:24px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 15px 40px rgba(0,0,0,0.3)">
      <h2 style="color:#fff">Bize Ulaşın</h2>
      <p style="color:#e5e5e5">Kayıt hakkında detaylı bilgi almak veya kampüsümüzü ziyaret etmek için bize ulaşın.</p>
    </div>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px">
      <div>
        <div class="glass-panel" style="background:rgba(255,255,255,0.1);padding:32px;border-radius:24px;margin-bottom:32px;border:1px solid rgba(255,255,255,0.2)">
          <p style="color:#fca311;font-weight:800;font-size:1.1rem;margin-bottom:8px">Adresimiz</p>
          <p style="color:#fff;font-size:1.1rem;line-height:1.6;margin-bottom:24px">{{ADRES_METNI}}</p>
          <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse" style="display:block;text-align:center;margin-bottom:12px">📞 {{TELEFON_GOSTERIM}}</a>
          <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-ikincil glass-panel shadow-lg hover-pulse" style="display:block;text-align:center;background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.3);color:#fff">💬 WhatsApp İletişim</a>
        </div>
        {{MODUL_CALISMA_SAATLERI}}
        {{MODUL_SOSYAL_MEDYA}}
      </div>
      <div style="border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.2)">
        <iframe src="{{HARITA_URL}}" width="100%" height="100%" style="border:none;min-height:350px" loading="lazy"></iframe>
      </div>
    </div>
  </div>
</section>

<!-- ── 10. YASAL + BÜLTEN ────────────────────────────────────── -->
{{MODUL_TEKLIF_FORMU}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#0a0908;padding:60px 20px 40px;text-align:center;color:#f3f4f6">
  <h2 style="font-family:var(--font-baslik);font-size:2rem;margin-bottom:16px;color:var(--renk-vurgu)">{{ISLETME_ADI}}</h2>
  <p style="color:#9ca3af;font-size:1.05rem;margin-bottom:32px">{{SEKTOR}} - Eğitimde Güvenilir Adres</p>
  <div style="margin-bottom:32px;border-top:1px solid rgba(255,255,255,0.1);padding-top:32px;display:flex;justify-content:center;gap:24px;flex-wrap:wrap">
    <a href="tel:{{TELEFON}}" style="color:#fff;text-decoration:none;font-weight:700">📞 {{TELEFON_GOSTERIM}}</a>
    <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="color:#fff;text-decoration:none;font-weight:700">💬 WhatsApp</a>
  </div>
  <p style="color:#6b7280;font-size:0.85rem">&copy; 2026 Tüm Hakları Saklıdır. Powered by <a href="https://kepenk.ai" style="color:var(--renk-vurgu);text-decoration:none;font-weight:800">kepenk.ai</a></p>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`
