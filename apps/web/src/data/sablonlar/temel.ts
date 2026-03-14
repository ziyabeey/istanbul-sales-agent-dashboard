import { ortakCSS, ortakNav, ortakFooter } from './ortak'

export const sablonTemelHtml = `<!DOCTYPE html>
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
/* KARDELEN - Özel Temel Stil */
:root {
  --kardelen-bg: #ffffff;
  --kardelen-text: #1a1a1a;
  --kardelen-muted: #666666;
  --kardelen-border: #e5e7eb;
  --kardelen-accent: var(--renk-vurgu);
}
body { background: var(--kardelen-bg); color: var(--kardelen-text); font-weight: 400; }
h1, h2, h3 { color: var(--kardelen-text); letter-spacing: -0.03em; }

/* ── Minimalist Hero ── */
.hero-minimal {
  padding: 160px 20px 80px;
  text-align: center;
  background: radial-gradient(circle at top, rgba(0,0,0,0.03) 0%, transparent 70%);
}
.hero-baslik {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 24px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  color: #111;
}
.hero-slogan {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: var(--kardelen-muted);
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

/* ── Minimalist Butonlar ── */
.buton-kardelen-1 {
  background: #111; color: #fff; padding: 16px 36px; border-radius: 4px;
  font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  transition: background 0.2s, transform 0.2s; border: 1px solid #111;
}
.buton-kardelen-1:hover { background: #333; transform: translateY(-2px); }
.buton-kardelen-2 {
  background: #fff; color: #111; padding: 16px 36px; border-radius: 4px;
  font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  transition: background 0.2s, transform 0.2s; border: 1px solid var(--kardelen-border);
}
.buton-kardelen-2:hover { background: #f9f9f9; border-color: #ccc; transform: translateY(-2px); }

/* ── Minimalist Kartlar ── */
.kart {
  background: #fff;
  border-radius: 8px;
  padding: 40px 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid var(--kardelen-border);
  transition: transform 0.3s, box-shadow 0.3s;
}
.kart:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.06); }
.kart h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; }
.kart p { color: var(--kardelen-muted); font-size: 0.95rem; line-height: 1.6; }

.hizmet-grid, .neden-grid, .yorum-grid { display: grid; gap: 24px; }
.hizmet-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.neden-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.yorum-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }

.bolum-baslik { text-align: left; margin-bottom: 48px; }
.bolum-baslik h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 16px; }
.bolum-baslik p { color: var(--kardelen-muted); font-size: 1.1rem; max-width: 600px; margin: 0; }

section { padding: 96px 20px; }
.bg-light { background: #fafafa; border-top: 1px solid var(--kardelen-border); border-bottom: 1px solid var(--kardelen-border); }

/* Ortak Nav override */
#nav { background: rgba(255,255,255,0.95) !important; backdrop-filter: blur(8px) !important; border-bottom: 1px solid var(--kardelen-border) !important; }
#nav a { color: #111 !important; }
#nav-linkler a { color: #666 !important; }
#nav-linkler a:hover { color: #000 !important; }
</style>
</head>
<body>

{{MODUL_DUYURU_BANDI}}
\${ortakNav}

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-minimal animate-fade-in-up" id="hero">
  <div class="container-lg">
    <div style="display:inline-block; border:1px solid var(--kardelen-border); padding:6px 16px; border-radius:30px; font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-bottom:24px; color:var(--kardelen-muted); background:#fff;">
      Yenilikçi {{SEKTOR}} Çözümleri
    </div>
    <h1 class="hero-baslik">{{HERO_BASLIK}}</h1>
    <p class="hero-slogan">{{HERO_SLOGAN}}</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-kardelen-1">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-kardelen-2">💬 {{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<!-- ── 2. HİZMETLER ─────────────────────────────────────────── -->
<section id="hizmetler" class="bg-light">
  <div class="container-lg">
    <div class="bolum-baslik animate-fade-in-up">
      <h2>Hizmetlerimiz</h2>
      <p>Sade, şık ve fonksiyonel yaklaşımımızla {{SEKTOR}} alanında fark yaratıyoruz.</p>
    </div>
    <div class="hizmet-grid">
      {{HIZMETLER_HTML}}
    </div>
  </div>
</section>

<!-- ── 3. NEDEN BİZ ─────────────────────────────────────────── -->
<section id="hakkimizda">
  <div class="container-lg">
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:64px; align-items:center">
      <div>
        <div class="bolum-baslik" style="margin-bottom:32px">
          <h2>Neden Bizi Seçmelisiniz?</h2>
          <p>{{ILCE}} bölgesinde sektör standartlarını belirleyen kalite.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Hakkımızda" style="border-radius:12px;width:100%;object-fit:cover;aspect-ratio:16/9">
      </div>
      <div class="neden-grid" style="grid-template-columns: 1fr;">
      {{HIZMETLER_HTML}}
      <style> #hizmetler .kart{background:#fff;border:1px solid rgba(0,0,0,0.05)} </style>
    </div>
  </div>
</section>

<!-- ── 3. NEDEN BİZ ─────────────────────────────────────────── -->
<section id="hakkimizda" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80');">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <h2 style="color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.6)">Neden Bizi Seçmelisiniz?</h2>
      <p style="color:rgba(255,255,255,0.9);text-shadow:0 1px 5px rgba(0,0,0,0.5)">{{ILCE}} bölgesinde yıllardır süregelen güven ve kalite.</p>
    </div>
    <div class="neden-grid">
      {{NEDEN_BIZ_HTML}}
      </div>
    </div>
  </div>
</section>

<!-- ── 4. MODÜL SLOT'LARI (seçili modüller) ─────────────────── -->
<div class="container-lg">
{{MODUL_CALISMA_SAATLERI}}
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_WHATSAPP_TEKLIF}}
</div>

<!-- ── 5. YORUMLAR ──────────────────────────────────────────── -->
<section id="yorumlar" class="bg-light">
  <div class="container-lg">
    <div class="bolum-baslik" style="text-align:center">
      <h2>Müşteri Deneyimleri</h2>
      <p>Gerçek müşterilerimizin yalın deneyimleri.</p>
    </div>
    <div class="yorum-grid">
      {{YORUMLAR_HTML}}
    </div>
  </div>
</section>

<!-- ── 6. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_HARITA_YOL_TARIFI}}
{{MODUL_SOSYAL_MEDYA}}
{{MODUL_BIZE_ULASIN_STICKY}}

<!-- ── 7. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim">
  <div class="container">
    <div style="background:#111; border-radius:16px; padding:64px; text-align:center; color:#fff">
      <h2 style="font-size:2.5rem; color:#fff; margin-bottom:16px">Bize Ulaşın</h2>
      <p style="color:#aaa; font-size:1.1rem; margin-bottom:40px; max-width:500px; margin-left:auto; margin-right:auto">{{ADRES_METNI}}</p>
      <div style="display:flex;justify-content:center;gap:16px;margin-bottom:48px;flex-wrap:wrap">
        <a href="tel:{{TELEFON}}" class="buton-kardelen-1" style="background:#fff; color:#111; border-color:#fff">📞 {{TELEFON_GOSTERIM}}</a>
        <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-kardelen-2" style="background:transparent; color:#fff; border-color:#444">💬 WhatsApp</a>
      </div>
      <iframe src="{{HARITA_URL}}" width="100%" height="320" style="border:none;border-radius:8px;filter:grayscale(1) contrast(1.2)" loading="lazy" allowfullscreen></iframe>
    </div>
  </div>
</section>

{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}
\${ortakFooter}

{{MODUL_WHATSAPP_CANLI}}
</body>
</html>`
