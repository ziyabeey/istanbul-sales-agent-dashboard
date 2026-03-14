import { ortakNav, ortakFooter } from './ortak'

export const sablonHukukBuyumeHtml = `<!DOCTYPE html>
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
    <p style="color:var(--renk-vurgu);font-weight:600;font-size:0.8rem;letter-spacing:3px;margin-bottom:16px">⚖️ GÜVEN · DENEYİM · KARARLILILIK</p>
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
    <p class="sec-sub">Her alanda güçlü tecrübe ve güncel hukuki bilgiyle yanınızdayız</p>
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
  <p>{{ADRES_METNI}} · {{TELEFON_GOSTERIM}}</p>
  <p style="margin-top:20px">© 2024 {{ISLETME_ADI}} — Tüm hakları saklıdır.</p>
</footer>

{{MODUL_WHATSAPP_CANLI}}

</body>
</html>`
