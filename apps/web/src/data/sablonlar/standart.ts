import { ortakCSS, ortakNav, ortakFooter } from './ortak'

export const sablonStandartHtml = `<!DOCTYPE html>
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
/* MERMER - Kurumsal Temel Stil */
:root {
  --mermer-bg: #f8fafc;
  --mermer-text: #1e293b;
  --mermer-muted: #64748b;
  --mermer-primary: #0f172a;
  --margin-baslik: 'Merriweather', 'Times New Roman', serif;
}
body { background: var(--mermer-bg); color: var(--mermer-text); }
h1, h2, h3, h4 { font-family: var(--margin-baslik); color: var(--mermer-primary); }

/* ── Kurumsal Hero (Split) ── */
.hero-mermer { background: var(--mermer-primary); color: #fff; min-height: 90vh; display: flex; align-items: center; position: relative; overflow: hidden; }
.hero-mermer::after { content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 45%; background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'); background-size: cover; background-position: center; border-left: 4px solid var(--renk-vurgu); }
.hero-grid { max-width: 1400px; margin: 0 auto; padding: 100px 40px; width: 100%; display: grid; grid-template-columns: 50% 50%; gap: 60px; position: relative; z-index: 2; }
@media (max-width: 992px) { .hero-grid { grid-template-columns: 1fr; } .hero-mermer::after { width: 100%; opacity: 0.15; border: none; } }

.badge-kurumsal { display: inline-block; border: 1px solid rgba(255,255,255,0.3); padding: 8px 16px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; color: #cbd5e1; }
.hero-baslik { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.15; margin-bottom: 24px; color: #fff; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
.hero-slogan { font-size: 1.15rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 40px; max-width: 500px; font-family: var(--font-metin); }

/* ── Kurumsal Kartlar (Keskin Hatlar) ── */
.kart { background: #fff; border-radius: 0; padding: 32px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); border: 1px solid #e2e8f0; border-top: 3px solid transparent; transition: all 0.3s; }
.kart:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-top-color: var(--renk-vurgu); }
.kart h3 { font-size: 1.4rem; margin-bottom: 16px; margin-top: 16px; }
.kart p { color: var(--mermer-muted); font-size: 1rem; }

.buton-kurumsal-1 { background: var(--renk-vurgu); color: #fff; padding: 14px 32px; border-radius: 0; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: background 0.2s; border: 2px solid var(--renk-vurgu); }
.buton-kurumsal-1:hover { background: transparent; color: #fff; border-color: #fff; }
.buton-kurumsal-2 { background: transparent; color: #fff; padding: 14px 32px; border-radius: 0; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; border: 2px solid rgba(255,255,255,0.3); }
.buton-kurumsal-2:hover { background: #fff; color: var(--mermer-primary); }

.bolum-baslik { text-align: center; margin-bottom: 60px; }
.bolum-baslik h2 { font-size: 2.8rem; margin-bottom: 16px; position:relative; padding-bottom: 20px; }
.bolum-baslik h2::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60px; height: 3px; background: var(--renk-vurgu); }
.bolum-baslik p { color: var(--mermer-muted); font-size: 1.1rem; }

section { padding: 100px 20px; }
.bg-koyu { background: var(--mermer-primary); color: #fff; }
.bg-koyu .bolum-baslik h2 { color: #fff; }
.bg-koyu .bolum-baslik p { color: #94a3b8; }
.bg-koyu .kart { background: #1e293b; border-color: #334155; }
.bg-koyu .kart h3 { color: #fff; }
.bg-koyu .kart p { color: #94a3b8; }

#nav { background: rgba(15, 23, 42, 0.95) !important; backdrop-filter: blur(8px) !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}
\${ortakNav}

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-mermer" id="hero">
  <div class="hero-grid animate-fade-in-up">
    <div>
      <div class="badge-kurumsal">{{SEKTOR}} Profesyonelleri</div>
      <h1 class="hero-baslik">{{HERO_BASLIK}}</h1>
      <p class="hero-slogan">{{HERO_SLOGAN}}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <a href="tel:{{TELEFON}}" class="buton-kurumsal-1">📞 {{HERO_CTA_BIRINCIL}}</a>
        <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-kurumsal-2">💬 {{HERO_CTA_IKINCIL}}</a>
      </div>
    </div>
    <!-- Sağ taraf arka plan görseline ayrıldı -->
    <div class="hero-kart-iletisim" style="background:#fff; color:#0f172a; padding:32px; border-radius:0; box-shadow: 0 20px 50px rgba(0,0,0,0.3); max-width:400px; margin-left:auto; display:flex; flex-direction:column; justify-content:center;">
      <h3 style="font-family:var(--font-metin); font-size:1rem; text-transform:uppercase; letter-spacing:1px; color:var(--mermer-muted); border-bottom:1px solid #e2e8f0; padding-bottom:12px; margin-bottom:24px">Hızlı İletişim</h3>
      <a href="tel:{{TELEFON}}" style="display:flex; align-items:center; gap:16px; color:#0f172a; font-weight:700; font-size:1.2rem; margin-bottom:20px; text-decoration:none">
        <span style="background:#f1f5f9; width:48px; height:48px; display:flex; align-items:center; justify-content:center; border-radius:50%">📞</span> {{TELEFON_GOSTERIM}}
      </a>
      <a href="https://wa.me/{{WHATSAPP}}" style="display:flex; align-items:center; gap:16px; color:#16a34a; font-weight:700; font-size:1.2rem; margin-bottom:20px; text-decoration:none">
        <span style="background:#dcfce7; width:48px; height:48px; display:flex; align-items:center; justify-content:center; border-radius:50%">💬</span> WhatsApp
      </a>
      <div style="display:flex; align-items:flex-start; gap:16px; color:var(--mermer-muted); line-height:1.6">
        <span style="background:#f1f5f9; width:48px; height:48px; display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0">📍</span> {{ADRES_METNI}}
      </div>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER ─────────────────────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. HİZMETLER ─────────────────────────────────────────── -->
<section id="hizmetler">
  <div class="container-lg">
    <div class="bolum-baslik animate-fade-in-up">
      <h2>Uzmanlık Alanlarımız</h2>
      <p>{{SEKTOR}} alanında profesyonel, güvenilir ve kurumsal çözümler sunuyoruz.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:32px;">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_CALISMA_SAATLERI}}
{{MODUL_TEKLIF_FORMU}}

<!-- ── 5. NEDEN BİZ ─────────────────────────────────────────── -->
<section id="hakkimizda" class="bg-koyu">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Neden Bizi Tercih Etmelisiniz?</h2>
      <p>{{ILCE}} bölgesinde kurumsal standartları yeniden tanımlıyoruz.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px">
      {{NEDEN_BIZ_HTML}}
    </div>
  </div>
</section>

<!-- ── 6. HİKAYE & MİSYON ──────────────────────────────────── -->
{{MODUL_HAKKIMIZDA_HIKAYE}}

<!-- ── 7. YORUMLAR ──────────────────────────────────────────── -->
<section id="yorumlar" style="background:#f1f5f9; position:relative;">
  <div class="container-lg" style="position:relative; z-index:2">
    <div class="bolum-baslik">
      <h2>Referanslarımız</h2>
      <p>Birlikte çalıştığımız değerli müvekkillerimiz/müşterilerimiz ne diyor?</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:32px">
      {{YORUMLAR_HTML}}
    </div>
  </div>
</section>

<!-- ── 8. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_MUSTERI_REFERANSLARI}}

<!-- ── 9. İLETİŞİM + HARİTA ────────────────────────────────── -->
<section id="iletisim" style="background:#fff">
  <div class="container-lg">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center">
      <div style="padding:48px; background:var(--mermer-primary); color:#fff; border-radius:0;">
        <h2 style="font-size:2.4rem; margin-bottom:16px; font-family:var(--margin-baslik);">Kurumsal İletişim</h2>
        <p style="color:#94a3b8; font-size:1.1rem; margin-bottom:40px; line-height:1.7">{{ADRES_METNI}}</p>
        
        <div style="display:grid;gap:24px">
          <div style="display:flex; align-items:center; gap:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:24px">
            <span style="font-size:2rem">📞</span>
            <div><div style="color:#94a3b8; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px">Telefon</div><a href="tel:{{TELEFON}}" style="font-size:1.4rem; font-weight:700; color:#fff; text-decoration:none">{{TELEFON_GOSTERIM}}</a></div>
          </div>
          <div style="display:flex; align-items:center; gap:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:24px">
            <span style="font-size:2rem">✉️</span>
            <div><div style="color:#94a3b8; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px">E-Posta</div><a href="mailto:info@firmaadi.com" style="font-size:1.2rem; font-weight:700; color:#fff; text-decoration:none">info@firmaadi.com</a></div>
          </div>
        </div>
        
        <div style="margin-top:40px">
        {{MODUL_SOSYAL_MEDYA}}
        </div>
      </div>
      <div style="height:100%">
        <iframe src="{{HARITA_URL}}" width="100%" height="100%" style="border:none;min-height:500px;filter:contrast(1.1) grayscale(0.2)" loading="lazy" allowfullscreen></iframe>
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
