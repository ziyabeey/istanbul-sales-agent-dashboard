import { ortakNav, ortakFooter } from './ortak'

export const sablonVitrinBuyumeHtml = `<!DOCTYPE html>
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
    <a href="#hakkimizda" style="color:var(--renk-alt);text-decoration:none;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase">Atölye</a>
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
      <span>Özel Parçalar</span>
      <h2>Seçkin Koleksiyonumuz</h2>
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
        <h2 style="font-family:var(--font-baslik);font-size:clamp(2.5rem,5vw,3.5rem);font-style:italic;margin-bottom:30px;color:#000;line-height:1.1">Zamansız Şıklık, Özel Detaylar.</h2>
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

<!-- ── 4. ÜRÜN KATALOĞU (Ürün Listesi Modülü) ───────────────── -->
{{MODUL_URUN_LISTESI}}

<!-- ── 5. MÜŞTERİ YORUMLARI ─────────────────────────────────── -->
<section id="yorumlar" class="parallax-bg" style="background-image: url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80'); padding:120px 20px; position:relative;">
  <div style="position:absolute; inset:0; background:rgba(0,0,0,0.6); z-index:1;"></div>
  <div class="container-lg" style="position:relative; z-index:2;">
    <div class="bolum-baslik">
      <span style="color:rgba(255,255,255,0.6)">Deneyimler</span>
      <h2 style="color:#fff;text-shadow:0 4px 15px rgba(0,0,0,0.3)">Müşterilerimizin Gözünden</h2>
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

<!-- ── 6. İSTATİSTİKLER (Şıklık göstergesi) ─────────────────── -->
{{MODUL_RAKAMLARLA_BIZ}}

<!-- ── 7. KAMPANYA VE İNDİRİM (Modül) ───────────────────────── -->
{{MODUL_KAMPANYA_AFISI}}
{{MODUL_INDIRIM_KUPONU}}

<!-- ── 8. İLETİŞİM & ATÖLYE ─────────────────────────────────── -->
<section id="iletisim" style="background:#0a0a0a;color:#fff;text-align:center;padding:120px 20px; border-top:1px solid #222;">
  <div class="container">
    <div class="bolum-baslik">
      <span style="color:#666; letter-spacing:0.3em;">Bizi Ziyaret Edin</span>
      <h2 style="color:#fff; font-size:3.5rem;">Atölyemiz</h2>
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

<!-- ── 9. MODÜL SLOT'LARI ────────────────────────────────────── -->
{{MODUL_GOOGLE_YORUMLAR}}
{{MODUL_SOSYAL_MEDYA}}

<!-- ── 10. YASAL + BÜLTEN ────────────────────────────────────── -->
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
  
  <p style="font-size:0.75rem;color:#999;letter-spacing:0.1em;text-transform:uppercase">&copy; 2026 Tüm Hakları Saklıdır. Dış Tarafından Desteklenir: <a href="https://kepenk.ai" style="color:#000;text-decoration:none;border-bottom:1px solid #ccc;padding-bottom:1px">kepenk.ai</a></p>
</footer>

{{MODUL_WHATSAPP_CANLI}}
</body>
</html>`
