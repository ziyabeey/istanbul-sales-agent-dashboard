import { ortakCSS, ortakNav, ortakFooter } from './ortak'

export const sablonPremiumHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{{SEO_ACIKLAMA}}">
<meta property="og:title" content="{{SEO_BASLIK}}">
<meta property="og:description" content="{{SEO_ACIKLAMA}}">
<meta property="og:url" content="{{OG_URL}}">
<title>{{SEO_BASLIK}}</title>
\${ortakCSS}
<style>
/* OBSİDYEN - Premium Karanlık Stil */
:root {
  --obsidyen-bg: #050505;
  --obsidyen-bg-alt: #0a0a0a;
  --obsidyen-text: #f8fafc;
  --obsidyen-muted: #94a3b8;
  --obsidyen-border: rgba(255, 255, 255, 0.08);
  --obsidyen-glow: var(--renk-vurgu);
  --font-baslik: 'Cinzel', serif;
  --font-metin: 'Inter', sans-serif;
}
body { background: var(--obsidyen-bg); color: var(--obsidyen-text); font-family: var(--font-metin); }
h1, h2, h3, h4 { font-family: var(--font-baslik); color: #fff; font-weight: 400; letter-spacing: 0.05em; }

/* ── Glowing Hero ── */
.hero-obsidyen {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 140px 20px 80px; position: relative; overflow: hidden;
  background: #000; text-align: center;
}
.hero-obsidyen::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(var(--renk-vurgu-rgb, 212, 175, 55), 0.15), transparent 60%);
  pointer-events: none; z-index: 1;
}
.hero-obsidyen::after {
  content: ''; position: absolute; inset: 0;
  background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80');
  background-size: cover; background-position: center; opacity: 0.3; filter: grayscale(100%) contrast(1.2);
  z-index: 0;
}
.hero-o-icerik { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; width: 100%; }

.badge-obsidyen {
  display: inline-block; padding: 8px 24px; border-radius: 4px;
  border: 1px solid rgba(var(--renk-vurgu-rgb, 212, 175, 55), 0.5);
  background: rgba(var(--renk-vurgu-rgb, 212, 175, 55), 0.1);
  color: var(--obsidyen-glow); font-size: 0.8rem; letter-spacing: 3px;
  text-transform: uppercase; margin-bottom: 32px; backdrop-filter: blur(10px);
}
.hero-baslik { font-size: clamp(3rem, 7vw, 6rem); line-height: 1.1; margin-bottom: 24px; text-transform: uppercase; text-shadow: 0 10px 30px rgba(0,0,0,0.8); }
.hero-slogan { font-size: 1.25rem; color: var(--obsidyen-muted); line-height: 1.8; margin-bottom: 48px; max-width: 600px; margin-left: auto; margin-right: auto; }

