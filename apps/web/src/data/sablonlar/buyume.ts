import { ortakCSS, ortakNav, ortakFooter } from './ortak'

export const sablonBuyumeHtml = `<!DOCTYPE html>
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
/* ATLAS - Modern Startup Stil */
:root {
  --atlas-bg: #fdfdfd;
  --atlas-text: #334155;
  --atlas-muted: #64748b;
  --atlas-border: #e2e8f0;
  --atlas-primary: var(--renk-vurgu);
  --atlas-radius: 24px;
  --font-baslik: 'Outfit', 'Inter', sans-serif;
  --font-metin: 'Inter', sans-serif;
}
body { background: var(--atlas-bg); color: var(--atlas-text); font-family: var(--font-metin); }
h1, h2, h3, h4 { font-family: var(--font-baslik); color: #0f172a; letter-spacing: -0.02em; }

/* ── Floating Hero ── */
.hero-atlas {
  min-height: 100vh;
  display: flex; align-items: center; padding: 140px 20px 80px; position: relative; overflow: hidden;
  background: radial-gradient(circle at top right, rgba(var(--renk-vurgu-rgb, 99, 102, 241), 0.1) 0%, transparent 60%),
              radial-gradient(circle at bottom left, rgba(var(--renk-vurgu-rgb, 99, 102, 241), 0.05) 0%, transparent 60%);
}
.hero-a-grid { max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 2; }
@media (max-width: 900px) { .hero-a-grid { grid-template-columns: 1fr; text-align: center; } .hero-kart-atlas { margin: 0 auto !important; } }

.badge-atlas { display: inline-flex; align-items: center; gap: 8px; background: rgba(var(--renk-vurgu-rgb, 99, 102, 241), 0.1); color: var(--atlas-primary); padding: 8px 16px; border-radius: 30px; font-weight: 700; font-size: 0.85rem; margin-bottom: 24px; }
.hero-baslik { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
.hero-slogan { font-size: 1.15rem; color: var(--atlas-muted); line-height: 1.7; margin-bottom: 40px; }

/* Yumuşak Kartlar */
.kart { background: #fff; border-radius: var(--atlas-radius); padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.02); transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.kart:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.08); }
.kart h3 { font-size: 1.3rem; margin-bottom: 12px; }
.kart p { color: var(--atlas-muted); font-size: 1rem; }

.buton-atlas-1 { background: var(--atlas-primary); color: #fff; padding: 16px 36px; border-radius: 100px; font-weight: 700; text-decoration: none; display: inline-flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.3s; box-shadow: 0 10px 20px rgba(var(--renk-vurgu-rgb, 99, 102, 241), 0.2); border:none; }
.buton-atlas-1:hover { transform: translateY(-2px); box-shadow: 0 14px 24px rgba(var(--renk-vurgu-rgb, 99, 102, 241), 0.3); }
.buton-atlas-2 { background: #fff; color: #0f172a; padding: 16px 36px; border-radius: 100px; font-weight: 700; text-decoration: none; display: inline-flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.3s; box-shadow: 0 4px 14px rgba(0,0,0,0.05); border: 1px solid var(--atlas-border); }
.buton-atlas-2:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.08); border-color: #cbd5e1; }

.bolum-baslik { text-align: center; margin-bottom: 64px; }
.bolum-baslik h2 { font-size: clamp(2.2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 16px; }
.bolum-baslik p { color: var(--atlas-muted); font-size: 1.15rem; max-width: 600px; margin: 0 auto; line-height: 1.7; }

section { padding: 120px 20px; }
.bg-atlas-gri { background: #f8fafc; }

#nav { background: rgba(253, 253, 253, 0.8) !important; backdrop-filter: blur(16px) !important; border-bottom: 1px solid rgba(0,0,0,0.05) !important; }
#nav a { color: #0f172a !important; }
#nav-linkler a { color: #475569 !important; font-weight: 600 !important; }
#nav-linkler a:hover { color: var(--atlas-primary) !important; }

/* Blob şekli SVG arka plan vs */
.blob-bg { position: absolute; z-index: -1; opacity: 0.4; filter: blur(40px); border-radius: 50%; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}
\${ortakNav}

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-atlas" id="hero">
  <div class="hero-a-grid animate-fade-in-up">
    <div>
      <div class="badge-atlas">✨ {{SEKTOR}} Teknolojisi</div>
      <h1 class="hero-baslik">{{HERO_BASLIK}}</h1>
      <p class="hero-slogan">{{HERO_SLOGAN}}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <a href="tel:{{TELEFON}}" class="buton-atlas-1">📞 {{HERO_CTA_BIRINCIL}}</a>
        <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-atlas-2">💬 {{HERO_CTA_IKINCIL}}</a>
      </div>
    </div>
    
    <div class="hero-kart-atlas" style="position:relative; width:100%; max-width:500px; margin-left:auto;">
      <!-- Arkadaki dekoratif blob -->
      <div class="blob-bg" style="background:var(--renk-vurgu); width:300px; height:300px; top:-20px; right:-20px;"></div>
      <div class="blob-bg" style="background:#38bdf8; width:200px; height:200px; bottom:-40px; left:-20px; opacity:0.3"></div>
      
      <!-- Ana Görsel/Kart -->
      <div style="background:#fff; border-radius: var(--atlas-radius); padding:10px; box-shadow: 0 24px 60px rgba(0,0,0,0.08); position:relative; z-index:2">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" alt="Hero" style="border-radius: calc(var(--atlas-radius) - 8px); width:100%; height:auto; display:block">
        
        <!-- Yüzen küçük kart -->
        <div style="position:absolute; bottom:-30px; left:-30px; background:#fff; padding:20px; border-radius:16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display:flex; align-items:center; gap:16px; min-width:240px; animation: fadeInUp 1s ease-out 0.5s both;">
          <div style="background:#e0e7ff; color:#4f46e5; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem">⭐</div>
          <div>
            <div style="font-weight:800; font-size:1.2rem; color:#0f172a">Yenilikçi</div>
            <div style="color:var(--atlas-muted); font-size:0.85rem">Modern Çözümler</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER ─────────────────────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. HİZMETLER ─────────────────────────────────────────── -->
<section id="hizmetler" class="bg-atlas-gri">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Hizmetlerimiz</h2>
      <p>Modern dünyanın gereksinimlerine uygun, ölçeklenebilir ve dinamik çözümler sunuyoruz.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:32px;">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. SÜRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 5. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_RANDEVU}}
{{MODUL_VIDEO_TANITIM}}

<!-- ── 6. NEDEN BİZ ─────────────────────────────────────────── -->
<section id="hakkimizda">
  <div class="container-lg">
    <div class="kart" style="padding:60px 40px; border-radius:32px; background:linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color:#fff; position:relative; overflow:hidden">
      <!-- Decorative circles -->
      <div style="position:absolute; top:-100px; right:-100px; width:300px; height:300px; border-radius:50%; background:rgba(255,255,255,0.05);"></div>
      <div style="position:absolute; bottom:-50px; left:-50px; width:200px; height:200px; border-radius:50%; background:rgba(var(--renk-vurgu-rgb, 99, 102, 241), 0.2); filter:blur(40px)"></div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center; position:relative; z-index:2">
        <div>
          <p style="color:#818cf8;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px">Farkımız</p>
          <h2 style="font-size:clamp(2rem,4vw,2.5rem);font-weight:800;margin-bottom:24px;color:#fff;">{{ISLETME_ADI}} ile fark yaratan vizyon</h2>
          <p style="color:#cbd5e1;line-height:1.7;margin-bottom:32px;font-size:1.1rem">{{HERO_SLOGAN}}</p>
          <div style="display:grid;gap:20px">
            {{NEDEN_BIZ_HTML}}
          </div>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" alt="Hakkımızda" style="border-radius:24px; width:100%; box-shadow:0 20px 40px rgba(0,0,0,0.3)">
        </div>
      </div>
    </div>
  </div>
  <style>
    #hakkimizda .kart { background:transparent; border:none; padding:0; margin-bottom:0; box-shadow:none;}
    #hakkimizda .kart h3 { color:#fff; font-size:1.2rem; margin-bottom:8px; display:flex; align-items:center; gap:12px;}
    #hakkimizda .kart h3::before { content:'⭐'; font-size:1.4rem; } /* Fake icon placeholder */
    #hakkimizda .kart p { color:#cbd5e1; font-size:0.95rem; margin-bottom:20px; }
  </style>
</section>

<!-- ── 7. SERTİFİKALAR ──────────────────────────────────────── -->
{{MODUL_SERTIFIKA_BELGELER}}

<!-- ── 8. YORUMLAR ──────────────────────────────────────────── -->
<section id="yorumlar" class="bg-atlas-gri">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Müşteri Yorumları</h2>
      <p>Modern girişimlerin arkasındaki güç, memnun müşterilerimizdir.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px">{{YORUMLAR_HTML}}</div>
  </div>
</section>

<!-- ── 9. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_MUSTERI_REFERANSLARI}}
{{MODUL_TEKLIF_FORMU}}

<!-- ── 10. BLOG ─────────────────────────────────────────────── -->
{{MODUL_BLOG_MAKALELER}}

<!-- ── 11. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim">
  <div class="container-lg">
    <div class="kart" style="display:grid;grid-template-columns:1fr 1fr;gap:48px; border:none; background:#fff">
      <div>
        <div class="bolum-baslik" style="text-align:left; margin-bottom:32px">
          <h2>İletişim</h2>
          <p>{{ADRES_METNI}}</p>
        </div>
        <div style="display:grid;gap:16px;margin-bottom:32px">
          <a href="tel:{{TELEFON}}" class="buton-atlas-1" style="justify-content:center; width:100%">📞 {{TELEFON_GOSTERIM}}</a>
          <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-atlas-2" style="justify-content:center; width:100%; border-color:#25d366; color:#16a34a">💬 WhatsApp ile Ulaşın</a>
        </div>
        {{MODUL_CALISMA_SAATLERI}}
        {{MODUL_SOSYAL_MEDYA}}
      </div>
      <div style="border-radius:var(--atlas-radius); overflow:hidden; border:1px solid var(--atlas-border)">
        <iframe src="{{HARITA_URL}}" width="100%" height="100%" style="border:none;min-height:350px" loading="lazy" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</section>

<!-- ── 12. BÜLTEN ───────────────────────────────────────────── -->
{{MODUL_EPOSTA_BULTENI}}

<!-- ── 13. YASAL ────────────────────────────────────────────── -->
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}
\${ortakFooter}
{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`
