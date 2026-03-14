module.exports=[389493,e=>{"use strict";let a=process.env.CF_ACCOUNT_ID,t=process.env.CF_PAGES_TOKEN,i=`https://api.cloudflare.com/client/v4/accounts/${a}`;function r(e,a){return e.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").substring(0,28)||a.substring(0,8)}async function o(e){if((await fetch(`${i}/pages/projects/${e}`,{headers:{Authorization:`Bearer ${t}`}})).ok)return!0;let a=await fetch(`${i}/pages/projects`,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({name:e,production_branch:"main"})}),r=await a.json();if(!r.success)throw Error(`Pages proje oluşturulamadı: ${JSON.stringify(r.errors)}`);return!0}async function n(a,r){let o=new(await e.A(538587)).FormData;o.set("/manifest.json",JSON.stringify({"/index.html":{hash:Date.now().toString()}}),"manifest.json"),o.set("/index.html",r,"index.html");let n=await fetch(`${i}/pages/projects/${a}/deployments`,{method:"POST",headers:{Authorization:`Bearer ${t}`},body:o}),l=await n.json();if(!l.success)throw Error(`Deploy başarısız: ${JSON.stringify(l.errors)}`);return l.result?.url??`https://${a}.pages.dev`}async function l(a,r){let o=await fetch(`${i}/pages/projects/${a}/domains`,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({name:`${r}.kepenk.ai`})}),n=await o.json();if(!n.success&&!n.errors?.[0]?.message?.includes("already"))throw Error(`Domain eklenemedi: ${JSON.stringify(n.errors)}`);let{cnameEkle:l}=await e.A(856930);await l(r,`${a}.pages.dev`)}async function s(e){if(!process.env.CF_ACCOUNT_ID||!process.env.CF_PAGES_TOKEN){let a=process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000";return console.log(`[CF LOCAL] Cloudflare creds yok — preview modu: ${a}/api/site/preview/${e.esnafId}`),`${a}/api/site/preview/${e.esnafId}`}let{slug:a,subdomain:t,html:i}=e;return await o(a),await n(a,i),await l(a,t),`https://${t}.kepenk.ai`}async function d(e,a){await n(e,a)}e.s(["siteGuncelle",()=>d,"siteYayinla",()=>s,"slugOlustur",()=>r])},405349,e=>{"use strict";let a=[{id:"sablon-temel",ad:"Kardelen",aciklama:"Minimal beyaz, tek kolona odaklı — mobilde pırıl pırıl parlayan hız şablonu.",minPaket:"TEMEL",htmlKodu:`<!DOCTYPE html>
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
/* KARDELEN - \xd6zel Temel Stil */
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
      Yenilik\xe7i {{SEKTOR}} \xc7\xf6z\xfcmleri
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
          <h2>Neden Bizi Se\xe7melisiniz?</h2>
          <p>{{ILCE}} b\xf6lgesinde sekt\xf6r standartlarını belirleyen kalite.</p>
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
      <h2 style="color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.6)">Neden Bizi Se\xe7melisiniz?</h2>
      <p style="color:rgba(255,255,255,0.9);text-shadow:0 1px 5px rgba(0,0,0,0.5)">{{ILCE}} b\xf6lgesinde yıllardır s\xfcregelen g\xfcven ve kalite.</p>
    </div>
    <div class="neden-grid">
      {{NEDEN_BIZ_HTML}}
      </div>
    </div>
  </div>
</section>

<!-- ── 4. MOD\xdcL SLOT'LARI (se\xe7ili mod\xfcller) ─────────────────── -->
<div class="container-lg">
{{MODUL_CALISMA_SAATLERI}}
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_WHATSAPP_TEKLIF}}
</div>

<!-- ── 5. YORUMLAR ──────────────────────────────────────────── -->
<section id="yorumlar" class="bg-light">
  <div class="container-lg">
    <div class="bolum-baslik" style="text-align:center">
      <h2>M\xfcşteri Deneyimleri</h2>
      <p>Ger\xe7ek m\xfcşterilerimizin yalın deneyimleri.</p>
    </div>
    <div class="yorum-grid">
      {{YORUMLAR_HTML}}
    </div>
  </div>
</section>

<!-- ── 6. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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
</html>`,icon:"🌱",etiketler:["Genel","Minimal","Hızlı"],kategori:"jenerik",moduller:["whatsapp-teklif","whatsapp-canli","google-yorumlar","harita-yol-tarifi","calisma-saatleri","duyuru-bandi","kampanya-afisi","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","bize-ulasin-sticky"]},{id:"sablon-standart",ad:"Mermer",aciklama:"Taş doku hissi, serif fontlar ve güven öğeleriyle prestijli kurumsal duruş.",minPaket:"STANDART",htmlKodu:`<!DOCTYPE html>
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
    <!-- Sağ taraf arka plan g\xf6rseline ayrıldı -->
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
      <p>{{SEKTOR}} alanında profesyonel, g\xfcvenilir ve kurumsal \xe7\xf6z\xfcmler sunuyoruz.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:32px;">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_CALISMA_SAATLERI}}
{{MODUL_TEKLIF_FORMU}}

<!-- ── 5. NEDEN BİZ ─────────────────────────────────────────── -->
<section id="hakkimizda" class="bg-koyu">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Neden Bizi Tercih Etmelisiniz?</h2>
      <p>{{ILCE}} b\xf6lgesinde kurumsal standartları yeniden tanımlıyoruz.</p>
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
      <p>Birlikte \xe7alıştığımız değerli m\xfcvekkillerimiz/m\xfcşterilerimiz ne diyor?</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:32px">
      {{YORUMLAR_HTML}}
    </div>
  </div>
</section>

<!-- ── 8. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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

<!-- ── 10. YASAL + MOD\xdcLLER ─────────────────────────────────── -->
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}
{{MODUL_EPOSTA_BULTENI}}
\${ortakFooter}
{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`,icon:"🏛️",etiketler:["Kurumsal","Güven","Prestij"],kategori:"jenerik",moduller:["hakkimizda-hikaye","rakamlarla-biz","teklif-formu","google-yorumlar","musteri-referanslari","harita-yol-tarifi","calisma-saatleri","kampanya-afisi","duyuru-bandi","eposta-bulteni","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sablon-buyume",ad:"Atlas",aciklama:"Geniş grid, harita metaforu — 13 bölüm, SEO odaklı keşif şablonu.",minPaket:"BUYUME",htmlKodu:`<!DOCTYPE html>
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
      
      <!-- Ana G\xf6rsel/Kart -->
      <div style="background:#fff; border-radius: var(--atlas-radius); padding:10px; box-shadow: 0 24px 60px rgba(0,0,0,0.08); position:relative; z-index:2">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" alt="Hero" style="border-radius: calc(var(--atlas-radius) - 8px); width:100%; height:auto; display:block">
        
        <!-- Y\xfczen k\xfc\xe7\xfck kart -->
        <div style="position:absolute; bottom:-30px; left:-30px; background:#fff; padding:20px; border-radius:16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display:flex; align-items:center; gap:16px; min-width:240px; animation: fadeInUp 1s ease-out 0.5s both;">
          <div style="background:#e0e7ff; color:#4f46e5; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem">⭐</div>
          <div>
            <div style="font-weight:800; font-size:1.2rem; color:#0f172a">Yenilik\xe7i</div>
            <div style="color:var(--atlas-muted); font-size:0.85rem">Modern \xc7\xf6z\xfcmler</div>
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
      <p>Modern d\xfcnyanın gereksinimlerine uygun, \xf6l\xe7eklenebilir ve dinamik \xe7\xf6z\xfcmler sunuyoruz.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:32px;">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. S\xdcRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 5. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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
      <h2>M\xfcşteri Yorumları</h2>
      <p>Modern girişimlerin arkasındaki g\xfc\xe7, memnun m\xfcşterilerimizdir.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px">{{YORUMLAR_HTML}}</div>
  </div>
</section>

<!-- ── 9. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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

<!-- ── 12. B\xdcLTEN ───────────────────────────────────────────── -->
{{MODUL_EPOSTA_BULTENI}}

<!-- ── 13. YASAL ────────────────────────────────────────────── -->
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}
\${ortakFooter}
{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`,icon:"🗺️",etiketler:["Kapsamlı","SEO","Büyüme"],kategori:"jenerik",moduller:["hakkimizda-hikaye","rakamlarla-biz","video-tanitim","sertifika-belgeler","randevu","teklif-formu","google-yorumlar","musteri-referanslari","blog-makaleler","kampanya-afisi","harita-yol-tarifi","calisma-saatleri","duyuru-bandi","eposta-bulteni","yol-haritasi","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sablon-premium",ad:"Obsidyen",aciklama:"Siyah cam yüzey, neon vurgular — 16 bölüm, tam donanımlı ultra-premium şablon.",minPaket:"PREMIUM",htmlKodu:`<!DOCTYPE html>
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

<!-- ── 3. S\xdcRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 4. HİZMETLER ─────────────────────────────────────────── -->
<section id="hizmetler" class="bg-obsidyen-alt">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Ayrıcalıklı Hizmetler</h2>
      <p>{{SEKTOR}} standartlarını yeniden belirleyen \xfcst d\xfczey \xe7\xf6z\xfcmler.</p>
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

<!-- ── 9. \xdcR\xdcN KATALOĞU ─────────────────────────────────────── -->
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

<!-- ── 12. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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
            <span>WhatsApp Hattı</span> <span>Mesaj G\xf6nder →</span>
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

<!-- ── 16. YASAL + B\xdcLTEN ────────────────────────────────────── -->
{{MODUL_TEKLIF_FORMU}}
{{MODUL_EPOSTA_BULTENI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}
\${ortakFooter}
{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`,icon:"💎",etiketler:["Lüks","Dinamik","Ultra"],kategori:"jenerik",moduller:["hakkimizda-hikaye","rakamlarla-biz","video-tanitim","sertifika-belgeler","randevu","teklif-formu","google-yorumlar","musteri-referanslari","blog-makaleler","kariyer-ilanlari","kampanya-afisi","harita-yol-tarifi","calisma-saatleri","urun-listesi","online-odeme","indirim-kuponu","anket-form","duyuru-bandi","eposta-bulteni","yol-haritasi","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sektor-guzellik-buyume",ad:"İpek",aciklama:"Pastel pembe/lila, yumuşak kenarlar — kuaför, estetik ve SPA dünyası için zarif tasarım.",minPaket:"BUYUME",htmlKodu:`<!DOCTYPE html>
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
      <p>Kendinizi \xf6zel hissettirecek profesyonel hizmetlerimizle tanışın.</p>
    </div>
    <div class="hizmet-grid-soft">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. S\xdcRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 5. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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
      <p style="color:var(--renk-alt);">Bizim i\xe7in en b\xfcy\xfck mutluluk sizin g\xfcl\xfcmsemeniz.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">{{YORUMLAR_HTML}}</div>
  </div>
  <style>
    #yorumlar .kart { background:rgba(255,255,255,0.8); backdrop-filter:blur(12px); border:1px solid #fff; box-shadow:0 10px 30px rgba(212,163,115,0.08); border-radius:30px; }
  </style>
</section>

<!-- ── 10. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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

<!-- ── 13. YASAL + B\xdcLTEN ────────────────────────────────────── -->
{{MODUL_EPOSTA_BULTENI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#1a1a1a;padding:60px 20px 40px;text-align:center;color:#fff">
  <h2 style="font-family:var(--font-baslik);font-size:2rem;margin-bottom:16px;font-style:italic">{{ISLETME_ADI}}</h2>
  <p style="color:rgba(255,255,255,0.5);font-size:0.9rem;margin:0 0 32px;font-weight:300">{{SEKTOR}} \xb7 {{ILCE}}, {{SEHIR}}</p>
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
</html>`,icon:"✨",etiketler:["Güzellik","Klinik","Pastel"],kategori:"sektor",moduller:["randevu","hakkimizda-hikaye","rakamlarla-biz","video-tanitim","sertifika-belgeler","google-yorumlar","musteri-referanslari","blog-makaleler","online-odeme","anket-form","calisma-saatleri","duyuru-bandi","eposta-bulteni","yol-haritasi","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sektor-insaat-premium",ad:"Çelik",aciklama:"Metal doku, sarı uyarı vurguları — inşaat ve mimarlık firmaları için endüstriyel güç.",minPaket:"PREMIUM",htmlKodu:`<!DOCTYPE html>
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
      <a href="#iletisim" class="buton-ikincil glass-panel-light" style="color:#fff;border-color:rgba(255,255,255,0.4)">📐 \xdccretsiz Kesif</a>
    </div>
    <div class="glass-panel" style="margin-top:60px;display:inline-flex;gap:40px;align-items:center;padding:24px 40px;border-radius:20px;border:1px solid rgba(255,255,255,0.1)">
      <div>
        <div style="color:var(--renk-vurgu);font-size:2rem;font-weight:900;font-family:var(--font-baslik);text-shadow:0 0 10px rgba(255,190,11,0.3)">10+</div>
        <div style="color:#e2e8f0;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;font-weight:700">Yıllık Tecr\xfcbe</div>
      </div>
      <div>
        <div style="color:var(--renk-vurgu);font-size:2rem;font-weight:900;font-family:var(--font-baslik);text-shadow:0 0 10px rgba(255,190,11,0.3)">100%</div>
        <div style="color:#e2e8f0;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;font-weight:700">M\xfcşteri Memnuniyeti</div>
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
      <p>Projelerinizi hayata ge\xe7irmek i\xe7in end\xfcstri standartlarında \xe7\xf6z\xfcmler sunuyoruz.</p>
    </div>
    <div class="hizmet-grid-hard">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. S\xdcRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 4b. ŞANTİYE G\xdcNL\xdcĞ\xdc ────────────────────────────────── -->
{{MODUL_SANTIYE_GUNLUGU}}

<!-- ── 5. PROJELER / REFERANSLAR ────────────────────────────── -->
<section id="projeler" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80');">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik" style="margin-bottom:40px">
      <h2 style="color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.8)">G\xfc\xe7l\xfc Referanslarımız</h2>
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
      <h2>Neden Bizi Se\xe7melisiniz?</h2>
      <p>Sekt\xf6rdeki tecr\xfcbemiz ve kaliteden \xf6d\xfcn vermeyen yapımızla yanınızdayız.</p>
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
      <h2 style="color:#fff;">M\xfcşteri Yorumları</h2>
      <p style="color:rgba(255,255,255,0.8);">Bizimle \xe7alışan binlerce kişinin ortak noktası: Başarı</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:30px">{{YORUMLAR_HTML}}</div>
  </div>
  <style>
    #yorumlar .kart { background:rgba(0,0,0,0.65); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.1); border-left:4px solid var(--renk-vurgu); }
    #yorumlar .kart p { color:#e2e8f0; font-style:italic; }
    #yorumlar .kart h3 { color:#fff; }
  </style>
</section>

<!-- ── 10. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_ANKET_FORM}}

<!-- ── 11. BLOG ─────────────────────────────────────────────── -->
{{MODUL_BLOG_MAKALELER}}

<!-- ── 12. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" style="background:var(--renk-kart)">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>\xdccretsiz Keşif & İletişim</h2>
      <p>Size en uygun \xe7\xf6z\xfcmleri sunabilmek i\xe7in projenizi konuşalım.</p>
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

<!-- ── 13. YASAL + B\xdcLTEN ────────────────────────────────────── -->
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
      &copy; 2026 {{ISLETME_ADI}}. T\xfcm Hakları Saklıdır. | Powered by <a href="https://kepenk.ai" style="color:var(--renk-vurgu);text-decoration:none;font-weight:700">kepenk.ai</a>
    </div>
  </div>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`,icon:"🏗️",etiketler:["İnşaat","Mimarlık","Endüstriyel"],kategori:"sektor",moduller:["santiye-gunlugu","rakamlarla-biz","video-tanitim","sertifika-belgeler","urun-listesi","musteri-referanslari","teklif-formu","google-yorumlar","anket-form","blog-makaleler","yol-haritasi","calisma-saatleri","duyuru-bandi","eposta-bulteni","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sektor-restoran-standart",ad:"Tandır",aciklama:"Sıcak turuncu tonlar, duman efekti — restoran ve kafeler için iştah açıcı vitrin.",minPaket:"STANDART",htmlKodu:`<!DOCTYPE html>
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
      <a href="#menu" class="buton-ikincil glass-panel" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.3)">🍽️ Men\xfcy\xfc İncele</a>
    </div>
  </div>
  <a href="#menu" class="scroll-down-ok" aria-label="Aşağı kaydır">↓</a>
</section>

<!-- ── 2. İSTATİSTİKLER ─────────────────────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<hr class="section-divider">

<!-- ── 3. HİZMETLER / MEN\xdc ─────────────────────────────────── -->
<section id="menu">
  <div class="container-lg">
    <div class="bolum-baslik">
      <span class="sub-label">Lezzet & Deneyim</span>
      <h2>\xd6ne \xc7ıkan Lezzetlerimiz</h2>
    </div>
    <div class="menu-grid">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<hr class="section-divider">

<!-- ── 4. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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
      <span class="sub-label" style="text-shadow:0 2px 5px rgba(0,0,0,0.8)">M\xfcşteri Deneyimleri</span>
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

<!-- ── 8. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
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

<!-- ── 10. YASAL + MOD\xdcLLER ─────────────────────────────────── -->
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}
{{MODUL_EPOSTA_BULTENI}}
\${ortakFooter}

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`,icon:"🍽️",etiketler:["Restoran","Kafe","Lezzet"],kategori:"sektor",moduller:["randevu","hakkimizda-hikaye","rakamlarla-biz","google-yorumlar","musteri-referanslari","harita-yol-tarifi","calisma-saatleri","kampanya-afisi","duyuru-bandi","eposta-bulteni","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sektor-hizmet-temel",ad:"Flaş",aciklama:"Kırmızı vurgulu, büyük CTA butonları — acil hizmet sağlayıcılar için ultra-hızlı şablon.",minPaket:"TEMEL",htmlKodu:`<!DOCTYPE html>
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

<!-- \xc7ok basit, sadece logo/isim olan navbar -->
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

<!-- ── 4. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_CALISMA_SAATLERI}}
{{MODUL_WHATSAPP_TEKLIF}}

<!-- ── 5. YORUMLAR (Opsiyonel) ──────────────────────────────── -->
<section id="yorumlar" style="background:#fff">
  <div class="container">
    <div class="bolum-baslik">
      <h2>M\xfcşteri Yorumları</h2>
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
</html>`,icon:"⚡",etiketler:["Acil","Hızlı","Dönüşüm"],kategori:"sektor",moduller:["whatsapp-teklif","calisma-saatleri","kampanya-afisi","duyuru-bandi","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sektor-kurumsal-buyume",ad:"Granit",aciklama:"Gri tonlar, mavi vurgular — SaaS tarzı profesyonel bilişim ve finans arayüzü.",minPaket:"BUYUME",htmlKodu:`<!DOCTYPE html>
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
    <a href="tel:{{TELEFON}}" style="background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:10px 24px;border-radius:6px;font-size:0.85rem;font-weight:600">İletişime Ge\xe7in</a>
  </div>
</nav>

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-corp parallax-bg overlay-dark animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'); border-bottom:1px solid rgba(255,255,255,0.1);">
  <div class="hero-corp-bg" style="background:linear-gradient(220deg,rgba(13,59,102,0.8) 0%,rgba(0,0,0,0.4) 100%); width:100%; top:0; left:0; right:0; bottom:0;"></div>
  <div class="hero-corp-icerik overlay-content">
    <div class="glass-panel" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);padding:8px 20px;border-radius:30px;margin-bottom:24px;border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">
      <span style="display:block;width:8px;height:8px;background:#4ade80;border-radius:50%;box-shadow:0 0 10px #4ade80"></span>
      Kurumsal \xc7\xf6z\xfcm Ortağınız
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

<!-- ── 2. İSTATİSTİKLER (G\xfcven Odaklı) ──────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. HİZMETLER / UZMANLIK ALANLARI ──────────────────────── -->
<section id="uzmanliklar" style="background:#fff">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2>Uzmanlık Alanlarımız</h2>
      <p>{{SEKTOR}} alanında profesyonel ekibimizle yenilik\xe7i ve g\xfcvenilir hizmet sunuyoruz.</p>
    </div>
    <div class="grid-3">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. S\xdcRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 5. NEDEN BİZ (Kurumsal Değerler) ─────────────────────── -->
<section id="hakkimizda" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="grid-2">
      <div class="glass-panel" style="background:rgba(13,59,102,0.85);padding:40px;border-radius:24px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 15px 40px rgba(0,0,0,0.3)">
        <h2 style="font-family:var(--font-baslik);font-size:clamp(1.8rem,4vw,2.5rem);font-weight:700;margin-bottom:24px;color:#fff;text-shadow:0 2px 5px rgba(0,0,0,0.5)">Şeffaflık. G\xfcven. Profesyonellik.</h2>
        <div style="color:rgba(255,255,255,0.9);line-height:1.7;font-size:1.05rem">{{MODUL_HAKKIMIZDA_HIKAYE}}</div>
      </div>
      <div>
        <p style="color:#60a5fa;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;text-shadow:0 2px 4px rgba(0,0,0,0.8)">Neden Bizi Se\xe7melisiniz?</p>
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
      <h2 style="color:var(--renk-vurgu)">İş Ortaklarımızın G\xf6z\xfcnden</h2>
      <p style="color:var(--renk-metin)">Birlikte b\xfcy\xfcd\xfcğ\xfcm\xfcz y\xfczlerce mutlu kurumdan bazıları.</p>
    </div>
    <div class="grid-3">{{YORUMLAR_HTML}}</div>
    <style>
      #referanslar .kart {background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.05);box-shadow:0 10px 25px rgba(0,0,0,0.05)}
    </style>
  </div>
</section>

<!-- ── 9. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_BLOG_MAKALELER}}
{{MODUL_KARIYER_ILANLARI}}

<!-- ── 10. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="grid-2">
      <div class="glass-panel" style="background:rgba(15,23,42,0.85);padding:40px;border-radius:24px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 50px rgba(0,0,0,0.5)">
        <h2 style="font-family:var(--font-baslik);font-size:2.5rem;font-weight:700;margin-bottom:16px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.5)">İletişime Ge\xe7in</h2>
        <p style="color:#94a3b8;font-size:1.1rem;line-height:1.6;margin-bottom:40px">İhtiya\xe7larınızı dinlemek ve size en uygun \xe7\xf6z\xfcmleri sunmak i\xe7in hazırız.</p>
        
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

<!-- ── 11. YASAL + B\xdcLTEN ────────────────────────────────────── -->
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
      &copy; 2026 {{ISLETME_ADI}}. T\xfcm Hakları Saklıdır. Powered by <a href="https://kepenk.ai" style="color:var(--renk-vurgu);text-decoration:none">kepenk.ai</a>
    </div>
  </div>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`,icon:"🏢",etiketler:["Kurumsal","Finans","SaaS"],kategori:"sektor",moduller:["hakkimizda-hikaye","rakamlarla-biz","randevu","sertifika-belgeler","teklif-formu","google-yorumlar","musteri-referanslari","blog-makaleler","kariyer-ilanlari","yol-haritasi","calisma-saatleri","duyuru-bandi","eposta-bulteni","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sektor-egitim-standart",ad:"Kalem",aciklama:"Sarı/lacivert, defter çizgi dokusu — kurslar ve akademiler için öğrenmeye davet.",minPaket:"STANDART",htmlKodu:`<!DOCTYPE html>
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

<!-- ── 2. İSTATİSTİKLER (\xd6ğrenci sayıları vb.) ──────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. PROGRAMLAR / EĞİTİMLER ────────────────────────────── -->
<section id="programlar" style="background:#fff">
  <div class="container-lg">
    <div class="bolum-baslik">
      <h2 style="color:var(--renk-vurgu)">Eğitim Programlarımız</h2>
      <p>\xd6ğrencilerimizin potansiyellerini en \xfcst d\xfczeye \xe7ıkarmak i\xe7in tasarlandı.</p>
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
          <h3 style="font-family:var(--font-baslik);font-size:1.5rem;color:#14213d;margin-bottom:20px">Kayıt S\xfcreci</h3>
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

<!-- ── 7. \xd6ĞRENCİ YORUMLARI ─────────────────────────────────── -->
<section id="yorumlar" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <h2 style="color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.5)">\xd6ğrencilerimiz Ne Diyor?</h2>
      <p style="color:rgba(255,255,255,0.9);text-shadow:0 2px 10px rgba(0,0,0,0.5)">Başarı hikayelerimiz ve mutlu ailelerimizin yorumları.</p>
    </div>
    <div class="grid-ders">{{YORUMLAR_HTML}}</div>
    <style>
      #yorumlar .kart {background:rgba(255,255,255,0.95);box-shadow:0 10px 30px rgba(0,0,0,0.15)}
    </style>
  </div>
</section>

<!-- ── 8. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_BLOG_MAKALELER}}

<!-- ── 9. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik glass-panel" style="background:rgba(20,33,61,0.85);padding:32px;border-radius:24px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 15px 40px rgba(0,0,0,0.3)">
      <h2 style="color:#fff">Bize Ulaşın</h2>
      <p style="color:#e5e5e5">Kayıt hakkında detaylı bilgi almak veya kamp\xfcs\xfcm\xfcz\xfc ziyaret etmek i\xe7in bize ulaşın.</p>
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

<!-- ── 10. YASAL + B\xdcLTEN ────────────────────────────────────── -->
{{MODUL_TEKLIF_FORMU}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#0a0908;padding:60px 20px 40px;text-align:center;color:#f3f4f6">
  <h2 style="font-family:var(--font-baslik);font-size:2rem;margin-bottom:16px;color:var(--renk-vurgu)">{{ISLETME_ADI}}</h2>
  <p style="color:#9ca3af;font-size:1.05rem;margin-bottom:32px">{{SEKTOR}} - Eğitimde G\xfcvenilir Adres</p>
  <div style="margin-bottom:32px;border-top:1px solid rgba(255,255,255,0.1);padding-top:32px;display:flex;justify-content:center;gap:24px;flex-wrap:wrap">
    <a href="tel:{{TELEFON}}" style="color:#fff;text-decoration:none;font-weight:700">📞 {{TELEFON_GOSTERIM}}</a>
    <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="color:#fff;text-decoration:none;font-weight:700">💬 WhatsApp</a>
  </div>
  <p style="color:#6b7280;font-size:0.85rem">&copy; 2026 T\xfcm Hakları Saklıdır. Powered by <a href="https://kepenk.ai" style="color:var(--renk-vurgu);text-decoration:none;font-weight:800">kepenk.ai</a></p>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`,icon:"🎓",etiketler:["Eğitim","Kurs","Akademi"],kategori:"sektor",moduller:["hakkimizda-hikaye","rakamlarla-biz","video-tanitim","sertifika-belgeler","teklif-formu","google-yorumlar","musteri-referanslari","blog-makaleler","kampanya-afisi","calisma-saatleri","duyuru-bandi","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sektor-spor-premium",ad:"Titan",aciklama:"Neon yeşil/koyu karbon — spor salonları için enerji barları ve kaslı otorite tasarımı.",minPaket:"PREMIUM",htmlKodu:`<!DOCTYPE html>
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
    --renk-arkaplan:#09090b;
    --renk-kart:#18181b;
    --renk-vurgu:#d9f95d; /* Fosforlu Neon Yeşil / Sarı */
    --renk-hover:#bce835;
    --renk-metin:#fafafa;
    --renk-alt:#a1a1aa;
    --renk-gradient:linear-gradient(135deg, #18181b 0%, #09090b 100%);
    --font-baslik:'Teko',sans-serif;
    --font-metin:'Roboto Condensed',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden}
  h1,h2,h3{font-family:var(--font-baslik);text-transform:uppercase;line-height:1}
  
  .kart{background:var(--renk-kart);padding:32px;transition:all 0.3s;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.05)}
  .kart::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;background:var(--renk-vurgu);transform:scaleX(0);transform-origin:left;transition:transform 0.4s cubic-bezier(0.86,0,0.07,1)}
  .kart:hover::before{transform:scaleX(1)}
  .kart:hover{background:#27272a;transform:translateY(-4px)}
  
  .buton-birincil{display:inline-flex;align-items:center;justify-content:center;background:var(--renk-vurgu);color:#09090b;padding:16px 36px;font-family:var(--font-baslik);text-decoration:none;font-weight:600;font-size:1.5rem;transition:all 0.2s;text-transform:uppercase;letter-spacing:1px;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)}
  .buton-birincil:hover{background:var(--renk-hover);transform:scale(1.05)}
  .buton-ikincil{display:inline-flex;align-items:center;justify-content:center;background:transparent;color:var(--renk-metin);padding:16px 36px;font-family:var(--font-baslik);text-decoration:none;font-weight:600;font-size:1.5rem;transition:all 0.2s;text-transform:uppercase;letter-spacing:1px;border:2px solid var(--renk-vurgu);clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)}
  .buton-ikincil:hover{background:rgba(217,249,93,0.1);color:var(--renk-vurgu)}
  
  .bolum-baslik{margin-bottom:60px;display:flex;flex-direction:column;align-items:flex-start}
  .bolum-baslik .outline-text{font-size:clamp(3rem,8vw,5rem);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.15);position:absolute;z-index:0;transform:translateY(-40%);pointer-events:none}
  .bolum-baslik h2{font-size:clamp(2.5rem,5vw,4rem);font-weight:600;color:var(--renk-metin);position:relative;z-index:1;display:inline-block;padding-left:24px}
  .bolum-baslik h2::before{content:'';position:absolute;left:0;top:-10px;bottom:-10px;width:8px;background:var(--renk-vurgu);transform:skewX(-15deg)}
  
  section{padding:120px 20px;position:relative}
  .container{max-width:900px;margin:0 auto}
  .container-lg{max-width:1200px;margin:0 auto}
  
  .hero-dark{min-height:100vh;display:flex;align-items:center;padding:100px 20px;background:#000;position:relative;overflow:hidden}
  .hero-dark-icerik{position:relative;z-index:2;max-width:900px;margin:0 auto;width:100%}
  .hero-dark-bg{position:absolute;inset:0;background:radial-gradient(circle at right,rgba(217,249,93,0.15),transparent 50%);z-index:1}
  .hero-dark-grid{background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:40px 40px;position:absolute;inset:0;z-index:0;opacity:0.5}
  
  .grid-sport{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
  
  @media(max-width:768px){section{padding:70px 20px}.buton-birincil,.buton-ikincil{padding:14px 24px;font-size:1.3rem;width:100%}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;1,400&family=Teko:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}

<nav id="nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(9,9,11,0.9);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.05);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;text-transform:uppercase">
  <div style="font-family:var(--font-baslik);font-size:2rem;font-weight:600;color:var(--renk-vurgu);line-height:1">{{ISLETME_KISAADI}}</div>
  <div id="nav-linkler" style="display:flex;gap:32px;align-items:center">
    <a href="#hizmetler" style="color:var(--renk-metin);text-decoration:none;font-family:var(--font-baslik);font-size:1.3rem;letter-spacing:1px">Hizmetler</a>
    <a href="#hakkimizda" style="color:var(--renk-metin);text-decoration:none;font-family:var(--font-baslik);font-size:1.3rem;letter-spacing:1px">Hakkında</a>
    <a href="tel:{{TELEFON}}" style="background:var(--renk-vurgu);color:#09090b;text-decoration:none;padding:8px 20px;font-family:var(--font-baslik);font-size:1.2rem;font-weight:600;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)">Hemen Ara</a>
  </div>
</nav>

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-dark parallax-bg overlay-dark animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80'); padding-top:140px;">
  <div class="hero-dark-bg" style="background:radial-gradient(circle at right, rgba(217,249,93,0.3), transparent 60%);"></div>
  <div class="hero-dark-grid"></div>
  <div class="hero-dark-icerik overlay-content">
    <div style="font-family:var(--font-baslik);font-size:2rem;color:var(--renk-vurgu);margin-bottom:12px;letter-spacing:2px;text-shadow:0 0 15px rgba(217,249,93,0.6)">{{ILCE}} / {{SEHIR}}</div>
    <div class="glass-panel" style="display:inline-block;padding:30px 40px; border-radius:12px; border-left:8px solid var(--renk-vurgu); background:rgba(0,0,0,0.6); box-shadow:0 20px 50px rgba(0,0,0,0.8); margin-bottom:40px">
      <h1 style="font-size:clamp(4rem,10vw,8rem);font-weight:700;color:var(--renk-metin);margin-bottom:20px;letter-spacing:-1px;line-height:0.9;text-transform:uppercase;text-shadow:4px 4px 0 rgba(217,249,93,0.4)">{{HERO_BASLIK}}</h1>
      <p style="color:rgba(255,255,255,0.9);font-size:1.4rem;line-height:1.6;max-width:700px;font-weight:400;border-left:2px solid rgba(255,255,255,0.2);padding-left:16px;text-transform:uppercase">{{HERO_SLOGAN}}</p>
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-birincil hover-pulse shadow-lg" style="box-shadow:0 0 20px rgba(217,249,93,0.4)">{{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-ikincil glass-panel-light hover-pulse" style="background:rgba(255,255,255,0.05)">{{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<!-- ── 2. İSTATİSTİKLER (G\xfc\xe7/Rakamlar) ──────────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 3. HİZMETLER / ANTRENMANLAR ──────────────────────────── -->
<section id="hizmetler" style="background:var(--renk-arkaplan)">
  <div class="container-lg">
    <div class="bolum-baslik">
      <div class="outline-text">HİZMETLER</div>
      <h2>Programlarımız & Hizmetlerimiz</h2>
    </div>
    <div class="grid-sport">{{HIZMETLER_HTML}}</div>
  </div>
</section>

<!-- ── 4. S\xdcRECİMİZ ─────────────────────────────────────────── -->
{{MODUL_YOL_HARITASI}}

<!-- ── 5. NEDEN BİZ (Disiplin/Felsefe) ──────────────────────── -->
<section id="hakkimizda" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80'); border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
      <div class="glass-panel" style="background:rgba(0,0,0,0.8);padding:40px;border-left:4px solid var(--renk-vurgu);box-shadow:0 20px 50px rgba(0,0,0,0.8)">
        <h2 style="font-family:var(--font-baslik);font-size:clamp(3rem,6vw,4.5rem);font-weight:600;margin-bottom:24px;color:var(--renk-metin);line-height:0.9;text-shadow:2px 2px 0 rgba(217,249,93,0.3)">{{ISLETME_ADI}} Farkı</h2>
        <div style="color:var(--renk-alt);line-height:1.8;font-size:1.1rem;margin-bottom:24px">{{MODUL_HAKKIMIZDA_HIKAYE}}</div>
      </div>
      <div>
        <div style="background:rgba(24,24,27,0.9);backdrop-filter:blur(10px);padding:40px;position:relative;border:1px solid rgba(217,249,93,0.3);box-shadow:0 15px 40px rgba(0,0,0,0.6)">
          <div style="position:absolute;top:-20px;left:40px;background:var(--renk-vurgu);color:#000;font-family:var(--font-baslik);font-size:1.5rem;font-weight:600;padding:4px 16px;letter-spacing:1px;box-shadow:0 0 15px rgba(217,249,93,0.4)">NEDEN BİZ?</div>
          <div style="display:grid;gap:20px;margin-top:20px">{{NEDEN_BIZ_HTML}}</div>
          <style>
             #hakkimizda .kart {background:transparent; border:none; border-left:2px solid rgba(255,255,255,0.1); padding:16px;}
             #hakkimizda .kart h3 {color:var(--renk-vurgu); margin-bottom:8px;}
             #hakkimizda .kart:hover {background:rgba(255,255,255,0.03); border-left-color:var(--renk-vurgu);}
          </style>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── 6. VİDEO TANITIM (Motivasyon) ────────────────────────── -->
{{MODUL_VIDEO_TANITIM}}

<!-- ── 7. BAŞARI HİKAYELERİ / YORUMLAR ──────────────────────── -->
<section id="yorumlar" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <div class="outline-text" style="opacity:0.3">TOPLULUK</div>
      <h2 style="text-shadow:2px 2px 0 rgba(217,249,93,0.3)">\xdcye Yorumları</h2>
    </div>
    <div class="grid-sport">{{YORUMLAR_HTML}}</div>
    <style>
      #yorumlar .kart {background:rgba(0,0,0,0.7); backdrop-filter:blur(12px); border-top:2px solid var(--renk-vurgu); box-shadow:0 15px 30px rgba(0,0,0,0.5);}
    </style>
  </div>
</section>

<!-- ── 8. SERTİFİKALAR / ANTREN\xd6RLER ────────────────────────── -->
{{MODUL_SERTIFIKA_BELGELER}}
{{MODUL_MUSTERI_REFERANSLARI}}

<!-- ── 9. RANDEVU / KAYIT ───────────────────────────────────── -->
{{MODUL_RANDEVU}}

<!-- ── 10. İLETİŞİM ─────────────────────────────────────────── -->
<section id="iletisim" class="parallax-bg overlay-dark" style="background-image: url('https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1600&q=80'); padding:100px 20px;">
  <div class="container-lg overlay-content">
    <div class="bolum-baslik">
      <div class="outline-text" style="opacity:0.3">İLETİŞİM</div>
      <h2 style="text-shadow:2px 2px 0 rgba(217,249,93,0.3)">Bize Ulaşın</h2>
    </div>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px">
      <div>
        <div class="glass-panel" style="background:rgba(24,24,27,0.8); backdrop-filter:blur(10px); padding:40px; border-left:4px solid var(--renk-vurgu); margin-bottom:24px; box-shadow:0 20px 40px rgba(0,0,0,0.6); border-right:1px solid rgba(255,255,255,0.05)">
          <p style="color:#e4e4e7;font-size:1.1rem;line-height:1.6;margin-bottom:32px">{{ADRES_METNI}}</p>
          <div style="display:grid;gap:16px">
            <a href="tel:{{TELEFON}}" class="buton-birincil shadow-lg hover-pulse" style="width:100%;box-shadow:0 0 15px rgba(217,249,93,0.3)">📞 {{TELEFON_GOSTERIM}}</a>
            <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-ikincil glass-panel-light hover-pulse" style="width:100%;color:#25d366;border-color:#25d366;background:rgba(255,255,255,0.05)">💬 WhatsApp'tan Yazın</a>
          </div>
        </div>
        {{MODUL_CALISMA_SAATLERI}}
        {{MODUL_SOSYAL_MEDYA}}
      </div>
      <div style="border:1px solid rgba(255,255,255,0.1);padding:4px;background:rgba(24,24,27,0.8);backdrop-filter:blur(10px);box-shadow:0 20px 40px rgba(0,0,0,0.6)">
        <iframe src="{{HARITA_URL}}" width="100%" height="100%" style="border:none;min-height:500px;filter:invert(90%) hue-rotate(180deg)" loading="lazy"></iframe>
      </div>
    </div>
  </div>
</section>

<!-- ── 11. YASAL + MOD\xdcLLER ─────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_BLOG_MAKALELER}}
{{MODUL_TEKLIF_FORMU}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#000;padding:80px 20px 40px;border-top:1px solid rgba(217,249,93,0.2)">
  <div class="container-lg" style="text-align:center">
    <h2 style="font-family:var(--font-baslik);font-size:4rem;margin-bottom:16px;color:#fff;line-height:1">{{ISLETME_ADI}}</h2>
    <p style="color:var(--renk-alt);font-size:1.2rem;margin-bottom:40px;text-transform:uppercase;letter-spacing:2px">{{SEKTOR}} - {{ILCE}}</p>
    <div style="display:flex;gap:32px;justify-content:center;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,0.1);padding-top:40px;margin-bottom:32px">
      <a href="tel:{{TELEFON}}" style="color:#fff;text-decoration:none;font-weight:700;font-size:1.1rem;text-transform:uppercase">📞 {{TELEFON_GOSTERIM}}</a>
      <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="color:var(--renk-vurgu);text-decoration:none;font-weight:700;font-size:1.1rem;text-transform:uppercase">💬 WhatsApp'tan Ulaşın</a>
    </div>
    <p style="color:#52525b;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px">&copy; 2026 T\xfcm Hakları Saklıdır. Powered by <a href="https://kepenk.ai" style="color:#fff;text-decoration:none;font-weight:700">kepenk.ai</a></p>
  </div>
</footer>

{{MODUL_WHATSAPP_CANLI}}
{{MODUL_BIZE_ULASIN_STICKY}}
</body>
</html>`,icon:"🏋️",etiketler:["Spor","Neon","Enerji"],kategori:"sektor",moduller:["randevu","hakkimizda-hikaye","rakamlarla-biz","video-tanitim","sertifika-belgeler","teklif-formu","google-yorumlar","musteri-referanslari","blog-makaleler","yol-haritasi","calisma-saatleri","duyuru-bandi","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli","bize-ulasin-sticky"]},{id:"sektor-vitrin-buyume",ad:"Tül",aciklama:"Siyah/beyaz editorial moda — serif fontlar, minimalist şıklıkla koleksiyon vitrini.",minPaket:"BUYUME",htmlKodu:`<!DOCTYPE html>
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
    --renk-arkaplan:#fff;
    --renk-kart:#f9f9f9;
    --renk-vurgu:#000000;
    --renk-hover:#333333;
    --renk-metin:#111111;
    --renk-alt:#666666;
    --renk-gradient:linear-gradient(to bottom, #f5f5f5 0%, #ffffff 100%);
    --font-baslik:'Cormorant Garamond',serif;
    --font-metin:'Jost',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden}
  h1,h2,h3{font-family:var(--font-baslik);font-weight:400}
  
  .kart{background:var(--renk-kart);padding:40px;transition:all 0.5s ease;text-align:center;border:1px solid transparent;position:relative;overflow:hidden}
  .kart::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:1px;background:#000;transition:width 0.5s ease}
  .kart:hover::after{width:100%}
  .kart:hover{background:#fff;box-shadow:0 30px 60px rgba(0,0,0,0.04);transform:translateY(-10px)}
  
  .buton-birincil{display:inline-flex;align-items:center;justify-content:center;background:var(--renk-vurgu);color:#fff;padding:16px 40px;text-decoration:none;font-weight:400;font-size:0.9rem;letter-spacing:0.15em;text-transform:uppercase;transition:all 0.3s;border:1px solid #000}
  .buton-birincil:hover{background:#fff;color:#000}
  .buton-ikincil{display:inline-flex;align-items:center;justify-content:center;background:transparent;color:#000;padding:16px 40px;text-decoration:none;font-weight:400;font-size:0.9rem;letter-spacing:0.15em;text-transform:uppercase;transition:all 0.3s;border:1px solid #000}
  .buton-ikincil:hover{background:#000;color:#fff}
  
  .bolum-baslik{text-align:center;margin-bottom:80px}
  .bolum-baslik span{display:block;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.2em;color:var(--renk-alt);margin-bottom:20px}
  .bolum-baslik h2{font-size:clamp(2.5rem,6vw,4rem);font-style:italic;color:var(--renk-metin);margin:0}
  
  section{padding:120px 20px}
  .container{max-width:800px;margin:0 auto}
  .container-lg{max-width:1300px;margin:0 auto}
  
  .hero-vitrin{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:120px 20px 60px;background:var(--renk-gradient);position:relative;text-align:center}
  .hero-vitrin-icerik{position:relative;z-index:2;max-width:900px;margin:0 auto;width:100%}
  
  .grid-boutique{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:40px}
  
  @media(max-width:768px){section{padding:80px 20px}.buton-birincil,.buton-ikincil{width:100%;padding:14px 20px}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>

{{MODUL_DUYURU_BANDI}}

<nav id="nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.98);border-bottom:1px solid #eee;padding:24px 20px;display:flex;flex-direction:column;align-items:center;transition:all 0.3s">
  <a href="#" style="font-family:var(--font-baslik);font-size:2.2rem;color:#000;text-decoration:none;margin-bottom:12px;line-height:1">{{ISLETME_KISAADI}}</a>
  <div id="nav-linkler" style="display:flex;gap:32px;align-items:center">
    <a href="#koleksiyonlar" style="color:var(--renk-alt);text-decoration:none;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Koleksiyonlar</a>
    <a href="#hakkimizda" style="color:var(--renk-alt);text-decoration:none;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">At\xf6lye</a>
    <a href="tel:{{TELEFON}}" style="color:#000;text-decoration:none;font-size:0.85rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;border-bottom:1px solid #000;padding-bottom:2px">İletişim</a>
  </div>
</nav>
<style> @media(max-width:600px){#nav{padding:16px 20px} #nav-linkler{gap:16px;flex-wrap:wrap;justify-content:center}} </style>

<!-- ── 1. HERO ──────────────────────────────────────────────── -->
<section class="hero-vitrin parallax-bg animate-fade-in-up" id="hero" style="background-image: url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80'); padding-top:160px; position:relative;">
  <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.1) 100%); z-index:1;"></div>
  <div class="hero-vitrin-icerik" style="z-index:2;">
    <div style="font-size:0.85rem;letter-spacing:0.4em;text-transform:uppercase;color:#000;margin-bottom:30px;font-weight:500;">
      YENİ SEZON &bull; {{ILCE}}, {{SEHIR}}
    </div>
    <h1 style="font-size:clamp(3.5rem,9vw,6.5rem);color:#000;line-height:0.9;margin-bottom:30px;font-style:italic;padding:0 20px;letter-spacing:-0.02em;">{{HERO_BASLIK}}</h1>
    <p style="color:#444;font-size:1.15rem;line-height:1.8;margin-bottom:50px;max-width:600px;margin-left:auto;margin-right:auto;font-weight:400;letter-spacing:0.05em;">{{HERO_SLOGAN}}</p>
    <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="buton-birincil shadow-sm hover-pulse" style="background:#000;color:#fff;border-color:#000;">KEŞFET</a>
      <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="buton-ikincil glass-panel-light hover-pulse" style="background:rgba(255,255,255,0.8);backdrop-filter:blur(5px);">WHATSAPP</a>
    </div>
  </div>
</section>

<!-- ── 2. KOLEKSİYONLAR / HİZMETLER ─────────────────────────── -->
<section id="koleksiyonlar" style="background:#fff">
  <div class="container-lg">
    <div class="bolum-baslik">
      <span>\xd6zel Par\xe7alar</span>
      <h2>Se\xe7kin Koleksiyonumuz</h2>
    </div>
    <div class="grid-boutique">{{HIZMETLER_HTML}}</div>
    <style> 
      #koleksiyonlar .kart h3 {font-family:var(--font-baslik);font-size:2rem;font-style:italic;margin-bottom:16px;color:#000} 
      #koleksiyonlar .kart p {font-weight:300;line-height:1.7;color:#555}
    </style>
  </div>
</section>

<!-- ── 3. VİTRİN HİKAYESİ ───────────────────────────────────── -->
<section id="hakkimizda" class="parallax-bg" style="background-image: url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80'); padding:120px 20px; position:relative;">
  <div style="position:absolute; inset:0; background:rgba(255,255,255,0.7); z-index:1;"></div>
  <div class="container-lg" style="position:relative; z-index:2;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center">
      <div style="background:#fff; padding:60px; box-shadow:0 30px 60px rgba(0,0,0,0.05)">
        <h2 style="font-family:var(--font-baslik);font-size:clamp(2.5rem,5vw,3.5rem);font-style:italic;margin-bottom:30px;color:#000;line-height:1.1">Zamansız Şıklık, \xd6zel Detaylar.</h2>
        <div style="color:var(--renk-alt);line-height:1.9;font-size:1.1rem;font-weight:300;margin-bottom:40px">{{MODUL_HAKKIMIZDA_HIKAYE}}</div>
        <a href="#iletisim" class="buton-ikincil" style="border-width:1px;padding:12px 30px;font-size:0.8rem">BİZE ULAŞIN</a>
      </div>
      <div style="background:rgba(255,255,255,0.9); padding:50px; backdrop-filter:blur(10px)">
        <p style="font-size:0.8rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--renk-alt);margin-bottom:30px;border-bottom:1px solid #ddd;padding-bottom:15px">İLKELERİMİZ</p>
        <div style="display:grid;gap:30px">{{NEDEN_BIZ_HTML}}</div>
        <style> #hakkimizda .kart{padding:0;background:none;border:none;text-align:left;box-shadow:none} #hakkimizda .kart:hover{transform:none} #hakkimizda .kart::after{display:none}</style>
      </div>
    </div>
  </div>
</section>

<!-- ── 4. \xdcR\xdcN KATALOĞU (\xdcr\xfcn Listesi Mod\xfcl\xfc) ───────────────── -->
{{MODUL_URUN_LISTESI}}

<!-- ── 5. M\xdcŞTERİ YORUMLARI ─────────────────────────────────── -->
<section id="yorumlar" class="parallax-bg" style="background-image: url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80'); padding:120px 20px; position:relative;">
  <div style="position:absolute; inset:0; background:rgba(0,0,0,0.6); z-index:1;"></div>
  <div class="container-lg" style="position:relative; z-index:2;">
    <div class="bolum-baslik">
      <span style="color:rgba(255,255,255,0.6)">Deneyimler</span>
      <h2 style="color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.3)">M\xfcşterilerimizin G\xf6z\xfcnden</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(350px,1fr));gap:40px">{{YORUMLAR_HTML}}</div>
    <style>
      #yorumlar .kart {background:rgba(255,255,255,0.95);border:none;padding:50px 40px;position:relative;box-shadow:0 20px 40px rgba(0,0,0,0.2)}
      #yorumlar .kart::before {content:'"';font-family:var(--font-baslik);font-size:6rem;position:absolute;top:10px;left:30px;color:#f0f0f0;line-height:1;z-index:0}
      #yorumlar p {font-size:1.2rem;line-height:1.8;color:#333;font-style:italic;position:relative;z-index:1}
      #yorumlar span {display:block;margin-top:24px;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;color:#000}
    </style>
  </div>
</section>

<!-- ── 6. İSTATİSTİKLER (Şıklık g\xf6stergesi) ─────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 7. KAMPANYA VE İNDİRİM (Mod\xfcl) ───────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_INDIRIM_KUPONU}}

<!-- ── 8. İLETİŞİM & AT\xd6LYE ─────────────────────────────────── -->
<section id="iletisim" style="background:#0a0a0a;color:#fff;text-align:center;padding:120px 20px; border-top:1px solid #222;">
  <div class="container">
    <div class="bolum-baslik">
      <span style="color:#666; letter-spacing:0.3em;">Bizi Ziyaret Edin</span>
      <h2 style="color:#fff; font-size:3.5rem;">At\xf6lyemiz</h2>
    </div>
    
    <p style="font-size:1.3rem;line-height:1.8;color:#ccc;margin-bottom:40px;font-weight:300; letter-spacing:0.05em">{{ADRES_METNI}}</p>
    
    <div style="display:flex;gap:40px;justify-content:center;margin-bottom:60px">
      <a href="tel:{{TELEFON}}" class="hover-pulse" style="color:#fff;text-decoration:none;font-size:1.1rem;letter-spacing:0.15em;border-bottom:1px solid #444;padding-bottom:8px;text-transform:uppercase; transition:all 0.3s;">📞 {{TELEFON_GOSTERIM}}</a>
      <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="hover-pulse" style="color:#fff;text-decoration:none;font-size:1.1rem;letter-spacing:0.15em;border-bottom:1px solid #444;padding-bottom:8px;text-transform:uppercase; transition:all 0.3s;">💬 WhatsApp İletişim</a>
    </div>
    
    <div style="filter:grayscale(100%) opacity(0.7); box-shadow:0 20px 50px rgba(0,0,0,0.5)">
      {{MODUL_HARITA_YOL_TARIFI}}
    </div>
  </div>
</section>

<!-- ── 9. MOD\xdcL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_SOSYAL_MEDYA}}

<!-- ── 10. YASAL + B\xdcLTEN ────────────────────────────────────── -->
{{MODUL_EPOSTA_BULTENI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer style="background:#fff;padding:80px 20px 60px;border-top:1px solid #eee;text-align:center">
  <h2 style="font-family:var(--font-baslik);font-size:2.5rem;color:#000;margin-bottom:20px;line-height:1">{{ISLETME_ADI}}</h2>
  <div style="font-size:0.8rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--renk-alt);margin-bottom:40px">
    {{SEKTOR}} &bull; {{ILCE}}, {{SEHIR}}
  </div>
  
  <div style="display:flex;justify-content:center;gap:40px;margin-bottom:40px">
    <a href="#" style="color:#000;text-decoration:none;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Instagram</a>
    <a href="#" style="color:#000;text-decoration:none;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Facebook</a>
    <a href="tel:{{TELEFON}}" style="color:#000;text-decoration:none;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">İletişim</a>
  </div>
  
  <p style="font-size:0.75rem;color:#999;letter-spacing:0.1em;text-transform:uppercase">&copy; 2026 T\xfcm Hakları Saklıdır. Dış Tarafından Desteklenir: <a href="https://kepenk.ai" style="color:#000;text-decoration:none;border-bottom:1px solid #ccc;padding-bottom:1px">kepenk.ai</a></p>
</footer>

{{MODUL_WHATSAPP_CANLI}}
</body>
</html>`,icon:"🛍️",etiketler:["Moda","Butik","Editorial"],kategori:"sektor",moduller:["hakkimizda-hikaye","rakamlarla-biz","urun-listesi","indirim-kuponu","google-yorumlar","kampanya-afisi","harita-yol-tarifi","duyuru-bandi","eposta-bulteni","kvkk-gizlilik","cerez-bildirimi","sosyal-medya","whatsapp-canli"]},{id:"sektor-saglik-premium",ad:"Papatya",aciklama:"Beyaz/mint yeşil, steril ferahlık — klinik ve sağlık kuruluşları için güven veren şifa tasarımı.",minPaket:"PREMIUM",htmlKodu:`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SEO_BASLIK}}</title>
  <meta name="description" content="{{SEO_ACIKLAMA}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@400;600;800;900&family={{FONT_METIN}}:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --renk-arkaplan: {{CSS_ARKAPLAN}};
      --renk-kart: {{CSS_KART}};
      --renk-vurgu: {{CSS_VURGU}};
      --renk-hover: {{CSS_HOVER}};
      --renk-metin: {{CSS_METIN}};
      --renk-alt: {{CSS_ALT}};
      --font-baslik: '{{FONT_BASLIK}}', sans-serif;
      --font-metin: '{{FONT_METIN}}', sans-serif;
    }
    body {
      margin: 0;
      font-family: var(--font-metin);
      background-color: var(--renk-arkaplan);
      color: var(--renk-metin);
      line-height: 1.6;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 { font-family: var(--font-baslik); margin: 0; }
    a { color: inherit; text-decoration: none; }
    * { box-sizing: border-box; }
    
    /* Global classes - Premium Health Variant */
    .hero-bg {
      background-image: linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
    .glass-panel {
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.05);
      border: 1px solid rgba(255,255,255,0.5);
    }
    .hover-lift { transition: transform 0.3s, box-shadow 0.3s; }
    .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.08); }
    .btn-primary { background: var(--renk-vurgu); color: #fff; border: none; padding: 18px 36px; border-radius: 50px; font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 20px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.2); }
    .btn-primary:hover { background: var(--renk-hover); transform: translateY(-3px); box-shadow: 0 15px 30px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.3); }
    
    /* Animations */
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
    .d-1 { animation-delay: 0.1s; }
    .d-2 { animation-delay: 0.3s; }
    .d-3 { animation-delay: 0.5s; }
  </style>
</head>
<body>

  <!-- Sticky Header -->
  <header style="position:fixed; top:0; width:100%; z-index:100; transition:all 0.4s;" id="main-header">
    <div style="background:var(--renk-vurgu); color:#fff; font-size:0.9rem; padding:8px 0; font-weight:600;">
      <div style="max-width:1200px; margin:0 auto; padding:0 20px; display:flex; justify-content:space-between; align-items:center;">
        <span style="display:flex; align-items:center; gap:8px;">📍 {{ILCE}}, {{SEHIR}}</span>
        <div style="display:flex; gap:16px;">
          <a href="tel:{{TELEFON}}" style="display:flex; align-items:center; gap:8px;">📞 {{TELEFON_GOSTERIM}}</a>
        </div>
      </div>
    </div>
    <div class="glass-panel" style="padding:15px 0;">
      <div style="max-width:1200px; margin:0 auto; padding:0 20px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:40px; height:40px; background:var(--renk-vurgu); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; font-size:1.5rem;">+</div>
          <a href="#" style="font-family:var(--font-baslik); font-size:1.8rem; font-weight:800; color:var(--renk-metin); letter-spacing:-0.5px;">{{ISLETME_ADI}}</a>
        </div>
        <a href="#randevu" class="btn-primary" style="padding:12px 24px; font-size:1rem;">Hemen Randevu Al</a>
      </div>
    </div>
  </header>
  <script>
    window.addEventListener('scroll', function(){
      var hdr = document.getElementById('main-header');
      if(window.scrollY > 50){ hdr.style.transform = 'translateY(-38px)'; }
      else { hdr.style.transform = 'translateY(0)'; }
    });
  </script>

  <!-- Hero Section -->
  <section class="hero-bg" style="min-height:90vh; display:flex; align-items:center; padding:150px 20px 80px; position:relative;">
    <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1.2fr 1fr; gap:60px; align-items:center; z-index:2;">
      <div>
        <div class="animate-in d-1" style="display:inline-block; background:rgba(var(--renk-vurgu-rgb, 0,100,200), 0.1); color:var(--renk-vurgu); padding:8px 20px; border-radius:30px; font-weight:800; font-size:0.9rem; margin-bottom:24px; letter-spacing:0.05em; text-transform:uppercase;">SAĞLIĞINIZ BİZE EMANET</div>
        <h1 class="animate-in d-2" style="font-size:clamp(3rem, 6vw, 4.5rem); line-height:1.1; margin-bottom:24px; color:var(--renk-metin);">{{HERO_BASLIK}}</h1>
        <p class="animate-in d-3" style="font-size:1.3rem; color:var(--renk-alt); margin-bottom:40px; max-width:600px; line-height:1.7;">{{HERO_SLOGAN}}</p>
        <div class="animate-in d-3" style="display:flex; gap:20px; flex-wrap:wrap;">
          <a href="tel:{{TELEFON}}" class="btn-primary">{{HERO_CTA_BIRINCIL}}</a>
          <a href="https://wa.me/{{WHATSAPP}}?text={{WA_MESAJ}}" target="_blank" class="btn-primary" style="background:#fff; color:var(--renk-metin); border:2px solid rgba(0,0,0,0.1); box-shadow:none;">Whatsapp'tan Yazın</a>
        </div>
        
        <div class="animate-in d-3" style="margin-top:50px; display:flex; gap:30px; align-items:center;">
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:2rem; font-weight:900; color:var(--renk-metin); font-family:var(--font-baslik);">10+</span>
            <span style="font-size:0.9rem; color:var(--renk-alt); font-weight:600;">Yıllık Tecr\xfcbe</span>
          </div>
          <div style="width:1px; height:40px; background:rgba(0,0,0,0.1);"></div>
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:2rem; font-weight:900; color:var(--renk-metin); font-family:var(--font-baslik);">5K+</span>
            <span style="font-size:0.9rem; color:var(--renk-alt); font-weight:600;">Mutlu Hasta</span>
          </div>
        </div>
      </div>
      
      <div class="animate-in d-2" style="position:relative;">
        <div style="border-radius:40px; overflow:hidden; box-shadow:0 30px 60px rgba(0,0,0,0.1); position:relative; aspect-ratio:4/5;">
          <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=800&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Klinik G\xf6rseli" />
        </div>
        <!-- Floating Badges -->
        <div class="glass-panel" style="position:absolute; bottom:40px; left:-30px; padding:20px 30px; border-radius:24px; display:flex; align-items:center; gap:16px;">
          <div style="width:50px; height:50px; background:var(--renk-vurgu); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div>
            <div style="font-family:var(--font-baslik); font-weight:800; font-size:1.2rem; color:var(--renk-metin);">Uzman Kadro</div>
            <div style="font-size:0.9rem; color:var(--renk-alt);">Alanında en iyiler</div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      @media (max-width: 900px) { section.hero-bg > div { grid-template-columns: 1fr; } section.hero-bg > div > div:last-child { display:none; } }
    </style>
  </section>

  <!-- Hizmetler -->
  <section style="padding:100px 20px; background:var(--renk-kart);">
    <div style="max-width:1200px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:60px;">
        <span style="color:var(--renk-vurgu); font-weight:800; text-transform:uppercase; letter-spacing:0.1em;">TIBBİ BİRİMLERİMİZ</span>
        <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin-top:12px; color:var(--renk-metin);">Uzmanlık Alanlarımız</h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:30px;" id="hizmet-grid">
        {{HIZMETLER_HTML}}
      </div>
      <script>
        document.querySelectorAll('#hizmet-grid > div').forEach(function(el){
          el.className = 'glass-panel hover-lift';
          el.style.padding = '40px 30px';
          el.style.borderRadius = '24px';
          var h3 = el.querySelector('h3');
          if(h3) { h3.style.fontSize = '1.6rem'; h3.style.marginBottom = '16px'; h3.style.color = 'var(--renk-vurgu)'; }
          var p = el.querySelector('p');
          if(p) { p.style.color = 'var(--renk-alt)'; p.style.fontSize = '1.05rem'; }
        });
      </script>
    </div>
  </section>

  <!-- Neden Biz (Trust Section) -->
  <section style="padding:100px 20px; background:var(--renk-arkaplan);">
    <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center;">
      <div style="border-radius:32px; overflow:hidden; aspect-ratio:1; position:relative;">
        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Klinik Ortamı"/>
      </div>
      <div>
        <span style="color:var(--renk-vurgu); font-weight:800; text-transform:uppercase; letter-spacing:0.1em;">BİZİ TANIYIN</span>
        <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin:12px 0 30px; color:var(--renk-metin);">Neden {{ISLETME_KISAADI}}?</h2>
        <div style="display:grid; gap:24px;" id="neden-grid">
          {{NEDEN_BIZ_HTML}}
        </div>
        <script>
          document.querySelectorAll('#neden-grid > div').forEach(function(el){
            el.style.display = 'flex';
            el.style.gap = '20px';
            el.style.alignItems = 'flex-start';
            var txtDiv = document.createElement('div');
            var h3 = el.querySelector('h3');
            var p = el.querySelector('p');
            if(h3) { h3.style.fontSize='1.3rem'; h3.style.marginBottom='8px'; txtDiv.appendChild(h3); }
            if(p) { p.style.color='var(--renk-alt)'; p.style.margin='0'; txtDiv.appendChild(p); }
            el.innerHTML = '<div style="width:48px; height:48px; border-radius:12px; background:rgba(var(--renk-vurgu-rgb, 0,100,200), 0.1); color:var(--renk-vurgu); flex-shrink:0; display:flex; align-items:center; justify-content:center;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg></div>';
            el.appendChild(txtDiv);
          });
        </script>
      </div>
    </div>
    <style>
      @media (max-width: 900px) { section > div { grid-template-columns: 1fr !important; } }
    </style>
  </section>

  <!-- Mod\xfcller Alanı -->
  {{MODUL_RANDEVU}}
  {{MODUL_EKIP_UYELERI}}
  {{MODUL_ONLINE_DANISMA}}
  {{MODUL_SSS_GENIS}}
  {{MODUL_YOL_TARIFI}}

  <!-- Fotoğraf Galerisi / Tesisimiz -->
  <section style="padding:100px 20px; background:var(--renk-kart);">
    <div style="max-width:1200px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:50px;">
        <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin-bottom:16px; color:var(--renk-metin);">Klinik Ortamımız</h2>
        <p style="color:var(--renk-alt); font-size:1.15rem;">Modern, hijyenik ve huzurlu bir ortam.</p>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:20px;">
        <img src="https://images.unsplash.com/photo-1538108149393-cebb92afe674?w=500&q=80" style="width:100%; height:300px; object-fit:cover; border-radius:24px;" alt="Tesis"/>
        <img src="https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=500&q=80" style="width:100%; height:300px; object-fit:cover; border-radius:24px;" alt="Tesis"/>
        <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500&q=80" style="width:100%; height:300px; object-fit:cover; border-radius:24px;" alt="Tesis"/>
        <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80" style="width:100%; height:300px; object-fit:cover; border-radius:24px;" alt="Tesis"/>
      </div>
    </div>
  </section>

  <!-- Yorumlar -->
  <section style="padding:100px 20px; background:var(--renk-arkaplan);">
    <div style="max-width:1200px; margin:0 auto; text-align:center;">
      <span style="color:var(--renk-vurgu); font-weight:800; text-transform:uppercase; letter-spacing:0.1em;">HASTA YORUMLARI</span>
      <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin:12px 0 50px; color:var(--renk-metin);">Memnuniyetiniz \xd6nceliğimiz</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;" id="yorum-grid">
        {{YORUMLAR_HTML}}
      </div>
      <script>
        document.querySelectorAll('#yorum-grid > div').forEach(function(el){
          el.className = 'glass-panel hover-lift';
          el.style.padding = '40px 30px';
          el.style.borderRadius = '24px';
          el.style.textAlign = 'left';
          var p = el.querySelector('p');
          if(p) { p.style.fontSize = '1.1rem'; p.style.fontStyle = 'italic'; p.style.marginBottom = '24px'; p.style.lineHeight = '1.8'; p.style.color='var(--renk-metin)'; }
          var sp = el.querySelector('span');
          if(sp){ sp.style.fontWeight = '800'; sp.style.color = 'var(--renk-vurgu)'; }
          
          var stars = document.createElement('div');
          stars.innerHTML = '⭐⭐⭐⭐⭐';
          stars.style.marginBottom = '16px';
          el.insertBefore(stars, el.firstChild);
        });
      </script>
    </div>
  </section>

  {{MODUL_ACIL_BUTON}}
  {{MODUL_CANLI_DESTEK}}

  <!-- Footer -->
  <footer style="background:#111; color:#fff; padding:80px 20px 40px;">
    <div style="max-width:1200px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:50px; margin-bottom:60px;">
        <div>
          <h2 style="font-size:2rem; margin-bottom:20px;">{{ISLETME_ADI}}</h2>
          <p style="opacity:0.6; margin-bottom:24px;">Sağlıklı ve mutlu bir yaşam i\xe7in profesyonel tıbbi hizmetler sunuyoruz.</p>
          <div style="display:flex; gap:16px;">
            <a href="{{INSTAGRAM_URL}}" target="_blank" style="width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">IG</a>
            <a href="{{FACEBOOK_URL}}" target="_blank" style="width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">FB</a>
          </div>
        </div>
        <div>
          <h3 style="font-size:1.2rem; margin-bottom:20px;">İletişim</h3>
          <p style="opacity:0.8; margin-bottom:12px;">📞 <a href="tel:{{TELEFON}}">{{TELEFON_GOSTERIM}}</a></p>
          <p style="opacity:0.8; margin-bottom:12px;">💬 <a href="https://wa.me/{{WHATSAPP}}" target="_blank">WhatsApp Destek</a></p>
          <p style="opacity:0.8; margin-bottom:12px;">📍 {{ADRES_METNI}}</p>
        </div>
        <div>
          <h3 style="font-size:1.2rem; margin-bottom:20px;">Hızlı Linkler</h3>
          <p style="opacity:0.8; margin-bottom:12px;"><a href="#randevu">Randevu Al</a></p>
          <p style="opacity:0.8; margin-bottom:12px;"><a href="#hizmet-grid">Tıbbi Birimler</a></p>
          <p style="opacity:0.8; margin-bottom:12px;"><a href="{{GMB_LINK}}">Haritada Bulun</a></p>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
        <div style="opacity:0.5; font-size:0.9rem;">&copy; ${new Date().getFullYear()} {{ISLETME_ADI}}. T\xfcm hakları saklıdır.</div>
        <div style="opacity:0.3; font-size:0.8rem;">Powered by kepenk.ai</div>
      </div>
    </div>
  </footer>
</body>
</html>`,icon:"🏥",etiketler:["Sağlık","Klinik","Steril"],kategori:"sektor",moduller:["randevu","online-danisma","ekip-uyeleri","sss-genis","acil-buton","canli-destek"]},{id:"sektor-eticaret-standart",ad:"Sepet",aciklama:"Ürün karusel, fiyat etiketleri — butik mağazalar için alışveriş odaklı dijital katalog.",minPaket:"STANDART",htmlKodu:`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SEO_BASLIK}}</title>
  <meta name="description" content="{{SEO_ACIKLAMA}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@400;600;700;900&family={{FONT_METIN}}:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --renk-arkaplan: {{CSS_ARKAPLAN}};
      --renk-kart: {{CSS_KART}};
      --renk-vurgu: {{CSS_VURGU}};
      --renk-hover: {{CSS_HOVER}};
      --renk-metin: {{CSS_METIN}};
      --renk-alt: {{CSS_ALT}};
      --font-baslik: '{{FONT_BASLIK}}', sans-serif;
      --font-metin: '{{FONT_METIN}}', sans-serif;
    }
    body {
      margin: 0;
      font-family: var(--font-metin);
      background-color: var(--renk-arkaplan);
      color: var(--renk-metin);
      line-height: 1.6;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 { font-family: var(--font-baslik); margin: 0; }
    a { color: inherit; text-decoration: none; }
    * { box-sizing: border-box; }
    
    /* E-Commerce Specific Styles */
    .hero-slider {
      background-image: var(--renk-gradient, linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))), url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80');
      background-size: cover;
      background-position: center;
    }
    .product-card {
      background: var(--renk-kart);
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      border: 1px solid rgba(0,0,0,0.05); /* Assuming light theme mostly for E-com */
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.08);
    }
    .btn-cart { background: var(--renk-metin); color: var(--renk-arkaplan); border: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.3s; width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px; }
    .btn-cart:hover { background: var(--renk-vurgu); color: #fff; }
    
    /* Header Announce */
    .top-bar { background: var(--renk-metin); color: var(--renk-arkaplan); font-size: 0.85rem; padding: 10px 20px; text-align: center; font-weight: 600; letter-spacing: 0.05em; }
    
    /* Animations */
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
    .d-1 { animation-delay: 0.1s; }
    .d-2 { animation-delay: 0.2s; }
  </style>
</head>
<body>

  <!-- Top Announcement -->
  <div class="top-bar">🔥 T\xdcM SİPARİŞLERDE \xdcCRETSİZ KARGO | %20 İNDİRİM KODU: HOŞGELDİN20</div>

  <!-- Header -->
  <header style="background:var(--renk-arkaplan); padding:20px; border-bottom:1px solid rgba(0,0,0,0.05); position:sticky; top:0; z-index:100;">
    <div style="max-width:1400px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
      <a href="#" style="font-family:var(--font-baslik); font-size:2rem; font-weight:900; letter-spacing:-1px;">{{ISLETME_ADI}}</a>
      <div style="display:none; md:display:flex; gap:30px; font-weight:600; font-size:1.05rem;">
        <a href="#yeni" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Yeni Gelenler</a>
        <a href="#katalog" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Koleksiyonlar</a>
        <a href="#iletisim" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">İletişim</a>
      </div>
      <div style="display:flex; gap:16px;">
        <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="width:45px; height:45px; border-radius:50%; background:rgba(0,0,0,0.05); display:flex; align-items:center; justify-content:center; transition:background 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'; this.style.color='#fff';" onmouseout="this.style.background='rgba(0,0,0,0.05)'; this.style.color='inherit';">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>
        <div style="width:45px; height:45px; border-radius:50%; background:var(--renk-metin); color:var(--renk-arkaplan); display:flex; align-items:center; justify-content:center; position:relative; cursor:pointer;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span style="position:absolute; top:-5px; right:-5px; background:var(--renk-vurgu); color:#fff; font-size:11px; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">0</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-slider" style="height:85vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:20px; color:#fff;">
    <div style="max-width:800px; z-index:2;">
      <span class="animate-in d-1" style="display:block; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:20px; font-size:1rem; opacity:0.9;">YENİ SEZON KOLEKSİYONU</span>
      <h1 class="animate-in d-2" style="font-size:clamp(3rem, 7vw, 5rem); line-height:1.1; margin-bottom:30px;">{{HERO_BASLIK}}</h1>
      <p class="animate-in d-2" style="font-size:1.3rem; margin-bottom:40px; opacity:0.9;">{{HERO_SLOGAN}}</p>
      <div class="animate-in d-2">
        <a href="#katalog" style="display:inline-block; background:#fff; color:#000; padding:20px 40px; font-family:var(--font-baslik); font-weight:800; font-size:1.1rem; border-radius:4px; text-transform:uppercase; transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='none'">{{HERO_CTA_BIRINCIL}}</a>
      </div>
    </div>
  </section>

  <!-- Featured Categories -->
  <section style="padding:80px 20px; background:var(--renk-arkaplan);">
    <div style="max-width:1400px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px;">
      <div style="position:relative; height:400px; border-radius:16px; overflow:hidden; cursor:pointer;" onmouseover="this.querySelector('img').style.transform='scale(1.1)'" onmouseout="this.querySelector('img').style.transform='none'">
        <img src="https://images.unsplash.com/photo-1434389670869-bac8e22eee08?w=600&q=80" style="width:100%; height:100%; object-fit:cover; transition:transform 0.6s;" alt="Kategori"/>
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.6), transparent); display:flex; align-items:flex-end; padding:30px;">
          <h3 style="color:#fff; font-size:1.8rem;">Giyim</h3>
        </div>
      </div>
      <div style="position:relative; height:400px; border-radius:16px; overflow:hidden; cursor:pointer;" onmouseover="this.querySelector('img').style.transform='scale(1.1)'" onmouseout="this.querySelector('img').style.transform='none'">
        <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80" style="width:100%; height:100%; object-fit:cover; transition:transform 0.6s;" alt="Kategori"/>
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.6), transparent); display:flex; align-items:flex-end; padding:30px;">
          <h3 style="color:#fff; font-size:1.8rem;">Ayakkabı</h3>
        </div>
      </div>
      <div style="position:relative; height:400px; border-radius:16px; overflow:hidden; cursor:pointer;" onmouseover="this.querySelector('img').style.transform='scale(1.1)'" onmouseout="this.querySelector('img').style.transform='none'">
        <img src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80" style="width:100%; height:100%; object-fit:cover; transition:transform 0.6s;" alt="Kategori"/>
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.6), transparent); display:flex; align-items:flex-end; padding:30px;">
          <h3 style="color:#fff; font-size:1.8rem;">Aksesuar</h3>
        </div>
      </div>
    </div>
  </section>

  <!-- Mod\xfcl: Katalog (Products) -->
  {{MODUL_KATALOG}}

  <!-- Trust Indicators -->
  <section style="padding:60px 20px; border-top:1px solid rgba(0,0,0,0.05); border-bottom:1px solid rgba(0,0,0,0.05); background:var(--renk-kart);">
    <div style="max-width:1400px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:40px; text-align:center;">
      <div>
        <div style="font-size:2rem; margin-bottom:16px;">🚚</div>
        <h4 style="font-size:1.1rem; margin-bottom:8px;">Hızlı Kargo</h4>
        <p style="color:var(--renk-alt); font-size:0.9rem;">T\xfcm siparişlerde \xfccretsiz ve hızlı teslimat.</p>
      </div>
      <div>
        <div style="font-size:2rem; margin-bottom:16px;">💳</div>
        <h4 style="font-size:1.1rem; margin-bottom:8px;">G\xfcvenli \xd6deme</h4>
        <p style="color:var(--renk-alt); font-size:0.9rem;">256-bit SSL sertifikası ile %100 g\xfcvenli alışveriş.</p>
      </div>
      <div>
        <div style="font-size:2rem; margin-bottom:16px;">↩️</div>
        <h4 style="font-size:1.1rem; margin-bottom:8px;">Kolay İade</h4>
        <p style="color:var(--renk-alt); font-size:0.9rem;">14 g\xfcn i\xe7inde koşulsuz şartsız iade garantisi.</p>
      </div>
      <div>
        <div style="font-size:2rem; margin-bottom:16px;">📞</div>
        <h4 style="font-size:1.1rem; margin-bottom:8px;">7/24 Destek</h4>
        <p style="color:var(--renk-alt); font-size:0.9rem;">M\xfcşteri hizmetlerimiz her zaman yanınızda.</p>
      </div>
    </div>
  </section>

  <!-- CTA / Geleneksel Mod\xfcller -->
  {{MODUL_SIPARIS_LINKI}}
  {{MODUL_SSS_GENIS}}

  <!-- Footer -->
  <footer style="background:var(--renk-metin); color:var(--renk-arkaplan); padding:80px 20px 40px; margin-top:0;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:60px; margin-bottom:60px;">
        <div>
          <h2 style="font-family:var(--font-baslik); font-size:2rem; font-weight:900; margin-bottom:24px;">{{ISLETME_ADI}}</h2>
          <p style="opacity:0.7; font-size:0.95rem; line-height:1.8; margin-bottom:24px;">En yeni trendler ve en kaliteli \xfcr\xfcnler ile tarzınızı yansıtın.</p>
          <div style="display:flex; gap:16px;">
            <!-- Social Icons would go here -->
            <a href="{{INSTAGRAM_URL}}" target="_blank" style="opacity:0.7; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">Instagram</a>
            <a href="{{FACEBOOK_URL}}" target="_blank" style="opacity:0.7; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">Facebook</a>
          </div>
        </div>
        <div>
          <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:24px; text-transform:uppercase; letter-spacing:0.05em;">Bağlantılar</h3>
          <ul style="list-style:none; padding:0; margin:0; opacity:0.7; line-height:2.5; font-size:0.95rem;">
            <li><a href="#katalog">Koleksiyon</a></li>
            <li><a href="#sss">Sık\xe7a Sorulan Sorular</a></li>
            <li><a href="#">Kargo ve İade</a></li>
            <li><a href="#">Gizlilik Politikası</a></li>
          </ul>
        </div>
        <div>
          <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:24px; text-transform:uppercase; letter-spacing:0.05em;">İletişim</h3>
          <ul style="list-style:none; padding:0; margin:0; opacity:0.7; line-height:2.5; font-size:0.95rem;">
            <li>📍 {{ADRES_METNI}}</li>
            <li>📞 {{TELEFON_GOSTERIM}}</li>
            <li>✉️ info@{{ISLETME_KISAADI}}.com</li>
            <li style="margin-top:10px;"><a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="display:inline-block; border-bottom:1px solid currentColor;">WhatsApp Destek</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; opacity:0.5; font-size:0.9rem;">
        <div>&copy; ${new Date().getFullYear()} {{ISLETME_ADI}}. T\xfcm Hakları Saklıdır.</div>
        <div>Powered by kepenk.ai</div>
      </div>
    </div>
  </footer>
</body>
</html>`,icon:"🛒",etiketler:["E-Ticaret","Katalog","Alışveriş"],kategori:"sektor",moduller:["katalog","siparis-linki","sss-genis"]},{id:"sektor-otomotiv-buyume",ad:"Pist",aciklama:"Karbon fiber doku, kırmızı hız çizgileri — galeri ve rent a car için metalik showroom.",minPaket:"BUYUME",htmlKodu:`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SEO_BASLIK}}</title>
  <meta name="description" content="{{SEO_ACIKLAMA}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@500;700;900&family={{FONT_METIN}}:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --renk-arkaplan: {{CSS_ARKAPLAN}};
      --renk-kart: {{CSS_KART}};
      --renk-vurgu: {{CSS_VURGU}};
      --renk-hover: {{CSS_HOVER}};
      --renk-metin: {{CSS_METIN}};
      --renk-alt: {{CSS_ALT}};
      --font-baslik: '{{FONT_BASLIK}}', sans-serif;
      --font-metin: '{{FONT_METIN}}', sans-serif;
    }
    body {
      margin: 0;
      font-family: var(--font-metin);
      background-color: var(--renk-arkaplan);
      color: var(--renk-metin);
      line-height: 1.6;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 { font-family: var(--font-baslik); margin: 0; }
    a { color: inherit; text-decoration: none; }
    * { box-sizing: border-box; }
    
    /* Automotive Specific Styles */
    .hero-bg {
      background-image: linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&q=80');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
    .neon-border {
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }
    .btn-primary { 
      background: var(--renk-vurgu); 
      color: #fff; 
      border: none; 
      padding: 16px 32px; 
      border-radius: 4px; 
      font-weight: 700; 
      font-size: 1.1rem; 
      cursor: pointer; 
      transition: all 0.3s; 
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .btn-primary:hover { 
      background: var(--renk-hover); 
      box-shadow: 0 0 20px rgba(var(--renk-vurgu-rgb, 200,50,0), 0.5);
    }
    .car-card {
      background: var(--renk-kart);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.05);
      transition: transform 0.3s;
    }
    .car-card:hover {
      transform: translateY(-10px);
      border-color: var(--renk-vurgu);
    }
    
    /* Specs table */
    .specs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.85rem; padding: 15px 20px; border-top: 1px solid rgba(255,255,255,0.05); }
    .spec-item { display: flex; align-items: center; gap: 6px; color: var(--renk-alt); }
    
    /* Animations */
    @keyframes slideRight { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
    .animate-right { animation: slideRight 0.8s ease-out forwards; opacity: 0; }
    .d-1 { animation-delay: 0.1s; }
    .d-2 { animation-delay: 0.3s; }
    .d-3 { animation-delay: 0.5s; }
  </style>
</head>
<body style="background:#0a0a0a;">

  <!-- Minimal Header -->
  <header style="position:absolute; top:0; width:100%; z-index:100; padding:30px 20px; background:linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);">
    <div style="max-width:1400px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
      <a href="#" style="font-family:var(--font-baslik); font-size:2rem; font-weight:900; color:#fff; letter-spacing:1px; text-transform:uppercase;">
        {{ISLETME_ADI}} <span style="color:var(--renk-vurgu);">.</span>
      </a>
      <div style="display:none; md:display:flex; gap:40px; color:#fff; font-weight:600; font-size:0.95rem; text-transform:uppercase; letter-spacing:1px;">
        <a href="#filo" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Filomuz</a>
        <a href="#hizmetler" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Hizmetler</a>
        <a href="#iletisim" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">İletişim</a>
      </div>
      <a href="tel:{{TELEFON}}" style="display:flex; align-items:center; gap:10px; color:#fff; font-weight:700;">
        <div style="width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center;">📞</div>
        <span style="display:none; sm:display:inline;">{{TELEFON_GOSTERIM}}</span>
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-bg" style="min-height:100vh; display:flex; align-items:center; padding:120px 20px 0; color:#fff;">
    <div style="max-width:1400px; margin:0 auto; width:100%;">
      <div style="max-width:700px;">
        <h1 class="animate-right d-1" style="font-size:clamp(3.5rem, 8vw, 6rem); line-height:1; margin-bottom:20px; text-transform:uppercase; letter-spacing:-2px;">{{HERO_BASLIK}}</h1>
        <p class="animate-right d-2" style="font-size:1.4rem; color:rgba(255,255,255,0.7); margin-bottom:40px; max-width:500px; font-weight:300;">{{HERO_SLOGAN}}</p>
        <div class="animate-right d-3" style="display:flex; gap:20px; flex-wrap:wrap;">
          <a href="#filo" class="btn-primary">{{HERO_CTA_BIRINCIL}}</a>
          <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="btn-primary" style="background:transparent; border:1px solid #fff; box-shadow:none;">WhatsApp</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Ara\xe7 Sorgulama Mod\xfcl\xfc -->
  <div style="transform:translateY(-50%); position:relative; z-index:10;">
    {{MODUL_ARAC_SORGULAMA}}
  </div>

  <!-- Hizmetlerimiz -->
  <section id="hizmetler" style="padding:100px 20px 60px; background:#0a0a0a; color:#fff;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:60px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:30px;">
        <div>
          <span style="color:var(--renk-vurgu); font-weight:700; letter-spacing:2px; text-transform:uppercase; font-size:0.85rem;">PREMIUM HİZMETLER</span>
          <h2 style="font-size:3rem; margin-top:10px; text-transform:uppercase;">Size \xd6zel \xc7\xf6z\xfcmler</h2>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;" id="hizmet-grid">
        {{HIZMETLER_HTML}}
      </div>
      <script>
        document.querySelectorAll('#hizmet-grid > div').forEach(function(el){
          el.className = 'neon-border';
          el.style.background = '#111';
          el.style.padding = '40px';
          el.style.borderRadius = '8px';
          var h3 = el.querySelector('h3');
          if(h3) { h3.style.fontSize = '1.5rem'; h3.style.marginBottom = '15px'; h3.style.textTransform = 'uppercase'; }
          var p = el.querySelector('p');
          if(p) { p.style.color = 'var(--renk-alt)'; }
        });
      </script>
    </div>
  </section>

  <!-- Mod\xfcl: Katalog (Ara\xe7lar / Filo) -->
  <div id="filo">
    {{MODUL_KATALOG}}
  </div>

  <!-- Neden Biz (Dark Version) -->
  <section style="padding:100px 20px; background:#111; color:#fff;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:80px;">
        <h2 style="font-size:3rem; text-transform:uppercase; letter-spacing:1px;">Neden {{ISLETME_KISAADI}}</h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:40px;" id="neden-grid">
        {{NEDEN_BIZ_HTML}}
      </div>
      <script>
        document.querySelectorAll('#neden-grid > div').forEach(function(el, i){
          var num = (i+1).toString().padStart(2, '0');
          el.innerHTML = '<div style="font-family:var(--font-baslik); font-size:4rem; font-weight:900; color:rgba(255,255,255,0.05); line-height:1; margin-bottom:-20px;">' + num + '</div>' + el.innerHTML;
          var h3 = el.querySelector('h3');
          var p = el.querySelector('p');
          if(h3) { h3.style.fontSize='1.4rem'; h3.style.marginBottom='10px'; h3.style.position='relative'; h3.style.zIndex='2'; }
          if(p) { p.style.color='var(--renk-alt)'; p.style.position='relative'; p.style.zIndex='2'; }
        });
      </script>
    </div>
  </section>

  <!-- İletişim / Rezervasyon Paneli -->
  {{MODUL_ONLINE_REZERVASYON}}
  {{MODUL_YOL_TARIFI}}

  <!-- Fotoğraf / Video Galeri -->
  {{MODUL_GALERI}}

  <!-- Yorumlar -->
  <section style="padding:100px 20px; background:#0a0a0a; color:#fff;">
    <div style="max-width:1400px; margin:0 auto;">
      <h2 style="font-size:3rem; text-transform:uppercase; margin-bottom:50px; text-align:center;">M\xfcşteri Deneyimleri</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;" id="yorum-grid">
        {{YORUMLAR_HTML}}
      </div>
      <script>
        document.querySelectorAll('#yorum-grid > div').forEach(function(el){
          el.style.background = '#161616';
          el.style.padding = '40px';
          el.style.borderRadius = '8px';
          el.style.borderLeft = '4px solid var(--renk-vurgu)';
          var p = el.querySelector('p');
          if(p) { p.style.fontSize = '1.1rem'; p.style.fontStyle = 'italic'; p.style.marginBottom = '20px'; p.style.color='rgba(255,255,255,0.8)'; }
          var sp = el.querySelector('span');
          if(sp){ sp.style.fontWeight = '700'; sp.style.textTransform = 'uppercase'; sp.style.letterSpacing = '1px'; sp.style.fontSize = '0.9rem'; }
        });
      </script>
    </div>
  </section>

  {{MODUL_WHATSAPP_SABIT}}

  <!-- Footer -->
  <footer id="iletisim" style="background:#000; color:#fff; padding:100px 20px 40px; border-top:1px solid rgba(255,255,255,0.05);">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:60px; margin-bottom:80px;">
        <div>
          <h2 style="font-family:var(--font-baslik); font-size:2.5rem; font-weight:900; margin-bottom:20px; letter-spacing:1px; text-transform:uppercase;">{{ISLETME_ADI}}<span style="color:var(--renk-vurgu);">.</span></h2>
          <p style="color:var(--renk-alt); font-size:1rem; line-height:1.8; margin-bottom:30px;">Premium ara\xe7 kiralama ve otomotiv \xe7\xf6z\xfcmleri.</p>
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:30px; text-transform:uppercase; letter-spacing:1px; color:#fff;">İletişim Bilgileri</h3>
          <ul style="list-style:none; padding:0; margin:0; color:var(--renk-alt); line-height:2.5;">
            <li><strong style="color:#fff;">A:</strong> {{ADRES_METNI}}</li>
            <li><strong style="color:#fff;">T:</strong> <a href="tel:{{TELEFON}}">{{TELEFON_GOSTERIM}}</a></li>
            <li><strong style="color:#fff;">W:</strong> <a href="https://wa.me/{{WHATSAPP}}" target="_blank">WhatsApp'tan Ulaşın</a></li>
          </ul>
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:30px; text-transform:uppercase; letter-spacing:1px; color:#fff;">\xc7alışma Saatleri</h3>
          <ul style="list-style:none; padding:0; margin:0; color:var(--renk-alt); line-height:2.5;" id="saat-listesi">
            <!-- Populated by JS -->
          </ul>
          <script>
            var saatler = {{SAATLER_JSON}};
            var ul = document.getElementById('saat-listesi');
            if(saatler && saatler.length > 0) {
              saatler.forEach(function(s) {
                ul.innerHTML += '<li style="display:flex; justify-content:space-between;"><span style="color:#fff;">' + s.gun + '</span> <span>' + s.saat + '</span></li>';
              });
            } else {
              ul.innerHTML = '<li>7/24 Hizmetinizdeyiz</li>';
            }
          </script>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; font-size:0.85rem; color:var(--renk-alt);">
        <div>&copy; ${new Date().getFullYear()} {{ISLETME_ADI}}. T\xfcm Hakları Saklıdır.</div>
        <div style="display:flex; gap:20px;">
          <a href="{{INSTAGRAM_URL}}" target="_blank" style="transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Instagram</a>
          <a href="{{FACEBOOK_URL}}" target="_blank" style="transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Facebook</a>
        </div>
        <div>Altyapı: <a href="https://kepenk.ai" target="_blank" style="color:#fff;">kepenk.ai</a></div>
      </div>
    </div>
  </footer>
</body>
</html>`,icon:"🏎️",etiketler:["Otomotiv","Karbon","Hız"],kategori:"sektor",moduller:["galeri","katalog","online-rezervasyon","arac-sorgulama"]},{id:"sektor-ajans-premium",ad:"Prizma",aciklama:"Neon gradient mesh, asimetrik layout — kreatif ajans ve yazılım firmaları için göz alıcı vitrin.",minPaket:"PREMIUM",htmlKodu:`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SEO_BASLIK}}</title>
  <meta name="description" content="{{SEO_ACIKLAMA}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@500;700;800;900&family={{FONT_METIN}}:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --renk-arkaplan: {{CSS_ARKAPLAN}};
      --renk-kart: {{CSS_KART}};
      --renk-vurgu: {{CSS_VURGU}};
      --renk-hover: {{CSS_HOVER}};
      --renk-metin: {{CSS_METIN}};
      --renk-alt: {{CSS_ALT}};
      --font-baslik: '{{FONT_BASLIK}}', sans-serif;
      --font-metin: '{{FONT_METIN}}', sans-serif;
      --blob-color-1: rgba(var(--renk-vurgu-rgb, 100,50,250), 0.4);
      --blob-color-2: rgba(var(--renk-hover-rgb, 50,150,250), 0.4);
    }
    body {
      margin: 0;
      font-family: var(--font-metin);
      background-color: var(--renk-arkaplan);
      color: var(--renk-metin);
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4, .text-gradient { font-family: var(--font-baslik); margin: 0; }
    a { color: inherit; text-decoration: none; }
    * { box-sizing: border-box; }
    
    /* Creative Agency Specific Styles */
    .bg-mesh {
      background-color: var(--renk-arkaplan);
      background-image: 
        radial-gradient(at 40% 20%, var(--blob-color-1) 0px, transparent 50%),
        radial-gradient(at 80% 0%, var(--blob-color-2) 0px, transparent 50%),
        radial-gradient(at 0% 50%, var(--blob-color-2) 0px, transparent 50%),
        radial-gradient(at 80% 100%, var(--blob-color-1) 0px, transparent 50%);
    }
    .text-gradient {
      background: linear-gradient(135deg, var(--renk-vurgu) 0%, #a88bec 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .glass-nav {
      background: rgba(var(--renk-arkaplan-rgb, 10,10,10), 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .glass-card {
      background: rgba(255,255,255,0.02);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 24px;
      transition: all 0.4s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .glass-card:hover {
      transform: translateY(-8px);
      background: rgba(255,255,255,0.04);
      border-color: rgba(255,255,255,0.1);
      box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 0 20px rgba(var(--renk-vurgu-rgb, 100,50,250), 0.2);
    }
    
    .btn-gradient {
      background: linear-gradient(135deg, var(--renk-vurgu) 0%, var(--renk-hover) 100%);
      color: #fff;
      border: none;
      padding: 16px 36px;
      border-radius: 100px;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 10px 20px rgba(var(--renk-vurgu-rgb, 100,50,250), 0.3);
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .btn-gradient::after {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
      opacity: 0; transition: opacity 0.3s;
    }
    .btn-gradient:hover::after { opacity: 1; }
    .btn-gradient:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 30px rgba(var(--renk-vurgu-rgb, 100,50,250), 0.4);
    }
    
    .btn-outline {
      background: transparent;
      color: var(--renk-metin);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 15px 35px;
      border-radius: 100px;
      font-weight: 600;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-outline:hover {
      border-color: var(--renk-metin);
      background: rgba(255,255,255,0.05);
    }

    /* Marquee */
    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      background: rgba(255,255,255,0.02);
      padding: 20px 0;
      border-top: 1px solid rgba(255,255,255,0.05);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .marquee-content {
      display: inline-block;
      animation: marquee 30s linear infinite;
    }
    .marquee-item {
      display: inline-block;
      font-family: var(--font-baslik);
      font-size: 2rem;
      font-weight: 900;
      margin: 0 40px;
      color: rgba(255,255,255,0.2);
      text-transform: uppercase;
      letter-spacing: 2px;
      -webkit-text-stroke: 1px rgba(255,255,255,0.3);
      color: transparent;
      transition: all 0.3s;
    }
    .marquee-container:hover .marquee-item { -webkit-text-stroke: 1px rgba(255,255,255,0.6); }
    .marquee-container:hover .marquee-content { animation-play-state: paused; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    /* Animations */
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    .d-1 { animation-delay: 0.1s; }
    .d-2 { animation-delay: 0.3s; }
    .d-3 { animation-delay: 0.5s; }
  </style>
</head>
<body class="bg-mesh">

  <!-- Floating Nav -->
  <header class="glass-nav" style="position:fixed; top:0; width:100%; z-index:100; padding:15px 20px; transition:all 0.4s;">
    <div style="max-width:1400px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
      <a href="#" style="font-family:var(--font-baslik); font-size:1.8rem; font-weight:900; letter-spacing:-1px;">
        {{ISLETME_ADI}}<span style="color:var(--renk-vurgu);">.</span>
      </a>
      <div style="display:none; md:display:flex; background:rgba(255,255,255,0.05); padding:8px 24px; border-radius:100px; gap:30px; font-weight:500; font-size:0.95rem; border:1px solid rgba(255,255,255,0.05);">
        <a href="#uzmanlik" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Uzmanlık</a>
        <a href="#isler" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">İşler</a>
        <a href="#hizmetler" style="transition:color 0.2s;" onmouseover="this.style.color='var(--renk-vurgu)'" onmouseout="this.style.color='inherit'">Hizmetler</a>
      </div>
      <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="btn-gradient" style="padding:10px 24px; font-size:0.95rem;">
        Projeyi Konuşalım
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section style="min-height:100vh; display:flex; align-items:center; justify-content:center; padding:120px 20px 80px; text-align:center; position:relative; overflow:hidden;">
    <div style="max-width:1000px; z-index:2; position:relative;">
      <div class="animate-in d-1" style="display:inline-block; padding:8px 20px; border-radius:100px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.02); font-size:0.9rem; font-weight:600; margin-bottom:30px; box-shadow:0 4px 20px rgba(0,0,0,0.2);">
        <span style="color:var(--renk-vurgu);">✨ Geleceğin</span> Dijital Deneyimleri
      </div>
      <h1 class="animate-in d-2" style="font-size:clamp(3.5rem, 8vw, 6.5rem); line-height:1.05; margin-bottom:30px; letter-spacing:-2px;">
        <span class="text-gradient">{{HERO_BASLIK}}</span>
      </h1>
      <p class="animate-in d-3" style="font-size:1.4rem; color:var(--renk-alt); margin:0 auto 50px; max-width:700px; line-height:1.7; font-weight:300;">{{HERO_SLOGAN}}</p>
      
      <div class="animate-in d-3" style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
        <a href="#isler" class="btn-gradient">
          {{HERO_CTA_BIRINCIL}}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
        <a href="tel:{{TELEFON}}" class="btn-outline">Sizi Arayalım</a>
      </div>
      
      <!-- Agency Stats Mini -->
      <div class="animate-in d-3" style="margin-top:80px; display:flex; justify-content:center; gap:60px; border-top:1px solid rgba(255,255,255,0.05); padding-top:40px;">
        <div style="text-align:left;">
          <div style="font-family:var(--font-baslik); font-size:2.5rem; font-weight:900; line-height:1;">100+</div>
          <div style="color:var(--renk-alt); font-size:0.9rem;">Tamamlanan Proje</div>
        </div>
        <div style="text-align:left;">
          <div style="font-family:var(--font-baslik); font-size:2.5rem; font-weight:900; line-height:1;">98%</div>
          <div style="color:var(--renk-alt); font-size:0.9rem;">M\xfcşteri Memnuniyeti</div>
        </div>
        <div style="text-align:left; display:none; sm:display:block;">
          <div style="font-family:var(--font-baslik); font-size:2.5rem; font-weight:900; line-height:1;">10+</div>
          <div style="color:var(--renk-alt); font-size:0.9rem;">\xd6d\xfcll\xfc Tasarım</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Marquee -->
  <div class="marquee-container">
    <div class="marquee-content" id="marquee-text">
      <!-- Populated by JS -->
    </div>
    <script>
      var words = ["Kreatif Tasarım", "Web Geliştirme", "UI/UX Optimizasyonu", "Marka Kimliği", "Dijital Pazarlama", "SEO"];
      var html = '';
      for(var i=0; i<3; i++) {
        words.forEach(function(w){ html += '<span class="marquee-item">' + w + '</span> * '; });
      }
      document.getElementById('marquee-text').innerHTML = html;
    </script>
  </div>

  <!-- Hizmetlerimiz (Services / Capabilities) -->
  <section id="uzmanlik" style="padding:120px 20px; position:relative; z-index:2;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="margin-bottom:80px; max-width:600px;">
        <span style="color:var(--renk-vurgu); font-weight:700; text-transform:uppercase; letter-spacing:2px; font-size:0.85rem; display:block; margin-bottom:15px;">UZMANLIK ALANLARIMIZ</span>
        <h2 style="font-size:clamp(2.5rem, 5vw, 4rem); line-height:1.1;">Biz Neler Yapıyoruz?</h2>
      </div>
      
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:30px;" id="hizmet-grid">
        {{HIZMETLER_HTML}}
      </div>
      <script>
        document.querySelectorAll('#hizmet-grid > div').forEach(function(el, i){
          el.className = 'glass-card';
          el.style.padding = '50px 40px';
          var h3 = el.querySelector('h3');
          if(h3) { h3.style.fontSize = '1.8rem'; h3.style.marginBottom = '20px'; }
          var p = el.querySelector('p');
          if(p) { p.style.color = 'var(--renk-alt)'; p.style.fontSize = '1.1rem'; p.style.lineHeight='1.8'; }
          
          var num = document.createElement('div');
          num.innerHTML = '0' + (i+1);
          num.style.fontFamily = 'var(--font-baslik)';
          num.style.fontSize = '3rem';
          num.style.fontWeight = '900';
          num.style.color = 'rgba(255,255,255,0.05)';
          num.style.position = 'absolute';
          num.style.top = '20px';
          num.style.right = '30px';
          el.style.position = 'relative';
          el.appendChild(num);
        });
      </script>
    </div>
  </section>

  <!-- Mod\xfcl: Proje Portf\xf6y\xfc -->
  <div id="isler">
    {{MODUL_PROJE_PORTFOY}}
  </div>

  <!-- Mod\xfcl: Fiyat Listesi / Paketler -->
  <div id="hizmetler">
    {{MODUL_UYELIK_PAKETLERI}}
  </div>

  <!-- Neden Biz -->
  <section style="padding:120px 20px; position:relative; z-index:2;">
    <div style="max-width:1400px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;">
      <div>
        <h2 style="font-size:clamp(2.5rem, 4vw, 3.5rem); margin-bottom:30px; line-height:1.1;">Dijital d\xfcnyada <span class="text-gradient">fark yaratmaya</span> hazır mısınız?</h2>
        <p style="color:var(--renk-alt); font-size:1.2rem; margin-bottom:40px;">Sıradan olanı reddediyoruz. Markanızın potansiyelini en \xfcst d\xfczeye \xe7ıkarmak i\xe7in tasarım ve teknolojiyi kusursuz bir şekilde birleştiriyoruz.</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;" id="neden-grid">
          {{NEDEN_BIZ_HTML}}
        </div>
      </div>
      <div style="position:relative;">
        <div style="width:100%; aspect-ratio:4/5; border-radius:30px; overflow:hidden; position:relative; z-index:2;">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Agency Team">
        </div>
        <!-- Decorative blob behind image -->
        <div style="position:absolute; top:-10%; right:-10%; width:80%; height:80%; background:var(--renk-vurgu); filter:blur(100px); opacity:0.3; z-index:1; border-radius:50%;"></div>
      </div>
    </div>
    <script>
      document.querySelectorAll('#neden-grid > div').forEach(function(el){
        var h3 = el.querySelector('h3');
        var p = el.querySelector('p');
        if(h3) { h3.style.fontSize='1.2rem'; h3.style.marginBottom='10px'; }
        if(p) { p.style.color='var(--renk-alt)'; p.style.fontSize='0.95rem'; }
      });
    </script>
    <style> @media(max-width:900px){ section > div { grid-template-columns: 1fr!important; gap:40px; } } </style>
  </section>

  <!-- Mod\xfcl: Teklif / İletişim Formu -->
  {{MODUL_TEKLIF_FORMU}}

  <!-- Footer -->
  <footer style="padding:100px 20px 40px; border-top:1px solid rgba(255,255,255,0.05); position:relative; z-index:2;">
    <div style="max-width:1400px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:60px; margin-bottom:100px;">
        <div>
          <h2 style="font-family:var(--font-baslik); font-size:3rem; font-weight:900; margin-bottom:30px; letter-spacing:-1px;">{{ISLETME_ADI}}<span style="color:var(--renk-vurgu);">.</span></h2>
          <p style="color:var(--renk-alt); font-size:1.1rem; max-width:400px; margin-bottom:40px;">Yenilik\xe7i dijital \xe7\xf6z\xfcmler \xfcreten yeni nesil kreatif kreatif ajans.</p>
          <div style="display:flex; gap:20px;">
            <a href="{{INSTAGRAM_URL}}" target="_blank" style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'; this.style.borderColor='transparent';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.1)';">IG</a>
            <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'; this.style.borderColor='transparent';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.1)';">WA</a>
            <a href="{{FACEBOOK_URL}}" target="_blank" style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='var(--renk-vurgu)'; this.style.borderColor='transparent';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.1)';">FB</a>
          </div>
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:30px; color:#fff;">Ajans</h3>
          <ul style="list-style:none; padding:0; margin:0; line-height:2.5;">
            <li><a href="#uzmanlik" style="color:var(--renk-alt); transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Hizmetlerimiz</a></li>
            <li><a href="#isler" style="color:var(--renk-alt); transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Portf\xf6y\xfcm\xfcz</a></li>
            <li><a href="#" style="color:var(--renk-alt); transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">Hakkımızda</a></li>
            <li><a href="#" style="color:var(--renk-alt); transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">İletişim</a></li>
          </ul>
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:30px; color:#fff;">İletişim</h3>
          <ul style="list-style:none; padding:0; margin:0; line-height:2.5; color:var(--renk-alt);">
            <li>{{ADRES_METNI}}</li>
            <li><a href="tel:{{TELEFON}}" style="transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--renk-alt)'">{{TELEFON_GOSTERIM}}</a></li>
            <li>info@{{ISLETME_KISAADI}}.com</li>
          </ul>
        </div>
      </div>
      
      <div style="font-family:var(--font-baslik); font-size:clamp(4rem, 15vw, 12rem); font-weight:900; line-height:0.8; opacity:0.03; text-align:center; overflow:hidden; white-space:nowrap; margin-bottom:40px; pointer-events:none;">
        {{ISLETME_ADI}}
      </div>
      
      <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:30px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; font-size:0.9rem; color:var(--renk-alt);">
        <div>&copy; ${new Date().getFullYear()} {{ISLETME_ADI}}. T\xfcm Hakları Saklıdır.</div>
        <div>Powered by <a href="https://kepenk.ai" target="_blank" style="color:#fff; font-weight:600;">kepenk.ai</a></div>
      </div>
    </div>
    <style> @media(max-width:900px){ footer > div > div:first-child { grid-template-columns: 1fr; gap:40px; } } </style>
  </footer>
</body>
</html>`,icon:"💡",etiketler:["Ajans","Neon","Asimetrik"],kategori:"sektor",moduller:["proje-portfoy","uyelik-paketleri","teklif-formu"]},{id:"sektor-otel-premium",ad:"Safir",aciklama:"Altın/lacivert, otel lobby hissi — konaklama tesisleri için lüks oda kartları ve rezervasyon.",minPaket:"PREMIUM",htmlKodu:`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{{SEO_ACIKLAMA}}">
<title>{{SEO_BASLIK}}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --renk-arkaplan: #0c0c0c;
  --renk-kart: #161616;
  --renk-vurgu: #b8860b;
  --renk-hover: #9a7209;
  --renk-metin: #f5f0e8;
  --renk-alt: #8a8070;
  --font-baslik: 'Cormorant Garamond', serif;
  --font-metin: 'Inter', sans-serif;
  --nav-height: 70px;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:var(--font-metin); background:var(--renk-arkaplan); color:var(--renk-metin); }
nav { position:fixed; top:0; left:0; right:0; height:var(--nav-height); background:rgba(12,12,12,0.85); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.06); z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 5%; }
nav .logo { font-family:var(--font-baslik); font-size:1.6rem; font-weight:700; color:var(--renk-vurgu); letter-spacing:1px; }
nav .links { display:flex; gap:24px; }
nav .links a { color:var(--renk-alt); text-decoration:none; font-size:0.85rem; font-weight:500; transition:color 0.3s; }
nav .links a:hover { color:var(--renk-vurgu); }
.hero { height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; position:relative; overflow:hidden; }
.hero::before { content:''; position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80') center/cover; }
.hero::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom, rgba(12,12,12,0.4) 0%, rgba(12,12,12,0.7) 70%, var(--renk-arkaplan) 100%); }
.hero-content { position:relative; z-index:2; max-width:700px; padding:0 20px; }
.hero h1 { font-family:var(--font-baslik); font-size:clamp(2.8rem,6vw,4.5rem); font-weight:700; line-height:1.15; margin-bottom:20px; color:#fff; }
.hero p { font-size:1.1rem; color:rgba(255,255,255,0.8); line-height:1.7; margin-bottom:32px; }
.btn-gold { display:inline-flex; align-items:center; gap:8px; background:var(--renk-vurgu); color:#fff; padding:14px 36px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.95rem; transition:all 0.3s; border:none; cursor:pointer; }
.btn-gold:hover { background:var(--renk-hover); transform:translateY(-2px); }
.btn-outline { display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(255,255,255,0.2); color:#fff; padding:14px 36px; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.95rem; transition:all 0.3s; }
.btn-outline:hover { border-color:var(--renk-vurgu); color:var(--renk-vurgu); }
section { padding:100px 20px; }
.container { max-width:1100px; margin:0 auto; }
.sec-title { font-family:var(--font-baslik); font-size:clamp(2rem,4vw,3rem); text-align:center; margin-bottom:16px; }
.sec-sub { color:var(--renk-alt); text-align:center; font-size:1rem; max-width:550px; margin:0 auto 50px; line-height:1.7; }
.room-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:24px; }
.room-card { background:var(--renk-kart); border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.04); transition:all 0.4s; }
.room-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(184,134,11,0.15); }
.room-card img { width:100%; height:220px; object-fit:cover; }
.room-card .info { padding:24px; }
.room-card h3 { font-family:var(--font-baslik); font-size:1.4rem; margin-bottom:8px; }
.room-card .price { color:var(--renk-vurgu); font-size:1.3rem; font-weight:800; margin-bottom:12px; }
.room-card .price small { color:var(--renk-alt); font-size:0.75rem; font-weight:400; }
.room-card .features { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
.room-card .feat { font-size:0.75rem; color:var(--renk-alt); background:rgba(255,255,255,0.04); padding:4px 10px; border-radius:6px; }
.amenities { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:24px; }
.amenity { text-align:center; padding:32px 20px; background:var(--renk-kart); border-radius:16px; border:1px solid rgba(255,255,255,0.04); }
.amenity .icon { font-size:2.5rem; margin-bottom:14px; }
.amenity h4 { font-family:var(--font-baslik); font-size:1.15rem; margin-bottom:6px; }
.amenity p { color:var(--renk-alt); font-size:0.8rem; line-height:1.6; }
.cta-section { background:linear-gradient(135deg, rgba(184,134,11,0.15), rgba(184,134,11,0.05)); border-radius:32px; padding:60px 40px; text-align:center; border:1px solid rgba(184,134,11,0.2); }
footer { padding:60px 20px 30px; border-top:1px solid rgba(255,255,255,0.06); text-align:center; }
footer p { color:var(--renk-alt); font-size:0.8rem; }
@media (max-width:768px) { nav .links { display:none; } .room-grid { grid-template-columns:1fr; } }
</style>
</head>
<body>

<nav>
  <div class="logo">🏨 {{ISLETME_ADI}}</div>
  <div class="links">
    <a href="#odalar">Odalar</a>
    <a href="#olanaklar">Olanaklar</a>
    <a href="#galeri">Galeri</a>
    <a href="#iletisim">İletişim</a>
  </div>
</nav>

{{MODUL_DUYURU_BANDI}}

<section class="hero">
  <div class="hero-content">
    <p style="color:var(--renk-vurgu);font-weight:600;font-size:0.9rem;letter-spacing:3px;margin-bottom:16px">✦ LUXURY EXPERIENCE</p>
    <h1>{{HERO_BASLIK}}</h1>
    <p>{{HERO_SLOGAN}}</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="btn-gold">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}" class="btn-outline" target="_blank">💬 {{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<section id="odalar">
  <div class="container">
    <h2 class="sec-title">Odalarımız & S\xfcitler</h2>
    <p class="sec-sub">Her detayı titizlikle tasarlanmış odalarımızda l\xfcks tatil deneyimini yaşayın.</p>
    <div class="room-grid">
      <div class="room-card">
        <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" alt="Standart Oda">
        <div class="info">
          <h3>Deluxe Oda</h3>
          <div class="price">₺2.400 <small>/ gece</small></div>
          <div class="features"><span class="feat">🛏️ \xc7ift Kişilik</span><span class="feat">🌊 Deniz Manzarası</span><span class="feat">28m\xb2</span></div>
          <a href="https://wa.me/{{WHATSAPP}}?text=Deluxe%20oda%20rezervasyon" class="btn-gold" style="width:100%;justify-content:center;padding:12px" target="_blank">Rezervasyon Yap</a>
        </div>
      </div>
      <div class="room-card">
        <img src="https://images.unsplash.com/photo-1590490360182-c33d955bc29b?w=600&q=80" alt="S\xfcit">
        <div class="info">
          <h3>Junior S\xfcit</h3>
          <div class="price">₺3.800 <small>/ gece</small></div>
          <div class="features"><span class="feat">🛏️ King Size</span><span class="feat">🏔️ Panoramik</span><span class="feat">45m\xb2</span></div>
          <a href="https://wa.me/{{WHATSAPP}}?text=Junior%20S\xfcit%20rezervasyon" class="btn-gold" style="width:100%;justify-content:center;padding:12px" target="_blank">Rezervasyon Yap</a>
        </div>
      </div>
      <div class="room-card">
        <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80" alt="Kral Dairesi">
        <div class="info">
          <h3>Kral Dairesi</h3>
          <div class="price">₺6.200 <small>/ gece</small></div>
          <div class="features"><span class="feat">🛏️ Ekstra Geniş</span><span class="feat">🌅 Teras</span><span class="feat">72m\xb2</span></div>
          <a href="https://wa.me/{{WHATSAPP}}?text=Kral%20Dairesi%20rezervasyon" class="btn-gold" style="width:100%;justify-content:center;padding:12px" target="_blank">Rezervasyon Yap</a>
        </div>
      </div>
    </div>
  </div>
</section>

{{MODUL_RAKAMLARLA_BIZ}}

<section id="olanaklar" style="background:var(--renk-kart)">
  <div class="container">
    <h2 class="sec-title">Otel Olanakları</h2>
    <p class="sec-sub">Konaklamanızı benzersiz kılacak premium hizmetlerimiz</p>
    <div class="amenities">
      <div class="amenity"><div class="icon">🏊</div><h4>Infinity Havuz</h4><p>Deniz manzaralı ısıtmalı a\xe7ık y\xfczme havuzu</p></div>
      <div class="amenity"><div class="icon">💆</div><h4>SPA & Wellness</h4><p>Sauna, hamam, masaj ve aromaterapi</p></div>
      <div class="amenity"><div class="icon">🍽️</div><h4>Fine Dining</h4><p>A la carte restoran ve a\xe7ık b\xfcfe kahvaltı</p></div>
      <div class="amenity"><div class="icon">🏋️</div><h4>Fitness Center</h4><p>24 saat a\xe7ık modern spor salonu</p></div>
      <div class="amenity"><div class="icon">🅿️</div><h4>Valet Parking</h4><p>\xdccretsiz vale ve kapalı otopark</p></div>
      <div class="amenity"><div class="icon">🌐</div><h4>Hızlı WiFi</h4><p>T\xfcm alanlarda \xfccretsiz fiber internet</p></div>
    </div>
  </div>
</section>

{{MODUL_GOOGLE_YORUMLAR}}

<section>
  <div class="container">
    <div class="cta-section">
      <h2 class="sec-title" style="margin-bottom:16px">Unutulmaz Bir Konaklama İ\xe7in</h2>
      <p style="color:var(--renk-alt);margin-bottom:28px;font-size:1rem">Hemen rezervasyon yapın, erken kayıt indirimimizden yararlanın</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
        <a href="tel:{{TELEFON}}" class="btn-gold">📞 Hemen Arayın</a>
        <a href="https://wa.me/{{WHATSAPP}}?text=Rezervasyon%20yapmak%20istiyorum" class="btn-outline" target="_blank">💬 WhatsApp Rezervasyon</a>
      </div>
    </div>
  </div>
</section>

{{MODUL_HARITA_YOL_TARIFI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer>
  <p style="font-family:var(--font-baslik);font-size:1.3rem;color:var(--renk-vurgu);margin-bottom:12px">{{ISLETME_ADI}}</p>
  <p>{{ADRES_METNI}} \xb7 {{TELEFON_GOSTERIM}}</p>
  <p style="margin-top:20px">\xa9 2024 {{ISLETME_ADI}} — T\xfcm hakları saklıdır.</p>
</footer>

{{MODUL_WHATSAPP_CANLI}}

</body>
</html>`,icon:"🏨",etiketler:["Otel","Altın","Lüks"],kategori:"sektor",moduller:["rakamlarla-biz","google-yorumlar","harita-yol-tarifi","duyuru-bandi","kvkk-gizlilik","cerez-bildirimi","whatsapp-canli"]},{id:"sektor-hukuk-buyume",ad:"Terazi",aciklama:"Koyu bordo/altın, kitap rafı dokusu — avukatlık büroları için ciddi ve güvenilir profesyonel tema.",minPaket:"BUYUME",htmlKodu:`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{{SEO_ACIKLAMA}}">
<title>{{SEO_BASLIK}}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --renk-arkaplan: #0a0a12;
  --renk-kart: #12121c;
  --renk-vurgu: #8b6914;
  --renk-hover: #a07b18;
  --renk-metin: #e8e4dc;
  --renk-alt: #7a7568;
  --font-baslik: 'Playfair Display', serif;
  --font-metin: 'Inter', sans-serif;
  --nav-height: 70px;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:var(--font-metin); background:var(--renk-arkaplan); color:var(--renk-metin); }
nav { position:fixed; top:0; left:0; right:0; height:var(--nav-height); background:rgba(10,10,18,0.88); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.05); z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 5%; }
nav .logo { font-family:var(--font-baslik); font-size:1.4rem; font-weight:700; color:var(--renk-vurgu); }
nav .links { display:flex; gap:24px; }
nav .links a { color:var(--renk-alt); text-decoration:none; font-size:0.85rem; font-weight:500; transition:color 0.3s; }
nav .links a:hover { color:var(--renk-vurgu); }
.hero { height:100vh; display:flex; align-items:center; position:relative; overflow:hidden; }
.hero::before { content:''; position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80') center/cover; }
.hero::after { content:''; position:absolute; inset:0; background:linear-gradient(to right, rgba(10,10,18,0.92) 0%, rgba(10,10,18,0.6) 60%, rgba(10,10,18,0.3) 100%); }
.hero-content { position:relative; z-index:2; max-width:600px; padding:0 5%; }
.hero h1 { font-family:var(--font-baslik); font-size:clamp(2.5rem,5vw,4rem); font-weight:800; line-height:1.15; margin-bottom:20px; }
.hero p { font-size:1rem; color:rgba(255,255,255,0.75); line-height:1.8; margin-bottom:32px; }
.btn-primary { display:inline-flex; align-items:center; gap:8px; background:var(--renk-vurgu); color:#fff; padding:14px 32px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem; transition:all 0.3s; border:none; cursor:pointer; }
.btn-primary:hover { background:var(--renk-hover); transform:translateY(-2px); }
.btn-secondary { display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(255,255,255,0.15); color:var(--renk-metin); padding:14px 32px; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.9rem; transition:all 0.3s; }
.btn-secondary:hover { border-color:var(--renk-vurgu); color:var(--renk-vurgu); }
section { padding:100px 20px; }
.container { max-width:1100px; margin:0 auto; }
.sec-title { font-family:var(--font-baslik); font-size:clamp(1.8rem,4vw,2.8rem); text-align:center; margin-bottom:14px; }
.sec-sub { color:var(--renk-alt); text-align:center; font-size:0.95rem; max-width:550px; margin:0 auto 50px; }
.practice-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
.practice-card { background:var(--renk-kart); border-radius:16px; padding:32px; border:1px solid rgba(255,255,255,0.04); transition:all 0.4s; position:relative; overflow:hidden; }
.practice-card::before { content:''; position:absolute; top:0; left:0; width:4px; height:100%; background:var(--renk-vurgu); opacity:0; transition:opacity 0.3s; }
.practice-card:hover { transform:translateY(-4px); border-color:rgba(139,105,20,0.2); }
.practice-card:hover::before { opacity:1; }
.practice-card .icon { font-size:2rem; margin-bottom:16px; }
.practice-card h3 { font-family:var(--font-baslik); font-size:1.2rem; margin-bottom:8px; }
.practice-card p { color:var(--renk-alt); font-size:0.82rem; line-height:1.7; }
.team-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:24px; }
.team-card { text-align:center; background:var(--renk-kart); border-radius:20px; padding:32px 24px; border:1px solid rgba(255,255,255,0.04); }
.team-card .avatar { width:100px; height:100px; border-radius:50%; background:linear-gradient(135deg,var(--renk-vurgu),#c9a020); margin:0 auto 16px; display:flex; align-items:center; justify-content:center; font-size:2.5rem; }
.team-card h4 { font-family:var(--font-baslik); font-size:1.1rem; margin-bottom:4px; }
.team-card .title { color:var(--renk-vurgu); font-size:0.75rem; font-weight:600; letter-spacing:1px; text-transform:uppercase; margin-bottom:10px; }
.team-card p { color:var(--renk-alt); font-size:0.8rem; line-height:1.6; }
.stats-bar { display:flex; justify-content:center; gap:48px; flex-wrap:wrap; padding:60px 20px; background:var(--renk-kart); }
.stat { text-align:center; }
.stat .num { font-family:var(--font-baslik); font-size:2.5rem; font-weight:800; color:var(--renk-vurgu); }
.stat .label { color:var(--renk-alt); font-size:0.8rem; margin-top:4px; }
footer { padding:60px 20px 30px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; }
footer p { color:var(--renk-alt); font-size:0.8rem; }
@media (max-width:768px) { nav .links { display:none; } .practice-grid,.team-grid { grid-template-columns:1fr; } .stats-bar { gap:28px; } }
</style>
</head>
<body>

<nav>
  <div class="logo">⚖️ {{ISLETME_ADI}}</div>
  <div class="links">
    <a href="#alanlar">Uzmanlık Alanları</a>
    <a href="#ekip">Ekibimiz</a>
    <a href="#hakkimizda">Hakkımızda</a>
    <a href="#iletisim">İletişim</a>
  </div>
</nav>

{{MODUL_DUYURU_BANDI}}

<section class="hero">
  <div class="hero-content">
    <p style="color:var(--renk-vurgu);font-weight:600;font-size:0.8rem;letter-spacing:3px;margin-bottom:16px">⚖️ G\xdcVEN \xb7 DENEYİM \xb7 KARARLILILIK</p>
    <h1>{{HERO_BASLIK}}</h1>
    <p>{{HERO_SLOGAN}}</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <a href="tel:{{TELEFON}}" class="btn-primary">📞 {{HERO_CTA_BIRINCIL}}</a>
      <a href="https://wa.me/{{WHATSAPP}}" class="btn-secondary" target="_blank">💬 {{HERO_CTA_IKINCIL}}</a>
    </div>
  </div>
</section>

<section id="alanlar">
  <div class="container">
    <h2 class="sec-title">Uzmanlık Alanlarımız</h2>
    <p class="sec-sub">Her alanda g\xfc\xe7l\xfc tecr\xfcbe ve g\xfcncel hukuki bilgiyle yanınızdayız</p>
    <div class="practice-grid">
      {{HIZMETLER_HTML}}
    </div>
  </div>
</section>

<div class="stats-bar">
  <div class="stat"><div class="num">20+</div><div class="label">Yıllık Deneyim</div></div>
  <div class="stat"><div class="num">3.500+</div><div class="label">Tamamlanan Dava</div></div>
  <div class="stat"><div class="num">%92</div><div class="label">Kazanım Oranı</div></div>
  <div class="stat"><div class="num">15</div><div class="label">Uzman Avukat</div></div>
</div>

<section id="ekip" style="background:var(--renk-kart)">
  <div class="container">
    <h2 class="sec-title">Hukuk Ekibimiz</h2>
    <p class="sec-sub">Alanında uzman avukatlarımız ile yanınızdayız</p>
    <div class="team-grid">
      <div class="team-card">
        <div class="avatar">👨‍⚖️</div>
        <h4>Av. Mehmet Yılmaz</h4>
        <div class="title">Kurucu Ortak</div>
        <p>Ticaret ve şirketler hukuku. 25+ yıl baro deneyimi.</p>
      </div>
      <div class="team-card">
        <div class="avatar">👩‍⚖️</div>
        <h4>Av. Selin Demir</h4>
        <div class="title">Kıdemli Ortak</div>
        <p>Aile hukuku ve arabuluculuk. Uluslararası sertifikalı.</p>
      </div>
      <div class="team-card">
        <div class="avatar">👨‍💼</div>
        <h4>Av. Emre Kaya</h4>
        <div class="title">İş Hukuku Uzmanı</div>
        <p>İşe iade, tazminat ve iş kazası davaları.</p>
      </div>
    </div>
  </div>
</section>

{{MODUL_ONLINE_DANISMA}}
{{MODUL_BLOG_MAKALELER}}
{{MODUL_SERTIFIKA_BELGELER}}
{{MODUL_TEKLIF_FORMU}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer>
  <p style="font-family:var(--font-baslik);font-size:1.2rem;color:var(--renk-vurgu);margin-bottom:12px">⚖️ {{ISLETME_ADI}}</p>
  <p>{{ADRES_METNI}} \xb7 {{TELEFON_GOSTERIM}}</p>
  <p style="margin-top:20px">\xa9 2024 {{ISLETME_ADI}} — T\xfcm hakları saklıdır.</p>
</footer>

{{MODUL_WHATSAPP_CANLI}}

</body>
</html>`,icon:"⚖️",etiketler:["Hukuk","Bordo","Profesyonel"],kategori:"sektor",moduller:["online-danisma","blog-makaleler","sertifika-belgeler","teklif-formu","duyuru-bandi","kvkk-gizlilik","cerez-bildirimi","whatsapp-canli"]},{id:"sektor-market-standart",ad:"Hasat",aciklama:"Yeşil/turuncu, taze ürün hissi — bakkal ve mini marketler için aydınlık e-ticaret vitrini.",minPaket:"STANDART",htmlKodu:`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{{SEO_ACIKLAMA}}">
<title>{{SEO_BASLIK}}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root {
  --renk-arkaplan: #fafaf7;
  --renk-kart: #ffffff;
  --renk-vurgu: #16a34a;
  --renk-hover: #15803d;
  --renk-metin: #1a1a1a;
  --renk-alt: #6b7280;
  --font-baslik: 'Outfit', sans-serif;
  --font-metin: 'Outfit', sans-serif;
  --nav-height: 64px;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:var(--font-metin); background:var(--renk-arkaplan); color:var(--renk-metin); }
nav { position:fixed; top:0; left:0; right:0; height:var(--nav-height); background:rgba(255,255,255,0.92); backdrop-filter:blur(16px); border-bottom:1px solid rgba(0,0,0,0.06); z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 5%; }
nav .logo { font-size:1.3rem; font-weight:800; color:var(--renk-vurgu); }
nav .links { display:flex; gap:20px; }
nav .links a { color:var(--renk-alt); text-decoration:none; font-size:0.85rem; font-weight:500; transition:color 0.3s; }
nav .links a:hover { color:var(--renk-vurgu); }
.hero { padding:calc(var(--nav-height) + 40px) 20px 60px; background:linear-gradient(135deg, #dcfce7 0%, #fafaf7 50%, #fef3c7 100%); text-align:center; }
.hero h1 { font-size:clamp(2rem,5vw,3.5rem); font-weight:800; line-height:1.2; margin-bottom:16px; }
.hero h1 span { color:var(--renk-vurgu); }
.hero p { font-size:1rem; color:var(--renk-alt); max-width:500px; margin:0 auto 28px; line-height:1.7; }
.btn-green { display:inline-flex; align-items:center; gap:8px; background:var(--renk-vurgu); color:#fff; padding:12px 28px; border-radius:12px; text-decoration:none; font-weight:700; font-size:0.9rem; transition:all 0.3s; border:none; cursor:pointer; }
.btn-green:hover { background:var(--renk-hover); transform:translateY(-2px); }
section { padding:80px 20px; }
.container { max-width:1100px; margin:0 auto; }
.sec-title { font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:800; text-align:center; margin-bottom:12px; }
.sec-sub { color:var(--renk-alt); text-align:center; font-size:0.95rem; max-width:500px; margin:0 auto 40px; }
.cats-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:16px; margin-bottom:40px; }
.cat-card { background:var(--renk-kart); border-radius:16px; padding:24px 16px; text-align:center; border:1px solid rgba(0,0,0,0.06); transition:all 0.3s; cursor:pointer; }
.cat-card:hover { transform:translateY(-4px); border-color:var(--renk-vurgu); box-shadow:0 12px 30px rgba(22,163,74,0.1); }
.cat-card .icon { font-size:2.5rem; margin-bottom:10px; }
.cat-card h4 { font-size:0.9rem; font-weight:700; }
.promo { background:var(--renk-vurgu); border-radius:24px; padding:48px 32px; text-align:center; color:#fff; position:relative; overflow:hidden; }
.promo::before { content:''; position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80') center/cover; opacity:0.15; }
.promo * { position:relative; z-index:2; }
.promo h2 { font-size:2rem; font-weight:800; margin-bottom:12px; }
.promo p { font-size:1rem; opacity:0.9; margin-bottom:24px; }
.features { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
.feat-card { background:var(--renk-kart); border-radius:16px; padding:28px; border:1px solid rgba(0,0,0,0.06); }
.feat-card .icon { font-size:1.8rem; margin-bottom:12px; }
.feat-card h4 { font-size:1rem; font-weight:700; margin-bottom:6px; }
.feat-card p { color:var(--renk-alt); font-size:0.82rem; line-height:1.6; }
footer { padding:48px 20px 24px; text-align:center; border-top:1px solid rgba(0,0,0,0.06); }
footer p { color:var(--renk-alt); font-size:0.8rem; }
@media (max-width:768px) { nav .links { display:none; } }
</style>
</head>
<body>

<nav>
  <div class="logo">🛒 {{ISLETME_ADI}}</div>
  <div class="links">
    <a href="#kategoriler">Kategoriler</a>
    <a href="#vitrin">\xdcr\xfcnler</a>
    <a href="#kampanya">Kampanya</a>
    <a href="#iletisim">İletişim</a>
  </div>
</nav>

{{MODUL_DUYURU_BANDI}}

<section class="hero">
  <p style="color:var(--renk-vurgu);font-weight:700;font-size:0.85rem;letter-spacing:2px;margin-bottom:12px">🛒 ONLINE MARKET</p>
  <h1>{{HERO_BASLIK}}</h1>
  <p>{{HERO_SLOGAN}}</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <a href="#vitrin" class="btn-green">🛍️ \xdcr\xfcnleri Keşfet</a>
    <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;border:2px solid var(--renk-vurgu);color:var(--renk-vurgu);padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:700;font-size:0.9rem">💬 WhatsApp Sipariş</a>
  </div>
</section>

<section id="kategoriler" style="background:#fff">
  <div class="container">
    <h2 class="sec-title">Kategoriler</h2>
    <p class="sec-sub">İhtiyacınıza uygun kategoriye tıklayarak \xfcr\xfcnlere ulaşın</p>
    <div class="cats-grid">
      <div class="cat-card"><div class="icon">🥬</div><h4>Meyve & Sebze</h4></div>
      <div class="cat-card"><div class="icon">🥛</div><h4>S\xfct & Kahvaltı</h4></div>
      <div class="cat-card"><div class="icon">🍞</div><h4>Fırın & Unlu</h4></div>
      <div class="cat-card"><div class="icon">🥩</div><h4>Et & Şark\xfcteri</h4></div>
      <div class="cat-card"><div class="icon">🧴</div><h4>Temizlik</h4></div>
      <div class="cat-card"><div class="icon">🍫</div><h4>Atıştırmalık</h4></div>
    </div>
  </div>
</section>

<!-- E-Ticaret Vitrin Mod\xfcl\xfc -->
<section id="vitrin">
{{MODUL_ETICARET_VITRIN}}
</section>

<section id="kampanya">
  <div class="container">
    <div class="promo">
      <h2>🎉 Haftalık İndirim</h2>
      <p>Se\xe7ili \xfcr\xfcnlerde %30'a varan indirim fırsatını ka\xe7ırmayın!</p>
      <a href="https://wa.me/{{WHATSAPP}}?text=Kampanyalı+\xfcr\xfcnler+hakkında+bilgi+almak+istiyorum" class="btn-green" style="background:#fff;color:var(--renk-vurgu)" target="_blank">📞 Detaylar İ\xe7in Arayın</a>
    </div>
  </div>
</section>

{{MODUL_KAMPANYA_AFISI}}
{{MODUL_GUNUN_OZEL}}

<section style="background:#fff">
  <div class="container">
    <h2 class="sec-title">Neden Bizi Tercih Etmelisiniz?</h2>
    <p class="sec-sub">Mahallenizin g\xfcvenilir marketinden alışveriş yapmanın avantajları</p>
    <div class="features">
      <div class="feat-card"><div class="icon">🚚</div><h4>\xdccretsiz Teslimat</h4><p>150₺ \xfczeri siparişlerinizde \xfccretsiz eve teslimat hizmeti.</p></div>
      <div class="feat-card"><div class="icon">🌿</div><h4>Taze \xdcr\xfcnler</h4><p>Her g\xfcn halden taze gelen meyve ve sebze garantisi.</p></div>
      <div class="feat-card"><div class="icon">💰</div><h4>Uygun Fiyat</h4><p>Zincir market fiyatlarıyla rekabet eden \xf6zel fırsatlar.</p></div>
      <div class="feat-card"><div class="icon">📱</div><h4>WhatsApp Sipariş</h4><p>Listeyi g\xf6nderin, biz kapınıza getirelim.</p></div>
    </div>
  </div>
</section>

{{MODUL_CALISMA_SAATLERI}}
{{MODUL_KVKK_GIZLILIK}}
{{MODUL_CEREZ_BILDIRIMI}}

<footer>
  <p style="font-size:1.2rem;font-weight:800;color:var(--renk-vurgu);margin-bottom:10px">🛒 {{ISLETME_ADI}}</p>
  <p>{{ADRES_METNI}} \xb7 {{TELEFON_GOSTERIM}}</p>
  <p style="margin-top:16px">\xa9 2024 {{ISLETME_ADI}} — T\xfcm hakları saklıdır.</p>
</footer>

{{MODUL_WHATSAPP_CANLI}}

</body>
</html>`,icon:"🛒",etiketler:["Market","Taze","Yeşil"],kategori:"sektor",moduller:["eticaret-vitrin","kampanya-afisi","gunun-ozel","calisma-saatleri","duyuru-bandi","kvkk-gizlilik","cerez-bildirimi","whatsapp-canli"]}];var t=e.i(921429);function i(e,r=""){let o=e?.toUpperCase(),n=(0,t.sektorProfiliBul)(r);if(n){let e=a.find(e=>e.id===n.iskeletTipi);if(e)return console.log(`[SABLON SE\xc7] Profil ${n.id} → iskelet: ${n.iskeletTipi}`),e.htmlKodu}let l=["kuafor","guzelliksicak","diyetisyen","psikolog","yoga","pilates"].includes(r),s=["insaat","mimarlik","mantolama","cati","camkapi","asansor","tente"].includes(r),d=["ascilik","organizasyon","pasta","catering"].includes(r),p=["oto","elektrik","tesisat","cilingir","kombi","temizlik","nakliye","kurye"].includes(r),m=["bilisim","avukat","mali","danismanlik","sigorta","emlak","guvenlik"].includes(r),c=["egitim","kurs","tercuman","kres","surucu"].includes(r),g=["spor","fotograf","etkinlik","dovme","oyun","muzik"].includes(r),f=["giyim","taki","hediyelik","toptan","cicekci","kozmetik","optik"].includes(r),x=["saglik","klinik","doktor","eczane","diyetisyen","psikolog","veteriner","fizik-tedavi"].includes(r),h=["eticaret","online-satis","pazaryeri"].includes(r),b=["oto-galeri","rent-a-car","oto-yikama","oto-lastik","oto-kaporta"].includes(r),u=["ajans","reklam","yazilim","medya","produksiyon","tasarim"].includes(r);return("PREMIUM"===o||"PREMIUMPLUS"===o)&&x?a.find(e=>"sektor-saglik-premium"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o)&&u?a.find(e=>"sektor-ajans-premium"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o||"BUYUME"===o)&&b?a.find(e=>"sektor-otomotiv-buyume"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o||"BUYUME"===o||"STANDART"===o)&&h?a.find(e=>"sektor-eticaret-standart"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o)&&g?a.find(e=>"sektor-spor-premium"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o||"BUYUME"===o)&&m?a.find(e=>"sektor-kurumsal-buyume"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o||"BUYUME"===o)&&f?a.find(e=>"sektor-vitrin-buyume"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o||"BUYUME"===o||"STANDART"===o)&&c?a.find(e=>"sektor-egitim-standart"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o)&&s?a.find(e=>"sektor-insaat-premium"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o||"BUYUME"===o)&&l?a.find(e=>"sektor-guzellik-buyume"===e.id)?.htmlKodu||a[0].htmlKodu:("PREMIUM"===o||"PREMIUMPLUS"===o||"BUYUME"===o||"STANDART"===o)&&d?a.find(e=>"sektor-restoran-standart"===e.id)?.htmlKodu||a[0].htmlKodu:p?a.find(e=>"sektor-hizmet-temel"===e.id)?.htmlKodu||a[0].htmlKodu:"PREMIUM"===o||"PREMIUMPLUS"===o?a.find(e=>"sablon-premium"===e.id)?.htmlKodu||a[0].htmlKodu:"BUYUME"===o?a.find(e=>"sablon-buyume"===e.id)?.htmlKodu||a[0].htmlKodu:"STANDART"===o?a.find(e=>"sablon-standart"===e.id)?.htmlKodu||a[0].htmlKodu:a.find(e=>"sablon-temel"===e.id)?.htmlKodu||a[0].htmlKodu}function r(e){return`{{MODUL_${e.toUpperCase().replace(/-/g,"_")}}}`}function o(e,a){let t=e;for(let[e,i]of Object.entries(a))t=t.replaceAll(`{{${e}}}`,i);return(t=t.replace(/\{\{MODUL_[A-Z0-9_]+\}\}/g,"")).replace(/\{\{[A-Z0-9_]+\}\}/g,"")}e.s(["finalizeTemplate",()=>o,"modulSlotAdi",()=>r,"sablonSec",()=>i],405349)},483166,e=>{"use strict";function a(e){let a=[],t=[];e.toLowerCase(),/lorem\s*ipsum/i.test(e)&&a.push({madde:1,seviye:"kritik",aciklama:'"Lorem ipsum" placeholder metni tespit edildi'}),(/placeholder\s*text/i.test(e)||/sample\s*text/i.test(e))&&a.push({madde:1,seviye:"uyari",aciklama:"Placeholder/sample metin tespit edildi"}),/örnek\s*(hizmet|işletme|açıklama)/i.test(e)&&t.push('Madde 1: "Örnek" kelimesi içerik içinde bulundu — gerçekçi içerik kullanın'),/color:\s*#[ef][ef][ef]/i.test(e)&&/background[^;]*#[ef][ef][ef]/i.test(e)&&a.push({madde:2,seviye:"uyari",aciklama:"Açık arka plan + açık metin riski (WCAG AA kontrast)"}),/background[^;]*:\s*#[012]/i.test(e)&&/(?:^|;)\s*color:\s*#[0-3][0-3a-f][0-3a-f]/im.test(e)&&t.push("Madde 2: Koyu zemin üzerinde koyu metin olabilir — kontrast kontrol edin");let i=/background[^}]*url\s*\(/i.test(e),r=/rgba\s*\(\s*0\s*,\s*0\s*,\s*0/i.test(e)||/linear-gradient.*rgba/i.test(e);i&&!r&&a.push({madde:3,seviye:"uyari",aciklama:"Görsel arka plan var ama rgba overlay bulunamadı"});let o=/--nav-h|--nav-height/i.test(e),n=/padding-top\s*:\s*calc/i.test(e);o||n||t.push("Madde 4: --nav-height veya padding-top:calc() bulunamadı — navbar/section çakışma riski");let l=(e.match(/<img[^>]*>/gi)||[]).filter(e=>!/alt\s*=/i.test(e));l.length>0&&a.push({madde:5,seviye:"uyari",aciklama:`${l.length} img tag(s) alt attribute eksik`}),/@media.*max-width/i.test(e)||/@media.*min-width/i.test(e)||a.push({madde:6,seviye:"uyari",aciklama:"Hiç media query bulunamadı — responsive olmayabilir"}),/overflow-x\s*:\s*scroll/i.test(e)&&a.push({madde:6,seviye:"uyari",aciklama:"overflow-x: scroll tespit edildi — yatay scroll riski"}),/:hover/i.test(e)||t.push("Madde 7: Hiç :hover state bulunamadı"),/:focus/i.test(e)||/:focus-visible/i.test(e)||t.push("Madde 7: :focus veya :focus-visible state bulunamadı — erişilebilirlik sorunu"),/z-index\s*:\s*9999/i.test(e)&&a.push({madde:8,seviye:"uyari",aciklama:"z-index: 9999 tespit edildi — z-index çakışma riski"});let s=(e.match(/z-index\s*:\s*(\d+)/gi)||[]).map(e=>parseInt(e.replace(/z-index\s*:\s*/i,""))).filter(e=>!isNaN(e));s.length>3&&new Set(s).size<s.length/2&&t.push("Madde 8: Çok sayıda aynı z-index değeri — hiyerarşi karışıklığı riski"),/margin[^}]*:\s*-\d/i.test(e)&&t.push("Madde 9: Negatif margin kullanımı tespit edildi — overflow riski");let d=e.match(/<footer[\s\S]*?<\/footer>/i);if(d){let e=(d[0].match(/href\s*=\s*["']#["']/gi)||[]).length;e>2&&t.push(`Madde 10: Footer'da ${e} adet boş href="#" bağlantısı var`)}let p=[...e.match(/<input[^>]*>/gi)||[],...e.match(/<textarea[^>]*>/gi)||[]].filter(e=>!/aria-label/i.test(e)&&!/id\s*=/i.test(e));p.length>0&&t.push(`Madde 11: ${p.length} form alanında aria-label veya id eksik`);let m=e.match(/var\(--[a-z-]+\)/gi)||[],c=e.match(/:root\s*\{[^}]*\}/i)?.[0]||"",g=m.filter(e=>{let a=e.replace(/var\(|\)/g,"");return!c.includes(a)});g.length>3&&t.push(`Madde 12: ${g.length} CSS değişkeni :root'ta tanımsız olabilir`),/color:\s*#fff\s*;/i.test(e)&&/background:\s*#fff/i.test(e)&&t.push("Ek: Beyaz üstüne beyaz metin riski");let f=a.filter(e=>"kritik"===e.seviye).length,x=Math.max(0,100-20*f-5*(a.filter(e=>"uyari"===e.seviye).length+t.length));return{gecti:0===f&&x>=60,puan:x,sorunlar:a,uyarilar:t}}function t(e,a){let t=e.gecti?"✅ GEÇTİ":"❌ BAŞARISIZ";for(let i of(console.log(`[QA] ${a}: ${t} (${e.puan}/100)`),e.sorunlar))console.log(`  [${i.seviye.toUpperCase()}] Madde ${i.madde}: ${i.aciklama}`);for(let a of e.uyarilar)console.log(`  [UYARI] ${a}`)}e.s(["htmlKaliteKontrol",()=>a,"kaliteRaporuLogla",()=>t])},198601,e=>{"use strict";var a=e.i(485837),t=e.i(921429);let i=`Sen kepenk.ai'nin \xfcst d\xfczey i\xe7erik yazarısın.
T\xfcrk esnafları i\xe7in web sitesi i\xe7eriği \xfcretiyorsun.
SADECE JSON \xe7ıktısı ver. Başka hi\xe7bir şey yazma. JSON ge\xe7erli ve eksiksiz olmalı.

KRİTİK KURALLAR:
1. "Lorem ipsum" veya herhangi bir placeholder metin KESİNLİKLE YASAKTIR.
   Her metin, buton etiketi ve a\xe7ıklama sekt\xf6re \xf6zg\xfc, ger\xe7ek\xe7i T\xfcrk\xe7e i\xe7erik olmalı.
2. İşletme adını, sloganı ve lokasyonu başlıklara doğal şekilde entegre et.
3. Sayısal veriler (fiyat, istatistik, puan, yıl) sekt\xf6rle tutarlı ve ger\xe7ek\xe7i aralıklarda olmalı.
4. T\xfcm i\xe7erik SEO dostu, H1 benzersiz ve a\xe7ıklayıcı olmalı.
5. Emoji kullanımı dolu ama dengeli — her hizmet/değer kartı i\xe7in 1 ilgili emoji.
6. M\xfcşteri yorumları ger\xe7ek kişi isimleri ve doğal dille yazılmalı; aşırı \xf6vg\xfcden ka\xe7ın.
7. CTA metinleri sekt\xf6re uygun ve aksiyon odaklı olmalı (\xf6r: "Randevu Al" vs "Teklif İste" vs "Hemen Ara").
8. Hizmet/\xfcr\xfcn a\xe7ıklamaları minimum 2 tam c\xfcmle i\xe7ermeli.
9. G\xf6rsel URL'ķleri: https://source.unsplash.com/1200x700/?{{SEKTOR_EN}} formatında.
10. Avatarlar: https://i.pravatar.cc/80?u={{RASTGELE}} formatında.
11. Fiyatlar T\xfcrk Lirası (₺) cinsinden, KDV dahil.
12. \xc7alışma saatleri T\xfcrkiye saatine g\xf6re.`;async function r(e,r,o){let n=e.sesProfili?.ozelHizmetler??[],l=n.join(", ")||"Profesyonel hizmetler",s=e.sesProfili?.kisilikTonu??"samimi",d=["BUYUME","PREMIUM","PREMIUMPLUS"].includes(o?.toUpperCase()),p=["PREMIUM","PREMIUMPLUS"].includes(o?.toUpperCase()),m=(0,t.sektorProfiliBul)(e.sektor||""),c=m?.ozelIcerik||"",g=r.length>0?r.map(e=>`- "${e.metin?.substring(0,80)}" — ${e.yazar}`).join("\n"):"Henüz yorum yok",f=`
İŞLETME:
- Ad: ${e.isletmeAdiTam||e.ad}
- Sekt\xf6r: ${e.sektor}
- Lokasyon: ${e.ilce}, ${e.sehir}
- Hizmetler: ${l}
- Ton: ${s}
- Rakipten fark: ${e.sesProfili?.rakiptenFark??""}
- M\xfcşteri kitlesi: ${e.sesProfili?.musterKitlesi??"genel"}

M\xdcŞTERİ YORUMLARI:
${g}

Şu JSON yapısını doldur. T\xfcm alanları ${e.sektor} sekt\xf6r\xfcne uygun, ger\xe7ek\xe7i ve \xf6zg\xfcn i\xe7erikle doldur.
Ton: ${"samimi"===s?'sıcak ve doğal Türkçe, "biz" dili':"resmi"===s?"kurumsal ve profesyonel":"esprili"===s?"hafif esprili ama güvenilir":"otoriter"===s?"güven veren, rakamlarla destekli":"sıcak ve samimi"}

{
  "heroBaslik": "Lokasyona \xf6zel, g\xfc\xe7l\xfc H1 başlık (\xf6rn: Kadık\xf6y'\xfcn En İyi Elektrik\xe7isi)",
  "heroSlogan": "2-3 c\xfcmle, hizmet \xf6zeti ve fark",  
  "heroCTABirincil": "Sekt\xf6re uygun CTA (\xf6rn: Hemen Ara / Randevu Al / Teklif Al)",
  "heroCTAIkincil": "WhatsApp CTA metni",
  "waMesaj": "URL-encoded WhatsApp mesajı",
  "hizmetler": [
    {"ad":"hizmet adı","aciklama":"1-2 c\xfcmle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 c\xfcmle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 c\xfcmle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 c\xfcmle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 c\xfcmle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 c\xfcmle","ikon":"emoji"}
  ],
  "nedenBiz": [
    {"baslik":"kısa başlık","aciklama":"1 c\xfcmle","ikon":"emoji"},
    {"baslik":"kısa başlık","aciklama":"1 c\xfcmle","ikon":"emoji"},
    {"baslik":"kısa başlık","aciklama":"1 c\xfcmle","ikon":"emoji"},
    {"baslik":"kısa başlık","aciklama":"1 c\xfcmle","ikon":"emoji"}
  ],
  "kampanya": {"baslik":"kampanya adı","aciklama":"detay","indirim":"%20"},
  "saatler": [
    {"gun":"Pazartesi","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Salı","acilis":"09:00","kapanis":"18:00"},
    {"gun":"\xc7arşamba","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Perşembe","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Cuma","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Cumartesi","acilis":"10:00","kapanis":"15:00"},
    {"gun":"Pazar","acilis":null,"kapanis":null}
  ],
  ${d?`
  "istatistikler": [
    {"deger":500,"etiket":"Mutlu M\xfcşteri","ikon":"👥"},
    {"deger":10,"etiket":"Yıl Tecr\xfcbe","ikon":"🏆"},
    {"deger":1000,"etiket":"Tamamlanan İş","ikon":"✅"},
    {"deger":98,"etiket":"Memnuniyet %","ikon":"⭐"}
  ],
  "adimlar": [
    {"numara":1,"baslik":"İletişim","aciklama":"bize ulaşın","ikon":"📞"},
    {"numara":2,"baslik":"Keşif","aciklama":"\xfccretsiz değerlendirme","ikon":"🔍"},
    {"numara":3,"baslik":"Uygulama","aciklama":"profesyonel hizmet","ikon":"🔧"},
    {"numara":4,"baslik":"Teslim","aciklama":"garantili sonu\xe7","ikon":"✅"}
  ],
  "bloglar": [
    {"baslik":"SEO dostu blog başlığı","ozet":"2 c\xfcmle \xf6zet","tarih":"10 Mart 2026","etiket":"Rehber","ikon":"📖"},
    {"baslik":"SEO dostu blog başlığı","ozet":"2 c\xfcmle \xf6zet","tarih":"5 Mart 2026","etiket":"Haber","ikon":"📰"},
    {"baslik":"SEO dostu blog başlığı","ozet":"2 c\xfcmle \xf6zet","tarih":"1 Mart 2026","etiket":"İpucu","ikon":"💡"}
  ],
  "hikayeMetni": "İşletmenin kuruluş hikayesi, 3-4 c\xfcmle",
  "misyonMetni": "Misyon c\xfcmlesi",
  "duyuruMetni": "G\xfcncel duyuru veya kampanya mesajı",
  `:'"istatistikler":[],"adimlar":[],"bloglar":[],"duyuruMetni":"",'}
  ${p?`
  "ilanlar": [
    {"pozisyon":"pozisyon adı","tur":"Tam Zamanlı","konum":"${e.ilce}","aciklama":"kısa a\xe7ıklama"},
    {"pozisyon":"pozisyon adı","tur":"Part-time","konum":"${e.ilce}","aciklama":"kısa a\xe7ıklama"}
  ],
  `:'"ilanlar":[],'}
  "seoBaslik": "${e.isletmeAdiTam||e.ad} | ${e.sektor} ${e.ilce}",
  "seoAciklama": "150 karakter SEO a\xe7ıklaması"
}

KURALLAR:
- Ger\xe7ek\xe7i ve sekt\xf6re \xf6zg\xfc i\xe7erik \xfcret (Lorem ipsum YASAK)
- Her hizmet ${e.sektor} sekt\xf6r\xfcne ait olsun
- Lokasyonu (${e.ilce}) başlıklara dahil et
- Emoji'leri bol kullan
- JSON dışında hi\xe7bir şey yazma
${c?`
SEKT\xd6RE \xd6ZEL NOT:
${c}`:""}
`,x=(await (0,a.geminiCalistir)("gemini-3-flash-preview",i,f,{thinkingLevel:"low",maxOutputTokens:4096})).replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();try{return JSON.parse(x)}catch{return console.error("[İÇERİK ÜRETİCİ] JSON parse hatası, fallback kullanılıyor"),{heroBaslik:`${e.ilce}'nin ${e.sektor} Uzmanı`,heroSlogan:`${n.slice(0,3).join(", ")} hizmetlerinde uzman ekibimizle yanınızdayız.`,heroCTABirincil:"Hemen Ara",heroCTAIkincil:"WhatsApp'tan Yaz",waMesaj:"Merhaba%2C%20bilgi%20almak%20istiyorum",hizmetler:n.slice(0,6).map(e=>({ad:e,aciklama:"Profesyonel hizmet",ikon:"⭐"})),nedenBiz:[{baslik:"Güvenilir",aciklama:"Yıllardır aynı kalite",ikon:"🏆"},{baslik:"Hızlı",aciklama:"7/24 ulaşılabilir",ikon:"⚡"},{baslik:"Uygun Fiyat",aciklama:"Şeffaf fiyatlandırma",ikon:"💰"},{baslik:"Garantili",aciklama:"Sonuçlarımız garantili",ikon:"✅"}],saatler:[{gun:"Pazartesi",acilis:"09:00",kapanis:"18:00"},{gun:"Salı",acilis:"09:00",kapanis:"18:00"},{gun:"Çarşamba",acilis:"09:00",kapanis:"18:00"},{gun:"Perşembe",acilis:"09:00",kapanis:"18:00"},{gun:"Cuma",acilis:"09:00",kapanis:"18:00"},{gun:"Cumartesi",acilis:"10:00",kapanis:"15:00"},{gun:"Pazar",acilis:null,kapanis:null}],istatistikler:[],adimlar:[],bloglar:[],ilanlar:[],seoBaslik:`${e.isletmeAdiTam||e.ad} | ${e.sektor} ${e.ilce}`,seoAciklama:`${e.ilce}'de ${e.sektor} hizmetleri. ${e.isletmeAdiTam||e.ad} - G\xfcvenilir ve hızlı hizmet.`}}}function o(e){return e.map(e=>`
<div class="kart" style="display:flex;flex-direction:column;gap:12px">
  <div style="font-size:2rem">${e.ikon}</div>
  <h3 style="font-size:1rem;font-weight:700;color:var(--renk-metin)">${e.ad}</h3>
  <p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6;flex:1">${e.aciklama}</p>
  <div style="height:2px;background:var(--renk-vurgu);width:32px;border-radius:1px;opacity:0.6"></div>
</div>`).join("")}function n(e){return e.map(e=>`
<div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)">
  <div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${e.ikon}</div>
  <div>
    <h3 style="font-size:0.95rem;font-weight:700;color:var(--renk-metin);margin-bottom:4px">${e.baslik}</h3>
    <p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">${e.aciklama}</p>
  </div>
</div>`).join("")}function l(e){return e.length?e.map(e=>`
<div class="kart" style="display:flex;flex-direction:column;gap:12px">
  <div style="display:flex;gap:2px">${"⭐".repeat(Math.min(e.yildiz??5,5))}</div>
  <p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6;flex:1">"${e.metin??""}${e.metin?'"':""}</p>
  <div style="display:flex;justify-content:space-between;align-items:center">
    <span style="color:var(--renk-metin);font-weight:700;font-size:0.85rem">${e.yazar}</span>
    ${e.sure?`<span style="color:var(--renk-alt);font-size:0.75rem">${e.sure}</span>`:""}
  </div>
</div>`).join(""):""}e.s(["hizmetlerHtmlUret",()=>o,"icerikUret",()=>r,"nedenBizHtmlUret",()=>n,"yorumlarHtmlUret",()=>l])},470188,e=>e.a(async(a,t)=>{try{var i=e.i(748734),r=e.i(591479),o=e.i(485837),n=e.i(389493),l=e.i(218946),s=e.i(135415),d=e.i(921429),p=e.i(405349),m=e.i(483166),c=e.i(198601),g=a([i,r]);[i,r]=g.then?(await g)():g;let k=`
**[DEMO \xdcRETİM KURALLARI]**
🔴 TIER 1: TEMEL & STANDART Paketler (Statik & Hızlı)
- Teknoloji: SADECE Semantik HTML5 ve Tailwind CSS v4 (CDN). React, Next.js veya State kullanımı YASAKTIR.
- Tasarım & Animasyon: Minimalist, temiz kurumsal grid yapısı. JS animasyonu veya Framer Motion YASAKTIR. Sadece CSS :hover efektleri.
- Ama\xe7: Hızlı a\xe7ılan, sade temel dijital varlık.

🟡 TIER 2: B\xdcY\xdcME Paketi (Dinamik & Etkileşimli)
- Teknoloji: Next.js 16 (React 19) ve Tailwind CSS v4.
- Tasarım & Animasyon: Asimetrik yapılar (Bento Box), etkileşimli modern UI bileşenleri. Framer Motion ile scroll edildik\xe7e beliren yumuşak girişler.
- Kısıtlama: Ağır 3D objeler ve Parallax efektleri YASAKTIR.

🟢 TIER 3: PREMIUM & PREMIUM PLUS Paketler (G\xf6rsel Ş\xf6len)
- Teknoloji: Next.js 16, Tailwind CSS v4, Gelişmiş Framer Motion, CSS 3D Transforms (veya R3F).
- Tasarım & Animasyon: Scroll-linked Parallax efektleri, 3D elementler, manyetik butonlar, Glassmorphism ve Mesh Gradientler ZORUNLUDUR. Awwwards ajans kalitesi.
`;async function f(a){console.log("[MANIFESTO] Üretim başlatıldı:\n",k);let t=await i.adminDb.collection("esnaflar").doc(a).get();if(!t.exists)throw Error(`Esnaf bulunamadı: ${a}`);let o=t.data(),s=(await i.adminDb.collection("yorumlar").where("esnafId","==",a).where("yildiz",">=",4).orderBy("yildiz","desc").limit(3).get()).docs.map(e=>({yazar:e.data().yazar??"Müşteri",metin:e.data().yorum?.substring(0,120),yildiz:e.data().yildiz??5})),d=o.slug??(0,n.slugOlustur)(o.isletmeAdiTam||o.ad,a),p=o.subdomain??d,m=await h(o,s,a),c=await (0,n.siteYayinla)({esnafId:a,slug:d,subdomain:p,html:m});await t.ref.update({slug:d,subdomain:p,subdomainUrl:c,siteHtml:m,siteVersiyon:(o.siteVersiyon??0)+1,siteGuncelleme:r.Timestamp.now()}),await (0,l.telegramGonder)(`🌐 <b>Site Yayında!</b>
${o.isletmeAdiTam||o.ad}
<a href="${c}">${c}</a>`);let{waMesajGonder:g}=await e.A(396900);return await g(o.waNumarasi,`✅ Siteniz hazır!

🌐 ${c}

Telefon numaranız, Google yorumlarınız ve bilgileriniz siteye eklendi.
İ\xe7erik g\xfcncellemek i\xe7in: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,a,"site_hazir").catch(console.error),c}async function x(e){let a=await i.adminDb.collection("esnaflar").doc(e).get(),t=a.data();if(!t.slug)return;let o=(await i.adminDb.collection("yorumlar").where("esnafId","==",e).where("yildiz",">=",4).limit(3).get()).docs.map(e=>({yazar:e.data().yazar??"Müşteri",metin:e.data().yorum?.substring(0,120),yildiz:e.data().yildiz??5})),l=await v(t,o,e);await (0,n.siteGuncelle)(t.slug,l),await a.ref.update({siteHtml:l,siteVersiyon:(t.siteVersiyon??0)+1,siteGuncelleme:r.Timestamp.now()})}async function h(e,a,t,i=1){let r=await v(e,a,t),o=await b(r,e);if(console.log(`[SİTE HAKEMİ] Deneme ${i}: ${o.karar} (${o.toplamPuan}/100)`),"ONAYLA"===o.karar)return await (0,l.telegramGonder)(`✅ <b>Site Hakem Onayı</b>
${e.isletmeAdiTam||e.ad}
Skor: ${o.toplamPuan}/100
Deneme: ${i}`),r;if("DÜZELT"===o.karar&&i<3){console.log(`[SİTE HAKEMİ] D\xfczeltme yapılıyor: ${o.duzeltTalimati}`);let n=await u(e,a,t,r,o.duzeltTalimati??"",o.kritikSorunlar),l=await b(n,e);return"ONAYLA"===l.karar||i>=2?n:h(e,a,t,i+1)}return"REDDEDİLDİ"===o.karar&&i<3?(console.log(`[SİTE HAKEMİ] Reddedildi, yeniden \xfcretiliyor...`),h(e,a,t,i+1)):(await (0,l.telegramGonder)(`⚠️ <b>Site Hakem Uyarısı</b>
${e.isletmeAdiTam||e.ad}
3 denemeden ge\xe7emedi. En iyi s\xfcr\xfcm deploy edildi.
Son skor: ${o.toplamPuan}/100
Sorunlar: ${(o.kritikSorunlar||[]).join(", ")}
Manuel kontrol \xf6nerilir.`),r)}async function b(a,t){let{runAgent:i}=await e.A(611709),r=await i("site_hakemi",{html:a.substring(0,2e4),esnafAdi:t.isletmeAdiTam||t.ad,telefon:t.telefon,ilce:t.ilce,paletId:t.paletId,sektor:t.sektor});return{karar:r?.karar??"REDDEDİLDİ",toplamPuan:"number"==typeof r?.toplamPuan?r.toplamPuan:0,kritikSorunlar:Array.isArray(r?.kritikSorunlar)?r.kritikSorunlar:[],duzeltTalimati:r?.duzeltTalimati}}async function u(e,a,t,i,r,n){let l=`
Aşağıdaki HTML sitesinde şu sorunlar var:
${n.map((e,a)=>`${a+1}. ${e}`).join("\n")}

D\xdcZELTME TALİMATI:
${r}

ORİJİNAL HTML (ilk 15000 karakter):
${i.substring(0,15e3)}

Bu sorunları d\xfczelt ve tam HTML'yi d\xf6nd\xfcr.
Sadece HTML. A\xe7ıklama yapma.
`,s=await (0,o.geminiCalistir)("gemini-3.1-pro-preview","Sen bir HTML düzeltme uzmanısın. Verilen sorunları çöz, tam HTML döndür.",l,{thinkingLevel:"low",maxOutputTokens:16384});return s=s.replace(/```html\n?/g,"").replace(/```\n?/g,"").trim()}async function v(e,a,t){let i=e.paket||"TEMEL",r=e.telefon?e.telefon.replace(/[^0-9]/g,""):"",o=[e.mahalle,e.ilce,e.sehir].filter(Boolean).join(", "),n=process.env.NEXT_PUBLIC_APP_URL||"https://kepenk.ai",l=(0,p.sablonSec)(i);console.log(`[TEMPLATE] Se\xe7ilen şablon: ${i} → ${l.substring(0,40)}...`);let g=await (0,c.icerikUret)(e,a,i);console.log(`[İ\xc7ERİK] ${e.isletmeAdiTam||e.ad}: "${g.heroBaslik}"`);let f=(0,s.esnafModulleri)(e.sektor,i),x=(e.aktifWebModulleri??f.map(e=>e.id)).map(e=>s.MODULLER.find(a=>a.id===e)).filter(Boolean),h={},b=0;for(let a of x){let i=(0,p.modulSlotAdi)(a.id).replace(/\{\{|\}\}/g,"");if(a.htmlSablon){let l=a.htmlSablon.replace(/ISLETME_ADI/g,e.isletmeAdiTam||e.ad).replace(/WHATSAPP_NUMARA/g,r).replace(/ESNAF_ID/g,t).replace(/KEPENK_API_URL/g,n).replace(/TELEFON/g,r).replace(/ADRES_METNI/g,o).replace(/HARITA_QUERY/g,encodeURIComponent(`${e.isletmeAdiTam||e.ad} ${e.ilce||""} ${e.sehir||""}`)).replace(/KURUCU_ADI/g,e.kurucuAdi||e.isletmeAdiTam||e.ad).replace(/GMB_LINK/g,e.gmbLink||"#").replace(/INSTAGRAM_URL/g,e.instagramUsername?`https://instagram.com/${e.instagramUsername}`:"#").replace(/FACEBOOK_URL/g,e.facebookUrl||"#").replace(/YOUTUBE_URL/g,e.youtubeUrl||"#").replace(/TIKTOK_URL/g,e.tiktokUrl||"#").replace(/TWITTER_URL/g,e.twitterUrl||"#").replace(/BASVURU_LINK/g,`https://wa.me/90${r}?text=${encodeURIComponent("Kariyer başvurusu")}`).replace(/DUYURU_LINK/g,`https://wa.me/90${r}`).replace(/DUYURU_METNI/g,g.duyuruMetni||"🎉 Yeni hizmetlerimiz yayında!").replace(/KAMPANYA_BASLIK/g,g.kampanya?.baslik||"Özel Kampanya").replace(/KAMPANYA_ACIKLAMA/g,g.kampanya?.aciklama||"Sınırlı süre için geçerli").replace(/INDIRIM_YUZDESI/g,g.kampanya?.indirim?.replace(/[^0-9]/g,"")||"20").replace(/SAATLER_JSON/g,JSON.stringify(g.saatler||[])).replace(/ISTATISTIKLER_JSON/g,JSON.stringify(g.istatistikler||[])).replace(/ADIMLAR_JSON/g,JSON.stringify(g.adimlar||[])).replace(/MAKALELER_JSON/g,JSON.stringify(g.bloglar||[])).replace(/ILANLAR_JSON/g,JSON.stringify(g.ilanlar||[])).replace(/HIKAYE_METNI/g,g.hikayeMetni||"").replace(/MISYON_METNI/g,g.misyonMetni||"");h[i]=l,b++}}console.log(`[MOD\xdcL SLOT] ${b}/${x.length} mod\xfcl şablonla dolduruldu`);let u=e.secilenPalet??null,v=(0,d.sektorProfiliBul)(e.sektor||""),k=v?(0,d.profilCssDegerleri)(v):null;console.log(`[SEKT\xd6R PROFİLİ] ${v?`${v.id} (${v.sektorAdi})`:"Eşleşme yok, varsayılan kullanılıyor"}`);let y={ISLETME_ADI:e.isletmeAdiTam||e.ad,ISLETME_KISAADI:(e.isletmeAdiTam||e.ad).split(" ")[0],SEKTOR:e.sektor,ILCE:e.ilce||"",SEHIR:e.sehir||"",TELEFON:r,TELEFON_GOSTERIM:e.telefon||r,WHATSAPP:`90${r}`,ADRES_METNI:o,HARITA_URL:`https://maps.google.com/maps?q=${encodeURIComponent(`${e.isletmeAdiTam||e.ad} ${e.ilce||""} ${e.sehir||""}`)}&output=embed`,OG_URL:e.subdomainUrl||n,WA_MESAJ:encodeURIComponent(`Merhaba, ${e.isletmeAdiTam||e.ad} hakkında bilgi almak istiyorum`),CSS_ARKAPLAN:u?.css?.arkaplan||k?.CSS_ARKAPLAN||"#0f0f0f",CSS_KART:u?.css?.kart||k?.CSS_KART||"#1a1a1a",CSS_VURGU:u?.css?.vurgu||k?.CSS_VURGU||"#c9541e",CSS_HOVER:u?.css?.hover||k?.CSS_HOVER||"#a8441a",CSS_METIN:u?.css?.metin||k?.CSS_METIN||"#f5f1eb",CSS_ALT:u?.css?.altMetin||k?.CSS_ALT||"#94877a",CSS_GRADIENT:u?.css?.gradient||k?.CSS_GRADIENT||"linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)",FONT_BASLIK:u?.font?.baslik||k?.FONT_BASLIK||"Syne",FONT_METIN:u?.font?.metin||k?.FONT_METIN||"Inter",HERO_BASLIK:g.heroBaslik,HERO_SLOGAN:g.heroSlogan,HERO_CTA_BIRINCIL:g.heroCTABirincil,HERO_CTA_IKINCIL:g.heroCTAIkincil,HIZMETLER_HTML:(0,c.hizmetlerHtmlUret)(g.hizmetler),NEDEN_BIZ_HTML:(0,c.nedenBizHtmlUret)(g.nedenBiz),YORUMLAR_HTML:(0,c.yorumlarHtmlUret)(a.length>0?a:g.hizmetler.slice(0,2).map(e=>({yazar:"Müşteri",metin:`${e.ad} hizmetinden \xe7ok memnun kaldım. Kesinlikle tavsiye ederim.`,yildiz:5,sure:"1 hafta önce"}))),SEO_BASLIK:g.seoBaslik,SEO_ACIKLAMA:g.seoAciklama,...h},A=(0,p.finalizeTemplate)(l,y);if(!A.includes("<html")||!A.includes("</html>"))throw Error("Template finalize edilemedi — geçersiz HTML");let E=(0,m.htmlKaliteKontrol)(A);return(0,m.kaliteRaporuLogla)(E,e.isletmeAdiTam||e.ad),console.log(`[TEMPLATE] Final HTML: ${A.length} karakter | QA: ${E.puan}/100`),A}e.s(["esnafSiteGuncelle",()=>x,"esnafSiteUret",()=>f]),t()}catch(e){t(e)}},!1)];

//# sourceMappingURL=XinXia_apps_web_src_06dad807._.js.map