/* Glass Kartlar */
.kart {
  background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-radius: 2px; padding: 40px; border: 1px solid var(--obsidyen-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); transition: all 0.4s ease;
  position: relative; overflow: hidden;
}
.kart::before {
  content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--renk-vurgu-rgb, 212, 175, 55), 0.5), transparent);
  transform: translateX(-100%); transition: transform 0.6s ease;
}
.kart:hover { border-color: rgba(var(--renk-vurgu-rgb, 212, 175, 55), 0.3); transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
.kart:hover::before { transform: translateX(100%); }
.kart h3 { font-size: 1.4rem; margin-bottom: 16px; color: #fff; }
.kart p { color: var(--obsidyen-muted); font-size: 0.95rem; line-height: 1.7; }

.buton-obsidyen-1 {
  background: var(--obsidyen-glow); color: #000; padding: 18px 40px; border-radius: 2px;
  font-weight: 600; font-family: var(--font-metin); text-decoration: none; text-transform: uppercase; letter-spacing: 1px;
  display: inline-flex; justify-content: center; align-items: center; gap: 12px;
  transition: all 0.3s; border: 1px solid var(--obsidyen-glow); box-shadow: 0 0 20px rgba(var(--renk-vurgu-rgb, 212, 175, 55), 0.3);
}
.buton-obsidyen-1:hover { background: transparent; color: var(--obsidyen-glow); box-shadow: inset 0 0 20px rgba(var(--renk-vurgu-rgb, 212, 175, 55), 0.2); }
.buton-obsidyen-2 {
  background: transparent; color: #fff; padding: 18px 40px; border-radius: 2px;
  font-weight: 600; font-family: var(--font-metin); text-decoration: none; text-transform: uppercase; letter-spacing: 1px;
  display: inline-flex; justify-content: center; align-items: center; gap: 12px;
  transition: all 0.3s; border: 1px solid var(--obsidyen-border);
}
.buton-obsidyen-2:hover { border-color: #fff; background: rgba(255,255,255,0.05); }

.bolum-baslik { text-align: center; margin-bottom: 72px; }
.bolum-baslik h2 { font-size: clamp(2.5rem, 5vw, 3.5rem); margin-bottom: 20px; text-transform: uppercase; }
.bolum-baslik p { color: var(--obsidyen-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; letter-spacing: 1px; }

section { padding: 140px 20px; border-bottom: 1px solid rgba(255,255,255,0.03); }
.bg-obsidyen-alt { background: var(--obsidyen-bg-alt); }

#nav { background: rgba(5, 5, 5, 0.8) !important; backdrop-filter: blur(20px) !important; border-bottom: 1px solid var(--obsidyen-border) !important; }
#nav a { color: #fff !important; }
#nav-linkler a { color: #a1a1aa !important; }
#nav-linkler a:hover { color: var(--obsidyen-glow) !important; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}
\${ortakNav}

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-obsidyen" id="hero">
  <div class="hero-o-icerik animate-fade-in-up">
    <div class="badge-obsidyen">{{SEKTOR}} Koleksiyonu</div>
    <h1 class="hero-baslik">{{HERO_BASLIK}}</h1>
    <p class="hero-slogan">{{HERO_SLOGAN}}</p>
    <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-obsidyen-1">Ayrıcalığı Keşfet</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-obsidyen-2">VIP İletişim</a>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER ─────────────────────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. SÜRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 4. HİZMETLER ─────────────────────────────────────────── -->
<section id="hizmetler" class="bg-obsidyen-alt">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Ayrıcalıklı Hizmetler</h2>
      <p>{{SEKTOR}} standartlarını yeniden belirleyen üst düzey çözümler.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:32px">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 5. RANDEVU SİSTEMİ ────────────────────────────────────── -->
{{MODUL_RANDEVU}}

<!-- ── 6. KAMPANYA ──────────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_INDIRIM_KUPONU}}

<!-- ── 7. HİKAYE & MİSYON ──────────────────────────────────── -->
<section id="hakkimizda" style="position:relative; overflow:hidden">
  <!-- Glowing effects -->
  <div style="position:absolute; top:-20%; left:-10%; width:40vw; height:40vw; background:rgba(var(--renk-vurgu-rgb, 212, 175, 55), 0.05); filter:blur(100px); border-radius:50%; z-index:0"></div>
  
  <div class="container-lg" style="position:relative; z-index:1">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center">
      <div>
        <div class="badge-obsidyen" style="margin-bottom:24px">Vizyonumuz</div>
        <h2 style="font-size:clamp(2.5rem,4vw,3.5rem);margin-bottom:32px;line-height:1.1">{{ISLETME_ADI}} İmzası</h2>
        <div style="font-size:1.1rem; color:var(--obsidyen-muted); line-height:1.8; margin-bottom:48px">{{MODUL_HAKKIMIZDA_HIKAYE}}</div>
      </div>
      <div>
        <div class="kart" style="background:#0a0a0a; border-color:rgba(255,255,255,0.05)">
          <h3 style="margin-bottom:32px; font-size:1.8rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:16px">Neden Biz?</h3>
          <div style="display:grid; gap:24px">{{NEDEN_BIZ_HTML}}</div>
        </div>
      </div>
    </div>
  </div>
  <style>
    #hakkimizda .kart { padding:48px; }
    #hakkimizda .kart h3 { color:#fff; font-size:1.4rem; margin-bottom:8px; display:block; }
    #hakkimizda .kart p { color:var(--obsidyen-muted); font-size:0.95rem; margin-bottom:0; }
  </style>
</section>

<!-- ── 8. SERTİFİKALAR ──────────────────────────────────────── -->
{{MODUL_SERTIFIKA_BELGELER}}

<!-- ── 9. ÜRÜN KATALOĞU ─────────────────────────────────────── -->
{{MODUL_URUN_LISTESI}}

<!-- ── 10. VİDEO ────────────────────────────────────────────── -->
{{MODUL_VIDEO_TANITIM}}

<!-- ── 11. YORUMLAR ─────────────────────────────────────────── -->
<section id="yorumlar" class="bg-obsidyen-alt">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Prestijli Referanslar</h2>
      <p>Hizmet sunduğumuz değerli konuklarımızın deneyimleri.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:32px">{{YORUMLAR_HTML}}</div>
  </div>
  <style>
    #yorumlar .kart { background:rgba(0,0,0,0.4); border-color:rgba(255,255,255,0.05); }
    #yorumlar .kart p { color:#cbd5e1; font-style:italic; font-size:1.05rem; line-height:1.8; }
    #yorumlar .kart h3 { margin-top:24px; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px; font-family:var(--font-baslik); font-size:1.2rem; }
  </style>
</section>

<!-- ── 12. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_MUSTERI_REFERANSLARI}}
{{MODUL_ANKET_FORM}}

<!-- ── 13. BLOG ─────────────────────────────────────────────── -->
{{MODUL_BLOG_MAKALELER}}

<!-- ── 14. KARİYER ──────────────────────────────────────────── -->
{{MODUL_KARIYER_ILANLARI}}

<!-- ── 15. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim">
  <div class="container-lg">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center">
      <div>
        <div class="badge-obsidyen" style="margin-bottom:16px">Bize Ulaşın</div>
        <h2 style="font-size:3rem; margin-bottom:32px; line-height:1.1">Premium Deneyime<br>Adım Atın</h2>
        <p style="color:var(--obsidyen-muted); font-size:1.1rem; margin-bottom:48px; line-height:1.8">{{ADRES_METNI}}</p>
        
        <div style="display:grid;gap:20px;margin-bottom:48px">
          <a href="tel:{{TELEFON}}" class="buton-obsidyen-1" style="justify-content:space-between; width:100%">
            <span>Telefon İletişim</span> <span>{{TELEFON_GOSTERIM}}</span>
          </a>
          <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-obsidyen-2" style="justify-content:space-between; width:100%">
            <span>WhatsApp Hattı</span> <span>Mesaj Gönder →</span>
          </a>
        </div>
        
        <div style="padding-top:32px; border-top:1px solid rgba(255,255,255,0.1)">
          {{MODUL_SOSYAL_MEDYA}}
        </div>
      </div>
      <div>
        <div class="kart" style="padding:16px; border-radius:4px">
          <iframe src="{{HARITA_URL}}" width="100%" height="450" style="border:none;border-radius:2px;filter:invert(90%) hue-rotate(180deg) contrast(1.2)" loading="lazy" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── 16. YASAL + BÜLTEN ────────────────────────────────────── -->
{{MODUL_TEKLIF_FORMU}}
{{MODUL_EPOSTA_BULTENI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}
\${ortakFooter}
{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`
